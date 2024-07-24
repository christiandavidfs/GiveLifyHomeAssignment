describe('OMDB API Tests', () => {
  before(() => {
    // Load the fixture data
    cy.fixture('movieResponse.json').as('expectedResponse');
  });

  it('Checks if response status is 200 and validates response data', function () {
    const apiKey = Cypress.env('apiKey');
    const movieTitle = Cypress.env('movieTitle');
    const url = `${Cypress.config('apiBaseUrl')}?apikey=${apiKey}&t=${encodeURIComponent(movieTitle)}&y=2018`;

    cy.request(url).then((response) => {
      // Validate the response status
      expect(response.status, 'Expected response status to be 200').to.eq(200);

      if (response.status === 200) {
        const jsonData = response.body;
        const expectedData = this.expectedResponse; // Use the loaded fixture data

        // Validate movie title
        expect(jsonData.Title, 'Expected movie title to be "A Star Is Born"').to.eq(expectedData.Title);
        expect(jsonData.Year, 'Expected release year to be "2018"').to.eq(expectedData.Year);

        // Validate ratings
        expect(jsonData.Ratings, 'Expected ratings to be a non-empty array').to.be.an('array').that.is.not.empty;

        const rating = jsonData.Ratings[0];
        expect(rating, 'Expected first rating to have property "Source"').to.have.property('Source');
        expect(rating.Source, 'Expected first rating source to be "Internet Movie Database"').to.eq('Internet Movie Database');
        expect(rating, 'Expected first rating to have property "Value"').to.have.property('Value');
        expect(rating.Value, 'Expected first rating value to be "7.6/10"').to.eq('7.6/10');

        
        // We can override values for specific assertions
        expect(jsonData.Runtime, 'Expected runtime to be "136 min"').to.eq('136 min');
        expect(jsonData.BoxOffice, 'Expected box office value to be "$215,333,122"').to.eq(expectedData.BoxOffice);
      } else {
        // Log an error message if the status is not 200
        cy.log(`Error: The condition is not met. Expected status 200, but received status ${response.status}`);
        throw new Error(`The condition is not met. Expected status 200, but received status ${response.status}`);
      }
    });
  });
});
