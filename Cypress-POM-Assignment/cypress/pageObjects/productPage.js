class ProductPage {
    // Elements
    get addToCartButton() {
        return cy.get('#add-to-cart-button-80');
    }

    get cartConfirmationMessage() {
        return cy.get('.bar-notification.success');
    }

    get successMessage() {
        return cy.get('#bar-notification.success');
      }
    

    // Actions
    addToCart() {
        // Click on the first available "Add to cart" button in case multiple exist
        this.addToCartButton.first().click();
    }
    

    // Assertions
    verifyProductAddedToCart() {
        this.successMessage
            .should('be.visible')
            .and('contain', 'The product has been added to your shopping cart');
    }
}


export default ProductPage;
