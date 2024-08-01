class CartPage {
    // Selectors for shipping estimate elements
    countrySelect = 'select.country-input';
    stateSelect = 'select.state-input';
    zipInput = 'input.zip-input';
    estimateButton = 'input.estimate-shipping-button';
    shippingResult = '.shipping-options';

    // Selectors for total details
    subTotalSelector = 'td.cart-total-left:contains("Sub-Total:") + td.cart-total-right .product-price';
    shippingSelector = 'td.cart-total-left:contains("Shipping:") + td.cart-total-right';
    taxSelector = 'td.cart-total-left:contains("Tax:") + td.cart-total-right .product-price';
    totalSelector = 'td.cart-total-left:contains("Total:") + td.cart-total-right';

    // Method to estimate shipping
    estimateShipping(country, state, zip) {
        // Select country
        cy.get(this.countrySelect).select(country);

        // Select state
        cy.get(this.stateSelect).select(state);

        // Enter zip code
        cy.get(this.zipInput).type(zip);

        // Click on the estimate shipping button
        cy.get(this.estimateButton).click();
    }
    // Method to verify the total details
    verifyTotalDetails(expectedTotals) {
        // Verify Sub-Total
        cy.get(this.subTotalSelector).should('contain.text', expectedTotals.subTotal);

        // Verify Shipping
        cy.get(this.shippingSelector).should('contain.text', expectedTotals.shipping);

        // Verify Tax
        cy.get(this.taxSelector).should('contain.text', expectedTotals.tax);

        // Verify Total
        cy.get(this.totalSelector).should('contain.text', expectedTotals.total);
    }

    // Method to verify the shipping options list is visible
    verifyShippingOptionsVisible() {
        cy.get(this.shippingOptionsList, { timeout: 15000 }).should('be.visible');
    }
}

export default CartPage;
