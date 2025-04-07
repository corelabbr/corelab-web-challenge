# Pull Request - CoreLab Todo App

## Descrição

Este Pull Request contém a implementação completa do desafio CoreLab Todo App, incluindo o frontend em React com TypeScript e o backend em NestJS com MongoDB.

## Implementações

### Frontend

1. **Interface Responsiva**
   - Design moderno e atraente seguindo o mockup fornecido
   - Suporte para dispositivos móveis e desktop
   - Tema claro/escuro com transições suaves

2. **Gerenciamento de Tarefas**
   - Criação, edição e exclusão de tarefas
   - Marcação de tarefas como favoritas
   - Seleção de cores personalizadas para cada tarefa

3. **Filtros e Pesquisa**
   - Filtro por cor
   - Filtro de favoritos
   - Pesquisa por texto (título e descrição)
   - Ordenação com favoritos no topo

4. **Tecnologias Utilizadas**
   - React com TypeScript
   - SCSS para estilização
   - React Query para gerenciamento de estado e cache
   - ESLint e Prettier para formatação de código

### Backend

1. **API RESTful**
   - Endpoints para CRUD completo de tarefas
   - Validação de dados com class-validator
   - Tratamento de erros

2. **Banco de Dados**
   - MongoDB com Mongoose como ODM
   - Schema bem definido para tarefas
   - Conversão de IDs para compatibilidade com o frontend

3. **Tecnologias Utilizadas**
   - NestJS com TypeScript
   - MongoDB para armazenamento de dados
   - Validação de dados
   - ESLint e Prettier para formatação de código

## Extras Implementados

1. **Tipagens e Interfaces**
   - TypeScript com interfaces bem definidas em todo o projeto
   - Tipagem forte para todos os componentes, serviços e funções
   - Garantia de tipo em todo o fluxo de dados

2. **ESLint e Prettier**
   - Configurações personalizadas para garantir qualidade e consistência do código
   - Regras específicas para React e TypeScript no frontend
   - Regras específicas para NestJS e TypeScript no backend
   - Integração entre ESLint e Prettier

3. **Docker**
   - Dockerfile.frontend para o frontend
   - Dockerfile.backend para o backend
   - docker-compose.yml para orquestrar todos os serviços
   - Configuração do Nginx para servir o frontend e fazer proxy para o backend
   - Volume persistente para o MongoDB

4. **Testes**
   - Testes unitários para componentes React no frontend
     - Testes para o componente TodoCard
   - Testes de integração para serviços no backend
     - Testes para o TodoService

5. **CI/CD**
   - Configuração do GitHub Actions para:
     - Executar linting
     - Executar testes
     - Construir aplicações
     - Construir imagens Docker
   - Pipeline separado para frontend e backend
   - Integração com Docker para build e push

## Funcionalidades Detalhadas

### Todo Card
- Exibição de título, descrição e data de criação
- Indicador visual de cor personalizada
- Botões para favoritar, editar e excluir
- Animação suave ao aparecer
- Modal de confirmação para exclusão

### Todo Form
- Campos para título, descrição
- Seletor de cores intuitivo
- Opção para marcar como favorito
- Validação de campos obrigatórios

### Filtragem
- Filtro de cores com seleção visual
- Toggle para mostrar apenas favoritos
- Barra de pesquisa com funcionalidade de busca em tempo real

### Tema
- Toggle para alternar entre tema claro e escuro
- Persistência de preferência do usuário
- Transição suave entre temas

## Arquivos Extras Criados

1. **Docker**
   - Dockerfile.frontend
   - Dockerfile.backend
   - docker-compose.yml
   - nginx.conf

2. **CI/CD**
   - .github/workflows/ci.yml

3. **Testes**
   - frontend/src/components/TodoCard/TodoCard.test.tsx
   - backend/test/todo.service.spec.ts

4. **Configuração**
   - Configurações atualizadas do ESLint e Prettier

## Como Testar

Siga as instruções no README.md para configurar e executar o projeto localmente.

Opções para executar:
1. Executar frontend e backend separadamente (recomendado para desenvolvimento)
2. Executar com Docker Compose (recomendado para produção)

## Conclusão

O projeto foi desenvolvido seguindo todas as especificações do desafio, com foco em qualidade de código, usabilidade e performance. Adicionei vários extras para demonstrar minhas habilidades técnicas e atenção aos detalhes.

Todas as funcionalidades solicitadas foram implementadas e testadas:
- CRUD completo de tarefas
- Marcação de favoritos
- Definição de cores
- Interface responsiva
- Filtragem e pesquisa

Estou à disposição para qualquer esclarecimento ou ajuste necessário. 