# Core Notes — Front-end (React + TypeScript)

Interface de notas/tarefas com edição inline, **favoritos**, **paleta de cores** e **busca instantânea**.  

> Stack: **React + TypeScript + SCSS Modules (Create React App)**

---

## ✨ Funcionalidades (UI)

- **Grid** de notas com seções: **Favorites** e **Others** (favoritos sempre primeiro).
- **Criar** nota no composer (“Take a note…”).
- **Editar inline** (clique no card) com **Save** / **Cancel**.
- **Favoritar/desfavoritar** (★) com reordenação imediata.
- **Excluir** via ícone de lixeira.
- **Paleta de cores** (🎨) embutida no card. Cores suportadas: `yellow`, `blue`, `green`, `peach`.
- **Busca local** (case-insensitive) por **título** e **descrição**.
- **UI otimista**: a lista reflete instantaneamente; depois sincroniza com a resposta do backend.
- **Layout alinhado**: o composer “Take a note…” termina exatamente na mesma vertical do campo de busca.

---

## ▶️ Como rodar

```bash
# instalar dependências
npm i
# ou
yarn

# modo dev
npm start
# ou
yarn start
```

### Proxy anti-CORS (CRA)

Em desenvolvimento usamos paths **relativos** (`/tasks`) + proxy do CRA apontando para a API em `http://127.0.0.1:3333`.  
Crie/edite `src/setupProxy.js`:

```js
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    ["/tasks", "/tasks/**"], // cobre /tasks e /tasks/:id (GET/POST/PATCH/DELETE)
    createProxyMiddleware({
      target: "http://127.0.0.1:3333",
      changeOrigin: true,
    })
  );
};
```

> Após criar/alterar este arquivo, **reinicie** o `npm start` do frontend.

### Build

```bash
npm run build
```

---

## 🧱 Arquitetura

```
src/
  components/
    TaskCard/              # Card com edição inline, estrela, lixeira e paleta
    TaskComposer/          # "Take a note…" (criação rápida)
  lib/
    api.ts                 # Client da API (fetch, normalização, erros, paths relativos)
  pages/
    Tasks/
      index.tsx            # Página principal: estado, busca, ordenação, handlers
      Tasks.module.scss    # Layout: alinhamento Search x Composer (CSS vars)
  types/
    Task.ts                # Tipos Task/TaskInput/TaskColor
  setupProxy.js            # Proxy dev → http://127.0.0.1:3333
```

### Componentes-chave

- **TaskCard**
  - Abre edição ao clicar.
  - `save()` envia **sempre `color`** + textos não vazios no **mesmo PATCH** (evita perda de mudanças).
  - Ações: **★** (favoritar), **🗑️** (excluir), **🎨** (paleta).
  - Classes por cor via SCSS Modules (`yellowBg`, `blueBg`, etc.).

- **TaskComposer**
  - Campo colapsado “Take a note…”. Ao enviar, chama `onCreate`.

- **TasksPage**
  - Fonte de verdade em `tasks` (estado local).
  - **Otimismo**: atualiza UI antes do request; na volta aplica a resposta do backend.
  - **Busca local**: filtra por `title`/`description`, case-insensitive.
  - Ordenação consistente: `sortFav` (favoritos primeiro) em todas as mutações.

---

## 🌐 Client de API (`src/lib/api.ts`)

- **Paths relativos** (`/tasks`) — em dev passam pelo proxy (sem CORS).
- `normalizeTask(t)`: compatibiliza payload do back para o tipo do front
  - aceita `isFavorite` **ou** `is_favorite`;
  - mapeia `created_at/updated_at` → `createdAt/updatedAt`.
- `toServerPayload(payload)`: duplica `isFavorite` como `is_favorite` (compatibilidade).
- `handle(res)`: trata 2xx, `204 No Content` e respostas sem JSON (retorna `null` nesses casos).
- **Métodos expostos**:
  - `listTasks()`, `getTask(id)`, `createTask(payload)`, `updateTask(id, patch)`, `deleteTask(id)`.
  - `updateTask` usa **PATCH** (`/tasks/:id`) e, se a API responder sem JSON, sincroniza via `getTask(id)`.

---

## 🧠 Fluxos de UI (estado + rede)

- **Criar**
  1. `onCreate` chama `createTask`.
  2. Insere a task criada no topo e reordena por favorito.

- **Editar**
  1. `TaskCard.save()` monta `patch` **sempre com `color`** + textos (se existentes).
  2. `onSave` aplica **otimista**; depois chama `updateTask` e substitui pelo objeto retornado.

- **Favoritar/desfavoritar**
  1. Flip **otimista** (`isFavorite`) → reordena.
  2. `updateTask(id, { isFavorite })`; na resposta, substitui e reordena.

- **Excluir**
  1. Remove do estado **otimista**.
  2. Em falha, reverte snapshot.

---

## 🎨 Layout e estilos

- **SCSS Modules** com variáveis na raiz da página:
  - `--search-w`: largura do campo de busca (padrão `360px`).
  - `--gap`: espaçamento da topbar.
- `.composerRow` usa `max-width: calc(100% - var(--search-w) - var(--gap))` para o **composer terminar exatamente onde o Search termina**, sem mudar o Search.
- Responsivo: abaixo de `900px`, Search e Composer ocupam `100%` de largura.

---

## 🧪 Checklist de teste (UI)

1. Criar uma nota pelo composer.
2. Clicar no card, editar **título/descrição** e **cor**, clicar **Save**.
3. Favoritar (★): card deve ir para **Favorites**; desfavoritar: volta para **Others**.
4. Buscar por trecho (título/descrição): apenas os cards correspondentes permanecem.
5. Excluir via lixeira: card some da grade; em falha, o item volta.

> Em dev, verifique DevTools › Network: as chamadas devem ir para **/tasks** (paths relativos via proxy).
