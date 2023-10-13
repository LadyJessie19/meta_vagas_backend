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

##Descrição

Este repositório foi feito como projeto final do módulo 4 da Arnia, escola de progamação da qual fazemos parte, com intuito de adquirirmos mais experiência na área, e como um desafio sobre os conteúdos dos quais foram lecionados em sala de aula.

A presente aplicação possui foco no registros de candidatos, registros de vagas e registros das empresas anunciantes das vagas.

Possui também role para melhor controle de quem tem permissão para acesso a determinadas rotas.

Além disso a aplicação toda arquitetada por camadas, possui diversas rotas com funcionalidades, autorização, autenticação de rotas privadas, busca de vagas baseado nas tecnologias, e testes unitários com Jest.

##Tecnologias

- Nest.js
- SQL postgres
- TypeScript
- Jest
- Bcrypt
- JsonWebToken

##Estrutura do Projeto

Diagrama de entidade e relacionamento:

![editada](https://github.com/LadyJessie19/meta_vagas_backend/assets/115433314/baa1344e-3cb1-42e4-b210-0d425c211f9e)

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
npm test '+nome do arquivo rodado entre aspas'
```

##URL do Deploy

Para o deploy foi utilizado a plataforma [render](https://render.com/).

[URL BASE]().

