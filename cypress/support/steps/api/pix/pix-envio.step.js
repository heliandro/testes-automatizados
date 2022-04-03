import { Given, Then } from "cypress-cucumber-preprocessor/steps";
import { PixService } from "./pix.service";
import { PixController } from "./pix.controller";
import { DateAdapter } from "../../../utils/date.adapter";

const dateAdapter = new DateAdapter()
const pixService = new PixService()
const pixController = new PixController(pixService, dateAdapter)

before(() => {
    cy.apiAuthorization()
})

Given('que realizo um envio de pix {string} para uma agencia e conta', (cenario) => {
    pixController.realizarEnvioDePix(cenario)
})

Then('a api retorna o status e mensagem esperada', (dataTable) => {
    pixController.validarResponseDoEnvioDePix(dataTable)
})

