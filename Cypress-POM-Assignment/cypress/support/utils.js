export function generateUniqueUserDetails() {
    const timestamp = new Date().getTime();
    return {
      firstName: `Ram${timestamp}`,
      lastName: `Sri${timestamp}`,
      email: `ram.sri${timestamp}@gmail.com`,
      password: 'Password123!',
      confirmPassword: 'Password123!',
      gender: 'M' // or 'F' for Female, depending on the test case
    };
  }
  
  export function verifyProductTitlesContain(searchTerm) {
    cy.get('.product-item').each(($el) => {
      cy.wrap($el).find('.product-title a').invoke('text').then((text) => {
        expect(text.toLowerCase()).to.include(searchTerm.toLowerCase()); // Case-insensitive search
      });
    });
  }