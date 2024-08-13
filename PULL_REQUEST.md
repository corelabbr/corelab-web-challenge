Primeiro, iniciei o projeto com o seguinte comando:
```bash
npx create-next-app --use-pnpm
```

então, rodei o comando para instalar as dependências de produção do projeto: 
```bash
pnpm add axios bootstrap-icons next react react-dom react-loading-skeleton react-toastify
```
e também as de desenvolvimento:
```bash
pnpm add -D @types/react-toastify eslint eslint-config-prettier eslint-plugin-jest eslint-plugin-prettier prettier sass  typescript typescript-eslint
```

configurei o next para rodar sass perfeitamente, alterando o arquivo next.config.mjs.

após isso, rodei o comando de startup do eslint:
```bash 
pnpm create @eslint/config@latest
```

com o arquivo de configuração do eslint criado e configurado, criei o arquivo **`.editorconfig`**, e **`.prettierrc.json`**.


Após isso, eu apaguei os arquivos que vem por padrao dentro da pasta **`app/`**, deixando apenas **`page.tsx`**, **`layout.tsx`** e **`favicon.ico`**.

criei o enum Colors e os types do Todo em **`types/`**.

então, criei a pasta **`styles/`**, junto com os arquivos **`break-points.scss`**, **`global.module.scss`**, e **`variables.scss`**.

importei a logo do app de dentro do figma e coloquei na pasta **`public/`**.

importei as estilizações do bootstrap-icons e do react-toastify no arquivo layout.tsx, coloquei o componente do react-toastify dentro do body da aplicação e alterei a página em **`app/page.tsx`**, deixando-o assíncrono e testando se a requesição estava funcionando perfeitamente do servidor, e também se os icones do bootstrap e as notificações do react-toastify estavam sendo renderizadas.

criei o arquivo **`components/Icons/index.tsx` para armazenar os icones da aplicação.

após isso, criei os componentes que compoem o layout: **`Layout`**, **`Header`**, **`Nav`**, **`Logo`** e **`Main`**.

criei o componente **`Card`**, após isso, criei o componente **`components/CardList`**, para renderiza-los organizadamente, e separa-los entre favoritos e outros.

então criei o componente Colors, q seria a lista de cores para o usuário pintar o todo. 

após todos os componentes criados, deixei o conteúdo responsivo.

agora, para fazer tudo funcionar dinamicamente, criei o arquivo **`context/TodoContext`**, aonde tem toda a lógica de filtrar, deletar, criar e atualizar os todos.

dai criei o arquivo **`hooks/todoHook.ts`**, aonde export o hook useTodo. 

criar toda a logica de filtrar os todos, atualizar o todo, deletar, favoritar e desfavoritar, e filtrar.

só faltava poder criar o todo, então criei o componente **`Card/NewTodo`**.

para ficar visuavelment melhor para o usuário,  importei o css do react-loading-skeleton no **`Layout.tsx`** e o componente <SkeletonTheme />, para configurar seu tema.

agora falta testar o código, então instalei as dependências do Jest:
```bash
pnpm add -D @testing-library/jest-dom @testing-library/react @types/jest jest jest-environment-jsdom ts-node
```

e rodei o comando de inicialização do Jest: 
```bash
pnpm create jest@latest
```

após isso, configurtei o **`jest.config.ts`** e criei o arquivo **`jest.setup.ts`**, seguindo a documentação do next para jest.

criei a pasta **`__tests__`**, e o arquivo **`page.test.tsx`**, aonde testei a pagina Home.




