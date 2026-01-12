class CardQuickAdd {
  constructor() {
    // Check if required globals exist
    if (typeof routes === 'undefined' || !routes.cart_add_url) {
      console.error('Cart routes not defined. Make sure this script loads after theme.liquid globals.');
      return;
    }
    this.init();
  }

  init() {
    document.addEventListener('click', (event) => {
      const quickAddButton = event.target.closest('.card__quick-add-icon');
      if (quickAddButton) {
        event.preventDefault();
        event.stopPropagation(); // Stop event from bubbling to parent link
        event.stopImmediatePropagation(); // Stop other handlers
        this.addToCart(quickAddButton);
      }
    });
  }

  addToCart(button) {
    // Disable button during request
    button.disabled = true;
    button.classList.add('loading');

    const variantId = button.dataset.variantId;
    const cartDrawer = document.querySelector('cart-drawer');
    
    // Use the same config as product-form.js
    let config;
    if (typeof fetchConfig !== 'undefined') {
      config = fetchConfig('javascript');
      config.headers['X-Requested-With'] = 'XMLHttpRequest';
      delete config.headers['Content-Type']; // Let FormData set its own content type
    } else {
      // Fallback if fetchConfig is not available
      config = {
        method: 'POST',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Accept': 'application/javascript'
        }
      };
    }
    
    // Prepare form data with sections to fetch (exactly like product-form)
    const formData = new FormData();
    formData.append('id', variantId);
    formData.append('quantity', 1);
    
    // Add sections to fetch in the response
    if (cartDrawer && cartDrawer.getSectionsToRender) {
      const sections = cartDrawer.getSectionsToRender().map((section) => section.id);
      formData.append('sections', sections);
      formData.append('sections_url', window.location.pathname);
      
      // Set active element for accessibility
      if (cartDrawer.setActiveElement) {
        cartDrawer.setActiveElement(document.activeElement);
      }
    }
    
    config.body = formData;

    fetch(`${routes.cart_add_url}`, config)
    .then((response) => response.json())
    .then((response) => {
      // Check for errors (same as product-form)
      if (response.status) {
        // Error occurred
        console.error('Cart add error:', response);
        this.showError(button, response.description || response.message);
        
        // Publish cart error event
        if (typeof publish !== 'undefined' && typeof PUB_SUB_EVENTS !== 'undefined') {
          publish(PUB_SUB_EVENTS.cartError, {
            source: 'card-quick-add',
            productVariantId: variantId,
            errors: response.description,
            message: response.message
          });
        }
        return;
      }
      
      // Success - product was added
      console.log('Product added to cart:', response);
      
      // If no cart drawer/notification, redirect to cart
      if (!cartDrawer && !document.querySelector('cart-notification')) {
        window.location = window.routes.cart_url;
        return;
      }
      
      // Update cart UI
      this.updateCart(response);
      this.showSuccess(button);
      
      // Publish cart update event
      if (typeof publish !== 'undefined' && typeof PUB_SUB_EVENTS !== 'undefined') {
        publish(PUB_SUB_EVENTS.cartUpdate, {
          source: 'card-quick-add',
          productVariantId: variantId
        });
      }
    })
    .catch((error) => {
      console.error('Fetch error:', error);
      this.showError(button, 'An error occurred. Please try again.');
    })
    .finally(() => {
      button.disabled = false;
      button.classList.remove('loading');
    });
  }

  updateCart(response) {
    // Update cart drawer (exactly like product-form.js does)
    const cart = document.querySelector('cart-drawer') || document.querySelector('cart-notification');
    
    if (cart && cart.renderContents) {
      // Remove is-empty class if present (same as product-form)
      if (cart.classList.contains('is-empty')) {
        cart.classList.remove('is-empty');
      }
      
      // Render cart contents with the response
      cart.renderContents(response);
    } else {
      // Last resort: reload page to show updated cart
      console.warn('No cart component found, reloading page');
      setTimeout(() => window.location.reload(), 300);
    }
  }

  updateCartCount(cartData) {
    const cartCount = document.querySelector('.cart-count-bubble');
    if (cartCount && cartData.item_count) {
      const countSpan = cartCount.querySelector('span[aria-hidden="true"]');
      if (countSpan) {
        countSpan.textContent = cartData.item_count;
      }
      const visuallyHiddenSpan = cartCount.querySelector('.visually-hidden');
      if (visuallyHiddenSpan) {
        visuallyHiddenSpan.textContent = visuallyHiddenSpan.textContent.replace(/\d+/, cartData.item_count);
      }
    }
  }

  showSuccess(button) {
    // Add a success class temporarily
    button.classList.add('success');
    setTimeout(() => {
      button.classList.remove('success');
    }, 2000);
    
    // If cart notification exists, show it
    const cartNotification = document.querySelector('cart-notification');
    if (cartNotification && cartNotification.setActiveElement) {
      cartNotification.setActiveElement(document.activeElement);
    }
  }

  showError(button, message) {
    console.error('Add to cart error:', message);
    
    // Show a more user-friendly error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'card-quick-add-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #dc3545;
      color: white;
      padding: 15px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 10000;
      animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
      errorDiv.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => errorDiv.remove(), 300);
    }, 3000);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new CardQuickAdd();
  });
} else {
  new CardQuickAdd();
}

