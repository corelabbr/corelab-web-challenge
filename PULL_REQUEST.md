# Geferson Almeida Lopes

[Linkedin](https://www.linkedin.com/in/algeferson/) |
[Github](https://github.com/GefersonLopes) | 
[Email](mailto:gefersonjefrey@gmail.com)

## Link para vídeo explicativo
[Youtube](https://youtu.be/U_D_nwJzZa0)

# Documentação do Projeto Back-End

Este documento fornece uma explicação detalhada do código back-end desenvolvido para gerenciar um sistema de cards, que inclui funcionalidades para criar, buscar, atualizar e deletar cards. A aplicação é construída usando NestJS, TypeORM e PostgreSQL, e segue as melhores práticas de desenvolvimento, incluindo validação de dados e testes unitários.

## Estrutura dos principais diretórios

- [entities/:] Contém as definições das entidades do banco de dados.

- [dto/:] Contém os Data Transfer Objects (DTOs) para validar e transferir dados entre camadas.

- [controllers/:] Contém os controladores que lidam com as requisições HTTP.

- [services/:] Contém os serviços que implementam a lógica de negócios.

- [tests/:] Contém os testes unitários para verificar a funcionalidade do código.

### Controllers

- POST /cards: Cria um novo card.

- GET /cards: Retorna todos os cards.

- GET /cards/search: Busca cards com base em parâmetros como título, cor e se é favorito.

- GET /cards/
: Retorna um card específico com base no ID.

- PATCH /cards/
: Atualiza um card específico com base no ID.

- DELETE /cards/
: Remove um card específico com base no ID.

### Services

- create(): Cria um novo card.

- findAll(): Retorna todos os cards.

- findOne(): Retorna um card específico.

- update(): Atualiza um card específico.

- remove(): Remove um card específico.

- search(): Busca cards com base em parâmetros como título, cor e se é favorito.

# Documentação do Projeto Front-End

Este projeto front-end foi desenvolvido utilizando React, Redux e Bootstrap, com o objetivo de criar uma interface interativa para gerenciamento de cards. A aplicação inclui funcionalidades como criação, edição, exclusão e busca de cards, além de uma interface responsiva e interativa com feedback visual para o usuário.

## Estrutura dos principais diretórios

- [Componentes]: Os componentes React são divididos de forma modular, com cada componente focando em uma parte específica da interface, como a criação de cards (CardMaker), exibição de cards (Card), modais de confirmação (ModalConfirmation), e a navegação (Navbar).

- [Redux]: A aplicação utiliza Redux para gerenciar o estado global, especialmente para o controle dos cards e do estado dos modais. As funcionalidades de criação, edição e exclusão de cards são gerenciadas por reducers dedicados.

- [Estilos]: O projeto utiliza SCSS para gerenciar estilos, permitindo a reutilização de variáveis e a criação de temas personalizados. Estilos específicos para cores e layout dos cards são organizados em arquivos separados.

- [Yup]: A aplicação utiliza a biblioteca Yup para validar os formulários, garantindo que os dados submetidos pelo usuário atendam aos requisitos definidos.

- [Axios]: O projeto utiliza Axios para realizar requisições HTTP, com configurações adicionais para gerenciar o estado de carregamento e tratar erros globalmente.

- [Serviços]: O projeto inclui serviços personalizados para gerenciar operações de criação, atualização e listagem de cards.