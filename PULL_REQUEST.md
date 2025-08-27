## DESAFIO CORELAB - SISTEMA DE NOTAS - FRONTEND
## Autor: Luiz Livio

### Descrição das atividades:
- Remoção de arquivos referentes ao modelo do projeto (VEHICLES)

- Instalação de pacotes de libs utilizadas (Fonte Inter, classnames, react-icons, sweetalert2)

- Layout mobile-first

- Página de notas:
-- Cabeçalho:
--- Barra de pesquisa para buscar notas por título ou conteúdo da nota (utilizado debounce de 500ms para otimização da pesquisa)
--- Filtro de notas por cor
--- Disposição do cabeçalho altera de acordo com o breakpoint da página

-- Visualização de Notas:
--- Nota padrão para criação de nova nota
---- OBS: Criei um botão de salvar, que não existia no figma, pois não compreendi qual era o comportamento esperado quanto ao salvamento (onKeyDown, onChange, onBlur, etc...)
--- Categorias de notas favoritas e demais notas (Caso não haja notas para exibir em uma categoria, um aviso é mostrado)
---- Ordenação de notas dentro das categorias em ordem da nota atualizada mais recentemente para a mais antiga (Alterações de cor e favoritos não contam como edição para efeitos de ordenação)

-- Notas existentes:
--- Botão de favoritar/desfavoritar em formato de estrela (com feedback visual de favorito)
--- Botão de editar
---- OBS: Quando o botão está ativado, a nota está em modo de edição, indicado pelo feedback visual. Ao clicar novamente, a nota é salva.
--- Botão de alterar cor que abre o seletor de cores como tooltip (Em duas linhas em layout mobile, caso contrário, em uma só linha)

OBS: O container do frontend é buildado e compilado automaticamente ao subir o container do backend