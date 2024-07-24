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


  it('Checks if response status is 401 for missing API key', () => {
    const movieTitle = Cypress.env('movieTitle');
    const url = `${Cypress.config('apiBaseUrl')}?t=${encodeURIComponent(movieTitle)}`;

    cy.request({ url, failOnStatusCode: false }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body.Error).to.eq('No API key provided.');
    });
  });

  it('Checks if response status is 200 for non-existing movie title', () => {
    const movieTitle = 'asdas'; // Hardcoding the non-existing movie title for the test
    const apiKey = Cypress.env('apiKey'); // Use the bad API key
    const url = `${Cypress.config('apiBaseUrl')}?apikey=${apiKey}&t=${encodeURIComponent(movieTitle)}`;

    cy.request({ url, failOnStatusCode: false }).then((response) => {
      cy.log('Request URL:', url);  // Log the request URL for debugging
      cy.log('Response Body:', response.body);  // Log the response body for debugging

      expect(response.status).to.eq(200);
      expect(response.body.Response).to.eq('False');
      expect(response.body.Error).to.eq('Movie not found!');
    });
  });

  it('Checks if response status is 200 but returns an empty response for missing movie title', () => {
    const apiKey = Cypress.env('apiKey'); // Use the bad API key
    const url = `${Cypress.config('apiBaseUrl')}?apikey=${apiKey}`;

    cy.request({ url, failOnStatusCode: false }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.Response).to.eq('False');
      expect(response.body.Error).to.eq('Incorrect IMDb ID.');
    });
  });

  it('Checks if response status is 404 for invalid URL format', () => {
    const apiKey = Cypress.env('apiKey'); // Use the bad API key
    const invalidUrl = `${Cypress.config('apiBaseUrl')}/invalidEndpoint?apikey=${apiKey}&t=A%20Star%20Is%20Born`;

    cy.request({ url: invalidUrl, failOnStatusCode: false }).then((response) => {
      expect(response.status).to.eq(404);
    });

  });


});
