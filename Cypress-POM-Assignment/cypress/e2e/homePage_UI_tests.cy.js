import HomePage from '../pageObjects/UI/homePageUI'

describe('Home Page Tests', () => {
  const homePage = new HomePage()

  beforeEach(() => {
    homePage.navigate()

  })

  // Check if logo is displayed 
  it('should display the logo', () => {
    homePage.verifyLogo()
  })

  //check for its appearance and src as expected
  it('should display the logo with correct appearance and image dimensions', () => {
    homePage.assertLogoVisible();
    homePage.assertLogoSrcContains('logo.png');

    // Additional check for image dimensions
    homePage.logoImage.should('exist')
      .then($img => {
        const naturalWidth = $img[0].naturalWidth;
        const naturalHeight = $img[0].naturalHeight;

        if (naturalWidth <= 0) {
          throw new Error('Logo image width is 0 or less');
        }

        if (naturalHeight <= 0) {
          throw new Error('Logo image height is 0 or less');
        }

        expect(naturalWidth).to.be.greaterThan(0);
        expect(naturalHeight).to.be.greaterThan(0);
      });
  })

  // Checking text and href for header links
  it('should verify the text and href of the header links', () => {
    const expectedItems = [
      { text: 'Register', href: '/register' },
      { text: 'Log in', href: '/login' },
      { text: 'Shopping cart', href: '/cart' },
      { text: 'Wishlist', href: '/wishlist' }
    ];

    homePage.assertHeaderLinks(expectedItems);
  });

  it('should verify the text and href of the main menu items', () => {
    const expectedItems = [
      { text: 'Books', href: '/books' },
      { text: 'Computers', href: '/computers' },
      { text: 'Electronics', href: '/electronics' },
      { text: 'Apparel & Shoes', href: '/apparel-shoes' },
      { text: 'Digital downloads', href: '/digital-downloads' },
      { text: 'Jewelry', href: '/jewelry' },
      { text: 'Gift Cards', href: '/gift-cards' }
    ];

    homePage.assertTopMenuLinks(expectedItems);
  });


  it('should verify the title and manufacturer link text and URL', () => {
    // Define expected values
    const expectedTitleText = 'Manufacturers';
    const expectedManufacturerText = 'Tricentis';
    const expectedManufacturerHref = '/tricentis';

    // Ensure the Manufacturer Navigation block is visible
    homePage.block.should('be.visible');

    // Verify the title
    homePage.verifyTitleManufacturer(expectedTitleText);

    // Verify the manufacturer link
    homePage.verifyManufacturerLink(expectedManufacturerText, expectedManufacturerHref);
  });

  //should verify the title and Popular tags list
  it('should verify the title and Popular tags list', () => {
    // Define expected values
    const expectedTitleText = 'Popular tags';
    const tags = [
      { text: 'apparel', href: '/producttag/4/apparel', fontSize: '100%' },
      { text: 'awesome', href: '/producttag/8/awesome', fontSize: '150%' },
      { text: 'book', href: '/producttag/10/book', fontSize: '90%' },
      { text: 'camera', href: '/producttag/13/camera', fontSize: '85%' },
      { text: 'cell', href: '/producttag/12/cell', fontSize: '85%' },
      { text: 'compact', href: '/producttag/9/compact', fontSize: '85%' },
      { text: 'computer', href: '/producttag/6/computer', fontSize: '100%' },
      { text: 'cool', href: '/producttag/3/cool', fontSize: '120%' },
      { text: 'digital', href: '/producttag/16/digital', fontSize: '85%' },
      { text: 'gift', href: '/producttag/2/gift', fontSize: '85%' },
      { text: 'jewelry', href: '/producttag/11/jewelry', fontSize: '90%' },
      { text: 'nice', href: '/producttag/1/nice', fontSize: '90%' },
      { text: 'shirt', href: '/producttag/5/shirt', fontSize: '85%' },
      { text: 'shoes', href: '/producttag/7/shoes', fontSize: '85%' },
      { text: 'TCP', href: '/producttag/19/tcp', fontSize: '90%' },
    ];
    const expectedViewAllText = 'View all';
    const expectedViewAllHref = '/producttag/all';

    // Ensure the Popular Tags block is visible
    homePage.blockPopularTags
      .should('be.visible')
      .then(() => {
        // Verify the title
        homePage.verifyTitle(expectedTitleText);

        // Verify each tag
        tags.forEach((tag, index) => {
          homePage.verifyTag(index, tag.text, tag.href, tag.fontSize);
        });

        // Verify the View All link
        homePage.verifyViewAllLink(expectedViewAllText, expectedViewAllHref);
      });
  });

  //Verifying search box appears and having placeholder and search button visable

  it('should verify the search box is visible', () => {
    homePage.verifySearchBoxIsVisible();
  });

  it('should verify the initial value of the search box', () => {
    homePage.verifyPlaceholderText('Search store');
  });

  it('should verify the search button is visible', () => {
    homePage.verifySearchButtonIsVisible();
  });


  // Verify the newsletter section
  it('should verify the newsletter title', () => {
    homePage.verifyNewsletterTitle('Newsletter');
  });

  it('should verify the email input box is visible', () => {
    homePage.verifyEmailInputIsVisible();
  });

  it('should verify the subscribe button is visible', () => {
    homePage.verifySubscribeButtonIsVisible();
  });

  it('should verify the subscribe button functionality', () => {
    const testEmail = 'test@gmail.com';
    homePage.verifySubscribeButtonFunctionality(testEmail);
  });

  //Verify poll sub section

  it('should verify the poll title', () => {
    homePage.verifyPollTitle('Community poll');
  });

  it('should verify the poll question', () => {
    homePage.verifyPollQuestion('Do you like nopCommerce?');
  });

  it('should verify the vote button is visible', () => {
    homePage.verifyVoteButtonIsVisible();
  });

  // verify the names of the featured products appeared
  it('should verify the names of the featured products', () => {
    // Define the expected product titles
    const expectedTitles = [
      '$25 Virtual Gift Card',
      '14.1-inch Laptop',
      'Build your own cheap computer',
      'Build your own computer',
      'Build your own expensive computer',
      'Simple Computer'
    ];

    // Call the method to verify the product titles
    homePage.verifyProductTitles(expectedTitles);
  });

  // Verify footer section h3 title's
  it('should verify the values of the h3 tags in the footer section', () => {
    // Define the expected h3 tag values
    const expectedH3Values = [
      'Information',
      'Customer service',
      'My account',
      'Follow us'
    ];

    // Call the method to verify the h3 tag values
    homePage.verifyH3Values(expectedH3Values);
  });
});
