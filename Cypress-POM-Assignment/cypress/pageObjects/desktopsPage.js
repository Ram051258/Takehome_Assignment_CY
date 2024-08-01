class DesktopsPage {
    verifyProductInResults(expectedProductNames) {
      cy.get('.product-grid .product-item').each(($el) => {
        cy.wrap($el).find('.product-title').invoke('text').then((text) => {
          const productName = text.trim();
          expect(expectedProductNames).to.include(productName);
        });
      });
    }
  }
  
  export default DesktopsPage;
  