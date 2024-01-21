# Desenvolvimento (FrontEnd)

Como fiz no [PULL_REQUEST.md](https://github.com/itspedro/corelab-api-challenge/tree/dev/PULL_REQUEST.md) do backend, primeiro irei explicar a escolhas de tecnologias.

Do repositorio base continuei com o CRA, sass e typescript, o que foi adicionado foi o [react-query](https://tanstack.com/query/v3/) para gerenciar o estado, [axios](https://axios-http.com/) para fazer os fetchs, [zod](https://zod.dev/) para validar os dados e [Lottie](https://lottiefiles.com/pt/) uma biblioteca de animações.


No front foi com uma abordagem diferente, com auxilio do figma fornecido pelo desafio, fiz o layout primeiro separando os componentes tipos e responsabilidade, após isso fiz um repositorio local para comecar a gerenciar os estados da aplicação sem nenhuma requisição depois fiz a conexão com a API.

## Icones

Optei por usar svg ao invés de imagens para ter mais performance e controle sobre os icones, quase todos os svg's que usei foram fornecidos pelo modelo do figma, com exceção do icone de filtro e o icone de favorito que usei o do [hero icons](https://heroicons.com/) do pessoal do tailwind.


## Estrutura de pastas do projeto

```sh
└───src
    ├───assets
    ├───components
    │   ├───ColorsModal
    │   ├───CreateTaskInput
    │   ├───NavBar
    │   ├───SearchInput
    │   └───TaskCard
    ├───contexts
    ├───hooks
    ├───lib
    ├───pages
    │   └───Home
    ├───styles
    ├───types
    └───utils
        └───data
```

`assets` logo e animações lottie

`components` componentes da aplicação e icones svg

`contexts` contextos da aplicação para filtrar as tasks com base na cor e no titulo

`hooks` hooks customizados para gerenciar os estados da aplicação

`lib` funções utilitarias para requisições na api e funções de bibliotecas

`pages` paginas da aplicação

`styles` estilos globais da aplicação // repo base

`types` tipos da aplicação

`utils` service para lidar com os dados da aplicação

## Notas

- A aplicação foi feita com o conceito de mobile first
- Foi adicionado um botão de filtro por cor na navbar
- Os inputs são validados com zod

[Executando o projeto](./README.md)


