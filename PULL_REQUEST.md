# Pull Request

Está é minha API para um todo-list

## Tecnologias principais

1. React:Componentização: O React adota um modelo de desenvolvimento baseado em componentes, permitindo a criação de interfaces de usuário modulares e reutilizáveis. Isso facilita a manutenção e a escalabilidade do código.

Virtual DOM: O React utiliza um Virtual DOM para otimizar as atualizações no navegador, melhorando o desempenho ao minimizar as manipulações diretas no DOM.

Unidirecionalidade de Dados: O modelo de dados unidirecional (one-way data binding) do React simplifica o rastreamento e gerenciamento de estados, tornando o fluxo de dados mais previsível.

Comunidade Ativa e Ecossistema Rico: O React possui uma comunidade ativa e um ecossistema rico de bibliotecas e ferramentas. Isso facilita a resolução de problemas, a aprendizagem e a integração de tecnologias complementares.

2. TypeScript:

Tipagem Estática: O TypeScript adiciona tipagem estática ao JavaScript, ajudando a detectar erros mais cedo durante o desenvolvimento e melhorando a manutenção do código. Isso é especialmente útil em projetos maiores, onde a escalabilidade e a prevenção de erros são cruciais.

3. ESLint:

Padrões de Código Consistentes: ESLint é uma ferramenta de linting que ajuda a manter padrões de código consistentes. Ele pode identificar e corrigir problemas de estilo, potenciais bugs e outros problemas de qualidade de código, promovendo boas práticas de programação.

4. Prettier:

Formatação Automática: Prettier é uma ferramenta de formatação de código que mantém a consistência no estilo do código. Ele automaticamente formata o código de acordo com as regras predefinidas, eliminando discussões sobre estilos de formatação no código-fonte.

# Sobre o Desenvolvimento

Este projeto foi construído com base em componetização

```bash
pages, style, components
```

## Primeiro passo

Na minha API, decidi implementar um sistema de cadastro e login para gerenciar diversas notas de diferentes pessoas de maneira organizada. Tomei a iniciativa de criar algumas funcionalidades que não estavam presentes no layout do Figma. Comecei desenvolvendo as páginas de login e cadastro.

Em seguida, foquei na componentização da página Home, que contém o TitleBar, onde será exibido o local de pesquisa e o nome da aplicação, o Feed, que mostrará todas as notas, e o PostCard, que representará cada nota exibida no feed.

O Front-End sempre representa um desafio para mim, e por isso, dediquei bastante tempo ao desenvolvimento. A forma como estruturei minha API facilitou o foco no layout, sem me preocupar muito com o consumo de dados, pois a comunicação com a API está bastante simplificada