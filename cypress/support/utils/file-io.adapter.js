import { FileType, FileBasePath } from "../enums/file.enum";

/**
 * ReadOptions Interface
 * @typedef {Object} ReadOptions - configuracoes para leitura de arquivos. Ex: qual o diretorio base
 * @property {string} basePath - path base do arquivo. Ex: fixtures/
 */

/**
 * WriteOptions Interface
 * @typedef {Object} WriteOptions - configuracoes para escrita de arquivos. Ex: qual o diretorio base
 * @property {string} basePath - path base do arquivo. Ex: downloads/ ou requests/
 */

export class FileIOAdapter {

    readOptions = { basePath: FileBasePath.FIXTURES }
    writeOptions = { basePath: FileBasePath.REQUESTS }

    /**
     *
     * @param {string} resource - nome do recurso
     * @param {{readOptions: ReadOptions, writeOptions: WriteOptions}} config
     */
    constructor(resource) {
        this.resource = resource
    }

    /**
     *
     * @param {string} fileName - nome do arquivo com a extensão
     * @param {function} fnOperation - função para executar uma transformação caso necessário
     * @returns {Promise<Object>}
     */
    #readFile = (fileName, options, fnOperation) => {
        const basePath = options?.basePath ?? this.readOptions.basePath
        return new Promise((resolve, reject) => {
            cy.readFile(`${basePath}/${this.resource}/${fileName}`)
                .then((data) => fnOperation.call(this, data, resolve, reject))
        })
    }

    /**
     *
     * @param {string} fileName - nome do arquivo
     * @param {string} cenario - nome do cenario/propriedade que está contido dentro do arquivo de fixture
     * @returns {Promise<Object>}
     */
    getDataCenarioFromFixtureFile = (fileName, cenario) => {
        return this.#readFile(fileName, { basePath: FileBasePath.FIXTURES }, (data, resolve, reject) => {
            if (data[cenario]) resolve(data[cenario])
            reject('Arquivo ou Cenario não encontrado!')
        })
    }

    /**
     * @param {string} fileName - nome do arquivo
     * @param {ReadOptions} readOptions
     * @returns {Promise<Object>}
     */
    getDataFromFile = (fileName, readOptions= this.readOptions) => {
        return this.#readFile(fileName, { ...readOptions },(data, resolve, reject) => {
            if (data) resolve(data)
            reject('Arquivo não encontrado!')
        })
    }

    /**
     *
     * @param {string} fileName - todos os params são necessários
     * @param {Object} data - dados a serem gravados no arquivo
     * @param {function} fnOperation - função para executar uma ação
     * @returns {Promise<>}
     */
    #writeFile = (fileName, options, data, fnOperation) => {
        const basePath = options?.basePath ?? this.writeOptions.basePath
        return new Promise((resolve, reject) => {
            cy.writeFile(`${basePath}/${this.resource}/${fileName}`, data)
                .then(() => fnOperation.call(this, resolve, reject))
        })
    }

    /**
     *
     * @param {string} fileName - nome do arquivo
     * @param {Object} data - dados a serem gravados no arquivo
     * @param {WriteOptions} writeOptions
     * @returns {Promise<boolean>}
     */
    saveDataAsFile = (fileName, data, writeOptions = this.writeOptions) => {
        return this.#writeFile(fileName, { ...writeOptions }, data, (resolve, reject) => {
            resolve(true)
        })
    }
}