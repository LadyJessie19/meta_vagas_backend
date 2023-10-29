<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Projeto-Meta_Vagas_Backend

##Equipe:

| [@almyrneto:](https://github.com/almyrneto)                                                                        | [@CaioSjc:](https://github.com/CaioSjc)                                                                            | [@COFerr:](https://github.com/COFerr)                                                                              | [@LadyJessie19:](https://github.com/LadyJessie19)                                                                  |
| ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| ![image](https://github.com/LadyJessie19/meta_vagas_backend/assets/115433314/17ea390d-4d60-481b-9fcf-2af0eed32306) | ![image](https://github.com/LadyJessie19/meta_vagas_backend/assets/115433314/19e8eb12-ff88-4b12-a81c-0c96c834d229) | ![image](https://github.com/LadyJessie19/meta_vagas_backend/assets/115433314/91c19a99-f6d8-4acc-b81d-fd5ade593a93) | ![image](https://github.com/LadyJessie19/meta_vagas_backend/assets/115433314/c1675bcc-76bb-4378-a420-23afb278eca7) |

##Descrição

Este repositório foi feito como projeto final do módulo 4 da Arnia, escola de progamação da qual fazemos parte, com intuito de adquirirmos mais experiência na área, e como um desafio sobre os conteúdos dos quais foram lecionados em sala de aula.

Nosso objetivo com este projeto é desenvolver uma plataforma online de vagas de emprego que atenda às necessidades de candidatos em busca de oportunidades e empresas que desejam contratar talentos qualificados.

A presente aplicação possui foco no registros de candidatos, registros de vagas e registros das empresas anunciantes das vagas.

Possui também role para melhor controle de quem tem permissão para acesso a determinadas rotas.

Além disso a aplicação toda arquitetada por camadas, possui diversas rotas com funcionalidades, autorização, autenticação de rotas privadas, busca de vagas baseado nas tecnologias, e testes unitários com Jest.

##Tecnologias

- Nest.js: Um framework Node.js altamente produtivo para a construção de aplicativos escaláveis.
- SQL postgres: Um sistema de gerenciamento de banco de dados relacional confiável e poderoso.
- TypeORM: Uma ferramenta de mapeamento objeto-relacional (ORM) que simplifica a interação com o banco de dados usando TypeScript.
- TypeScript: Uma linguagem de programação que oferece tipagem estática e um ambiente de desenvolvimento mais seguro.
- Jest: Uma estrutura de teste de JavaScript que nos permite garantir a qualidade do nosso código.
- Bcrypt: Utilizado para criptografar senhas, mantendo os dados dos usuários seguros.
- JsonWebToken(JWT): Implementado para autenticação e autorização de rotas privadas, garantindo a segurança da aplicação.
- Jwt interceptor: O Jwt interceptor desempenha um papel vital na segurança da nossa aplicação, interceptando e verificando os tokens JWT para garantir o acesso seguro às rotas privadas e proteger os dados sensíveis.
- Roles Guard: Uma funcionalidade que permite o controle de permissões e acessos dos usuários.
- Multer File: Utilizado para facilitar o upload de arquivos.
- create a partir XLSX: A capacidade de criar registros a partir de arquivos XLSX simplifica a importação de dados para nossa aplicação, economizando tempo e recursos.
- @nestjs/common: @nestjs/common é um pacote fundamental do Nest.js que fornece uma ampla gama de recursos comuns e utilitários, facilitando o desenvolvimento de aplicativos robustos e escaláveis.
- swagger: Implementado para documentação de API, tornando a aplicação mais acessível.
- SetMetaData: A tecnologia SetMetaData é essencial para a organização e gerenciamento eficiente dos metadados do nosso sistema, permitindo uma visão clara e estruturada dos dados.

##Estrutura do Projeto

Diagrama de entidade e relacionamento:

![image](https://github.com/LadyJessie19/meta_vagas_backend/assets/115433314/4923c5ca-8a3f-463e-a2cb-47caa73c8c81)

## Ferramenta de Planejamento Utilizada:

No link abaixo, disponibilizamos convite para a área de trabalho utilizada para a organização do projeto.

https://trello.com/invite/metavagasmodulo4/ATTI9032a0682b2fa8aec1f709959dceea6bE44E8A7D

##Instalação

Crie seu próprio .env !!!

```bash
cp .env.example .env
```

Defina seus valores !!!

Instale as dependências do projeto !!!

```bash
yarn ou npm install
```

##Rodando o projeto

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

##Rodando os testes

```bash
npm test '+ nome do arquivo rodado entre aspas'
```

##URL do Deploy

Para o deploy foi utilizado a plataforma [railway:] https://railway.app/

[URL BASE:](https://metavagasbackend-production.up.railway.app/) https://metavagasbackend-production.up.railway.app/

## Swagger da aplicação

https://metavagasbackend-production.up.railway.app/v1/docs
