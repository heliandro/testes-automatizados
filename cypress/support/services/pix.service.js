import { HttpUtils } from "../utils/http.utils";

export class PixService {

    constructor() {
    }

    enviarPix(payload, responseAlias) {
        return new Promise((resolve, reject) => {
            cy.request({
                method: 'POST',
                url: Cypress.env("resourcePayoSendPix"),
                headers: {
                    ...HttpUtils.getHeaderAuthorization(),
                    ContentType: 'application/json'
                },
                body: payload,
                failOnStatusCode: false
            }).as(responseAlias).then(response => {
                if (response.status !== 200) {
                   reject(response)
                }
                resolve(response)
            })
        })
    }

    consultarTrasacao(instructionIdentifier, responseAlias) {

        const filtro = `$filter=instructionIdentifier='${instructionIdentifier}'`
        const resource = {
            method: 'GET',
            url: `${Cypress.env("resourceCobaPixPaymentTransaction")}?${filtro}`,
            responseAlias
        }
        const optionalConfig = { delay: 5000, attemps: 7 }

        return HttpUtils.retriableRequest(
            resource,
            optionalConfig,
            (response, resolve, reject, retry) => {
                if (response.status !== 200)
                    return retry()

                if (response.status === 200 && response.body.content.length === 0)
                    return retry()

                resolve(response)
            }
        )
    }
}