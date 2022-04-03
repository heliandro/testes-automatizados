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

import { HttpStatus } from "./enums/http-status.enum";

Cypress.Commands.add('apiAuthorization', () => {
    cy.request({
        method: 'POST',
        url: `${Cypress.env('urlSingleSignOn')}`,
        body: {
            client_id: Cypress.env('client_id'),
            client_secret: Cypress.env('client_secret'),
            grant_type: Cypress.env('grant_type')
        },
        failOnStatusCode: false,
        form: true
    }).then(response => {
        const { status, body } = response
        if (status === HttpStatus.OK.value && body.access_token)
            Cypress.env('apiAccessToken', body.access_token)
    })
})