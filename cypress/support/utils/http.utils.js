import { HttpStatus } from "../enums/http-status.enum";
import { ValidateUtils } from "./validate.utils";

/**
 * RetriableRequestResource Interface
 * @typedef {Object} RetriableRequestResource - informações para eftuar a request
 * @property {string} method - metodo da request: GET, POST, PUT, DELETE..
 * @property {string} url - url do recurso a ser utilizado. https://........
 *                          utiliza query params? já passe concatenado na url
 * @property {Object} [body] - Optional - corpo da request
 * @property {string} [responseAlias] - Opcional - alias para uso restrito do cypress. Ex: cy.get(responseAlias)
 */

/**
 * RetriableRequestOptions Interface
 * @typedef {Object} RetriableRequestOptions - configuracao da retriable request
 * @property {number} delay - quantidade em milissegundos do intervalo entra cada retentativa
 * @property {number} attemps - quantidade de retentativas
 * @property {number} [multiplier] - Optional - multiplicador do intervalo re retentativas. [Não implementado].
 */

/**
 * RetriableRequestCallback Interface
 * @callback RetriableRequestCallback
 * @param {{ status: number, body: Object }} response - resposta da request
 * @param {Promise.resolve} resolve - resolução da promessa com sucesso. Similar ao Promise.resolve()
 * @param {Promise.reject} reject - resolução da promessa com falha. Similar ao Promise.reject()
 * @param {Function} retry - força uma retentativa. Uso dentro do callback: return retry()
 */


const getHeaderAuthorization = () => {
    return {
        'Authorization': `Bearer ${Cypress.env('apiAccessToken')}`
    }
}

export const getHttpStatus = (statusValue) => {
    const key = Object.keys(HttpStatus).find(key => HttpStatus[key].value === statusValue)
    return HttpStatus[key]
}

const _retryableConfig = {
    delay: 2000,
    attemps: 4,
    multiplier: 1
}

const _executionRetriableRequest = (request, promise, callback) => {
    let counter = 0
    let isCallbackForcedToFinish = false
    let finalizeCallbackWithPromiseType = null

    const callbackEndsWithResolve = (data) => { isCallbackForcedToFinish = true; finalizeCallbackWithPromiseType = promise.resolve(data) }
    const callbackEndsWithReject = (data) => { isCallbackForcedToFinish = true; finalizeCallbackWithPromiseType = promise.reject(data) }

    const makeRequest = () => {

        if (isCallbackForcedToFinish) return finalizeCallbackWithPromiseType
        if (counter >= request.options.attemps) return promise.reject('ops! excedido o limite de retentativas')
        if (counter > 0) cy.wait(request.options.delay)

        cy.request({
            method: request.resource.method,
            url: request.resource.url,
            headers: HttpUtils.getHeaderAuthorization(),
            failOnStatusCode: false
        }).as(request.resource.responseAlias).then(response => {
            console.log('tentativa numero = ', counter)
            counter += 1
            callback(response, callbackEndsWithResolve, callbackEndsWithReject, makeRequest)
        })
    }

    makeRequest()
}



/**
 *
 * @param {RetriableRequestResource} resource
 * @param {RetriableRequestOptions} options
 * @param {RetriableRequestCallback} callback
 * @returns {Promise<{status: number, body: Object }>}
 */
function retriableRequest(resource, options, callback) {
    return new Promise((resolve, reject) => {
        const request = {
            resource,
            options: ValidateUtils.objectHasKeys(options, ['attemps', 'delay']) ? options : _retryableConfig,
        }
        const promise = { resolve, reject }
        _executionRetriableRequest.apply(null, [request, promise, callback])
    })
}

export const HttpUtils = {
    getHeaderAuthorization,
    getHttpStatus,
    retriableRequest
}
