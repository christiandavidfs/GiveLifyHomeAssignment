describe('OMDB API Positive Tests', () => {
  before(() => {
    // Load the fixture data
    cy.fixture('movieResponse.json').as('expectedResponse');
  });

  it('Checks if response status is 200 and validates response data', function () {
    const apiKey = Cypress.env('apiKey');
    const movieTitle = Cypress.env('movieTitle');
    const url = `${Cypress.config('apiBaseUrl')}?apikey=${apiKey}&t=${encodeURIComponent(movieTitle)}&y=2018`;

    cy.request(url).then((response) => {
      expect(response.status, 'Expected response status to be 200').to.eq(200);
      if (response.status === 200) {
        const jsonData = response.body;
        const expectedData = this.expectedResponse;

        expect(jsonData.Title, 'Expected movie title to be "A Star Is Born"').to.eq(expectedData.Title);
        expect(jsonData.Year, 'Expected release year to be "2018"').to.eq(expectedData.Year);
        expect(jsonData.Ratings, 'Expected ratings to be a non-empty array').to.be.an('array').that.is.not.empty;

        const rating = jsonData.Ratings[0];
        expect(rating, 'Expected first rating to have property "Source"').to.have.property('Source');
        expect(rating.Source, 'Expected first rating source to be "Internet Movie Database"').to.eq('Internet Movie Database');
        expect(rating, 'Expected first rating to have property "Value"').to.have.property('Value');
        expect(rating.Value, 'Expected first rating value to be "7.6/10"').to.eq('7.6/10');

        expect(jsonData.Runtime, 'Expected runtime to be "136 min"').to.eq('136 min');
        expect(jsonData.BoxOffice, 'Expected box office value to be "$215,333,122"').to.eq(expectedData.BoxOffice);
      }
    });
  });

  it('Checks response for full plot', function () {
    const apiKey = Cypress.env('apiKey');
    const movieTitle = Cypress.env('movieTitle');
    const url = `${Cypress.config('apiBaseUrl')}?apikey=${apiKey}&t=${encodeURIComponent(movieTitle)}&plot=full`;

    cy.request(url).then((response) => {
      expect(response.status, 'Expected response status to be 200').to.eq(200);
      expect(response.body.Plot, 'Expected plot to be more detailed').to.include('Seasoned musician Jackson Maine (Bradley Cooper) discovers-and falls in love with-struggling artist Ally (Gaga).');
    });
  });

  it('Checks response in XML format', function () {
    const apiKey = Cypress.env('apiKey');
    const movieTitle = Cypress.env('movieTitle');
    const url = `${Cypress.config('apiBaseUrl')}?apikey=${apiKey}&t=${encodeURIComponent(movieTitle)}&r=xml`;

    cy.request(url).then((response) => {
      expect(response.status, 'Expected response status to be 200').to.eq(200);
      expect(response.headers['content-type']).to.include('text/xml');
    });
  });

  it('Checks search results with multiple results', function () {
    const apiKey = Cypress.env('apiKey');
    const searchTitle = 'Star';
    const url = `${Cypress.config('apiBaseUrl')}?apikey=${apiKey}&s=${encodeURIComponent(searchTitle)}`;

    cy.request(url).then((response) => {
      expect(response.status, 'Expected response status to be 200').to.eq(200);
      expect(response.body.Search).to.be.an('array').that.is.not.empty;
    });
  });

  it('Checks paginated search results', function () {
    const apiKey = Cypress.env('apiKey');
    const searchTitle = 'Star';
    const url = `${Cypress.config('apiBaseUrl')}?apikey=${apiKey}&s=${encodeURIComponent(searchTitle)}&page=2`;

    cy.request(url).then((response) => {
      expect(response.status, 'Expected response status to be 200').to.eq(200);
      expect(response.body.Search).to.be.an('array').that.is.not.empty;
    });
  });
});
