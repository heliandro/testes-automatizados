const dataTableToArray = (dataTable) => {
    return dataTable.hashes().map(elemento => elemento)
}

const objectToJSON = (payload) => {
    if (typeof payload === "string") return payload
    return JSON.stringify(payload)
}

export const MapperUtils = {
    dataTableToArray,
    objectToJSON
}