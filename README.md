 <div align="center">
  <img src="/public/logo.png" width="100" alt="Velvet" />

  ### Velvet

  A melhor plataforma de streaming do Brasil para Otakus de carteirinha.

  [![License: Apache License 2.0](https://img.shields.io/badge/license-Apache%20License%202.0-blue?style=flat-square)](https://www.apache.org/licenses/LICENSE-2.0)
  [![Development Status](https://img.shields.io/badge/development%20status-alpha-red?style=flat-square)](https://github.com/orgs/uesleibros/velvet)
  [![Code Size](https://img.shields.io/github/languages/code-size/uesleibros/velvet?style=flat-square)](https://github.com/uesleibros/velvet)
  [![Contributors](https://img.shields.io/github/contributors/uesleibros/velvet?style=flat-square)](https://github.com/uesleibros/velvet/graphs/contributors)
  [![Issues](https://img.shields.io/github/issues/uesleibros/velvet?style=flat-square)](https://github.com/uesleibros/velvet/issues)
  [![Pull Requests](https://img.shields.io/github/issues-pr/uesleibros/velvet?style=flat-square)](https://github.com/uesleibros/velvet/pulls)
  [![Commit Activity](https://img.shields.io/github/commit-activity/t/uesleibros/velvet?style=flat-square)](https://github.com/uesleibros/velvet/commits/main)
  [![Last Commit](https://img.shields.io/github/last-commit/uesleibros/velvet?style=flat-square)](https://github.com/uesleibros/velvet/commits/main)
  [![Made with Love](https://img.shields.io/badge/made%20with-love-pink?style=flat-square)](https://github.com/uesleibros/velvet/graphs/contributors)

  ---

</div>

## Sobre o Projeto

**Velvet** é uma plataforma de streaming dedicada aos fãs de animes. Seu diferencial é a integração com vários sites populares para oferecer uma experiência de visualização abrangente. O Velvet não utiliza um banco de dados próprio, mas sim informações "emprestadas" de sites renomados como:

- [Anroll](https://anroll.net/)
- [Animefire](https://animefire.plus/)
- [MyAnimeList](https://myanimelist.net/)
- [Anilist](https://anilist.co/)
- [Aniwave](https://aniwave.to/home)

> Todos os créditos para os sites mencionados. Sem eles, este projeto não seria possível.

## Motivação

Como um grande entusiasta de animes, mangás e light novels, frequentemente me deparo com a necessidade de visitar múltiplos sites para encontrar o conteúdo que desejo. Esta experiência fragmentada inspirou a criação do Velvet: um único local para acessar e desfrutar de todos os seus animes favoritos, tornando a navegação muito mais fácil e eficiente.

## Objetivo

Este projeto não tem fins lucrativos. O objetivo do Velvet é proporcionar uma plataforma acessível e gratuita para todos os fãs de anime. Monetizar o projeto seria injusto com os sites que fornecem o conteúdo original, que dependem de receitas publicitárias para sustentar seu trabalho.

## Tecnologias Utilizadas

- **Front-end:** React.
- **Back-end:** Node.js, Next.js.
- **Integração:** APIs dos sites de streaming.

## Instalação e Execução

### Requisitos

- Node.js (versão 16 ou superior).
- [npm](https://npmjs.com) ou [yarn](https://yarnpkg.com).

### Clonando o Repositório

```bash
git clone https://github.com/uesleibros/velvet.git
cd velvet
```

### Instalando Dependências

```bash
npm install
# ou
yarn install
```

### Gerar a Build para Produção

Para gerar uma versão otimizada do projeto para produção, execute:

```bash
npm run build
# ou
yarn build
```

Este comando cria uma pasta `/.next` contendo os arquivos de produção otimizados.

### Executar o Servidor de Produção

Para iniciar o servidor de produção, após a build, execute:

```bash
npm start
# ou
yarn start
```

O servidor estará disponível em `http://localhost:3000`.

### Executar em Ambiente de Desenvolvimento

Para iniciar o servidor de desenvolvimento com hot reloading, execute:

```bash
npm run dev
# ou
yarn dev
```

O servidor será iniciado em `http://localhost:3000`.

### Testes

Para rodar os testes automatizados (se aplicável), utilize:

```bash
npm test
# ou
yarn test
```

### Linting e Formatação

Para verificar e corrigir problemas de linting e formatação, use:

```baah
npm run lint
# ou
yarn lint
```

Este comando verifica o código para conformidade com as regras de linting e pode corrigir problemas automaticamente.
