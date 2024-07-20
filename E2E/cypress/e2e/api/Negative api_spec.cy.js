describe('OMDB API Tests', () => {
  it('Check if response status is 401 and validate error message when API key is invalid', () => {
    const badApiKey = Cypress.env('badApiKey'); // Use the bad API key
    const movieTitle = Cypress.env('movieTitle');
    const url = `${Cypress.config('apiBaseUrl')}?apikey=${badApiKey}&t=${encodeURIComponent(movieTitle)}`;

    cy.request({
      url: url,
      failOnStatusCode: false // Prevent Cypress from failing the test on a non-2xx status code
    }).then((response) => {
      // Validate status code with a descriptive message
      expect(response.status, 'Expected status code to be 401').to.eq(401);

      // Validate response body
      const jsonData = response.body;

      // Validate the 'Response' field
      expect(jsonData.Response, 'Expected "Response" to be "False"').to.eq('False');
      
      // Validate the 'Error' field
      expect(jsonData.Error, 'Expected "Error" to be "Invalid API key!"').to.eq('Invalid API key!');
    });
  });
});
