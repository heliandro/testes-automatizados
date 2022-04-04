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

// import { HttpStatus } from "./enums/http-status.enum";
// import { DateAdapter } from "./utils/date.adapter";

const { DateAdapter } = require('./utils/date.adapter')
const { HttpStatus } = require("./enums/http-status.enum");

const dateAdapter = new DateAdapter()

Cypress.Commands.add('clearEnvironmentVariables', () => {
    Cypress.env('apiAccessToken', '')
    Cypress.env('apiAccessTokenDate', '')
})

Cypress.Commands.add('apiAuthorization', () => {
    const apiAccessTokenDate = Cypress.env('apiAccessTokenDate')
    if (apiAccessTokenDate && dateAdapter.diffCurrentDateFor(dateAdapter.toDate(apiAccessTokenDate), 'minute') < 30)
        return

    console.log('apiAuthorization::init::request')

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
        if (status !== HttpStatus.OK.value) cy.clearEnvironmentVariables()
        Cypress.env('apiAccessToken', body.access_token)
        Cypress.env('apiAccessTokenDate', dateAdapter.getToday().toISOString())
    })
})