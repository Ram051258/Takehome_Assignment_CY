class SearchPage {
    // Method to perform a search
    searchFor(term) {
        cy.get('#small-searchterms')
            .clear() // Clear any existing text in the search box
            .type(term); // Type the search term

        cy.get('.button-1.search-box-button')
            .click(); // Click the search button
    }

    get searchBox() {
        return cy.get('#small-searchterms');
    }

    get searchButton() {
        return cy.get('.button-1.search-box-button');
    }

    get productItems() {
        return cy.get('.product-grid .product-item'); // Adjust the selector if needed
    }

    enterSearchTerm(term) {
        this.searchBox.clear().type(term);
    }

    submitSearch() {
        this.searchButton.click();
    }

    clickSecondProduct() {
        this.productItems.should('have.length.greaterThan', 1); // Ensure there are at least 2 products
        this.productItems.eq(1).find('a').click(); // Clicks on the second product
    }
    
    clickOnProduct(productName) {
        // Ensure the product item is visible and click it
        this.productItems
          .contains('a', productName, { timeout: 10000 }) // Increase timeout for slow loading
          .first() // Click the first occurrence if there are multiple
          .click();
      }

    // Method to verify search results contain the expected product name
    verifySearchResults(expectedProductName) {
        cy.get('.product-item').each(($el) => {
            cy.wrap($el).find('.product-title a').invoke('text').then((text) => {
                expect(text).to.include(expectedProductName);
            });
        });
    }

    verifyResultsDisplayed() {
        this.productItems.should('have.length.greaterThan', 0);
    }
}

export default SearchPage;
