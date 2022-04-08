import { Given, Then, And } from "cypress-cucumber-preprocessor/steps";
import { PixService } from "../../../services/pix.service";
import { PixController } from "./pix.controller";
import { FileIOAdapter } from "../../../utils/file-io.adapter";

const fileIOAdapter = new FileIOAdapter('api/pix')
const pixService = new PixService()
const pixController = new PixController(pixService, fileIOAdapter)

before(() => {
    cy.apiAuthentication()
})

Given('Eu consumo o endpoint de envio de pix utilizando o cenario {string}', (cenario) => {
    pixController.realizarEnvioDePix(cenario).then()
})

Then('Eu valido a resposta do endpoint de envio de pix', (dataTable) => {
    pixController.validarResponseDoEnvioDePix(dataTable)
})

And('Eu consulto a transacao de envio de pix no banco de dados', () => {
    pixController.consultarTransacaoDePix().then()
})

Then('Eu valido a transacao de envio de pix com o status da operacao {string}', (statusOperacao) => {
    pixController.validarTransacaoDePixStatusOperacao(statusOperacao)
})