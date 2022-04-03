import { Given, Then } from "cypress-cucumber-preprocessor/steps";
import { PixService } from "./pix.service";
import { PixController } from "./pix.controller";
import { DateAdapter } from "../../../utils/date.adapter";
import { FileIOAdapter } from "../../../utils/file-io.adapter";

const fileIOAdapter = new FileIOAdapter('pix')
const dateAdapter = new DateAdapter()
const pixService = new PixService()
const pixController = new PixController(pixService, dateAdapter, fileIOAdapter)

before(() => {
    // cy.apiAuthorization()
})

Given('Eu consumo o endpoint de envio de pix utilizando o cenario {string}', (cenario) => {
    pixController.realizarEnvioDePix(cenario).then()
})

Then('Eu recebo a resposta do endpoint de envio de pix', (dataTable) => {
    pixController.validarResponseDoEnvioDePix(dataTable)
})

