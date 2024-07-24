import SearchPage from '../pages/searchPage';

describe('Visit page and perform search', () => {
  beforeEach(() => {
    // Access the base URL from the Cypress configuration file
    const baseUrl = Cypress.env('baseUrl') || Cypress.config('baseUrl');
    
    // Visit the base URL
    cy.visit(baseUrl);
  });
  
  it('Performs a search and clicks on an autocomplete result', { tags: ['smoke', 'regression'] }, () => {
    // Type the search query and hit Enter
    SearchPage.typeSearchQuery('Givelify');

    SearchPage.clickSearchButton();

    // Click on the autocomplete result containing the specific text
    SearchPage.clickAutocompleteResult('Givelify');

    // Add your assertions here
    cy.url().should('include', 'NzYwOTQ');
  });

  it('Search by exact organization name', () => {
    SearchPage.typeSearchQuery('Alfred Street Baptist Church');
    SearchPage.clickSearchButton();
    
    // Verify the search result contains the exact organization name
    cy.get('.autocomplete-result').should('contain.text', 'Alfred Street Baptist Church');
  });

  it('Search by partial organization name', () => {
    SearchPage.typeSearchQuery('Alfred Street');
    SearchPage.clickSearchButton();
    
    // Verify the search result contains the relevant organization
    cy.get('.autocomplete-result').should('contain.text', 'Alfred Street Baptist Church');
  });

  it('Verify that each result heading in incrementing containers contains the keyword', () => {
    // Define the search keyword
    const keyword = 'Baptist Church';

    // Type the search query and perform the search
    cy.get('.js-search-form__input')
    .type(keyword, { delay: 100 })
    .type("{enter}", { delay: 100 })
    //cy.get('.js-search-form__button').click({ force: true });
    //cy.wait(2000);
    cy.get('.js-search-form__input').click();
    //cy.get('.js-search-form__input').type(`{enter}`).click();
    //cy.get('button[type="submit"]').click();

    // Verify that results are visible (or wait if necessary)
    cy.get('.autocomplete-result').should('be.visible');

    // Define a function to check results in a specific container
    const checkResultsInContainer = (containerId) => {
      cy.get(`${containerId} .autocomplete-result__heading`).each(($el) => {
        cy.wrap($el).should('contain.text', keyword);
      });
    };

    // Loop through the container IDs
    for (let i = 1; i <= 3; i++) { // Adjust the number based on the maximum expected containers
      checkResultsInContainer(`#autoComplete_result_${i}`);
    }
  });

  it('Case sensitivity test', () => {
    SearchPage.typeSearchQuery('ALFRED STREET BAPTIST CHURCH');
    SearchPage.clickSearchButton();
    cy.get('.autocomplete-result').should('contain.text', 'Alfred Street Baptist Church');

    SearchPage.typeSearchQuery('alfred street baptist church');
    SearchPage.clickSearchButton();
    cy.get('.autocomplete-result').should('contain.text', 'Alfred Street Baptist Church');
  });

  it('Special characters test', () => {
    SearchPage.typeSearchQuery("St. Mary's Church");
    SearchPage.clickSearchButton();
    
    // Verify the search result contains the organization with special characters
    cy.get('.autocomplete-result').should('contain.text', "St. Mary's Church");
  });

  it('Non-existent organization search', () => {
    SearchPage.typeSearchQuery('NonExistentOrganization');
    SearchPage.clickSearchButton();
    
    // Verify the search result shows no results 
    cy.get('.autocomplete-result').should('not.exist');
  });

  it('Search with empty input', () => {
    SearchPage.clickSearchButton();
    
    // Verify no results are displayed
    cy.get('.autocomplete-result').should('not.exist');
  });

  // Handle uncaught exceptions to prevent Cypress from failing the test
  Cypress.on('uncaught:exception', (err, runnable) => {
    // Returning false here prevents Cypress from failing the test
    return false;
  });
});
