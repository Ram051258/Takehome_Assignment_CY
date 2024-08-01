class ElectronicsPage {
    // Selects Camera and Photo
    navigateToCameraAndPhoto() {
        // Ensure the 'Electronics' category is visible and click it
        cy.get('.listbox').contains('Electronics').click({ force: true });
    
        // Expand the 'Electronics' category to reveal subcategories if needed
        cy.get('.listbox').find('a[href="/camera-photo"]').first().click({ force: true });
      }
  
    // Verifies that the correct products are listed
    verifyProducts(expectedProductNames) {
      cy.get('.product-item').each(($el) => {
        cy.wrap($el).find('.product-title a').invoke('text').then((text) => {
          expect(expectedProductNames).to.include(text);
        });
      });
    }
  }
  
  export default ElectronicsPage;
  