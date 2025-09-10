# Corelab O Desafio - Solução Completa

## Visão Geral

Esta solução implementa uma aplicação completa de gerenciamento de tarefas (to-do list) conforme os requisitos do desafio Corelab. A aplicação consiste em um backend API desenvolvido em Node.js com Express e TypeScript, e um frontend desenvolvido em React com TypeScript, proporcionando uma experiência de usuário moderna e responsiva.

## Arquitetura da Solução

### Backend (API)
- **Framework**: Node.js com Express.js e TypeScript
- **Banco de Dados**: MongoDB com Mongoose ODM
- **Funcionalidades**: API RESTful completa com operações CRUD
- **Validação**: Validação de entrada de dados e tratamento de erros
- **CORS**: Configurado para permitir requisições do frontend

### Frontend (Web)
- **Framework**: React.js com TypeScript
- **Estilização**: Tailwind CSS com componentes shadcn/ui
- **Gerenciamento de Estado**: React Hooks (useState, useEffect)
- **Requisições HTTP**: Axios
- **Responsividade**: Design mobile-first com grid responsivo

## Funcionalidades Implementadas

### Requisitos Funcionais Atendidos

1. **CRUD Completo de Tarefas**
   - ✅ Criar novas tarefas com título, descrição e cor
   - ✅ Visualizar todas as tarefas em um layout de cards
   - ✅ Editar tarefas existentes (título, descrição, cor)
   - ✅ Excluir tarefas com confirmação

2. **Sistema de Favoritos**
   - ✅ Marcar/desmarcar tarefas como favoritas
   - ✅ Exibição de favoritos no topo da lista
   - ✅ Filtro específico para visualizar apenas favoritos

3. **Sistema de Cores**
   - ✅ Definir cores personalizadas para cada tarefa
   - ✅ Paleta de 8 cores predefinidas
   - ✅ Filtro por cor específica
   - ✅ Visualização das cores nos cards

4. **Filtros e Pesquisa**
   - ✅ Filtro por tarefas favoritas
   - ✅ Filtro por cor
   - ✅ Pesquisa por texto (título e descrição)
   - ✅ Combinação de múltiplos filtros

5. **Interface Responsiva**
   - ✅ Design mobile-first
   - ✅ Layout adaptativo para diferentes tamanhos de tela
   - ✅ Grid responsivo (1-4 colunas conforme o dispositivo)

### Requisitos Técnicos Atendidos

1. **Backend**
   - ✅ Node.js com framework moderno (Express.js)
   - ✅ TypeScript para tipagem estática
   - ✅ MongoDB como banco de dados
   - ✅ API RESTful bem estruturada
   - ✅ Validação e tratamento de erros

2. **Frontend**
   - ✅ React.js com TypeScript
   - ✅ Componentes modernos e reutilizáveis
   - ✅ Estilização com pré-processador (Tailwind CSS)
   - ✅ Interface visualmente atraente
   - ✅ Responsividade completa

## Estrutura do Projeto

### Backend (`/corelab-backend`)
```
src/
├── models/
│   └── Task.ts             
├── controllers/
│   └── taskController.ts   
├── routes/
│   └── taskRoutes.ts       
├── config/
│   └── database.ts          
├── app.ts                   
└── server.ts               
```

### Frontend (`/corelab-frontend`)
```
src/
├── components/
│   ├── ui/                 
│   ├── TaskCard.jsx        
│   ├── AddTaskForm.jsx      
│   └── FilterBar.jsx       
├── services/
│   └── api.js               
└── App.jsx                  
```

## API Endpoints

### Rotas Implementadas

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/task` | Lista todas as tarefas com filtros opcionais |
| GET | `/api/task/:id` | Busca uma tarefa específica |
| POST | `/api/task` | Cria uma nova tarefa |
| PUT | `/api/task/:id` | Atualiza uma tarefa existente |
| DELETE | `/api/task/:id` | Remove uma tarefa |

### Parâmetros de Query Suportados

- `favorite=true`: Filtra apenas tarefas favoritas
- `color=#hexcode`: Filtra por cor específica

### Exemplo de Payload

```json
{
  "title": "Minha tarefa",
  "description": "Descrição opcional",
  "isFavorite": false,
  "color": "#ffeb3b"
}
```

## Modelo de Dados

### Schema do MongoDB

```typescript
{
  title: String (obrigatório),
  description: String (opcional),
  isFavorite: Boolean (padrão: false),
  color: String (padrão: "#ffffff"),
  createdAt: Date (automático),
  updatedAt: Date (automático)
}
```

## Tecnologias e Bibliotecas Utilizadas

### Backend
- **Node.js**: Runtime JavaScript
- **Express.js**: Framework web minimalista
- **TypeScript**: Superset tipado do JavaScript
- **MongoDB**: Banco de dados NoSQL
- **Mongoose**: ODM para MongoDB
- **CORS**: Middleware para Cross-Origin Resource Sharing
- **dotenv**: Gerenciamento de variáveis de ambiente

### Frontend
- **React.js**: Biblioteca para interfaces de usuário
- **TypeScript**: Tipagem estática
- **Tailwind CSS**: Framework CSS utilitário
- **shadcn/ui**: Componentes UI modernos
- **Lucide React**: Ícones SVG
- **Axios**: Cliente HTTP
- **Vite**: Build tool e dev server

## Instruções de Instalação e Execução

### Pré-requisitos
- Node.js (versão 16.15.0 ou superior)
- MongoDB (local ou remoto)
- npm ou yarn

### Backend

1. **Instalação das dependências**
```bash
cd corelab-backend
npm install #E se der error usar o --force
```

2. **Configuração do ambiente**
```bash
# Criar arquivo .env
PORT=3001
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority
```


3. **Execução**
```bash
# Desenvolvimento
npm run dev

# Produção
npm run build
npm start
```

### Frontend

1. **Instalação das dependências**
```bash
cd corelab-frontend
npm install #E se der error usar o --force
```

2. **Execução**
```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build
```

## Funcionalidades Extras Implementadas

### Melhorias de UX/UI
- **Loading States**: Indicadores de carregamento durante requisições
- **Error Handling**: Tratamento e exibição de erros para o usuário
- **Confirmação de Exclusão**: Modal de confirmação antes de deletar tarefas
- **Feedback Visual**: Animações e transições suaves
- **Responsividade Avançada**: Layout otimizado para mobile, tablet e desktop

### Funcionalidades Técnicas
- **Tipagem Completa**: TypeScript em todo o projeto
- **Componentização**: Componentes reutilizáveis e bem estruturados
- **Separação de Responsabilidades**: Arquitetura limpa e organizada
- **Validação de Dados**: Validação tanto no frontend quanto no backend
- **CORS Configurado**: Comunicação segura entre frontend e backend

## Testes Realizados

### Testes Funcionais
- ✅ Criação de tarefas com diferentes cores
- ✅ Edição de tarefas existentes
- ✅ Exclusão de tarefas com confirmação
- ✅ Sistema de favoritos funcionando corretamente
- ✅ Filtros por favoritos e cores
- ✅ Pesquisa por texto
- ✅ Ordenação (favoritos no topo)

### Testes de Responsividade
- ✅ Layout mobile (320px+)
- ✅ Layout tablet (768px+)
- ✅ Layout desktop (1024px+)
- ✅ Grid adaptativo
- ✅ Componentes responsivos

### Testes de Integração
- ✅ Comunicação frontend-backend
- ✅ Persistência de dados no MongoDB
- ✅ Tratamento de erros de rede
- ✅ Estados de loading

## Considerações de Performance

### Backend
- **Indexação**: Índices automáticos do MongoDB para queries eficientes
- **Validação**: Validação de entrada para prevenir dados inválidos
- **Error Handling**: Tratamento robusto de erros

### Frontend
- **Lazy Loading**: Componentes carregados conforme necessário
- **State Management**: Gerenciamento eficiente do estado local
- **Debouncing**: Implementado na pesquisa para reduzir requisições

## Melhorias Futuras Sugeridas

### Funcionalidades
- **Autenticação**: Sistema de login e registro de usuários
- **Categorias**: Organização de tarefas por categorias
- **Datas**: Sistema de prazos e lembretes
- **Anexos**: Possibilidade de anexar arquivos às tarefas
- **Colaboração**: Compartilhamento de tarefas entre usuários

### Técnicas
- **Testes Automatizados**: Jest para backend e React Testing Library para frontend
- **CI/CD**: Pipeline de integração e deploy contínuo
- **Docker**: Containerização da aplicação
- **Cache**: Implementação de cache para melhor performance
- **PWA**: Transformar em Progressive Web App

## Conclusão

Esta solução atende completamente aos requisitos do desafio Corelab, implementando uma aplicação moderna e funcional de gerenciamento de tarefas. A arquitetura escolhida permite escalabilidade e manutenibilidade, enquanto a interface oferece uma experiência de usuário intuitiva e responsiva.

O projeto demonstra proficiência em tecnologias modernas de desenvolvimento web, boas práticas de programação e capacidade de entregar uma solução completa e polida dentro dos requisitos especificados.

---

**Desenvolvido por**: Everson Ramiro da Silva  
**Data**: Setembro 2025  
**Tecnologias**: Node.js, Express, MongoDB, React, TypeScript, Tailwind CSS

