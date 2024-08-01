Cypress.Commands.add('handleError', (message) => {
    cy.log(`Error: ${message}`)
})

Cypress.Commands.add('verifyElement', (selector, errorMessage) => {
    cy.get(selector).then($el => {
        if ($el.length === 0) {
            cy.handleError(errorMessage)
        } else {
            cy.wrap($el)
        }
    })
})

Cypress.Commands.add('assertElementVisible', (selector, errorMessage) => {
    cy.get(selector).should('be.visible').then(($el) => {
        if ($el.length === 0) {
            throw new Error(errorMessage);
        }
    });
});

Cypress.Commands.add('assertElementHasAttribute', (selector, attribute, value, errorMessage) => {
    cy.get(selector).should('have.attr', attribute, value).then(($el) => {
        const attrValue = $el.attr(attribute);
        if (attrValue !== value) {
            throw new Error(errorMessage);
        }
    });
});

// cypress/support/commands.js

Cypress.Commands.add('assertElementHasAttributeContains', (selector, attribute, partialValue, errorMessage) => {
    cy.get(selector).should('have.attr', attribute).and('include', partialValue).then(($el) => {
        const attrValue = $el.attr(attribute);
        if (!attrValue.includes(partialValue)) {
            throw new Error(errorMessage);
        }
    });
});


