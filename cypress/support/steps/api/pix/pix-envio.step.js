import { Given, Then } from "cypress-cucumber-preprocessor/steps";
import { PixService } from "./pix.service";
import { PixController } from "./pix.controller";

const pixService = new PixService()
const pixController = new PixController(pixService)

before(() => {
    cy.apiAuthorization()
})

Given('que realizo um envio de pix para uma agencia e conta', (dataTable) => {
    pixController.realizarEnvioDePix(dataTable)
})

Then('valido o status do envio {string}', (statusEnvioPix) => {
    pixController.validarStatusDaTrasacaoDePix(statusEnvioPix)
})

