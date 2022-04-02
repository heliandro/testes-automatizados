import { Given, Then, And } from "cypress-cucumber-preprocessor/steps";
import { PixService } from "./pix.service";
import { PixController } from "./pix.controller";
import { dataTableToArray } from "../../../utils/datatable-array-mapper";

const pixService = new PixService()
const pixController = new PixController(pixService)

before(() => {
    cy.apiAuthorization()
})

Given('que realizo um envio de pix para uma agencia e conta', (dataTable) => {
    console.log(dataTableToArray(dataTable)[0])
})

Then('valido o status do envio {string}', (statusEnvioPix) => {
    pixController.validarStatusDaTrasacaoDePix(statusEnvioPix)
})

