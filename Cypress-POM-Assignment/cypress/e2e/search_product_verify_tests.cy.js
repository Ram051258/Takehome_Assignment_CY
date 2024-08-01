import SearchPage from '../pageObjects/searchPage'
import HomePage from '../pageObjects/UI/homePageUI' 
import { log, logError } from '../support/logger';

describe('Search Functionality', () => {
    const homePage = new HomePage();
  const searchPage = new SearchPage();

  beforeEach(() => {
    homePage.visitHomePage();
  });

  it('should perform a search and verify the results', () => {
    const searchTerm = 'Phone';
    //const expectedProductName = 'Phone';

    try {
      log(`Searching for term: ${searchTerm}`);
      searchPage.searchFor(searchTerm);

      log('Verifying search results displayed');
      searchPage.verifyResultsDisplayed();

      log('Search functionality test completed successfully');
    } catch (error) {
      logError(error);
      throw error; // Re-throw the error to ensure the test fails
    }
  });

  it('should handle search with no term and show an error message', () => {
    try {
      log('Attempting to search with no term');
      
      // Directly trigger the form submission with no term
      cy.get('#small-searchterms').clear(); // Clear any text
      cy.get('.button-1.search-box-button').click();

      // Check for the error message alert
      cy.on('window:alert', (text) => {
        expect(text).to.contains('Please enter some search keyword');
      });
    } catch (error) {
      logError(error);
      throw error; 
    }
  });
});
