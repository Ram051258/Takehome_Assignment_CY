class HomePage {

  get logo() { return cy.get('.header-logo') }
  get nonExistentElement() { return cy.get('.non-existent-selector') }
  get logoLink() {
    return this.logo.find('a');
  }

  get logoImage() {
    return this.logoLink.find('img');
  }


  get searchBox() {
    return cy.get('#small-searchterms');
  }

  get searchButton() {
    return cy.get('.button-1.search-box-button');
  }

  get headerLinksWrapper() {
    return cy.get('.header-links-wrapper');
  }

  // Selector for the header links
  get headerLinks() {
    return this.headerLinksWrapper.find('ul li a');
  }

  // Selector for the top menu
  get topMenu() {
    return cy.get('.header-menu .top-menu');
  }

  // Selector for the mobile menu
  get mobileMenu() {
    return cy.get('.mob-top-menu');
  }

  get block() {
    return cy.get('.block.block-manufacturer-navigation', { timeout: 15000 });
  }

  get blockPopularTags() {
    return cy.get('.block.block-popular-tags', { timeout: 15000 });
  }

  get titleManufacturers() {
    return this.block.find('.title strong');
  }

  get title() {
    return this.blockPopularTags.find('.title strong');
  }

  get manufacturerLink() {
    return this.block.find('.listbox .list li a');
  }

  get tagsList() {
    return this.blockPopularTags.find('.tags ul');
  }

  get viewAllLink() {
    return this.blockPopularTags.find('.view-all a');
  }

  get newsletterTitle() {
    return cy.get('.block-newsletter .title strong');
  }

  get newsletterEmailInput() {
    return cy.get('#newsletter-email'); // Selector for the email input box
  }

  get subscribeButton() {
    return cy.get('#newsletter-subscribe-button'); // Selector for the subscribe button
  }

  get subscribeProgress() {
    return cy.get('#subscribe-loading-progress'); // Selector for the loading progress indicator
  }

  get resultBlock() {
    return cy.get('#newsletter-result-block'); // Selector for the result block
  }

  get pollTitle() {
    return cy.get('.block-poll .title strong');
  }

  get pollQuestion() {
    return cy.get('#poll-block-1 .poll-display-text');
  }

  get pollOptions() {
    return cy.get('.poll-options li'); // Selects all the poll options
  }

  get voteButton() {
    return cy.get('#vote-poll-1'); // Selector for the vote button
  }

  get voteProgress() {
    return cy.get('#poll-voting-progress-1'); // Selector for the voting progress indicator
  }

  get voteError() {
    return cy.get('#block-poll-vote-error-1'); // Selector for the error message block
  }

  get featuredProducts() {
    return cy.get('.product-grid.home-page-product-grid');
  }

  // Selector for product titles within the featured products section
  get productTitles() {
    return this.featuredProducts.find('.product-title a');
  }

  visitHomePage() {
    cy.visit('https://demowebshop.tricentis.com');
  }

  clickRegisterLink() {
    cy.get('a[href="/register"]').click();
  }

  clickOnShoppingCart() {
    cy.get('#topcartlink a').click();
  }

  // Method to get all product titles
  getAllProductTitles() {
    return this.productTitles.then(($titles) => {
      return Cypress._.map($titles, 'innerText'); // Extract text content from each title
    });

  }

  get footerSection() {
    return cy.get('.footer-menu-wrapper');
  }

  // Selector for all h3 tags within the footer section
  get h3Tags() {
    return this.footerSection.find('h3');
  }

  // Method to get all h3 tag values
  getAllH3Values() {
    return this.h3Tags.then(($h3s) => {
      return Cypress._.map($h3s, (el) => el.innerText.trim()); // Trim text content from each h3
    });
  }
  navigate() {
    cy.visit('https://demowebshop.tricentis.com/')
  }

  navigateToCategory(categoryName) {
    cy.get('.listbox').contains(categoryName).click();
  }

  navigateToDesktops() {
    // Ensure 'Computers' category is visible and expand it if necessary
    cy.get('.listbox').contains('Computers').click();  // Ensure the 'Computers' category is clicked

    // Expand the 'Computers' category if it's not expanded
    cy.get('.listbox').find('a[href="/desktops"]').should('be.visible').click();
  }
  navigateToElectronics() {
    // Ensure 'Computers' category is visible and expand it if necessary
    cy.get('.listbox').contains('Electronics').click();  // Ensure the 'Computers' category is clicked

    // Expand the 'Computers' category if it's not expanded
    cy.get('.listbox').find('a[href="/electronics"]').should('be.visible').click();
  }


  // Ensure 'Electronics' category is visible and expand it if necessary
  navigateToCameraAndPhoto() {
    // Ensure the 'Electronics' category is visible and click it
    cy.get('.listbox').contains('Electronics').click({ force: true });

    // Ensure 'Camera and Photo' subcategory is visible and expand it if necessary
    cy.get('.listbox').find('a[href="/camera-photo"]').should('be.visible').click({ force: true });
  }

  verifyLogo() {
    cy.verifyElement('.header-logo', 'Logo is not visible')
  }

  assertLogoVisible() {
    // Ensure the selector is correct and the element is present
    this.logo.should('exist')  // Checks if the element exists
      .and('be.visible');  // Ensures that the element is visible
  }

  assertLogoVisible() {
    this.logo.should('exist')
      .and('be.visible'); // Ensures that the element is visible
  }

  assertLogoSrcContains(partialSrc) {
    this.logoImage.should('exist') // Ensure the image exists
      .and('have.attr', 'src')
      .and('include', partialSrc, `Custom Error: Logo src does not include "${partialSrc}"`);
  }

  // Method to assert the link's text
  assertHeaderLinkText(index, expectedText) {
    this.headerLinks.eq(index)
      .should('exist') // Check if the link exists
      .should('be.visible') // Ensure the link is visible
      .invoke('text').then(text => {
        // Clean the text by removing extra spaces, HTML entities, and unwanted characters
        const cleanedText = text.replace(/\s*\(\d*\)\s*$/, '').trim(); // Remove trailing "(number)" if present
        expect(cleanedText).to.equal(expectedText, `Link at index ${index} does not have the expected text "${expectedText}". Actual text: "${text}".`);
      });
  }

  // Utility function to normalize text
  normalizeText(text) {
    return text
      .replace(/\s+/g, ' ') // Replace multiple whitespace characters with a single space
      .replace(/\u00A0/g, ' ') // Replace non-breaking spaces with regular spaces
      .trim(); // Remove leading and trailing spaces
  }
  // Extracts only the relevant part of the text for comparison
  extractRelevantText(text) {
    return text.split('(')[0].trim(); // Extract text before the opening parenthesis
  }

  // Assert text and href attributes for header links
  assertHeaderLinks(expectedItems) {
    cy.get('.header-links ul', { timeout: 15000 }) // Wait for the header links to be available
      .find('> li > a') // Select only top-level <a> elements inside <li>
      .each((link, index) => {
        cy.wrap(link)
          .should('be.visible') // Ensure the <a> is visible
          .then($el => {
            const actualText = this.extractRelevantText(this.normalizeText($el.text()));
            const actualHref = $el.attr('href');

            // Print actual text and href for debugging
            cy.log(`Actual text for header link at index ${index}: "${actualText}"`);
            cy.log(`Actual href for header link at index ${index}: "${actualHref}"`);

            // Extract expected text and href from the expectedItems array
            const { text: expectedText, href: expectedHref } = expectedItems[index];

            // Assert text
            expect(actualText).to.equal(expectedText, `Header link at index ${index} does not have the expected text "${expectedText}". Actual text: "${actualText}".`);

            // Assert href
            expect(actualHref).to.equal(expectedHref, `Header link at index ${index} does not have the expected href "${expectedHref}". Actual href: "${actualHref}".`);
          });
      });
  }

  // Assert text and href attributes
  assertTopMenuLinks(expectedItems) {
    cy.get('.header-menu .top-menu', { timeout: 15000 }) // Wait for the menu to be available
      .find('> li > a') // Select only top-level <a> elements inside <li>
      .each((menuItem, index) => {
        cy.wrap(menuItem)
          .should('be.visible') // Ensure the <a> is visible
          .then($el => {
            const actualText = this.normalizeText($el.text());
            const actualHref = $el.attr('href');

            // Print actual text and href for debugging
            cy.log(`Actual text for item at index ${index}: "${actualText}"`);
            cy.log(`Actual href for item at index ${index}: "${actualHref}"`);

            // Extract expected text and href from the expectedItems array
            const { text: expectedText, href: expectedHref } = expectedItems[index];

            // Assert text
            expect(actualText).to.equal(expectedText, `Menu item at index ${index} does not have the expected text "${expectedText}". Actual text: "${actualText}".`);

            // Assert href
            expect(actualHref).to.equal(expectedHref, `Menu item at index ${index} does not have the expected href "${expectedHref}". Actual href: "${actualHref}".`);
          });
      });
  }
  verifyTitleManufacturer(expectedTitle) {
    this.titleManufacturers
      .should('be.visible')
      .and('have.text', expectedTitle);
  }

  verifyManufacturerLink(expectedText, expectedHref) {
    this.manufacturerLink
      .should('be.visible')
      .and('have.text', expectedText)
      .and('have.attr', 'href', expectedHref);
  }

  verifyTitle(expectedTitle) {
    this.title
      .should('exist')  // Ensure the element exists
      .should('have.text', expectedTitle);
  }

  verifyTag(tagIndex, expectedText, expectedHref, expectedFontSizePercent) {
    const tag = this.tagsList.find('li').eq(tagIndex).find('a');
    tag
      .should('exist')
      .should('have.text', expectedText)
      .should('have.attr', 'href', expectedHref)
      .then(($el) => {
        const parentFontSizePx = parseFloat($el.parent().css('font-size'));
        const expectedFontSizePx = parentFontSizePx * (parseFloat(expectedFontSizePercent) / 100);

        // Log actual and expected values for debugging
        cy.log(`Expected font-size: ${expectedFontSizePx}px, Actual font-size: ${$el.css('font-size')}`);

        // Verify font size
        expect($el.css('font-size')).to.equal(`${expectedFontSizePx}px`);
      });
  }

  verifyViewAllLink(expectedText, expectedHref) {
    this.viewAllLink
      .should('exist')
      .should('have.text', expectedText)
      .should('have.attr', 'href', expectedHref);
  }

  verifySearchBoxIsVisible() {
    this.searchBox.should('be.visible');
  }

  verifyPlaceholderText(expectedPlaceholder) {
    this.searchBox.invoke('val').should('equal', expectedPlaceholder);
  }

  verifySearchButtonIsVisible() {
    this.searchButton.should('be.visible');
  }

  verifyNewsletterTitle(expectedTitle) {
    this.newsletterTitle.should('have.text', expectedTitle);
  }

  verifyEmailInputIsVisible() {
    this.newsletterEmailInput.should('be.visible');
  }

  verifySubscribeButtonIsVisible() {
    this.subscribeButton.should('be.visible');
  }

  verifySubscribeButtonFunctionality(email) {
    this.newsletterEmailInput.type(email); // Type an email into the input
    this.subscribeButton.click(); // Click the subscribe button
    this.subscribeProgress.should('be.visible'); // Verify loading indicator appears
    cy.wait(2000); // Wait for AJAX request to complete

    // Verify the result block is updated based on the response
    this.resultBlock.should('be.visible');
  }

  verifyPollTitle(expectedTitle) {
    this.pollTitle.should('have.text', expectedTitle);
  }

  verifyPollQuestion(expectedQuestion) {
    this.pollQuestion.should('have.text', expectedQuestion);
  }

  verifyPollOptions(expectedOptions) {
    this.pollOptions.each((index, option) => {
      cy.wrap(option).find('label').should('have.text', expectedOptions[index]);
    });
  }

  verifyVoteButtonIsVisible() {
    this.voteButton.should('be.visible');
  }

  verifyVoteButtonFunctionality(optionIndex) {
    this.pollOptions.eq(optionIndex).find('input').check(); // Select the radio button
    this.voteButton.click(); // Click the vote button
    this.voteProgress.should('be.visible'); // Verify loading indicator appears
    cy.wait(2000); // Wait for AJAX request to complete

    // Verify the error block is hidden (if it was shown)
    this.voteError.should('not.exist');
  }


  // Verifying FEATURED PRODUCTS Section appeared correctly
  verifyProductTitles(expectedTitles) {
    this.getAllProductTitles().should('deep.equal', expectedTitles);
  }

  // Method to verify h3 tag values
  verifyH3Values(expectedValues) {
    this.getAllH3Values().then((actualValues) => {
      // Log actual values for debugging
      cy.log('Actual H3 Values:', actualValues);

      // Ensure arrays are equal in length
      expect(actualValues).to.have.length(expectedValues.length);

      // Compare each value
      actualValues.forEach((value, index) => {
        expect(value.toLowerCase()).to.equal(expectedValues[index].toLowerCase());
      });
    });
  }
}

export default HomePage
