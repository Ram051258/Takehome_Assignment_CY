import HomePage from '../pageObjects/UI/homePageUI'
import ElectronicsPage from '../pageObjects/electronicsPage'
import { log, logError } from '../support/logger';

// This test is for exploring Category electronics and verifying products under category
describe('Product Browsing in Camera and Photo Category', () => {
  const homePage = new HomePage();
  const electronicsPage = new ElectronicsPage();

  beforeEach(() => {
    log('Visiting home page');
    homePage.visitHomePage();
  });

  it('should navigate to Camera and Photo category and verify product names', () => {
    cy.fixture('products.json').then((data) => {
      const expectedProductNames = data.cameraAndPhoto;

      try {
        log('Navigating to Electronics category');
        homePage.navigateToElectronics();

        log('Selecting Camera and Photo');
        electronicsPage.navigateToCameraAndPhoto();

        log('Verifying product names in Camera and Photo category');
        electronicsPage.verifyProducts(expectedProductNames);

        log('Product verification in Camera and Photo category completed successfully');
      } catch (error) {
        logError(error);
        throw error; // Re-throw the error to ensure the test fails
      }
    });
  });
});
