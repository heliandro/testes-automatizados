import { getHeaderAuthorization } from "../../../utils/authorization";

export class PixService {

    constructor() {
    }

    enviarPix(payload) {
        return cy.request({
            method: 'POST',
            url: Cypress.env("resourcePayoSendPix"),
            headers: getHeaderAuthorization(),
            body: payload,
            failOnStatusCode: false
        })
    }

    consultarTrasacao(instructionIdentifier) {
        const filtro = `$filter=instructionIdentifier='${instructionIdentifier}'`
        return cy.request({
            method: 'GET',
            url: `${Cypress.env("resourceCobaPixPaymentTransaction")}?${filtro}`,
            headers: getHeaderAuthorization(),
            failOnStatusCode: false
        })
    }
}