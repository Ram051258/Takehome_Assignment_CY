export function log(message) {
    cy.log(message); // Cypress command for logging
    console.log(message); // Console logging for debugging
  }
  
  export function logError(error) {
    cy.log(`ERROR: ${error.message}`);
    console.error(`ERROR: ${error.stack}`);
  }
  