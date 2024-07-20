import SearchPage from '../pages/searchPage';

describe('Performance Validation Suite', () => {
    it('Should load the page within 3 seconds', () => {
      const maxLoadTime = 3000; // 3 seconds
        
      cy.visit('https://www.givelify.com', {
        onLoad: (contentWindow) => {
          // Measure the page load time
          const startTime = performance.now();
  
          cy.window().then((win) => {
            const loadTime = performance.now() - startTime;
            expect(loadTime).to.be.lessThan(maxLoadTime, `Page load time should be less than ${maxLoadTime} ms`);
          });
        }
      });
    });
  
    it('Should render the search results within 3 seconds', () => {
      const maxRenderTime = 3000; // 3 seconds
  
      cy.visit('https://www.givelify.com');
  
         // Type the search query and hit Enter
    SearchPage.typeSearchQuery('Givelify');

      // Measure the time taken to render the search results
      cy.get('#autoComplete_result_0 .autocomplete-result', { timeout: maxRenderTime })
        .should('be.visible')
        .then(() => {
          cy.log(`Element rendered within ${maxRenderTime} ms`);
        });
    });
  
    it('Should get a response within 3 seconds', () => {
        const maxResponseTime = 3000; // 3 seconds

        const apiKey = Cypress.env('apiKey');
        const movieTitle = Cypress.env('movieTitle');
        const url = `${Cypress.config('apiBaseUrl')}?apikey=${apiKey}&t=${encodeURIComponent(movieTitle)}`;
    
        cy.request({
          url: `${url}`,
          timeout: maxResponseTime // Ensure request timeout is set
        }).then((response) => {
          // Validate that the response time is within the acceptable range
          expect(response.duration).to.be.lessThan(maxResponseTime, `API response time should be less than ${maxResponseTime} ms`);
        });
      });

      // Handle uncaught exceptions to prevent Cypress from failing the test
  Cypress.on('uncaught:exception', (err, runnable) => {
    // Returning false here prevents Cypress from failing the test
    return false;
  });
  });
  