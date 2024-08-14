# coreNotes - Desafio Full Stack React para Coralab

## Visão Geral

**coreNotes** é um aplicativo simples de criação e edição de notas. O projeto permite ao usuário criar notas com título, conteúdo e uma cor de fundo, podendo marcar algumas como favoritas. As notas criadas podem ser editadas, incluindo a alteração da cor de fundo, e todas as modificações são refletidas diretamente no banco de dados PostgreSQL, graças à integração via API.

Este projeto foi desenvolvido como parte de um desafio para a vaga de Desenvolvedor Júnior Full Stack React na **Coralab**.

### Repositório raiz do desafio:
[WEB](https://github.com/corelabbr/corelab-web-challenge)
[API](https://github.com/corelabbr/corelab-api-challenge)

## Funcionalidades

- **Criação de Notas:** Adicione notas com título, conteúdo e escolha se será favorita ou não.
- **Edição de Notas:** Modifique o título, conteúdo e a cor de fundo das notas existentes.
- **Favoritos:** Marque ou desmarque uma nota como favorita.
- **Sincronização em Tempo Real:** Todas as ações no front-end são automaticamente refletidas no banco de dados.

## Tecnologias Utilizadas

### Front-end
- **React** com **Vite**: Para o desenvolvimento da interface.
- **TypeScript**: Linguagem utilizada em todo o projeto para tipagem estática.
- **Material UI (MUI)**: Biblioteca de componentes para estilização da interface.
- **Figma**: O design do front-end foi criado e distribuído no [Figma](https://www.figma.com/design/sQrUVHTlyogq3qGdkqGTXN/mockup?node-id=0-1&t=lbypEiLIjBZ3KDr7-0).

### Back-end
- **Express.js**: Servidor web para a API, utilizando TypeScript.
- **PostgreSQL**: Banco de dados utilizado para armazenar as notas e informações adicionais.

## Estrutura do Projeto

O repositório do projeto está organizado da seguinte maneira:

- **Backend/**: Contém os arquivos do back-end.
  - `index.ts`: Arquivo de inicialização do servidor Express.
  - `models/`: Modelos de dados para o banco de dados.
  - `controllers/`: Controladores que gerenciam a lógica de negócio.
  - `routes/`: Definição das rotas da API.
- **Raiz ../**: Contém o projeto do front-end.
  - `src/`: Contém os componentes React e demais arquivos da aplicação.
  - `services/`: Contém o arquivo responsável pela comunicação com a API.
- **database.sql**: Script SQL para configuração do banco de dados PostgreSQL, incluindo a criação de tabelas e inserção de dados padrão (lista de cores e notas de teste).

## Configuração do Projeto

### Pré-requisitos

- Node.js (versão 14 ou superior)
- PostgreSQL (versão 12 ou superior)
- Git

### Passos para Configuração

1. Clone o repositório:
   ```bash
   git clone https://github.com/lucasafonsobastos/desafio-corelabbr.git

2. Acesse a pasta Backend
   ```bash
    cd coreNotes/Backend
    npm install

3. Configure o banco de dados PostguesSQL com o arquvo fornecido `notasdb.sql`

4. Inicie o servidor Express:
   ```bash
   npm run dev

5. Acesse a pasta raiz `../` e instale as dependecias:
   ```bash
   cd ../
   npm install

6. Execute o servidor dedesenvolvimento do front:
   ```bash
   npm run dev

7. Abra o navegador em http://localhost:3000 para acessar a aplicação.


