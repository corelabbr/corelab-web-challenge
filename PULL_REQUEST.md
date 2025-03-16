# CoreNotes Frontend

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![React Icons](https://img.shields.io/badge/React_Icons-61DAFB?style=for-the-badge&logo=react&logoColor=black)

## 📋 Descrição

Frontend do desafio Corelab Challenge - Uma aplicação de gerenciamento de tarefas (to-do list) com funcionalidades avançadas como favoritar itens e personalizar cores.

A interface é responsiva e visualmente atraente, permitindo aos usuários filtrar por itens favoritos e por cor, exibindo os favoritos sempre no topo da lista.

## Video Demonstração

https://www.awesomescreenshot.com/video/37555107?key=224a84eed7f6888f236b2e68cb7cf9c8

## 🚀 Recursos

- **Criar, Ler, Atualizar e Deletar** tarefas
- **Favoritar** itens (exibidos prioritariamente no topo)
- **Personalizar cores** para cada tarefa
- **Filtrar** tarefas por texto
- **Visualização responsiva** para dispositivos móveis e desktop
- **Interface amigável** com design moderno

## 🛠️ Tecnologias

- **React**: Biblioteca JavaScript para construção de interfaces
- **TypeScript**: Superset tipado do JavaScript para melhor escalabilidade
- **SASS**: Pré-processador CSS para estilos mais organizados
- **Axios**: Cliente HTTP para comunicação com a API
- **React Icons**: Biblioteca de ícones para React

## 📦 Instalação

Certifique-se de ter o Node.js (versão >=16.15.0) e NPM (>=8.5.5) instalados.

1. Clone o repositório:
```bash
git clone https://github.com/evertonethan/DesafioCorelab-Frontend.git
cd corelab-challenge-frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure a conexão com o backend:
Por padrão, a aplicação se conecta à API em `http://localhost:3001`. Caso precise alterar, edite a URL base no arquivo `src/App.tsx`.

4. Inicie a aplicação:
```bash
npm start
```

5. A aplicação estará disponível em:
```
http://localhost:3000
```

## 🎨 Customização de Cores

A aplicação usa uma paleta de cores pastel configurável. As cores disponíveis são:

```typescript
const colorOptions: string[] = [
  '#E2FFFA', // Verde-água bem claro
  '#FEE3E3', // Rosado claro
  '#FFE2C3', // Laranja claro
  '#D1F1FF', // Azul claro
  '#E5D4FE', // Roxo claro
  '#F2F1B9', // Amarelo clarinho
  '#FFD1F1', // Rosa clarinho
  '#FFC0B3', // Coral
  '#F4F4F4', // Cinza bem claro
  '#EAEAEA', // Cinza claro
  '#BCBCBC', // Cinza médio
  '#E0C28B', // Bege/dourado
];
```

Você pode personalizar esta paleta editando o array `colorOptions` no arquivo `src/App.tsx`.

## 📱 Responsividade

A aplicação é totalmente responsiva, adaptando-se a diferentes tamanhos de tela:

- **Desktop**: Exibição em grid com múltiplos cards por linha
- **Mobile**: Exibição em coluna única para melhor visualização em telas pequenas

A responsividade é gerenciada através de media queries no arquivo `src/App.scss`.

## 🧪 Estrutura do Projeto

```
frontend/
  ├─ public/
  ├─ src/
  │   ├─ App.tsx        # Componente principal
  │   ├─ App.scss       # Estilos da aplicação
  │   ├─ index.tsx      # Ponto de entrada
  │   └─ react-app-env.d.ts
  ├─ package.json
  ├─ tsconfig.json
  └─ README.md
```

## 🔄 Comunicação com o Backend

A comunicação com a API é feita através do Axios. O frontend se conecta aos seguintes endpoints:

- `GET /api/notes`: Busca todas as notas
- `POST /api/notes`: Cria uma nova nota
- `PUT /api/notes/:id`: Atualiza uma nota existente
- `DELETE /api/notes/:id`: Remove uma nota

## 📋 Requisitos do Projeto

- Node.js: ^16.15.0
- NPM: ^8.5.5
- React com TypeScript
- Layout responsivo
- Abordagem Mobile First

## 🚧 Possíveis Melhorias

- Implementar autenticação de usuários
- Adicionar filtro por cores
- Incluir sistema de tags
- Implementar testes automatizados
- Adicionar funcionalidade de arrastar e soltar (drag and drop) para reordenar notas

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

---

Desenvolvido para teste da Corelab Challenge 🚀