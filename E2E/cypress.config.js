// cypress.config.js
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://www.givelify.com',
    apiBaseUrl: 'http://www.omdbapi.com/',
    defaultCommandTimeout: 3000, // Tiempo máximo de espera para todos los comandos en milisegundos
    requestTimeout: 3000, // Tiempo máximo de espera para las solicitudes HTTP
    env: {
      apiKey: 'fbb9a6d2',
      badApiKey: 'fbb9asdfd',
      movieTitle: 'A star is born'
    }
  }
});


