// This will take a screenshot on test failure
import './commands'

Cypress.on('fail', (error, runnable) => {
    cy.screenshot('error-screenshot', { capture: 'runner' })
    throw error // Ensures the test fails as expected
  })
  