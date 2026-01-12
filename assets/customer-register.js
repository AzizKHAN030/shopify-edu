class CustomerRegister {
  constructor() {
    this.form = document.getElementById('create_customer_form');
    this.submitButton = document.getElementById('register-submit-button');
    this.messageContainer = document.getElementById('register-message');
    
    if (!this.form) {
      console.warn('Registration form not found');
      return;
    }
    
    this.init();
  }

  init() {
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
  }

  handleSubmit(event) {
    event.preventDefault();
    
    // Clear previous messages
    this.hideMessage();
    
    // Get form data
    const formData = new FormData(this.form);
    const firstName = formData.get('customer[first_name]');
    const lastName = formData.get('customer[last_name]');
    const email = formData.get('customer[email]');
    const password = formData.get('customer[password]');

    // Validate
    if (!email || !password) {
      this.showMessage('Please fill in all required fields.', 'error');
      return;
    }

    // Lock form
    this.lockForm();

    // Submit via GraphQL
    this.createCustomer({
      firstName,
      lastName,
      email,
      password
    });
  }

  async createCustomer(customerData) {
    // Use Shopify's Storefront API GraphQL
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
        email: customerData.email,
        password: customerData.password,
        firstName: customerData.firstName || '',
        lastName: customerData.lastName || '',
        acceptsMarketing: false
      }
    };

    try {
      // Get the storefront access token from the page
      const storefrontAccessToken = this.getStorefrontAccessToken();
      
      if (!storefrontAccessToken) {
        console.error('Storefront API access token not found');
        this.showMessage('Configuration error. Please contact support.', 'error');
        this.unlockForm();
        return;
      }

      const response = await fetch(`https://${window.Shopify.shop}/api/2024-01/graphql.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': storefrontAccessToken
        },
        body: JSON.stringify({
          query: mutation,
          variables: variables
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      console.log('GraphQL Response:', result);

      if (result.errors) {
        // GraphQL errors
        const errorMessage = result.errors.map(err => err.message).join(', ');
        this.showMessage(`Error: ${errorMessage}`, 'error');
        this.unlockForm();
        return;
      }

      const { customer, customerUserErrors } = result.data.customerCreate;

      if (customerUserErrors && customerUserErrors.length > 0) {
        // Customer creation errors
        const errorMessages = customerUserErrors.map(err => err.message).join(', ');
        this.showMessage(errorMessages, 'error');
        this.unlockForm();
      } else if (customer) {
        // Success!
        this.showMessage('Account created successfully! Redirecting...', 'success');
        
        // Redirect to account page after 2 seconds
        setTimeout(() => {
          window.location.href = '/account';
        }, 2000);
      } else {
        this.showMessage('An unexpected error occurred. Please try again.', 'error');
        this.unlockForm();
      }
    } catch (error) {
      console.error('Registration error:', error);
      this.showMessage('Network error. Please check your connection and try again.', 'error');
      this.unlockForm();
    }
  }

  getStorefrontAccessToken() {
    // Try to get from window.Shopify first
    if (window.Shopify && window.Shopify.storefrontAccessToken) {
      return window.Shopify.storefrontAccessToken;
    }
    
    // Try to get from meta tag
    const metaTag = document.querySelector('meta[name="shopify-storefront-api-token"]');
    if (metaTag) {
      return metaTag.content;
    }
    
    // Try to get from script tag
    const scriptTag = document.querySelector('script[data-storefront-token]');
    if (scriptTag) {
      return scriptTag.dataset.storefrontToken;
    }
    
    return null;
  }

  lockForm() {
    // Disable all inputs
    const inputs = this.form.querySelectorAll('input, button');
    inputs.forEach(input => input.disabled = true);

    // Show spinner, hide text
    if (this.submitButton) {
      const buttonText = this.submitButton.querySelector('.button-text');
      const buttonSpinner = this.submitButton.querySelector('.button-spinner');
      
      if (buttonText) buttonText.style.display = 'none';
      if (buttonSpinner) buttonSpinner.style.display = 'inline-block';
      
      this.submitButton.classList.add('loading');
    }
  }

  unlockForm() {
    // Enable all inputs
    const inputs = this.form.querySelectorAll('input, button');
    inputs.forEach(input => input.disabled = false);

    // Hide spinner, show text
    if (this.submitButton) {
      const buttonText = this.submitButton.querySelector('.button-text');
      const buttonSpinner = this.submitButton.querySelector('.button-spinner');
      
      if (buttonText) buttonText.style.display = 'inline';
      if (buttonSpinner) buttonSpinner.style.display = 'none';
      
      this.submitButton.classList.remove('loading');
    }
  }

  showMessage(message, type = 'error') {
    if (!this.messageContainer) return;

    this.messageContainer.className = `register-message register-message--${type}`;
    this.messageContainer.innerHTML = `
      <svg aria-hidden="true" focusable="false" class="icon">
        <use href="#icon-${type === 'success' ? 'checkmark' : 'error'}" />
      </svg>
      <span>${message}</span>
    `;
    this.messageContainer.style.display = 'block';

    // Scroll to message
    this.messageContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  hideMessage() {
    if (this.messageContainer) {
      this.messageContainer.style.display = 'none';
    }
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

