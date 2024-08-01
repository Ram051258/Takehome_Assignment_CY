import HomePage from '../pageObjects/UI/homePageUI'
import RegistrationPage from '../pageObjects/registrationPage'
import { log, logError } from '../support/logger'; // Import the logger


// This function makes test data unique by adding to a timestamp
function makeUnique(userDetails) {
  const timestamp = new Date().getTime();
  return {
    ...userDetails,
    firstName: `${userDetails.firstName}${timestamp}`,
    lastName: `${userDetails.lastName}${timestamp}`,
    email: `${userDetails.email.split('@')[0]}${timestamp}@example.com`,
  };
}

// Verify User registration flow 
describe('User Registration Flow', () => {
  const homePage = new HomePage();
  const registrationPage = new RegistrationPage();

  beforeEach(() => {
    homePage.visitHomePage();
  });

  it('should navigate to the registration page and register a new user successfully and validate the user logged in page', () => {
    try {
      log('Clicking on the Register link');
      homePage.clickRegisterLink();

      // Load user details from fixture file and make them unique
      cy.fixture('userDetails').then((userDetails) => {
        log('Loaded user details from fixture file');
        const uniqueUserDetails = makeUnique(userDetails.valid);
        log('Generated unique user details');

        // Fill the form with unique user details and submit
        registrationPage.fillForm(uniqueUserDetails);
        log('Filled the registration form');
        registrationPage.submitForm();
        log('Submitted the registration form');

        // Verify successful registration
        cy.url().should('include', '/registerresult');
        cy.get('.result').should('contain', 'Your registration completed');
        log('Verified successful registration');

        // Click the Continue button
        cy.get('.register-continue-button').click();
        log('Clicked the Continue button');

        // Verify email is displayed
        cy.get('li a.account').should('contain.text', uniqueUserDetails.email);
        log(`Verified email address ${uniqueUserDetails.email} is displayed`);

        // Verify logout link is present
        cy.get('a[href="/logout"]').should('exist');
        log('Verified logout link is present');
      });
    } catch (error) {
      logError(error);
      throw error; // Re-throw the error to ensure the test fails
    }
  })

  it('should show an error for invalid email format', () => {
    try {
      log('Clicking on the Register link');
      homePage.clickRegisterLink();

      cy.fixture('userDetails').then((userDetails) => {
        log('Loaded user details from fixture file');
        const invalidUserDetails = userDetails.invalid;
        log('Generated unique user details with invalid email');

        registrationPage.fillForm(invalidUserDetails);
        log('Filled the registration form');
        registrationPage.submitForm();
        log('Submitted the registration form');

        // Verify error message for invalid email
        cy.get('#Email').should('have.class', 'input-validation-error');
        cy.get('.field-validation-error').should('contain.text', 'Wrong email');
        log('Verified invalid email format error message');
      });
    } catch (error) {
      logError(error);
      throw error; // Re-throw the error to ensure the test fails
    }
  });


  it('should show an error when passwords do not match', () => {
    try {
      log('Clicking on the Register link');
      homePage.clickRegisterLink();

      cy.fixture('userDetails').then((userDetails) => {
        log('Loaded user details from fixture file');
        const mismatchUserDetails = userDetails.passwordMismatch;
        log('Generated user details with mismatched passwords');

        registrationPage.fillForm(mismatchUserDetails);
        log('Filled the registration form with mismatched passwords');
        registrationPage.submitForm();
        log('Submitted the registration form');

        // Verify error message for password mismatch
        cy.get('#ConfirmPassword').should('have.class', 'input-validation-error');
        cy.get('.field-validation-error').should('contain.text', 'The password and confirmation password do not match.');
        log('Verified password mismatch error message');
      });
    } catch (error) {
      logError(error);
      throw error; // Re-throw the error to ensure the test fails
    }
  });

  it('should show errors for empty form fields', () => {
    try {
      log('Clicking on the Register link');
      homePage.clickRegisterLink();

      // Fill the form with empty values
      registrationPage.fillFormEmpty({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      log('Filled the registration form with empty values');

      registrationPage.submitForm();
      log('Submitted the registration form with empty values');

      // Verify error messages for empty fields
      registrationPage.verifyEmptyFieldErrors();
      log('Verified all field validation error messages for empty form submission');
    } catch (error) {
      logError(error);
      throw error; // Re-throw the error to ensure the test fails
    }
  });

});
