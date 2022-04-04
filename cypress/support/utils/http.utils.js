import { HttpStatus } from "../enums/http-status.enum";

const getHeaderAuthorization = () => {
    return {
        'Authorization': `Bearer ${Cypress.env('apiAccessToken')}`
    }
}

export const getHttpStatus = (statusValue) => {
    const key = Object.keys(HttpStatus).find(key => HttpStatus[key].value === statusValue)
    return HttpStatus[key]
}

export const HttpUtils = {
    getHeaderAuthorization,
    getHttpStatus
}