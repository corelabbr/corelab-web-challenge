# O projeto Core Note

## Introdução ao desenvolvimento

Aqui será abordado como foram desenvolvidos os recursos descritos no [README.md](README.md).

## Recursos desenvolvidos (features)

### Gerenciamento de Tarefas

- Criação de tarefas;
- Marcação de tarefas como favoritas;
- Atribuição de cores às tarefas;
- Exclusão de tarefas;
- Atualização de tarefas;
- Pesquisa de tarefas por cor e título;
- Responsividade para adaptação a telas pequenas;
- As tarefas favoritas são exibidas no topo, conforme o mockup;
- Botão de logout para desautenticar (vermelho como normalmente é usado) e retornar à página de login.

## Autenticação

- Cadastro (username, password e confirmar senha) e validação de usuários com parâmetros definidos;
- Autenticação com username e senha. Além de validação de usuários com parâmetros definidos;
- Páginas de login e registro de usuários responsivas e atraentes.
- O usuário tem um perfil e ele pode atualizar os dados. Além de excluir a conta dele.
- Aparecerá um avatar no dashboard onde ficam as tarefas para o perfil do usuário, onde ele consegue visualizar os dados e sair do sistema.
- Foi criado um User Slice que integra com o Redux para gerenciar os dados do perfil do usuário, como o nome de usuário e e-mail. O estado é compartilhado com cabeçalho e com a página que exibe estes detalhes.

## Animação

Quando necessário terá animações de carregamento em botões (que são desabilitados quando há requisição) e páginas.
Feito com CSS e sem frameworks de animação.

## Testes

- Testes unitários foram implementados para verificar a aplicação e com isso obter um coverage de testes;
- Integração com Vitest.

## Docker

- Suporte ao uso de Docker tanto para o back-end quanto para o front-end.

## CI

- Testes de CI são realizados com os recursos existentes.

## Extras

### Context API

A Context API é uma ferramenta do React que permite compartilhar valores entre componentes sem precisar passar props manualmente em cada nível da árvore de componentes. É útil para gerenciar estados globais ou valores que precisam ser acessados por muitos componentes.

Principais características:

- Criação de Contexto: Utiliza React.createContext() para criar um contexto.
- Provedor de Contexto: Usa o componente Context.Provider para fornecer valores aos componentes que consomem o contexto.
- Consumidor de Contexto: Utiliza o Context.Consumer ou o hook useContext para acessar o valor do contexto.

### Redux

Redux é uma biblioteca de gerenciamento de estado previsível.
Ele é frequentemente usado com React, mas pode ser usado com outras bibliotecas ou frameworks.

Principais características:

- Store: Armazena o estado global da aplicação.
- Actions: Objetos que descrevem eventos que ocorreram e que podem afetar o estado.
- Reducers: Funções que especificam como o estado muda em resposta a ações.
- Dispatch: Função usada para enviar ações para o store, que então aciona os reducers para atualizar o estado.

## Como executar

Para executar o projeto:

- Instale as dependências: `yarn`
- Para executar: `yarn run dev`
- Com Docker: `docker-compose -f docker-compose.yml up`
- Se deseja executar sem logs, use: `docker-compose -f docker-compose.yml up -d`

## Vite

O Vite é uma ferramenta de construção para projetos JavaScript modernos, como aplicações em React. Foi criado pelo criador do Vue e está presente na versão 3 do framework que ele também criou. O Vite possibilita o desenvolvimento rápido e eficiente, com tempos de compilação extremamente rápidos (levando apenas segundos para executar a aplicação).

A teoria por trás do Vite é baseada no conceito de "ESM-first" (ESM significa ECMAScript Modules), que se refere ao fato de que o Vite aproveita os módulos ECMAScript nativos do navegador para carregar e compilar o código durante o desenvolvimento. Isso significa que, em vez de usar um bundler tradicional para criar um pacote único de código (como o Webpack faz), o Vite utiliza os módulos ESM diretamente no navegador.

A principal vantagem disso é a velocidade. O Vite é capaz de carregar e compilar apenas os módulos necessários para a página atual, evitando a necessidade de recompilar todo o projeto a cada alteração de código.

## TypeScript

No caso do Core Notes, foi desenvolvido usando TypeScript e Styled Components. A aplicação também faz uso de componentes.

Há várias vantagens em usar TypeScript em comparação ao JavaScript puro ao desenvolver componentes com React. Algumas das vantagens incluem:

- Tipagem estática: TypeScript é um superset de JavaScript que adiciona tipagem estática ao código. Isso ajuda a evitar erros comuns de digitação e fornece suporte para autocompletar e verificação de erros durante o desenvolvimento.

- Melhor escalabilidade: Com o uso de tipos estáticos, o TypeScript torna o código mais robusto e escalável, permitindo a definição de interfaces e tipos personalizados para os componentes.

- Documentação automática: O TypeScript gera automaticamente documentação com base nas definições de tipos, facilitando o entendimento e uso dos componentes por outros desenvolvedores.

- Integração com IDEs: O TypeScript possui um suporte excelente nas principais IDEs, como Visual Studio Code e WebStorm, proporcionando recursos avançados de autocompletar, refatoração e verificação de erros.

- Maior segurança: O TypeScript ajuda a identificar possíveis erros antes mesmo de executar o código, o que ajuda a evitar erros em tempo de execução.

## Uso de componentes

Tudo isso foi aplicado e percebido durante o desenvolvimento do projeto. Também foi adotado o uso de componentes em toda a aplicação, seguindo a boa prática e a teoria por trás dos componentes em React, baseada no conceito de composição e reutilização de código. Em vez de organizar o código em torno de tarefas ou tecnologias específicas, o React propõe quebrar a interface do usuário em componentes independentes e reutilizáveis.

Existem dois tipos principais de componentes em React:

- Componentes Funcionais: São funções JavaScript que recebem um conjunto de propriedades (props) e retornam elementos React. Esses componentes são mais simples e fáceis de entender e testar. Eles são usados principalmente para componentes que não precisam gerenciar estado interno.

- Componentes de Classe: São classes JavaScript que estendem a classe base do React.Component. Esses componentes possuem um estado interno e podem ter métodos de ciclo de vida para controlar o comportamento do componente. Eles são usados quando é necessário gerenciar estado, manipular eventos ou realizar operações de ciclo de vida.

A teoria por trás dos componentes em React é quebrar a interface do usuário em pequenas partes independentes, chamadas de componentes, que podem ser reutilizadas e compostas para construir interfaces mais complexas. Esses componentes podem receber propriedades (props) para personalizar seu comportamento e podem ter um estado interno para gerenciar dados específicos do componente.

Ao adotar essa abordagem, pode criar interfaces do usuário mais legíveis, testáveis ​​e fáceis de manter. Além disso, a natureza declarativa do React permite que atualize a interface do usuário automaticamente quando o estado da aplicação é alterado, sem a necessidade de manipular manualmente o DOM.

## Styled Components

Também gostaria de citar que a aplicação está usando o Styled Components, que traz vários benefícios:

- Encapsulamento: Com Styled Components, pode definir estilos diretamente no componente em que estão sendo usados, em vez de criar estilos separados em um arquivo CSS externo. Isso permite que mantenha os estilos próximos ao componente, facilitando a compreensão e a manutenção do código.

- Reutilização: Os estilos definidos com Styled Components podem ser facilmente reutilizados em diferentes componentes. Pode criar componentes estilizados personalizados que encapsulam um conjunto específico de estilos e usá-los em vários lugares da sua aplicação.

- Escopo de estilo: Os estilos definidos com Styled Components são automaticamente encapsulados e não afetam outros elementos fora do componente em que estão sendo usados. Isso evita conflitos de estilo e permite criar estilos coesos e isolados para cada componente.

- Dinamicidade: Com Styled Components, é possível criar estilos dinâmicos que podem ser alterados com base no estado ou nas propriedades do componente. Isso permite criar interfaces mais interativas e responsivas, onde os estilos podem ser alterados dinamicamente em resposta a eventos ou mudanças de estado.

- Melhor legibilidade: Ao definir estilos diretamente no componente, tem uma visão clara de como o componente será renderizado, sem a necessidade de alternar entre diferentes arquivos para entender a aparência final do componente.

- Suporte a temas: Styled Components oferece suporte a temas, permitindo definir um conjunto de estilos globais que podem ser usados em toda a aplicação, garantindo uma aparência consistente em todos os componentes.

- Integração com ferramentas e bibliotecas: Styled Components é uma biblioteca amplamente adotada e possui integração com várias ferramentas e bibliotecas populares, como React Native, Next.js e Storybook, facilitando a criação de aplicativos com React e a colaboração com outros desenvolvedores.

## React Hooks

Além disso, a aplicação está usando os React Hooks, que são uma adição ao React introduzida na versão 16.8. Eles permitem o uso de estado e outras funcionalidades do React em componentes funcionais, eliminando a necessidade de escrever classes e tornando-os incompatíveis com classes. Como useEffect que permite sincronizar um componente com um sistema externo, useState para acompanhar o estado do aplicativo em componentes funcionais e useRef que permite referenciar um valor que não é necessário para renderização sendo útil para acessar elementos DOM diretamente ou para manter valores que não devem causar a re-renderização do componente quando são alterados. Estes são usados na aplicação e são alguns desses hooks.
