# Descrição do Projeto

Este projeto é um sistema de notas desenvolvido em React + TypeScript, com autenticação, CRUD de notas, filtros, upload de imagens e responsividade.

## O que foi feito

- **Autenticação:** Login, registro e logout com token JWT salvo no localStorage.
- **CRUD de Notas:** Criar, editar, remover e visualizar notas.
- **Favoritar Notas:** Marcação de notas favoritas, separadas das demais.
- **Filtro de Busca:** Busca por texto no título e corpo das notas.
- **Filtro por Cor:** Seleção de uma ou mais cores para filtrar notas.
- **Upload de Imagens:** Inserção de imagens nas notas usando React Quill.
- **Feedback Global:** Toasts e loading globais via Context API.
- **Responsividade:** Layout adaptado para desktop, tablet e mobile.
- **Dockerização:** Dockerfile para build e deploy em container.
- **Testes Automatizados:** Testes unitários com Jest e React Testing Library.

## Como foi feito

- **Frontend:** React 18, TypeScript, React Router DOM, React Quill, Axios, SCSS Modules.
- **Gerenciamento de Estado:** Context API para autenticação e feedback global.
- **API:** Consumo via Axios, com interceptors para envio automático do Bearer Token.
- **Estilização:** SCSS Modules, variáveis globais e mixins para responsividade.
- **Variáveis de Ambiente:** `.env` para URL da API e porta do frontend.
- **Build e Deploy:** Dockerfile multi-stage (Node para build, Nginx para servir).
- **Testes:** Jest + React Testing Library para componentes e serviços.

## Como rodar

1. Configure o `.env` com `REACT_APP_API_URL` e `PORT`.
2. Instale dependências: `npm install`
3. Rode local: `npm start`
4. Rode build: `npm run build` e `npx serve -s build`
5. Rode com Docker:  
   `docker build -t corelab-web-challenge .`  
   `docker run -p 3000:80 corelab-web-challenge`
6. Rode testes: `npm test`

## Observações

- O frontend espera um backend rodando na URL definida em `REACT_APP_API_URL`.
- Todas as funcionalidades principais estão cobertas por testes unitários.
- O projeto é facilmente extensível e pronto para produção.
