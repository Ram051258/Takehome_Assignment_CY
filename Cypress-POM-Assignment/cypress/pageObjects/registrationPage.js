

class RegistrationPage {
    fillForm(userDetails) {
        // Select the gender
        if (userDetails.gender === 'M') {
            cy.get('#gender-male').check(); // Select Male
        } else if (userDetails.gender === 'F') {
            cy.get('#gender-female').check(); // Select Female
        }

        // Fill out the text fields
        cy.get('#FirstName').type(userDetails.firstName);
        cy.get('#LastName').type(userDetails.lastName);
        cy.get('#Email').type(userDetails.email);
        cy.get('#Password').type(userDetails.password);
        cy.get('#ConfirmPassword').type(userDetails.confirmPassword);
    }

    fillFormEmpty(userDetails) {
        cy.get('input[name="Gender"][value="M"]').check(); // Check Male by default
        this.clearAndType('#FirstName', userDetails.firstName);
        this.clearAndType('#LastName', userDetails.lastName);
        this.clearAndType('#Email', userDetails.email);
        this.clearAndType('#Password', userDetails.password);
        this.clearAndType('#ConfirmPassword', userDetails.confirmPassword || userDetails.password);
    }

    clearAndType(selector, value) {
        cy.get(selector).then(($input) => {
          if (value === '') {
            cy.wrap($input).clear(); // Clear the field if value is empty
          } else {
            cy.wrap($input).clear().type(value); // Clear and type the provided value
          }
        });
      }

    submitForm() {
        cy.get('#register-button').click();
    }

    verifyEmptyFieldErrors() {
        cy.get('#FirstName').should('have.class', 'input-validation-error');
        cy.get('span[data-valmsg-for="FirstName"]').should('contain.text', 'First name is required.');
        
        cy.get('#LastName').should('have.class', 'input-validation-error');
        cy.get('span[data-valmsg-for="LastName"]').should('contain.text', 'Last name is required.');
        
        cy.get('#Email').should('have.class', 'input-validation-error');
        cy.get('span[data-valmsg-for="Email"]').should('contain.text', 'Email is required.');
        
        cy.get('#Password').should('have.class', 'input-validation-error');
        cy.get('span[data-valmsg-for="Password"]').should('contain.text', 'Password is required.');
        
        cy.get('#ConfirmPassword').should('have.class', 'input-validation-error');
        cy.get('span[data-valmsg-for="ConfirmPassword"]').should('contain.text', 'Password is required.');
      }
}

export default RegistrationPage;
