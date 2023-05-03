## Build e execução

Primeiro é necessário instalar as dependências do projeto com o comando abaixo

```bash
npm install
```

### migração

Após isso, siga os passos do .env.example para inserir a connection string do seu banco de dados para poder criar o banco e as tabelas com o comando abaixo:

```bash
npx prisma migrate dev
```

Feito isso, a aplicação já pode ser inicializada em modo de desenvolvimento com:

```bash
npm run dev
```

Ou em modo de produção com:

```bash
npm run build
npm start
```

Caso for fazer o deploy da aplicação, é importante substituir o comando de [migração](#migração) pelo comando abaixo:

```bash
npx prisma migrate deploy
```

### execução

Feito isso, basta abrir o projeto em [http://localhost:3000](http://localhost:3000) no seu browser.

## Cypress

Alguns testes end-to-end foram feitos com cypress para testar o fluxo da aplicação. Para rodá-los basta executar o comando:

```bash
npm run cypress
```

Após abrir a janela do cypress, basta clicar em e2e testing, escolher onde quer executar os testes (Edge ou electron) e selecionar o teste home.cy.ts

### Avisos

O projeto deve estar em execução para que os testes funcionem e é importante salientar que se use um banco de testes já que todas as tabelas são limpadas ao início da execução dos testes
