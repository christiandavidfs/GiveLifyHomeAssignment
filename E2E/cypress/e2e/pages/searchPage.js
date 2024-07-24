class SearchPage {
    // Define a getter for the search button
    get searchButton() {
      return cy.get('.js-search-form__button');
    }
  
    // Add more getters for other elements as needed
    get searchInput() {
      return cy.get('.js-search-form__input');
    }
  
    // Define actions for interacting with the page
    clickSearchButton() {
      this.searchButton.click({ force: true });
    }
  
    typeSearchQuery(query) {

      this.searchInput.click()
      .type(`${query}`, { delay: 100 })
      .type("{enter}", { delay: 100 });

    }
  
    // New method to click on an autocomplete result based on text
    clickAutocompleteResult(text) {
      cy.get('.autocomplete-result').contains(text).click({ force: true });
    }
  }
  
  export default new SearchPage();
  