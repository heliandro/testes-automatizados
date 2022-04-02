const getHeaderAuthorization = () => {
    return {
        'Authorization': `Bearer ${Cypress.env('apiAccessToken')}`
    }
}

export const HttpUtils = {
    getHeaderAuthorization
}