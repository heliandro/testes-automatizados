import { HttpStatus } from "../../../enums/http-status.enum";
import { MapperUtils } from "../../../utils/mapper.utils";

export class PixController {

    constructor(pixService) {
        this.pixService = pixService
    }

    realizarEnvioDePix(dataTable) {
        const payload = MapperUtils.dataTableToArray(dataTable)
        this.pixService.enviarPix(payload).as('response_pix__enviar_pix')
    }

    consultarTransacaoDePix() {
        this.pixService.consultarTrasacao('').as('response_pix__consultar_trasacao')
    }

    validarStatusDaTrasacaoDePix(statusEnvioPix) {
        cy.get('@response_pix__consultar_trasacao').then((response) => {
            const transacao = response.body.content[0]
            expect(response.status).to.eq(HttpStatus.CREATED.value)
            expect(transacao.status).to.be.eq(statusEnvioPix)
        })
    }
}