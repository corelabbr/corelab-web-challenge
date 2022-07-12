# Desafio Corelab Api

## Sobre o Projeto

FrontEnd desenvolvido para o desafio de código da [Corelab](https://www.corelab.com.br/).
Consiste em criar um frontend para consumir a [api](https://github.com/dienerld/corelab-api-challenge) do desafio. no frontend é possível criar usuários, veículos, listar todos os veículos, favoritar, atualizar e excluir.

## Bibliotecas Usadas

O core do código foi desenvolvido usando somente react e sass. Teve a utilização do [jwt-decode](https://www.npmjs.com/package/jwt-decode) para consumir o token de autenticação fornecido pelo backend. [ReactIcons](https://react-icons.github.io/react-icons/) como base de ícones para a aplicação e [React-router-dom](https://reactrouter.com/) para navegação na aplicação.

O código foi implementado seguindo padrões de componentes e páginas. A aplicação possui quatro páginas: Home, Login, Register e My Vehicles. Onde as três primeiras é acessível por qualquer usuário, mas a pagina My Vehicles só pode ser acessada se o usuário estiver logado.
O código segue os padrões de projeto do eslint e airbnb para desenvolvimento de código.

O código não possui testes no frontend, pois não tenho conhecimento de como executar.
