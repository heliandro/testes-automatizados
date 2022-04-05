import {HttpStatus} from "../enums/http-status.enum";

export class AuthenticationService {

    constructor() {
    }

    apiAuthentication() {
        return new Promise((resolve, reject) => {
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
                if (status !== HttpStatus.OK.value)
                    reject({ status, body })
                resolve(response.body)
            })
        })
    }
}