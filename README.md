# CoreLab Todo App

Aplicativo de gerenciamento de tarefas desenvolvido como parte do desafio técnico CoreLab.

## Estrutura do Projeto

O projeto está organizado em duas partes principais:

- **Frontend**: Aplicação React com TypeScript
- **Backend**: API REST desenvolvida com NestJS e MongoDB

## Tecnologias Utilizadas

### Frontend
- React com TypeScript
- SCSS para estilização
- React Query para gerenciamento de estado e cache
- ESLint e Prettier para formatação de código

### Backend
- NestJS com TypeScript
- MongoDB para banco de dados
- Mongoose como ODM
- Validação de dados com class-validator
- ESLint e Prettier para formatação de código

## Funcionalidades

- Criar, editar e excluir tarefas
- Marcar tarefas como favoritas
- Escolher cores personalizadas para tarefas
- Filtrar tarefas por cor
- Filtrar tarefas favoritas
- Pesquisar tarefas por título e descrição
- Alternar entre tema claro e escuro
- Interface responsiva para dispositivos móveis e desktop

## Como executar o projeto

### Requisitos

- Node.js (versão 16.x ou superior)
- npm (8.x ou superior)
- MongoDB (local ou remoto)

### Backend

1. Navegue até a pasta do backend:
```
cd backend
```

2. Instale as dependências:
```
npm install
```

3. Inicie o MongoDB localmente (ou use um serviço MongoDB remoto)

4. Execute o projeto em modo de desenvolvimento:
```
npm run start:dev
```

O servidor estará disponível em `http://localhost:3333`.

### Frontend

1. Navegue até a pasta do frontend:
```
cd frontend
```

2. Instale as dependências:
```
npm install
```

3. Execute o projeto:
```
npm start
```

A aplicação estará disponível em `http://localhost:3000`.

## Extras implementados

### 1. Tipagens e Interfaces
O projeto utiliza TypeScript com interfaces bem definidas para garantir a tipagem correta dos dados em toda a aplicação.

### 2. ESLint
Regras personalizadas do ESLint para garantir a qualidade e consistência do código.

### 3. Prettier
Configuração personalizada do Prettier para formatação consistente do código.

### 4. Docker
Arquivos Docker e Docker Compose para facilitar a execução do projeto em ambientes isolados.

Para executar o projeto usando Docker:
```
docker-compose up
```

### 5. Testes
Testes unitários e de integração para garantir a qualidade do código.

Para executar os testes:
```
# Backend
cd backend
npm run test

# Frontend
cd frontend
npm test
```

### 6. CI/CD
Configuração de GitHub Actions para integração contínua e deploy contínuo.

## Estrutura de Diretórios

### Frontend
```
frontend/
├── public/            # Arquivos públicos
├── src/               # Código fonte
│   ├── components/    # Componentes React
│   ├── lib/           # Bibliotecas e utilitários
│   ├── pages/         # Páginas da aplicação
│   ├── services/      # Serviços para comunicação com API
│   ├── styles/        # Estilos SCSS
│   ├── types/         # Definições de tipos TypeScript
│   └── utils/         # Funções utilitárias
```

### Backend
```
backend/
├── src/               # Código fonte
│   ├── config/        # Configurações
│   ├── modules/       # Módulos da aplicação
│   │   └── todos/     # Módulo de tarefas
│   │       ├── controllers/  # Controladores
│   │       ├── dto/          # Objetos de transferência de dados
│   │       ├── interfaces/   # Interfaces
│   │       ├── module/       # Definição do módulo
│   │       ├── schemas/      # Schemas do MongoDB
│   │       └── services/     # Serviços
```

## Desenvolvido por

Victor (neil-lima)