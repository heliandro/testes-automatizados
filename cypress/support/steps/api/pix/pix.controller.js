import { HttpStatus } from "../../../enums/http-status.enum";
import { MapperUtils } from "../../../utils/mapper.utils";
import { FileType } from "../../../enums/file.enum";

export class PixController {

    instructionIdentifier = ''

    constructor(pixService, fileIoAdapter) {
        this.pixService = pixService
        this.fileIoAdapter = fileIoAdapter
    }

    initParamsNovoCenario() {
        this.instructionIdentifier = ''
    }

    async realizarEnvioDePix(cenario) {
        this.initParamsNovoCenario()
        const payloadDoCenario = await this.fileIoAdapter.getDataCenarioFromFixtureFile('pix-envio.json', cenario)
        const responseAlias = 'response_pix__enviar_pix'
        const response = await this.pixService.enviarPix(payloadDoCenario, responseAlias)
        await this.fileIoAdapter.saveDataAsFile(`${responseAlias}.${FileType.JSON}`, response.body)
    }

    validarResponseDoEnvioDePix(dataTable) {
        const dadoEsperado = MapperUtils.dataTableToArray(dataTable)[0]
        cy.get('@response_pix__enviar_pix').then((response) => {
            expect(response.status).to.equal(parseInt(dadoEsperado.httpStatus))
            expect(response.body).to.have.property('status').and.equal(dadoEsperado.statusEnvio)
            expect(response.body).to.have.property('message').and.equal(dadoEsperado.mensagem)
            expect(response.body).to.have.property('instructionIdentifier')
                .and.to.satisfy(value => value.length > 0)
            this.instructionIdentifier = response.body.instructionIdentifier
        })
    }

    async consultarTransacaoDePix() {
        const responseAlias = 'response_pix__consultar_transacao_pix'
        const response = await this.pixService.consultarTrasacao(this.instructionIdentifier, responseAlias)
        await this.fileIoAdapter.saveDataAsFile(`${responseAlias}.${FileType.JSON}`, response.body)
    }

    validarTransacaoDePixStatusOperacao(statusOperacao) {
        cy.get('@response_pix__consultar_transacao_pix').then((response) => {
            expect(response.status).to.equal(HttpStatus.OK.value)
            expect(response.body).to.have.property('totalElements').and.to.equal(1)
            expect(response.body).to.have.property('content')
            expect(response.body.content).to.have.length(1)
            expect(response.body.content[0]).to.have.property('instructionIdentifier')
                .and.to.equal(this.instructionIdentifier)
            expect(response.body.content[0]).to.have.property('status').to.equal(statusOperacao)
        })
    }
}