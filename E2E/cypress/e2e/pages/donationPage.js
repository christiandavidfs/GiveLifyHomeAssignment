class DonationPage {
    // Define a getter for the search button
    get doneeInfo() {
      return cy.get('.donee-info');
    }

    get chooseAmount() {
      return cy.get('.wizard-content');
    }
   
    getValueButton(index) {
      return cy.get(`.sc-jMCldn > :nth-child(${index})`);
    }

    get giftText() {
      return cy.get('.amount-text');
    }
  
    get giftValue() {
      return cy.get('h1');
      
    }

    clickButtonWithText(text) {
      cy.contains(text).click();
    }
  
  }
  
  export default new DonationPage();
  