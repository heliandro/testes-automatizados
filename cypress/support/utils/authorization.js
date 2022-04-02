const getHeaderAuthorization = () => {
    return {
        'Authorization': `Bearer ${Cypress.env('apiAccessToken')}`
    }
}

export {
    getHeaderAuthorization
}