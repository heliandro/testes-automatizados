const dataTableToArray = (dataTable) => {
    return dataTable.hashes().map(elemento => {
       // const objKeyValue = elemento.reduce((acc, propAtual) => ({ ...acc, [propAtual]: elemento[propAtual] }), {})
        return {
            ...elemento
        }
    })
}

export {
    dataTableToArray
}