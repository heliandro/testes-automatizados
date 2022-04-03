import { HttpUtils } from "../../../utils/http.utils";
import { MapperUtils } from "../../../utils/mapper.utils";

export class PixService {

    constructor() {
    }

    enviarPix(payload) {
        return cy.request({
            method: 'POST',
            url: Cypress.env("resourcePayoSendPix"),
            headers: HttpUtils.getHeaderAuthorization(),
            body: MapperUtils.objectToJSON(payload),
            failOnStatusCode: false
        })
    }

    consultarTrasacao(instructionIdentifier) {
        const filtro = `$filter=instructionIdentifier='${instructionIdentifier}'`
        return cy.request({
            method: 'GET',
            url: `${Cypress.env("resourceCobaPixPaymentTransaction")}?${filtro}`,
            headers: HttpUtils.getHeaderAuthorization(),
            failOnStatusCode: false
        })
    }
}