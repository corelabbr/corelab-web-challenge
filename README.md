# Core Notes — To‑do List (Next.js(ReactTS) + NestJS + PostgreSQL + Docker)

Aplicação full‑stack de lista de tarefas (to‑do) chamada Core Notes. Front‑end em Next.js (React + TypeScript + TailwindCSS), back‑end em NestJS com PostgreSQL, ambos com suporte a execução local (npm) e via Docker Compose.

**Repositório**
- Front-end: <a href="https://github.com/DavidBotelhoo/corelab-web-challenge">`corelab-web-challenge`</a>
- Back-end: <a href="https://github.com/DavidBotelhoo/corelab-api-challenge">`corelab-api-challenge`</a>


**Visão Geral**
- Core Notes permite criar, editar, excluir, buscar tarefas, e marcar como favoritas.
- A API expõe endpoints REST com validação, paginação/filtros e documentação via Swagger.
- No desenvolvimento local, o Next.js reescreve chamadas `/api/*` para o NestJS.

Arquivos úteis para referência:
- Rewrites do Next: `to-do-list-web/next.config.ts:8`
- Base URL no front: `to-do-list-web/src/services/api.ts:5`
- Porta do back (Nest): `to-do-list-api/src/main.ts:51`
- Exemplo de env do back: `to-do-list-api/.env.example:1`
- Compose unificado (web+api+db): `to-do-list-web/docker-compose.yml:1`


**Funcionalidades**
- Criar, listar, editar e excluir tarefas.
- Marcar como favorita.
- Busca por texto.
- Ordenação por data de criação; seção dedicada para favoritos.
- API com validação (class-validator), TypeORM + PostgreSQL e Swagger.


**Stack**
- Front-end: Next.js 15, React 19, TypeScript, TailwindCSS 4.
- Back-end: NestJS 10, TypeORM, PostgreSQL 15, Swagger.
- Infra: Docker/Docker Compose.


**Pré‑requisitos**
- Node.js 22+ (o front exige `"node": ">=22.0.0"`).
- npm (ou outro gerenciador de pacotes).
- Docker + Docker Compose (opcional, para subir tudo em contêineres ou apenas o banco).


**Rodando com NPM (desenvolvimento local)**
- Back‑end (NestJS):
  1. Em `to-do-list-api`, duplique o `.env.example` para `.env` e ajuste as variáveis conforme seu ambiente (host/porta/credenciais do PostgreSQL). Exemplo pronto no repositório: `to-do-list-api/.env.example:1`.
  2. Garanta um PostgreSQL acessível (pode ser local ou via Docker). Opções:
     - Local: crie o banco `to-do-list-api` e um usuário compatível com seu `.env`.
     - Docker (somente banco): na raiz do front, rode apenas o serviço do Postgres do compose unificado: `docker compose -f to-do-list-web/docker-compose.yml up -d postgres`.
  3. Instale dependências e suba em modo watch:
     - `cd to-do-list-api`
     - `npm install`
     - `npm run start:dev`
  4. API disponível (por padrão do código) em `http://localhost:3001/api/v1`.
     - Swagger: `http://localhost:3001/api/v1/docs`.

- Front‑end (Next.js):
  1. Em `to-do-list-web`, instale dependências e suba o dev server:
     - `cd to-do-list-web`
     - `npm install`
     - `npm run dev`
  2. Acesse `http://localhost:3000`.
  3. As chamadas para `/api/*` são reescritas para o back local em `http://localhost:3001` (veja `to-do-list-web/next.config.ts:8`). Não é necessário definir `NEXT_PUBLIC_API_URL` para desenvolvimento, pois o cliente usa base relativa (`/api/v1`).


**Rodando com Docker (compose unificado)**
- O arquivo `to-do-list-web/docker-compose.yml` orquestra web, api e postgres.
- Passos:
  1. `cd to-do-list-web`
  2. `docker-compose up -d --build`
  3. Acesse o front em `http://localhost:3000`.
  4. A API deve expor `http://localhost:3333/api/v1` segundo o compose. Importante: o código do back atualmente fixa a porta em 3001 (veja `to-do-list-api/src/main.ts:51`). Se a API não responder via `3333`, ajuste o mapeamento de portas no compose para `"3333:3001"` no serviço `backend`.
     - Alternativas:
       - Ajustar o compose para expor `3333:3001`.
       - Ou alterar o back para ler `PORT` do `.env` (descomentando lógica) e recompilar a imagem.
  5. Swagger: `http://localhost:3333/api/v1/docs` (considere o ajuste de porta acima).

- Somente banco com Docker (para usar npm no front/back):
  - `docker compose -f to-do-list-web/docker-compose.yml up -d postgres`


**Variáveis de Ambiente**
- Back‑end (`to-do-list-api/.env`):
  - `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_NAME`, `DATABASE_USERNAME`, `DATABASE_PASSWORD`.
  - `NODE_ENV`, `API_PREFIX` (p.ex. `api/v1`).
  - `JWT_SECRET`, `JWT_EXPIRES_IN` (planejado para autenticação futura).
  - Exemplos em `to-do-list-api/.env.example:1`.
- Front‑end (`to-do-list-web/.env`):
  - `NEXT_PUBLIC_API_URL` pode ser usado em ambientes de produção. No dev local, o cliente usa base relativa e rewrites (ver `to-do-list-web/src/services/api.ts:5` e `to-do-list-web/next.config.ts:8`).


**Endpoints Principais (API)**
- Base: `/api/v1`
- `GET /tasks`: lista com paginação e filtros (`status`, `isFavorite`, `search`).
- `GET /tasks/stats`: estatísticas por status.
- `GET /tasks/:id`: obtém tarefa por ID.
- `POST /tasks`: cria tarefa.
- `PATCH /tasks/:id`: atualiza tarefa.
- `PATCH /tasks/:id/status`: atualiza status.
- `PATCH /tasks/:id/favorite`: alterna favorito.
- `DELETE /tasks/:id`: remove tarefa.


**Estrutura de Pastas (raiz)**
- `to-do-list-web`: aplicação Next.js (front).
- `to-do-list-api`: aplicação NestJS (back).


**Dicas de Desenvolvimento**
- Node 22+ é necessário para o front (veja `to-do-list-web/package.json:38`).
- CORS no back já permite `http://localhost:3000` (veja `to-do-list-api/src/main.ts:18`).
- Se usar Docker Compose unificado, o Postgres é inicializado com um script (`init.sql`) montado em `to-do-list-web/docker-compose.yml:1`.
- Scripts úteis:
  - Back: `npm run start:dev`, `npm run build`, `npm test`, `npm run migration:run`.
  - Front: `npm run dev`, `npm run build`, `npm start`, `npm run lint`.


