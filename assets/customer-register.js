/**
 * AJAX Customer Registration using Shopify Storefront API
 */

class CustomerRegister {
  constructor() {
    this.form = document.getElementById('create_customer_form');
    this.submitButton = document.getElementById('register-submit-button');
    this.messageContainer = document.getElementById('register-message');
    
    // Get API token from meta tag
    this.apiToken = document.querySelector('meta[name="shopify-storefront-api-token"]')?.content;
    this.shopDomain = window.Shopify?.shop || document.querySelector('meta[name="shopify-shop"]')?.content;
    
    if (!this.apiToken) {
      console.error('Storefront API token not found');
      return;
    }
    
    if (!this.shopDomain) {
      console.error('Shop domain not found');
      return;
    }
    
    this.graphqlEndpoint = `https://${this.shopDomain}/api/2024-01/graphql.json`;
    
    this.init();
  }
  
  init() {
    if (!this.form) return;
    
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });
  }
  
  async handleSubmit() {
    // Disable form
    this.setLoading(true);
    this.clearMessages();
    
    // Get form data
    const formData = new FormData(this.form);
    const firstName = formData.get('customer[first_name]') || '';
    const lastName = formData.get('customer[last_name]') || '';
    const email = formData.get('customer[email]');
    const password = formData.get('customer[password]');
    
    // Validate
    if (!email || !password) {
      this.showError('Please fill in all required fields');
      this.setLoading(false);
      return;
    }
    
    // GraphQL mutation
    const mutation = `
      mutation customerCreate($input: CustomerCreateInput!) {
        customerCreate(input: $input) {
          customer {
            id
            email
            firstName
            lastName
          }
          customerUserErrors {
            code
            field
            message
          }
        }
      }
    `;
    
    const variables = {
      input: {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
      }
    };
    
    try {
      const response = await fetch(this.graphqlEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': this.apiToken
        },
        body: JSON.stringify({
          query: mutation,
          variables: variables
        })
      });
      
      const result = await response.json();
      
      console.log('Registration response:', result);
      
      // Check for errors
      if (result.errors) {
        this.showError(result.errors[0].message);
        this.setLoading(false);
        return;
      }
      
      const { customer, customerUserErrors } = result.data.customerCreate;
      
      if (customerUserErrors && customerUserErrors.length > 0) {
        // Show validation errors
        const errorMessages = customerUserErrors.map(err => err.message).join('. ');
        this.showError(errorMessages);
        this.setLoading(false);
        return;
      }
      
      if (customer) {
        // Success!
        this.showSuccess('Registration successful! Redirecting to login...');
        
        // Redirect to account page after 1.5 seconds
        setTimeout(() => {
          window.location.href = window.Shopify.routes.root + 'account/login';
        }, 1500);
      } else {
        this.showError('Registration failed. Please try again.');
        this.setLoading(false);
      }
      
    } catch (error) {
      console.error('Registration error:', error);
      this.showError('Network error. Please check your connection and try again.');
      this.setLoading(false);
    }
  }
  
  setLoading(loading) {
    const buttonText = this.submitButton.querySelector('.button-text');
    const buttonSpinner = this.submitButton.querySelector('.button-spinner');
    
    this.submitButton.disabled = loading;
    
    // Toggle visibility
    if (loading) {
      buttonText.style.display = 'none';
      buttonSpinner.style.display = 'inline-block';
    } else {
      buttonText.style.display = 'inline';
      buttonSpinner.style.display = 'none';
    }
    
    // Disable all inputs
    const inputs = this.form.querySelectorAll('input');
    inputs.forEach(input => {
      input.disabled = loading;
    });
  }
  
  clearMessages() {
    this.messageContainer.style.display = 'none';
    this.messageContainer.className = 'register-message';
    this.messageContainer.textContent = '';
  }
  
  showError(message) {
    this.messageContainer.textContent = message;
    this.messageContainer.className = 'register-message register-message--error';
    this.messageContainer.style.display = 'block';
    this.messageContainer.setAttribute('role', 'alert');
  }
  
  showSuccess(message) {
    this.messageContainer.textContent = message;
    this.messageContainer.className = 'register-message register-message--success';
    this.messageContainer.style.display = 'block';
    this.messageContainer.setAttribute('role', 'status');
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new CustomerRegister();
  });
} else {
  new CustomerRegister();
}
