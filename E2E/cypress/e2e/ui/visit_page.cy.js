import SearchPage from '../pages/searchPage';

describe('Visit page and perform search', () => {
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
  });

  // Handle uncaught exceptions to prevent Cypress from failing the test
  Cypress.on('uncaught:exception', (err, runnable) => {
    // Returning false here prevents Cypress from failing the test
    return false;
  });
});
