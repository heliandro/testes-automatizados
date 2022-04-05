Feature: Envio de PIX

  Como usuario, desejo realizar um envio de PIX por agencia e conta

  Scenario Outline: Envio por agencia e conta com todos os dados corretos
    Given Eu consumo o endpoint de envio de pix utilizando o cenario '<cenario>'
    Then Eu recebo a resposta do endpoint de envio de pix
      | http_status | status_envio | mensagem             |
      | 200         | Enviado      | Pix em processamento |
#    And Eu consulto a transacao de pagamento de pix no banco de dados
#    Then Eu valido a transacao de pagamento de pix com o status da operacao '<status_operacao>'
    # TODO - Criar step generico? validar se é um consulta ao payment-transactions, caso seja o penultimo step abaixo ficara aqui e este se tornará uma 'validacao' step
#    And Eu consulto os saldos AVAILABLE_BALANCE e CURRENT_BALANCE para saida pix com sucesso
    # TODO - Criar step generico?
#    Then Eu verifico que foi gerada uma saida de valor com o status '<status_entry>' e proposito '<proposito>'
    # TODO - Criar step generico
#    And Eu consulto a transacao de pagamento geral do sistema
    # TODO - Criar step generico
#    Then Eu valido a transacao de pagamento geral com o status da transacao '<status_transacao>'

    Examples:
      | cenario                  | status_operacao   | status_transacao | status_entry   | proposito    |
      | agencia_conta__sucesso__ | EFETIVADA         | DONE             | COMPLETED      | WITHDRAW_PIX |