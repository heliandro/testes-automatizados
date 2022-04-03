# Testes Automatizados

Testes automatizados com Cypress + Cucumber

** OBS: para rodar este projeto é necessário possuir uma api **

## Organização do projeto

Abaixo será listado os arquivos e pastas mias importantes do projeto.

    cypress.json -> variaveis de ambiente e configuração
    cypress/ -> pasta principal do projeto
        fixtures/ -> arquivos json contendo cenarios de teste
        requests/ -> arquivos contendo as requests dos cenarios executados
        downloads/ -> arquivos de download de todos os tipos
        plugins/ -> plugins adicionados ao projeto
        integration/ -> arquivos descritivos contendo as features (cenarios) da api a ser testada
        support/
            commands.js -> arquivo muito importante, aqui podemos criar comandos cypress e acessa-lo diretamente pela
                framework. Ex: comandos para efetuar Login e Logout antes e depois de cada cenario.
            steps -> arquivos de implementação da features descritivas (ligadas pelo plugin do cucumber + cypress)
            utils -> funções uteis (reutilizaveis) para transformação de objetos e outros.
            enums -> enumeradores
        videos/ -> videos gerados automaticamente pelos testes do cypress

## Requisitos

    * Nodejs 16+
    * Configurar seu proprio cypress.json! tenha uma api rodando e configure suas variáveis de ambiente.

## Build & Run

Primeiro instale as dependencias do node:

```bash
npm install
```

Para rodar o projeto, utilize o script do package.json:

```bash
npm run cy:open
```

