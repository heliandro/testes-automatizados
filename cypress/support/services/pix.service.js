import { HttpUtils } from "../utils/http.utils";
import { MapperUtils } from "../utils/mapper.utils";

export class PixService {

    constructor() {
    }

    enviarPix(payload, responseAlias) {
        return new Promise((resolve, reject) => {
            cy.request({
                method: 'POST',
                url: Cypress.env("resourcePayoSendPix"),
                headers: HttpUtils.getHeaderAuthorization(),
                body: MapperUtils.objectToJSON(payload),
                failOnStatusCode: false
            }).as(responseAlias).then(response => {
                resolve(response)
            })
        })
    }

    consultarTrasacao(instructionIdentifier, responseAlias) {
        const filtro = `$filter=instructionIdentifier='${instructionIdentifier}'`
        return new Promise((resolve, reject) => {
            return cy.request({
                method: 'GET',
                url: `${Cypress.env("resourceCobaPixPaymentTransaction")}?${filtro}`,
                headers: HttpUtils.getHeaderAuthorization(),
                failOnStatusCode: false
            }).as(responseAlias).then(response => {
                resolve(response)
            })
        })
    }
}