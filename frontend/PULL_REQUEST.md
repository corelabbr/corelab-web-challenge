# Pull Request

## Descrição

Este Pull Request introduz a funcionalidade de gerenciamento de tarefas, permitindo aos usuários criar, ler, atualizar e excluir itens da lista de tarefas. Também adiciona a capacidade de marcar itens como favoritos e definir cores para cada item. O reposotório completo do projeto pode ser acessado em: https://github.com/jhondharkyson520/corelab

## O que foi feito

- **Frontend**:
  - Criada interface para visualizar, criar, atualizar e excluir tarefas.
  - Implementada filtragem de itens das notas.
  - Adicionada funcionalidade para exibir itens favoritos no topo da lista.
  - Criado contexto para que a lista de notas seja compartilhada pelos componentes do código.
  - Para fazer as requisições HTTP necessárias foi usado o Axios.
  - Na estilização foi feita usando StyledComponents.
  - Responsividade da interface feita usando conceito de mobile first.

## Estrutura de Pastas

```bash
.
├── src
│   ├── assets
│   │   
│   ├── components
│   │   
│   ├── context
│   │  
│   ├── pages
│   │   
│   ├── services
│   │   
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
└── 
```

## Instruções para Execução

### Frontend

1. Clone o repositório:
    ```bash
    git clone https://github.com/jhondharkyson520/corelab.git
    cd frontend
    ```

2. Instale as dependências:
    ```bash
    npm install
    ```

3. Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```

## Funcionalidades

- CRUD de tarefas
- Marcação de tarefas como favoritas
- Definição de cores para tarefas
- Busca de itens da lista de notas
- Itens favoritos exibidos no topo da lista

## Testes
- **Frontend**: Acesse a aplicação em [http://localhost:5173](http://localhost:5173) para verificar a interface.

## Modelagem de funcionalidades
- Diagrama de casos de uso do sistema

![Diagrama de casos de uso](./src/assets/casesDiagram/image.png)