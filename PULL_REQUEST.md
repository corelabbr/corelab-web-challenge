# CoreNotes - Frontend

## Sobre a aplicação

Essa aplicação foi contruída com ReactJs e Styled-components. A aplicação te oferece um gerenciador de tarefas com a possibilidade de marcar como favorito e anexar arquivos direto de sua máquina a favor de um layout simples, objetivo e responsivo.

VÍDEO EXPLICANDO A APLICAÇÃO --> [https://youtu.be/Qy1c8LcXMKw](https://youtu.be/Qy1c8LcXMKw)

## Deploy & Repositórios

- Repositório frontend --> [repositório frontend](https://github.com/Ryanluc7reis/corelab-web-challenge)
- Repositório backend --> [repositório de backend](https://github.com/Ryanluc7reis/corelab-api-challenge)

- O frontend e backend foram hospedado na vercel.

- Link do projeto em produção --> [CoreNotes projeto](https://corelab-web-challenge-ryanlucas.vercel.app/)

  #### **[O projeto em produção não disponibiliza a funcionabilidade de anexar arquivos!!!]**

## Arquitetura

Seguindo conceitos e boas práticas de uma aplicação **React**, a aplicação segue da seguinte forma:

- **Pasta "public"**: Contém um arquivo `index.hmtl` e imagens que são utilizadas no código.
- **Pasta "src**:
  - **Arquivo "index.jsx"** : É o ponto de entrada da aplicação.
  - **Pasta "pages"** : Contém o arquivo `"App.jsx"`, que é o arquivo principal do código onde é renderizado toda a aplicação.
  - **Pasta "context"** : Contém um estado provido pelo react-hook "useContext", que se comunica inteiramente com o código.
  - **Pasta "components"** : Contém todos os componentes react.

## Funcionabilidades

**Renderização condicional**

- Foi criado uma condição com ajuda do hook `useEffect` na tela principal, para enquanto o array onde recebe os dados do backend não for `true`, irá aparecer um tela de carregamento até que esses dados sejam `true`.
- Foi criado condições nos componentes para renderizar ou não seus valores de acordo com `props`.
- Foi criado um componente para confirmar se o cliente deseja mesmo fazer aquela ação ('ConfirmDelete'), sendo assim se clicado o botão 'X' da tarefa, um estado será ativado e uma tela vai ser renderizada em cima da outra.

**Ler dados por props**

- Foi contruído no componente 'Note.jsx', props como `childrens` para lerem dados mapeados que chegam do backend.

**Requisições HTTP**

- Foi contruído requisições para o backend utilizando `axios` para manipular a requisição e `SWR` para gerenciar os dados recebidos como respostas.

**Estado global**

- Foi contruído um estado global utilizando `useContext`, para lidar com os êxitos ou erros de uma requisição renderizando uma confirmação ou erro da ação que foi feita no superior da tela ('PopUpMessage.jsx'), sendo assim possibilitando usar desse mesmo estado em diferentes arquivos.

**Componentes reutilizáveis**

- Foi construído componentes que podem ser utilizados em outro componentes, como 'Button.jsx', 'Input.jsx', 'ConfirmDelete' dentre outros.., assim trazendo um código integro para a aplicação.

**Upload de arquivo**

- Foi criado 'dropzone' utilizando `react-dropzone`, no qual você pode anexar um arquivo na tarefa, seja clicando para abrir o explorer da máquina ou arrastando algum arquivo de sua preferência para a área.

**Pesquisa de tarefas**

- Foi criado um input de pesquisa, no qual possibilita você filtrar pelo título as tarefas em cada dígito.

**Marcar como favorito**

- Foi criado um lógica no qual controla se a tarefa é favorita ou não com apenas um click gerenciada com um estado utilizando `useState`, por meio da requisição de edição de tarefa .
  **Estado de edição**

- Foi criado um estado para controlar quando a tarefa está sendo editada ou não utilizando `useState`, sendo assim quando alguma imagem de edição é clicada, o estado é ativado e dependendo da imagem que foi clicada aparece os elementos referente à imagem clicada, seja para editar a cor da tarefa(paleta de cores) ou a descrição/título (inputs).

## Tecnologias usadas

- ReactJs
- Webpack
- Styled-components
- Eslint / Prettier
- Axios
- SWR
- Mobile first

## Getting Started

### Pré requisitos

- npm or similar

### Instalação

1. Clonar o repositório:

```bash
git clone https://github.com/Ryanluc7reis/corelab-web-challenge.git
cd corelab-web-challenge
```

2. Instalar depêndencias

```bash
npm install or similar
```

3. Criar um arquivo '.env' na pasta raíz do projeto e insira

```bash
PORT=http://localhost:4444
```

4. Iniciar aplicação

```bash
npm start
```

---

**Autor:** [Ryan Lucas Ferreira Reis]  
**Email:** [ryanluc.dev18@gmail.com]  
**Data:** [11/07/2024]
