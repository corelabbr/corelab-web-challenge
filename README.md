# Documentação do Desafio Corelab

## Requisitos
 - Node.js >= 18.x
 - pnpm(opcional)

## Instalação

### Configuração do ambiente

1. **Configure as variáveis de ambiente**
```bash
NEXT_PUBLIC_API_URL=http://localhost:3001

3. **Instale as dependencias**
```bash
pnpm install
```
## Uso

### Execute o Servidor em Desenvolvimento
Inicie o projeto de desenvolvimento com:
```bash
pnpm dev
```
O site vai estar rodando na porta [3000](http://localhost:3000).

### Scripts
 
- Iniciar a Aplicação em modo de produção: **`pnpm start`**
- Iniciar a Aplicação em modo de desenvolvimento: **`pnpm dev`**
- Criar build do projeto: **`pnpm build`**
- Rodar testes: **`pnpm test`**
- Formatar os Arquivos: **`pnpm format`**
- Executar Lint: **`pnpm lint`**

## Estrutura do Projeto
- **`public/`**: Contém recursos públicos, como imagens.
- **`src/`**: Contém o código-fonte da aplicação.
  - **`__tests__`**/: Testes unitários e de integração.
  - **`app/`**: Componentes de layout e páginas.
    - **`favicon.ico`**: Ícone da aplicação.
    - **`layout.tsx`**: Componente de layout da aplicação.
    - **`page.tsx`**: Página principal da aplicação.
    - **`todoClient.ts`**: Cliente para gerenciamento de tarefas.
  - **`components/`**: Componentes reutilizáveis da aplicação.
    - **`Card/`**: Componentes relacionados a cartões.
    - **`CardList/`**: Componentes para listagem de cartões.
    - **`Icons/`**: Componentes de ícones.
    - **`Layout/`**: Componentes de layout.
    - **`Search/`**: Componentes de pesquisa.
  - **`context/`**: Contexto da aplicação.
    - **`TodoContext.ts`**: Contexto do Todo. 
  - **`hooks/`**: Hooks personalizados.
    - **`todoHook.ts`**: Hook para o Todo.
  - **`libs/`**: Bibliotecas e funções auxiliares.
    - **`api.ts`**: arquivo de configuração do axios.
  - **`styles/`**: Arquivos de estilo.
    - **`break-points.scss`**: Definição de breakpoints para responsividade.
    - **`colors.scss`**: Definição de cores da aplicação.
    - **`global.module.scss`**: Estilos globais.
    - **`variables.scss`**: Variáveis da aplicação.
  - **`types/`**: Definição de tipos.
    - **`Colors.ts`**: Tipos relacionados às cores.
    - **`Todo.ts`**: Tipos relacionados ao todo.
  - **`env.ts`**: Configuração das variáveis de ambiente.
- **`.editorconfig`**: Configuração para padronização do estilo de código entre diferentes editores de código.
- **`.env`**: Arquivo de variáveis de ambiente para configuração da aplicação.
- **`.eslintrc.json`**: Configuração do ESLint do next.
- **`.gitignore`**: Lista de arquivos e pastas a serem ignorados pelo Git.
- **`.prettierrc.json`**: Configuração do Prettier para formatação de código.
- **` eslint.config.mjs`**: Configuração adicional do ESLint.
- **`jest.config.ts`**: Configuração do Jest para execução dos testes.
- **`jest.setup.ts`**: Arquivo de setup do Jest.
- **`next.config.mjs`**: Configuração do Next.js.
- **`package.json`**: Gerenciamento de dependências e scripts da aplicação.
- **`pnpm-lock.yaml`**: Arquivo de lock para o gerenciador de pacotes PNPM.
- **`tsconfig.json`**: Configuração do TypeScript.

## Desenvolvimento
### Adicionar novos recursos
1. Adicionar novas páginas:
  - Para criar uma nova página, adicione um novo arquivo .tsx dentro da pasta **`src/app`**. O Next.js automaticamente trata qualquer arquivo dentro dessa pasta como uma nova rota com base na estrutura de diretórios.
  - Exemplo: Para criar uma página acessível em **`/about**`, crie um arquivo **`about/page.tsx`** dentro de **`src/app`**.

2. Adicionar novos componentes:
  - Para adicionar um novo componente, crie uma pasta com o nome do componente dentro de **`src/components`**. Dentro dessa pasta, adicione os arquivos necessários, como o componente principal (index.tsx) e estilos específicos (.module.scss).
  - Exemplo: Para criar um componente Button, crie uma pasta **`src/components/Button`** com os arquivos Button.tsx e Button.module.scss.

## Testes
 - Crie seus arquivos de testes na pasta **`src/__tests__/`**, ou ao lado do componente que queira testar.
