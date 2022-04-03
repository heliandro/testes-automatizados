import { HttpStatus } from "../../../enums/http-status.enum";
import { MapperUtils } from "../../../utils/mapper.utils";
import { FileType } from "../../../enums/file.enum";

export class PixController {

    constructor(pixService, dateAdapter, fileIoAdapter) {
        this.pixService = pixService
        this.dateAdapter = dateAdapter
        this.fileIoAdapter = fileIoAdapter
    }

    async realizarEnvioDePix(cenario) {
        const payloadDoCenario = await this.fileIoAdapter.getDataCenarioFromFixtureFile('pix-envio.json', cenario)
        const responseAlias = 'response_pix__enviar_pix'
        const response = await this.pixService.enviarPix(payloadDoCenario, responseAlias)
        await this.fileIoAdapter.saveDataAsFile(`${responseAlias}.${FileType.JSON}`, response.body)
    }

    validarResponseDoEnvioDePix(dataTable) {
        const dadoEsperado = MapperUtils.dataTableToArray(dataTable)[0]
        cy.get('@response_pix__enviar_pix').then((response) => {
            console.log('ohh yearr::', response)
            expect(response.status).to.eq(HttpStatus.CREATED.value)
            expect(response.body.status).to.eq(dadoEsperado.status_envio)
            expect(response.body.message).to.eq(dadoEsperado.mensagem)
            expect(response.body).to.haveOwnProperty('instructionIdentifier').and.not.empty
            Cypress.env('instructionIdentifier', response.body?.instructionIdentifier ?? '')
        })
    }

    consultarTransacaoDePix() {
        this.pixService.consultarTrasacao(Cypress.env('instructionIdentifier'))
            .as('response_pix__consultar_trasacao')
    }

    validarStatusDaTrasacaoDePix(statusEnvioPix) {
        cy.get('@response_pix__consultar_trasacao').then((response) => {
            const transacao = response.body.content[0]
            expect(response.status).to.eq(HttpStatus.OK.value)
            expect(transacao.status).to.be.eq(statusEnvioPix)
        })
    }
}