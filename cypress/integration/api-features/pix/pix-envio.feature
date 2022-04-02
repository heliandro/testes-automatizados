Feature: Envio de PIX

  Como usuario, desejo realizar um envio de PIX por agencia e conta

  Scenario Outline: Envio por agencia e conta com todos os dados corretosd
    Given que realizo um envio de pix para uma agencia e conta
      | agencia | conta      | nome      | instituicao | cpfCnpj        | tipoConta |
      | 0000    | 0000000000 | Joao Test | 00000000    | 00000000000000 | CACC      |
#    Then a api retorna o status status e mensagem esperada
#      | http_status | status_envio | mensagem             |
#      | 200         | Enviado      | Pix em processamento |
#    And consulto a resposta do servico externo de envio de pix no banco de dados
#    And valido que a resposta do servico externo de envio de pix possui o status da operacao '<status_operacao>' correto
#    And verifico os saldos AVAILABLE_BALANCE e CURRENT_BALANCE para saida pix com sucesso
#    And consulto a transacao no banco de dados
#    And valido que a transacao possui o status da transacao '<status_transacao>' correto

    Examples:
      | status_operacao   | status_transacao | status_entry   | proposito    |
      | EFETIVADA         | DONE             | COMPLETED      | WITHDRAW_PIX |