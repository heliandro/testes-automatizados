const { DateAdapter } = require('./utils/date.adapter')
const { AuthenticationService } = require("./services/authentication.service");

const dateAdapter = new DateAdapter()
const authenticationService = new AuthenticationService()

const environmentVars = [
    'apiAccessToken',
    'apiAccessTokenDate',
    'apiAccessTokenExpirationTimeInMinutes'
]

const isAccessTokenExpired = (dateString, expirationTime) => {
    if (dateString && expirationTime && dateAdapter.toDate(dateString).isValid() && typeof expirationTime === 'number')
        return dateAdapter.diffCurrentDateFor(dateAdapter.toDate(dateString).value, 'minute') >= expirationTime
    return true
}

const getEnvironmentVariables = () => {
    return environmentVars.reduce((objeto, nome) => ({ ...objeto, [nome]: Cypress.env(nome) }), {})
}

const clearEnvironmentVariables = () => {
    environmentVars.forEach(name => { Cypress.env(name, '') })
}

Cypress.Commands.add('apiAuthentication', () => {
    const { apiAccessTokenDate, apiAccessTokenExpirationTimeInMinutes } = getEnvironmentVariables()

    if (!isAccessTokenExpired(apiAccessTokenDate, apiAccessTokenExpirationTimeInMinutes)) return

    authenticationService.apiAuthentication()
        .then(({ access_token, expires_in }) => {
            Cypress.env('apiAccessToken', access_token)
            Cypress.env('apiAccessTokenDate', dateAdapter.getToday().toISOString())
            Cypress.env('apiAccessTokenExpirationTimeInMinutes', dateAdapter.secondsToMinutes(expires_in))
        })
        .catch(error => {
            console.error('ops! ocorreu um erro', error)
            clearEnvironmentVariables()
        })
})