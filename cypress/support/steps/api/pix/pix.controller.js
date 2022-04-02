export class PixController {

    constructor(pixService) {
        this.pixService = pixService
    }

    realizarEnvioDePix(payload) {
        this.pixService.enviarPix(payload)
            .as('response_pix__enviar_pix')
    }

    consultarTransacaoDePix() {
        this.pixService.consultarTrasacao('')
            .as('response_pix__consultar_trasacao')
    }

    validarStatusDaTrasacaoDePix(statusEnvioPix) {
        cy.get('@response_pix__consultar_trasacao').then((response) => {
            const trasacaoPix = response.body.content[0]
            expect(response.status).to.eq(200)
            expect(trasacaoPix.status).to.be.eq(statusEnvioPix)
        })
    }
}