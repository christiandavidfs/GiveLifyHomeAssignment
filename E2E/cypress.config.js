const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require('@cypress/grep/src/plugin')(config);
      return config;
    },
    baseUrl: 'http://www.givelify.com',
    apiBaseUrl: 'http://www.omdbapi.com/',
    defaultCommandTimeout: 3000,
    requestTimeout: 3000,
    env: {
      apiKey: 'fbb9a6d2',
      badApiKey: 'fbb9asdfd',
      movieTitle: 'A star is born'
    },
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: true,
      json: true
    }
  }
});
