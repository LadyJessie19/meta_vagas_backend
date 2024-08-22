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

# Meta Vagas - Backend

## Equipe:

| [![almyrneto](https://github.com/almyrneto.png)](https://github.com/almyrneto) | [![CaioSjc](https://github.com/caio-henrique-dev.png)](https://github.com/caio-henrique-dev) | [![COFerr](https://github.com/COFerr.png)](https://github.com/COFerr) | [![LadyJessie19](https://github.com/LadyJessie19.png)](https://github.com/LadyJessie19) |
| --- | --- | --- | --- |
| [almyrneto](https://github.com/almyrneto) | [CaioSjc](https://github.com/CaioSjc) | [COFerr](https://github.com/COFerr) | [LadyJessie19](https://github.com/LadyJessie19) |

## Descrição

Este repositório foi desenvolvido como projeto final do Módulo 4 da Arnia, uma escola de programação da qual fazemos parte. O objetivo principal deste projeto é adquirir mais experiência na área de desenvolvimento web e aplicar os conceitos ensinados em sala de aula.

A nossa missão com este projeto é criar uma plataforma online de vagas de emprego que atenda às necessidades tanto de candidatos em busca de oportunidades quanto de empresas que desejam contratar talentos qualificados.

A presente aplicação possui foco no registro de candidatos, vagas e empresas anunciantes de vagas.

Além disso, a aplicação está organizada por camadas e possui diversas funcionalidades, autorização, autenticação de rotas privadas, busca de vagas com base em tecnologias e testes unitários com Jest.

## Tecnologias Utilizadas

- **Nest.js**: Um framework Node.js altamente produtivo para a construção de aplicativos escaláveis.
- **SQL postgres**: Um sistema de gerenciamento de banco de dados relacional confiável e poderoso.
- **TypeORM**: Uma ferramenta de mapeamento objeto-relacional (ORM) que simplifica a interação com o banco de dados usando TypeScript.
- **TypeScript**: Uma linguagem de programação que oferece tipagem estática e um ambiente de desenvolvimento mais seguro.
- **Jest**: Uma estrutura de teste de JavaScript que nos permite garantir a qualidade do nosso código.
- **Bcrypt**: Utilizado para criptografar senhas, mantendo os dados dos usuários seguros.
- **JsonWebToken (JWT)**: Implementado para autenticação e autorização de rotas privadas, garantindo a segurança da aplicação.
- **Jwt interceptor**: O Jwt interceptor desempenha um papel vital na segurança da nossa aplicação, interceptando e verificando os tokens JWT para garantir o acesso seguro às rotas privadas e proteger os dados sensíveis.
- **Roles Guard**: Uma funcionalidade que permite o controle de permissões e acessos dos usuários.
- **Multer File**: Utilizado para facilitar o upload de arquivos.
- **create a partir XLSX**: A capacidade de criar registros a partir de arquivos XLSX simplifica a importação de dados para nossa aplicação, economizando tempo e recursos.
- **@nestjs/common**: @nestjs/common é um pacote fundamental do Nest.js que fornece uma ampla gama de recursos comuns e utilitários, facilitando o desenvolvimento de aplicativos robustos e escaláveis.
- **Swagger**: Implementado para documentação de API, tornando a aplicação mais acessível.
- **SetMetaData**: A tecnologia SetMetaData é essencial para a organização e gerenciamento eficiente dos metadados do nosso sistema, permitindo uma visão clara e estruturada dos dados.

## Estrutura do Projeto

Diagrama de entidade e relacionamento:

![image](https://github.com/LadyJessie19/meta_vagas_backend/assets/115433314/4923c5ca-8a3f-463e-a2cb-47caa73c8c81)

## Ferramenta de Planejamento Utilizada

No link abaixo, disponibilizamos o convite para a área de trabalho utilizada para a organização do projeto.

[Trello](https://trello.com/invite/metavagasmodulo4/ATTI9032a0682b2fa8aec1f709959dceea6bE44E8A7D)

## Instalação

Crie seu próprio arquivo `.env`:

```bash
cp .env.example .env
```

Defina seus valores no arquivo `.env`.

Instale as dependências do projeto:

```bash
yarn ou npm install
```

## Rodando o Projeto

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Rodando os Testes

```bash
npm test '+ nome do arquivo rodado entre aspas'
```

## URL de Deploy

Para o deploy, foi utilizado a plataforma Railway:

[URL BASE](https://metavagasbackend-production.up.railway.app/)

## Swagger da Aplicação

[Documentação da API](https://metavagasbackend-production.up.railway.app/v1/docs)
