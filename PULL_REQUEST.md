## Aplicação de TODO's

Aplicação criada para o gerenciamento de TODO's

#### Funcionalidades
- Criação, edição, listagem e deleção de TODO's
- Filtros para a listagem de TODO's
- Paginanação para a listagem de TODO's

#### Principais tecnologias utilizadas

Front-end

- React
- Typescript
- Sass
- Rsbuild
- Jest
- React-testing-library

Back-end

- NestJS
- Typescript
- MongoDB
- Docker

### Como executar

**Pré-requisitos**
- [NodeJS](https://nodejs.org/pt)
- [Docker](https://docs.docker.com/)

Primeiro, é preciso executar o servidor, basta abrir o repositório backend e executar os seguintes comandos em sequência
```bash
    # Instala todas as dependências do projeto
    npm install

    # Executa o projeto na porta 3002
    docker-compose up -d --build
```

Logo após, a aplicação front-end pode ser executado, basta abrir o repositório frontend e executar os seguintes comandos em sequência
```bash
    # Instala todas as dependências do projeto
    npm install

    # Executa a aplicação na porta 3000
    npm run dev
```

#### Algumas informações que podem ser imporantes quando tomei algumas decisões

- **Escolhe do banco de dados**: Como é uma aplicação bem simples, que não tem uma quantidade muito grande de dados, que não tem vários "registros" que se relacionam e que tem uma complexidade relativamente baixa, decidi utilizar o Mongodb, um NoSQL já resolveria o problema.

- **Escolha do framwork backend**: Utilizei o NestJS por estar mais familiarizado com o framework.

- **Escolhe na inicialização da aplicação React**: Vi que o projeto base foi construido utilizando o CRA, como ele foi descontinuado e não terá suporte para futuras versões, utilizei o boilerplate do RsBuild, que além de ainda ser mantido, também utiliza Rust para a criação do bundler da aplicação, que é mais performatico que o webpack, utilizado no CRA.

- **A listagem está paginada**
