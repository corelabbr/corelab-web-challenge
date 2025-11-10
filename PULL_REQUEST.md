# Corelab Challenge: Notes Management Application

## Descrição

Este repositório contém uma aplicação web completa para gerenciar notas (notes), permitindo aos usuários criar, ler, atualizar, e deletar notas. A aplicação é composta por uma API backend construída em Node.js com TypeScript e um frontend React, proporcionando uma interface responsiva e intuitiva.

### Funcionalidades da Aplicação

- **CRUD de Notas**: Os usuários podem criar, ler, atualizar e deletar notas.
- **Favoritar Notas**: Os usuários podem marcar notas como favoritas.
- **Definir Cor das Notas**: Os usuários podem atribuir uma cor para cada nota.
- **Filtro de Notas**: A interface frontend permite filtrar notas por favoritas e cor.
- **Organização**: As notas favoritas aparecem no topo da lista.

## Tecnologias Utilizadas

### Backend

- **Node.js**: Plataforma de execução para o servidor backend.
- **TypeScript**: Utilizado para tipagem estática e melhor estruturação do código.
- **Express**: Framework para criação da API REST.
- **Mongoose**: Biblioteca para modelagem de dados com MongoDB.
- **tsyringe**: Utilizado para injeção de dependências, seguindo o princípio de Inversão de Dependência (SOLID).
- **Jest**: Framework de testes utilizado para garantir a qualidade do código.
- **Vercel**: Plataforma utilizada para CI/CD e deploy da aplicação.

### Frontend

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **TypeScript**: Adiciona tipagem estática ao React para maior robustez.
- **Styled-Components**: Estilização com CSS-in-JS, permitindo estilos dinâmicos baseados em props.
- **React Testing Library**: Ferramenta de teste para componentes React.

## Princípios e Boas Práticas

- **SOLID**: O código foi estruturado seguindo os princípios SOLID, garantindo modularidade, fácil manutenção e expansão futura.
- **Modularização**: O projeto foi desenvolvido de forma modular, com separação clara entre camadas de serviço, repositório e controlador.
- **CI/CD**: Configurado para deploy automático via Vercel, garantindo que cada alteração no código seja testada e implantada automaticamente.

## Estrutura do Projeto

```plaintext
src/
├── controllers/
│   └── NoteController.ts
├── repositories/
│   ├── INoteRepository.ts
│   └── MongooseNoteRepository.ts
├── services/
│   └── NoteService.ts
├── test-utils/
│   ├── factories.ts
│   ├── mocks.ts
│   └── setup.ts
├── routes/
│   └── noteRoutes.ts
├── config/
│   └── database.ts
└── __tests__/
    └── services/
        └── NoteService.test.ts
```

## Endpoints da API

A API possui os seguintes endpoints:

- **GET /api/notes**: Retorna todas as notas.
- **GET /api/notes/:id**: Retorna uma nota específica pelo ID.
- **POST /api/notes**: Cria uma nova nota.
- **PUT /api/notes/:id**: Atualiza uma nota existente pelo ID.
- **DELETE /api/notes/:id**: Deleta uma nota pelo ID.
- **PATCH /api/notes/:id/favorite**: Alterna o status de favorito de uma nota.
- **PATCH /api/notes/:id/color**: Atualiza a cor de uma nota.

## Como Rodar a Aplicação Localmente

### Pré-requisitos

- **Node.js**: Versão 16.15.0 ou superior
- **NPM**: Versão 8.5.5 ou superior

### Passos para Rodar

1. **Clone o Repositório**

   ```bash
   git clone https://github.com/seu-usuario/corelab-challenge.git
   cd corelab-challenge
   ```

2. **Instale as Dependências**

   ```bash
   npm install
   ```

3. **Inicie o MongoDB com Docker**

   ```bash
   docker run --name mongodb -p 27017:27017 -d mongo
   ```

4. **Configure as Variáveis de Ambiente**

   Crie um arquivo `.env` na raiz do projeto e adicione as variáveis de ambiente necessárias:

   ```env
   MONGO_URI=mongodb://localhost:27017/notes
   PORT=3030
   ```

5. **Execute a Aplicação**

   ```bash
   npm run dev
   ```

   A aplicação estará disponível em `http://localhost:3030`.

### Rodando os Testes

Para rodar os testes, execute:

```bash
npm run test
```

### Deploy com Vercel

O deploy está configurado para ser automático via Vercel. Cada commit na branch `main` dispara um processo de CI/CD que testa e faz o deploy da aplicação.

- **Live Application:** [https://yves-corelab-web-challenge.vercel.app/](https://yves-corelab-web-challenge.vercel.app/)

## O que Foi Feito e Como

1. **Estruturação Modular**: O projeto foi dividido em módulos claros (controllers, services, repositories) para facilitar a manutenção e a escalabilidade.
   
2. **Aplicação dos Princípios SOLID**: Foi utilizada injeção de dependência com `tsyringe` para seguir o princípio de Inversão de Dependência.

3. **CI/CD com Vercel**: O pipeline de CI/CD foi configurado com a Vercel, incluindo testes automáticos com Jest antes de cada deploy.

4. **Docker para MongoDB**: Utilizado Docker para facilitar o setup do banco de dados MongoDB localmente.

## Conclusão

Este projeto demonstra uma aplicação robusta, modular e escalável, seguindo boas práticas de desenvolvimento e utilizando tecnologias modernas. Cada parte da aplicação foi projetada com foco em qualidade de código, performance e facilidade de manutenção.
