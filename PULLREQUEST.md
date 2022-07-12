# Ferramentas Utilizadas

Nesse projeto foram utilizadas as seguintes ferramentas:

* React: (Typescript) como principal biblioteca;
* Axios: para efetuar as requisições;
* Sass: como pré-processador CSS, utilizando CSS Modules;
* Phosphor-react: biblioteca utilizada para os ícones.


# Páginas

Foram criadas 3 páginas sendo:

* Vehices: Renderiza a página principal, onde contém os Cards com as informações dos veículos. Além disso, possui a funcionalidade de busca, onde os anúncios são filtrados de acordo com o que for pesquisado;
* NewVehicle: Importa o componente de formulário e cria um novo Veículo de acordo com o que o usuário digitar no formulário;
* UpdateVehicle: Importa o componente de formulário, obtem as informações do veículo selecionado e atualiza de acordo com o que for alterado, mandando os dados para o Banco.


# Componentes

Os componentes criados foram:

* Button: Componente responsável pelo botão 'Adicionar' da Home;
* Card: Faz a requisição GET e atualiza os campos do Card com os dados do Banco. Além disso, nesse componente foi desenvolvida a funcionalidade de Remover veíulo.
* GoBackButton: Componente responsável pela 'seta' presente em todas as páginas. Ele utiliza o Hook 'useNavigate' para navegar entre as páginas.
* VehicleForm: Componente responsável pelo formulário presente tanto na criação quanto na edição do veículo. Esse componente altera dinâmicamente o valor dos dados de acordo com o que está escrito nos inputs, além de identificar se é uma chamada para criação ou edição.
