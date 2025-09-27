# CoreNotes – Aplicativo de Notas e Tarefas
Autor: Mauro Luiz dos Santos Junior

## Descrição Geral

Este pull request implementa o CoreNotes, um aplicativo web responsivo para criação, organização e gerenciamento de notas/tarefas, desenvolvido em React + TypeScript, com foco em experiência visual, responsividade e usabilidade. O projeto segue o mockup e os requisitos descritos em [`Leiame.md`](Leiame.md:1), incluindo filtros, favoritos, edição inline, seleção de cor, busca, confirmação de exclusão e integração completa com backend.

## Como configurar e executar o aplicativo localmente

1. **Ajuste a versão do Node.js:**  
   O projeto requer Node.js na versão 16.x para garantir compatibilidade total.  
   Recomenda-se o uso de uma ferramenta de gerenciamento de versões como [nvm](https://github.com/nvm-sh/nvm) (Linux/Mac) ou [nvm-windows](https://github.com/coreybutler/nvm-windows) para alternar facilmente entre versões.  
   
   Isso é importante para alinhar o ambiente às exigências do desafio e evitar problemas de compatibilidade.

   ```sh
   nvm install 16
   nvm use 16
   ```

2. Instale as dependências:
   ```sh
   npm install
   ```
3. Baixe o repositório do backend e siga as instruções detalhadas em [`backend/PULL_REQUEST.md`](../backend/PULL_REQUEST.md) para configurar corretamente (incluindo variáveis de ambiente, geração de APP_KEY e seed/reset do banco).
   Após configurar, inicie o servidor de desenvolvimento, caso ainda não esteja rodando:
   ```sh
   npm run dev
   ```
 > Certifique-se de que o backend esteja rodando em [http://localhost:3333](http://localhost:3333) para o funcionamento completo da API.

4. Acesse em [http://localhost:3000](http://localhost:3000)

## Checklist de Funcionalidades

- [x] CRUD completo de tarefas (criar, listar, editar, deletar)
- [x] Marcar/desmarcar favorito
- [x] Filtro por cor e busca textual
- [x] Responsividade total (mobile first)
- [x] Integração visual com mockup
- [x] Testes automatizados cobrindo fluxos principais
- [x] Padronização com Prettier e ESLint

## Detalhes Técnicos das Implementações

- **Criação do Tipo de Tarefa:**  
  Adicionado [`src/types/Task.ts`](frontend/src/types/Task.ts:1) com a interface `ITask`, espelhando a estrutura do backend.

- **Refatoração de Páginas:**  
  O diretório de páginas foi renomeado para `Tasks`, e arquivos internos ajustados para refletir a nova entidade.

- **API do Frontend:**  
  [`src/lib/api.ts`](frontend/src/lib/api.ts:1) implementa funções CRUD (`getTasks`, `createTask`, `updateTask`, `deleteTask`) para o endpoint `/tasks`, com tipagem forte.

- **Ponto de Entrada:**  
  [`src/index.tsx`](frontend/src/index.tsx:1) renderiza `TasksPage` como página principal.

- **Componentização:**  
  - `CreateNote`: formulário de criação de tarefas, integrado ao estado global.
  - `Card`: exibe tarefa, permite favoritar, editar, alterar cor e deletar, com edição inline e animação visual.
  - `ColorPicker`: seleção de cor, visual e comportamento idênticos ao mockup, posicionado dinamicamente.
  - `ConfirmationLightbox`: confirmação de exclusão, prevenindo remoções acidentais.
  - `Search`: input controlado para busca textual.

- **Estilos e Responsividade:**  
  SCSS modular, grid responsivo, adaptação mobile, alinhamento visual fiel ao mockup.

- **Detalhes Visuais e Correções:**  
  - Cor do card persiste após edição.
  - Estrela de favorito alterna corretamente.
  - Cards e títulos centralizam no mobile.
  - Botão de adicionar nota insere ao final da lista.

- **Limpeza e Padronização:**  
  Ajustes de linting, tipagem e remoção de código morto.

## Funcionalidades Implementadas

- Criação, edição, exclusão e listagem de tarefas
- Marcação de tarefas como favoritas (favoritas no topo)
- Filtro por cor integrado ao header (ColorPicker)
- Busca textual dinâmica
- Confirmação de exclusão via lightbox
- Responsividade e adaptação mobile
- Integração visual fiel ao mockup

## Testes Automatizados

- Teste em [`src/pages/Tasks/Tasks.test.tsx`](frontend/src/pages/Tasks/Tasks.test.tsx:1) cobre:
  - Renderização da lista de tarefas e favoritos
  - Criação de nova tarefa
  - Busca textual
  - Marcação/desmarcação de favorito
  - Exclusão de tarefa com confirmação
- Funções de API mockadas para isolar interface
- Todos os testes passam sem warnings de atualização de estado (`act`)

## Observações

- Primeira seleção de cor remove todos os filtros
- O botão de adicionar nota insere a nova nota ao final da lista
- O código está limpo, modular e alinhado às melhores práticas