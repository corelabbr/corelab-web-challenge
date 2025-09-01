# Pull Request: ToDo Management Frontend

## 🚀 Descrição do Frontend

### Visão Geral
Implementação do frontend do sistema de gerenciamento de tarefas utilizando React.js.

## 🔧 Funcionalidades Implementadas

### Componente de Card
- Criação de componente `Card` para representação visual das tarefas
- Funcionalidades interativas:
  - Favoritar/desfavoritar
  - Edição de título e descrição
  - Alteração de cor de fundo
  - Exclusão de tarefa

### Detalhes Técnicos
- Hooks do React utilizados:
  - `useState` para gerenciamento de estado
  - `useEffect` para execução de efeitos colaterais (como chamadas à API ou atualização de componentes)
- Integração com API backend
- Tratamento de eventos de usuário
- Design responsivo

## 🛠 Implementações Específicas

### Gerenciamento de Estado
- Estados locais para:
  - Título editável
  - Descrição editável
  - Estado de favorito
  - Paleta de cores
  - Modo de edição


### Design e UX
- Componente reutilizável
- Feedback visual para ações
- Transições suaves
- Paleta de cores personalizável

## 🧪 Testes Realizados
- Criação de tarefa
- Edição de tarefa
- Exclusão de tarefa
- Alteração de cor
- Favoritar/desfavoritar

## 🔍 Melhorias Futuras
- Implementar loading states
- Melhorar acessibilidade

## 🔗 Links
- [Repositório Frontend](https://github.com/anthoniusdev/front-react)
- [Repositório Backend](https://github.com/anthoniusdev/api-node)

## 📦 Tecnologias
- React
- Typescript
- Lucide React Icons
## Passos para Instalação

### 1. Clonar o Repositório
```bash
git clone https://github.com/anthoniusdev/front-react.git
cd front-react
```
Você terá duas opções de instalação:
- Usar Docker
- Usar npm ou yarn
  
### 2. Usando Docker

```bash
docker-compose up -d
```

### 3. Usando npm/yarn
Com npm:
```bash
npm install
```
Com yarn:
```bash
yarn install
```
### 4. Iniciar o Servidor de Desenvolvimento
Com npm:
```bash
npm start dev
```
Com yarn:
```bash
yarn start dev
```

A aplicação será iniciada e estará acessível em:
```bash
http://localhost:3000
```
---
