describe('OMDB API Response Validation', () => {
  before(() => {
    // Load the expected data from the fixture file
    cy.fixture('movieResponse.json').as('expectedResponse');
  });

  it('Validates the API response against the fixture data', function () {
    const apiKey = Cypress.env('apiKey');
    const movieTitle = Cypress.env('movieTitle');
    const url = `${Cypress.config('apiBaseUrl')}?apikey=${apiKey}&t=${encodeURIComponent(movieTitle)}&y=2018`;

    cy.request(url).then((response) => {
      // Validate the response status
      expect(response.status, 'Expected status to be 200').to.eq(200);

      if (response.status === 200) {
        const jsonData = response.body;
        const expectedData = this.expectedResponse;

        // Validate the entire response against the fixture data
        expect(jsonData).to.deep.equal(expectedData);
      } else {
        // Log an error message if the status is not 200
        cy.log(`Error: The condition is not met. Expected status 200, but received status ${response.status}`);
        throw new Error(`The condition is not met. Expected status 200, but received status ${response.status}`);
      }
    });
  });
});
