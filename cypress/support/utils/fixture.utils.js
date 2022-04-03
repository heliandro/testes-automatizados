const getDataCenarioFromFixtureFile = (fileName, resource, cenario) => {
    return new Promise((resolve, reject) => {
        cy.readFile(`cypress/fixtures/${resource}/${fileName}.json`)
            .then(data => {
                if (data[cenario]) resolve(data[cenario])
                reject('Cenario não encontrado!')
            })
    })
}

export const FixtureUtils = {
    getDataCenarioFromFixtureFile
}