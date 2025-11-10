# Corelab Web Challenge

Este projeto é uma dashboard interativa para gerenciamento de tarefas, permitindo aos usuários criar, atualizar e filtrar cards de tarefas com facilidade. A interface é intuitiva e permite a personalização dos cards, incluindo a mudança de cores e a marcação como favoritos.

### Repositórios dos projetos

- [Frontend](https://github.com/Nizoszz/corelab-web-challenge-impl)
- [Backend](https://github.com/Nizoszz/corelab-api-challenge-impl)

## Sumário

- [Visão Geral](#visão-geral)
- [Tecnologias](#tecnologias)
- [Funcionalidades](#funcionalidades)
- [Desafios](#desafios)
- [Instalação](#instalação)
- [Como Usar](#como-usar)

## Visão Geral

Este projeto foi desenvolvido para oferecer uma experiência dinâmica e eficiente na organização de tarefas. A aplicação é construída utilizando React, com foco em modularidade e responsividade, permitindo que os usuários filtrem, editem e personalizem seus cards de tarefas.

## Tecnologias

- [React](https://reactjs.org/) - Biblioteca JavaScript para construir interfaces de usuário.
- [React Router DOM](https://reactrouter.com/) - Biblioteca para gerenciar a navegação no projeto.
- [React Toastify](https://fkhadra.github.io/react-toastify/) - Biblioteca para exibir notificações amigáveis ao usuário.
- [Sass](https://sass-lang.com/) - Pré-processador CSS utilizado para estilizar a aplicação.
- [Axios](https://axios-http.com/) - Cliente HTTP para fazer requisições à API.

## Funcionalidades

- **Criação de Cards:** Os usuários podem adicionar novos cards de tarefas com facilidade.
- **Edição de Cards:** Permite a edição do conteúdo e a cor dos cards existentes.
- **Marcação de Favoritos:** Os usuários podem marcar cards como favoritos, destacando-os na lista.
- **Filtragem:** A interface suporta filtros para exibir cards por conteúdo, favoritos e data de criação.
- **Notificações:** Feedback visual ao usuário através de notificações de sucesso, erro ou aviso.

## Desafios

Um dos principais desafios no desenvolvimento deste projeto foi a utilização do Sass. Antes deste projeto, eu tinha experiência com outras bibliotecas de estilização, mas Sass era uma novidade. Embora tenha sido uma curva de aprendizado, o uso de Sass proporcionou maior controle sobre os estilos, permitindo a criação de uma interface mais organizada e fácil de manter.

## Instalação

### Pré-requisitos

- Node.js (versão 16.X.X)
- npm (versão 8.X.X)

### Passos para Instalar

1. Clone este repositório:

   ```bash
   git clone git@github.com:Nizoszz/corelab-web-challenge-impl.git
   ```

2. Entre na pasta do projeto:

   ```bash
   cd dashboard-de-tarefas
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. CInicie o servidor de desenvolvimento::
   ```bash
   npm run dev
   ```
5. Abra o navegador e acesse http://localhost:3000 para visualizar a aplicação.
