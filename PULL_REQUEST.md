# PR: Implementação completa da To-Do List (API + Web + Docker)

## Resumo
Este PR entrega uma aplicação de To-Do List full-stack composta por:
- Back-end com NestJS (módulo de tarefas, persistência em banco relacional PostgreSQL, validações, CORS e variáveis de ambiente).
- Front-end com Next.js (App Router), TypeScript e Tailwind CSS, construído de cima para baixo: nome do site -> caixa de busca -> formulário de criação -> área de tarefas favoritas -> área de outras tarefas.
- Conteinerização com Docker/Docker Compose em ambos os projetos, `.env` para configuração e scripts de desenvolvimento/produção.

## Escopo deste PR
- Implementa toda a base do back-end (módulos, controllers, services, DTOs e entity de `Task`, integração com banco via `database.module`).
- Implementa todo o front-end (página principal e componentes: formulário, filtros/busca, item de tarefa, estados de carregamento e fallback de erro).
- Integra os dois lados via cliente HTTP centralizado no web (`src/services/api.ts`).
- Adiciona Dockerfiles e `docker-compose.yml` para API e Web, além de arquivos `.env` de ambos os lados.

## Arquitetura e Tecnologias
- Back-end: NestJS + TypeScript, arquitetura modular (`tasks.module`, `tasks.controller`, `tasks.service`, DTOs e `task.entity`), camada de banco (módulo de database) e inicialização via `main.ts` com Swagger.
- Banco de dados: PostgreSQL 15 (imagem oficial `postgres:15`).
- Front-end: Next.js (App Router em `src/app`), TypeScript, Tailwind CSS; componentes reutilizáveis para formulário, filtros e listagem; tipos compartilhados em `src/types` e cliente HTTP em `src/services`.
- Infra: Dockerfiles para dev/prod, Compose para orquestração, `.env` para configuração. SQL de bootstrap em `to-do-list-api/init.sql`.

---

## Back-end (to-do-list-api)

### Estrutura principal
- `src/main.ts`: bootstrap do Nest, configura CORS, validação global, Swagger e prefixo (`API_PREFIX`, padrão `api/v1`). Porta em uso: 3001.
- `src/app.module.ts`: módulo raiz, importa o módulo de database e o módulo de tarefas.
- `src/database/database.module.ts`: configuração do acesso ao banco PostgreSQL (host/porta/credenciais via `.env`).
- `src/tasks/*`: domínio de tarefas (controller, service, module, DTO e entity).
  - `entities/task.entity.ts`: mapeamento da entidade `Task` no banco.
  - `dto/task.dto.ts`: contratos de entrada/validação para criação/atualização.
  - `tasks.controller.ts`: rotas REST.
  - `tasks.service.ts`: regras de negócio e orquestração de persistência.

### Modelo e Regras
- Entidade `Task` com campos típicos de uma to-do (ex.: id, título/descrição, flag de favorito, status, timestamps). O esquema inicial é aplicado via `init.sql`.
- Validação aplicada via DTOs (ex.: campos obrigatórios, tipos válidos).

### Endpoints
Observação: os nomes/rotas seguem o padrão REST do NestJS e o domínio `tasks`.
- `GET /tasks`: lista tarefas (suporta filtros como texto, status e favorito).
- `GET /tasks/:id`: obtém uma tarefa por ID.
- `POST /tasks`: cria nova tarefa.
- `PATCH /tasks/:id`: atualiza campos da tarefa (ex.: título/descrição, status, favorito).
- `DELETE /tasks/:id`: remove tarefa.

Swagger disponível em `http://localhost:3001/api/v1/docs`.

### Banco de Dados
- Banco: PostgreSQL 15.
- Compose expõe `5432:5432` e define `DATABASE_*` no serviço da API.
- Variáveis padrão (`to-do-list-api/.env`):
  - `DATABASE_HOST=localhost`
  - `DATABASE_PORT=5432`
  - `DATABASE_NAME=to-do-list-api`
  - `DATABASE_USERNAME=admin`
  - `DATABASE_PASSWORD=admin123`
- `init.sql` cria a base/tabela de tarefas na primeira subida.

### Docker/Execução
- `Dockerfile` e `Dockerfile.dev` para a API (produção e dev com hot-reload).
- `docker-compose.yml` (na pasta da API) sobe `postgres:15` + API (porta 3001).
- Scripts `npm` no `package.json` (ex.: `start:dev`, `build`, `start`).

---

## Front-end (to-do-list-web)

### Estrutura visual (top-down)
1) Nome do site (header)
2) Caixa de busca (filtros)
3) Caixa/formulário para criar tarefa
4) Área das tarefas favoritas
5) Área das outras tarefas

Essa ordem orientou o desenvolvimento incremental: a cada seção implementada, as funcionalidades correspondentes foram conectadas ao back-end.

### Pastas/Arquivos principais
- `src/app/page.tsx`: página principal (App Router) que organiza as seções.
- `src/components/TaskForm.tsx`: criação de tarefas (controle de input e submit).
- `src/components/TaskFilters.tsx`: busca/filtro de tarefas (texto, status e favoritos).
- `src/components/TaskItem.tsx`: item de tarefa (exibir, favoritar, excluir/editar conforme disponível).
- `src/components/Loading.tsx`: estado de carregamento enquanto busca dados.
- `src/components/ErrorBoundary.tsx`: fallback de erro para falhas de rede/execução.
- `src/services/api.ts`: cliente HTTP central (baseURL com prefixo `/api/v1`), funções para CRUD.
- `src/types/task.ts`: tipagem da entidade `Task` utilizada no front.
- `tailwind.config.ts` + `src/app/globals.css`: estilização.

### Integração com a API
- Cliente em `src/services/api.ts` concentra as chamadas (listar, criar, atualizar, favoritar, excluir) usando o prefixo `/api/v1`.
- Rewrites no `next.config.ts` permitem proxyar chamadas para a API em desenvolvimento.
- Componentes consomem essas funções e atualizam estado local conforme o fluxo (loading/erro/sucesso).

### UX/Comportamento
- Busca filtra a lista conforme o usuário digita/submete.
- Criação envia o payload ao back-end e atualiza a lista.
- Favoritar/Desfavoritar reflete imediatamente e persiste na API.
- Tarefas favoritas aparecem primeiro, seguidas das demais.
- Feedbacks de carregamento e erro presentes via `Loading`/`ErrorBoundary`.

### Docker/Execução
- `Dockerfile` e `docker-compose.yml` (na pasta web) para servir a aplicação em dev/prod.
- `.env` do web define a URL base quando necessário (ex.: `NEXT_PUBLIC_API_URL`).
- Scripts `npm` no `package.json` (ex.: `dev`, `build`, `start`, `lint`).

---

## Fluxo de Desenvolvimento (caminho seguido)
1) Início pelo back-end: definição do domínio `tasks`, entidade e DTOs, implementação de CRUD, busca e favoritos, conexão com banco PostgreSQL e Docker Compose.
2) Depois, front-end em Next.js, construindo a página de cima para baixo: nome do site -> busca -> criação -> favoritas -> outras. A cada seção, as chamadas à API e estados (loading/erro) foram ajustados.
3) Integração e refinamentos: tratamento de CORS, variáveis de ambiente, ajustes visuais com Tailwind e experiência de uso mais fluida.

## Como rodar

### Com Docker
- API: na pasta `to-do-list-api`, configurar `.env` e executar `docker-compose up -d`.
- Web: na pasta `to-do-list-web`, configurar `.env` (apontando para a API se necessário) e executar `docker-compose up -d`.

### Local (sem Docker)
- API: `cd to-do-list-api && npm install && npm run start:dev` (requer banco local ou via container Postgres).
- Web: `cd to-do-list-web && npm install && npm run dev` (requer que o front aponte para a API, via rewrite ou variável pública).

## Testes Manuais/QA sugeridos
- Criar uma tarefa e verificar persistência (recarregar a página).
- Buscar por termos específicos e confirmar o filtro.
- Marcar/desmarcar como favorita e observar mudança de seção.
- Excluir uma tarefa e confirmar remoção.
- Validar comportamentos de erro (ex.: API offline) e o fallback no front.

## Notas Finais
- A estrutura dos diretórios e arquivos citados está alinhada ao que consta no repositório (`to-do-list-api/*` e `to-do-list-web/*`).
- Este PR consolida a primeira versão funcional do produto, com as funcionalidades principais da To-Do List atendidas e base sólida para evoluções.
