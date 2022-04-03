import { HttpStatus } from "../../../enums/http-status.enum";
import { MapperUtils } from "../../../utils/mapper.utils";
import { FixtureUtils } from "../../../utils/fixture.utils";


export class PixController {

    resource = 'pix'
    fixtureFileName = 'pix-envio'

    constructor(pixService, dateAdapter) {
        this.pixService = pixService
        this.dateAdapter = dateAdapter
    }

    async realizarEnvioDePix(cenario) {
        const payload = await FixtureUtils.getDataCenarioFromFixtureFile(this.fixtureFileName, this.resource, cenario)
        this.pixService.enviarPix(payload).as('response_pix__enviar_pix')
    }

    validarResponseDoEnvioDePix(dataTable) {
        const dadoEsperado = MapperUtils.dataTableToArray(dataTable)[0]
        cy.get('@response_pix__enviar_pix').then((response) => {
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