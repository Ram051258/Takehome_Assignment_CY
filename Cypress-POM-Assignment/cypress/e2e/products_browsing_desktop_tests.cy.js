import HomePage from '../pageObjects/UI/homePageUI'
import DesktopsPage from '../pageObjects/desktopsPage'
import { log, logError } from '../support/logger';

// This test is for exploring Category and verifying products under category
describe('Product Browsing in Desktops Category', () => {
  const homePage = new HomePage();
  const desktopsPage = new DesktopsPage();

  beforeEach(() => {
    log('Visiting home page');
    homePage.visitHomePage();
  });

  it('should navigate to Desktops category and verify product names', () => {
    cy.fixture('products.json').then((data) => {
      const expectedProductNames = data.expectedProductNames;

      try {
        log('Navigating to Desktops category');
        homePage.navigateToDesktops();

        log('Verifying product names in Desktops category');
        desktopsPage.verifyProductInResults(expectedProductNames);

        log('Product verification in Desktops category completed successfully');
      } catch (error) {
        logError(error);
        throw error; // Re-throw the error to ensure the test fails
      }
    });
  });
});
