Feature: Envio de PIX

  Como usuario, desejo realizar um envio de PIX por agencia e conta

  Scenario Outline: Envio por agencia e conta com todos os dados corretos
    Given Eu consumo o endpoint de envio de pix utilizando o cenario '<cenario>'
    Then Eu valido a resposta do endpoint de envio de pix
      | httpStatus  | statusEnvio  | mensagem             |
      | 200         | Enviado      | Pix em processamento |
    And Eu consulto a transacao de envio de pix no banco de dados
    Then Eu valido a transacao de envio de pix com o status da operacao '<statusOperacao>'
    # TODO
#    And Eu consulto os saldos AVAILABLE_BALANCE e CURRENT_BALANCE para saida pix com sucesso
    # TODO
#    Then Eu valido que a saida de pix foi gerada com o status '<status_entry>' e proposito '<proposito>'
    # TODO - Criar step no commons
#    And Eu consulto a transacao de pagamento geral
    # TODO - Criar step no commons
#    Then Eu valido a transacao de pagamento geral com o status da transacao '<status_transacao>'

    Examples:
      | cenario                  | statusOperacao    | statusTransacao | statusEntry   | proposito    |
      | agencia_conta__sucesso__ | EFETIVADA         | DONE             | COMPLETED      | WITHDRAW_PIX |