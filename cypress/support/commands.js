// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// Global uncaught exception handler
Cypress.on('uncaught:exception', (err, runnable) => {
    // Log the error to see if the issue is from the app
    console.log('Caught uncaught exception:', err);
    if (err.message && err.message.includes('HTTP error')) {
      return false;
    }
    // Allow Cypress to fail the test if it's not an expected error
    return true;
  });