# Teste Colab Frontend
Aplicação que cria e manipula posts

## Pré-requisitos
- [Node.js](https://nodejs.org/en) : ^16.15.0
- NPM: ^8,5,5
- IDE (Recomendamos [VsCode](https://code.visualstudio.com/))

## Instalação


Abrir pasta do projeto:
```
  cd  CORELAB-WEB-CHALLENGE
```

Instalar as dependências:
```
npm install
```

Executar o projeto:
```
npm run dev 
```

## Tecnologias utilizadas
- [HTML](https://developer.mozilla.org/pt-BR/docs/Web/HTML) - Linguagem de Marcação de Hipertexto.
- [CSS](https://developer.mozilla.org/pt-BR/docs/Web/CSS) - Linguagem de Estilização.
- [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) - Linguagem de programação.
- [Typescript](https://www.typescriptlang.org/) - Linguagem de Programação.
- [React](https://pt-br.react.dev/) - Biblioteca do javascript.
- [Cloudinary](https://cloudinary.com/) - Armazena arquivo e retorna sua url.

# Estrutura do Frontend

1. **Pasta `assets`**:
   - **Descrição**: Armazena imagens e arquivos estáticos utilizados na aplicação.
   - **Conteúdo**:
     - **Imagens e Arquivos**: Inclui todos os arquivos de imagem e outros arquivos estáticos necessários para o design e funcionalidade do frontend.

2. **Pasta `components`**:
   - **Descrição**: Contém todos os componentes reutilizáveis da aplicação.
   - **Estrutura de cada componente**:
     - **Arquivo `.tsx`**: Define a lógica e a estrutura JSX do componente. Inclui importações de dependências, definição de interfaces para props, e a função de renderização que retorna o JSX.
     - **Arquivo `.scss`**: Contém a estilização específica do componente usando SASS. Inclui variáveis, mixins e estilos aplicados ao componente.

   - **Componentes Detalhados**:
     - **`Menu`**:
       - **Descrição**: Inclui a logo, um campo de pesquisa e um botão de fechamento (X).
       - **Funcionalidade dos Botões**:
         - **Campo de Pesquisa**:
           - **Ação**: O usuário digita um termo no campo de pesquisa.
           - **Comportamento**: O texto digitado é armazenado em um estado local. Esse estado é passado para a página principal, onde filtra os posts com base no texto inserido. A filtragem verifica o título, descrição e cor dos posts. A cor é considerada apenas se o nome corresponder exatamente ao nome na lista de cores.
           - **Motivo**: Facilitar a busca de posts específicos com base nas palavras-chave fornecidas pelo usuário.
         - **Botão de Fechamento (X)**:
           - **Ação**: O usuário clica no botão de fechamento.
           - **Comportamento**: Limpa o texto do campo de pesquisa e redefine o estado associado na página principal, retornando à visualização completa dos posts.
           - **Motivo**: Permitir ao usuário cancelar a pesquisa atual e visualizar todos os posts novamente.

     - **`Color`**:
       - **Descrição**: Exibe uma esfera colorida.
       - **Funcionalidade**:
         - **Ação**: O usuário clica na esfera colorida.
         - **Comportamento**: A cor da esfera é alterada e uma função de callback é chamada para modificar a cor exibida.
         - **Motivo**: Permitir ao usuário selecionar e aplicar uma nova cor ao post ou ao elemento associado.

     - **`Loading`**:
       - **Descrição**: Mostra uma tela de carregamento enquanto os dados estão sendo processados.
       - **Funcionalidade**:
         - **Ação**: O componente é exibido durante operações de carregamento.
         - **Comportamento**: Indica visualmente que a aplicação está processando ou carregando dados.
         - **Motivo**: Informar ao usuário que o sistema está trabalhando e que a operação está em andamento.

     - **`WarningMessage`**:
       - **Descrição**: Exibe uma mensagem de confirmação para ações críticas, como deletar um post.
       - **Funcionalidade**:
         - **Ação**: O usuário clica para deletar um post.
         - **Comportamento**:
           - **Exibição do Aviso**: Uma mensagem de confirmação aparece, ativada por um estado booleano que indica a necessidade de confirmação.
           - **Resposta do Usuário**:
             - **Cancelar**: Desativa o estado de aviso, ocultando a mensagem e preservando o post.
             - **Deletar**: O post selecionado é removido da lista. A função de deletar verifica se o post a ser excluído corresponde ao post visível no momento e, se assim for, remove o post específico.
         - **Motivo**: Garantir que o usuário tenha a oportunidade de confirmar ou cancelar a exclusão de um post, evitando exclusões acidentais.

     - **`CreatePost`**:
       - **Descrição**: Permite a criação de um novo post.
       - **Funcionalidade**:
         - **Ação**: O usuário preenche os campos de título, descrição, e adiciona uma imagem ou PDF.
         - **Comportamento**:
           - **Adicionar Arquivo**: O arquivo pode ser arrastado para a área designada ou selecionado manualmente. Se for uma imagem ou PDF, o arquivo é enviado para o Cloudinary, que retorna uma URL pública. Essa URL e o ID do arquivo são armazenados.
           - **Modificar Cor**: A cor do post pode ser alterada usando o componente `Color`.
           - **Favoritar**: O post pode ser marcado como favorito.
           - **Cancelar**: O usuário pode cancelar a criação do post, retornando ao estado inicial.
         - **Motivo**: Permitir ao usuário criar e personalizar novos posts, com opções para adicionar conteúdo e modificar aspectos visuais.

     - **`SeePost`**:
       - **Descrição**: Permite visualizar e modificar um post existente.
       - **Funcionalidade**:
         - **Ação**: O usuário pode editar o post, alterar cor, adicionar ou remover arquivos.
         - **Comportamento**:
           - **Modo de Edição**: Ativado ao clicar no ícone de lápis. Exibe a interface de edição com opções para alterar título, descrição, cor e arquivos.
           - **Alterar Dados**: As alterações são enviadas para a API, que só modifica os campos alterados, preservando os valores não modificados.
           - **Adicionar/Remover Arquivos**: Arquivos podem ser adicionados ou removidos, e a visibilidade do botão de remoção é controlada pelo estado de edição.
           - **Salvar Alterações**: O botão de confirmação salva as alterações feitas, enquanto o ícone de lápis alterna entre o modo de edição e visualização.
         - **Motivo**: Permitir ao usuário atualizar posts existentes, facilitando a modificação de informações e a manutenção de conteúdo.

3. **Pasta `hooks`**:
   - **Descrição**: Contém hooks personalizados para interagir com a API e gerenciar estados específicos.
   - **Conteúdo**:
     - **Arquivos**:
       - **Chamada de API**: Inclui funções para adicionar, deletar, modificar e buscar posts da API. Cada hook define como a API é chamada, incluindo as importações necessárias, interfaces para dados recebidos e retornados, e o tratamento de erros.

4. **Pasta `lib`**:
   - **Descrição**: Contém funções auxiliares para chamadas de API.
   - **Conteúdo**:
     - **API do Backend**: Configura a URL base da API e funções para interagir com o backend usando REST.
     - **API do Cloudinary**: Configura a comunicação com o Cloudinary para upload de arquivos, incluindo imagens e PDFs. As funções retornam URLs públicas para os arquivos.

5. **Pasta `page`**:
   - **Descrição**: Contém a página principal e outras páginas da aplicação.
   - **Conteúdo**:
     - **Arquivo da Página**:
       - **Funções**:
         - **Exibição de Componentes**: Importa e exibe os componentes necessários.
         - **Chamada de Dados**: Realiza uma chamada à API para obter posts já criados.
         - **Filtragem e Pesquisa**: Verifica a existência de termos de pesquisa vindos do componente `Menu` e filtra os posts com base nisso.
         - **Carrossel de Posts**: Implementa um carrossel para navegação entre posts, ajustando o número de posts visíveis com base no tamanho da tela. O controle de rotação é feito por imagens de seta e ajusta-se dinamicamente para telas grandes (três posts), médias (dois posts) e pequenas (um post).
