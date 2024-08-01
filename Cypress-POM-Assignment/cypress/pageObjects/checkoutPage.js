class CheckoutPage {
    get cartTable() {
      return cy.get('.cart');
    }
  
    get productName() {
      return this.cartTable.find('.product-name');
    }
  
    get productPrice() {
      return this.cartTable.find('.product-unit-price');
    }
  
    get productQuantity() {
      return this.cartTable.find('.qty-input');
    }
  
    get productTotal() {
      return this.cartTable.find('.product-subtotal');
    }
  
    get estimateShippingButton() {
      return cy.get('.estimate-shipping-button');
    }
  
    get termsOfServiceCheckbox() {
      return cy.get('#termsofservice');
    }
  
    get checkoutButton() {
      return cy.get('#checkout');
    }
  
    get termsOfServiceWarning() {
      return cy.get('#terms-of-service-warning-box');
    }
  
    verifyProductDetails({ name, price, quantity, total }) {
      this.productName.should('have.text', name);
      this.productPrice.should('have.text', price);
      this.productQuantity.should('have.value', quantity);
      this.productTotal.should('have.text', total);
    }
  
    verifyEstimateShippingButton() {
      this.estimateShippingButton.should('be.visible');
    }
  
    verifyTermsOfServiceCheckbox() {
      this.termsOfServiceCheckbox.should('be.visible');
    }
  
    verifyCheckoutButton() {
      this.checkoutButton.should('be.visible');
    }
  
    acceptTermsAndProceed() {
      this.termsOfServiceCheckbox.check();
      this.checkoutButton.click();
    }
  
    verifyTermsOfServiceWarning() {
      this.termsOfServiceWarning.should('be.visible');
    }
  }
  
  export default CheckoutPage;
  