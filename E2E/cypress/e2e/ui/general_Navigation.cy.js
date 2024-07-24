import SearchPage from '../pages/searchPage';
import DonationPage from '../pages/donationPage';

describe('Do search and advance until step 3 of the donation', () => {
  beforeEach(() => {
    // Access the base URL from the Cypress configuration file
    const baseUrl = Cypress.env('baseUrl') || Cypress.config('baseUrl');
    
    // Visit the base URL
    cy.visit(baseUrl);
  });

  it('Performs a search and clicks on an autocomplete result', () => {
    // Type the search query and hit Enter
    SearchPage.typeSearchQuery('Givelify');

    SearchPage.clickSearchButton();

    // Click on the autocomplete result containing the specific text
    SearchPage.clickAutocompleteResult('Givelify');

    // Add your assertions here
    cy.url().should('include', 'NzYwOTQ');

    DonationPage.doneeInfo.should('be.visible');
    DonationPage.doneeInfo.should('contain', 'Givelify Give.com Foundation');

    DonationPage.chooseAmount.should('be.visible');
    DonationPage.chooseAmount.should('contain', 'Choose a gift amount');

    DonationPage.getValueButton(1).should('contain.text', '$10');
    DonationPage.getValueButton(2).should('contain.text', '$25');
    DonationPage.getValueButton(3).should('contain.text', '$50');
    DonationPage.getValueButton(4).should('contain.text', '$100');
    DonationPage.getValueButton(5).should('contain.text', '$250');
    DonationPage.getValueButton(6).should('contain.text', '$500');
    DonationPage.getValueButton(7).should('contain.text', '$1000');
    DonationPage.getValueButton(8).should('contain.text', '$2500');
    DonationPage.getValueButton(9).should('contain.text', 'Other');

    DonationPage.getValueButton(1).click();
    DonationPage.giftText.should('contain','This gift is for');
    DonationPage.giftValue.should('contain.text', '10.00');
    DonationPage.clickButtonWithText('Where Needed Most');
    DonationPage.giftText.should('contain','Gift Summary');
    DonationPage.giftValue.should('contain.text', '10.00');

  });

  // Handle uncaught exceptions to prevent Cypress from failing the test
  Cypress.on('uncaught:exception', (err, runnable) => {
    // Returning false here prevents Cypress from failing the test
    return false;
  });
});
