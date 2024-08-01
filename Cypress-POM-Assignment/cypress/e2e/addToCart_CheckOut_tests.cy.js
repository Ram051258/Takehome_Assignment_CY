import SearchPage from '../pageObjects/searchPage'
import CartPage from '../pageObjects/cartPage'
import HomePage from '../pageObjects/UI/homePageUI'
import ProductPage from '../pageObjects/productPage';
import CheckoutPage from '../pageObjects/checkoutPage';

describe('Search and Add to Cart Functionality', () => {
    const homePage = new HomePage();
    const searchPage = new SearchPage();
    const cartPage = new CartPage();
    const productPage = new ProductPage();
    const checkoutPage = new CheckoutPage();

    beforeEach(() => {
        homePage.visitHomePage();
    });

    it('should search for "Phone", add the first product to the cart, and verify it is added successfully', () => {
        // Perform search
        searchPage.enterSearchTerm('Phone');
        searchPage.submitSearch();

        // Debugging step: Print the product items to verify they are present
        searchPage.productItems.should('be.visible');
        searchPage.productItems.then(($items) => {
            cy.log('Found products: ', $items.length);
            // Optionally, you can log the text of each product item
            $items.each((index, item) => {
                cy.log('Product Title: ', Cypress.$(item).find('.product-title').text());
            });
        });

        // Verify that search results are displayed
        searchPage.verifyResultsDisplayed();

        // Click on the "Phone Cover" product
        searchPage.clickOnProduct('Phone Cover');

        // Wait for the product page to load
        cy.url().should('include', '/phone-cover');

        // Add the product to the cart
        productPage.addToCart();

        // Verify the product is added to the cart
        productPage.verifyProductAddedToCart();

        // Click on the shopping cart link
        homePage.clickOnShoppingCart(); 

        // Wait for the cart page to load
        cy.url().should('include', '/cart'); 

        // Verify product details in the cart
        checkoutPage.verifyProductDetails({
            name: 'Phone Cover', 
            price: '10.00', 
            quantity: '1', 
            total: '10.00' 
        });

        cartPage.estimateShipping('United States', 'Alabama', '23334');

        // Verify total details
        cartPage.verifyTotalDetails({
            subTotal: '10.00', 
            shipping: 'Calculated during checkout', 
            tax: '0.00', 
            total: 'Calculated during checkout'
        });
    }); 
    
});
