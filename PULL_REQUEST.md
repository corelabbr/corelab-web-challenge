!! Peço desculpas pelo equívoco, eu realmente não vi que existía um figma.
Sei que é um erro grosteco, mas independente do resultado foi um ótimo desafio para minha carreira. !!

Bom, primeiramente eu agradeço pelo desafio que foi bastante desafiador para mim.Eu estava estudando Typescript havia uma semana e vi que realmente não conhecia nada.
Eu comecei o projeto de front pelo "Card de veiculos", onde fiz a função de setar os carros favoritos sem usar o isFavorite do banco de dados pois passei mais tempo estudando typescript e adonisJS do que realmente fazendo o projeto. Fiz a função de deletar veiculo onde fiz um filter pra remover o veiculo pelo id após a requisição para evitar uma nova requisicão de chamar todos os veículos atualizados.
Em openModalAndSetype, eu seto o title do modal para aproveitar o modal tanto para cadastrar, tanto para editar.
seto o modal para true e ele é aberto e passo o Veiculo Atual para um estado que está no meu contexto para ser reaproveitado em ModalEditAndAddVehicle.

No filter, eu criei uma interface para setar o tipo de propriedades do objeto.
em filterVehicles, eu faço um loop onde procuro ver se o veiculo tem o nome igual ao do formState quem vem de e.target.value e se o ano do veiculo está dentro do limite initialyear - limityear.
Eu dou um push para filtrarVeiculos e setVehicles(filtrarVeiculos)
Em limparFilter eu limpo o formState e faço uma nova requisição já que o filter modifica meu array original.

No modal de editar e cadastrar, eu utilizei o formState junto com a interface IformState e se o titulo do modal fosse Edit Vehicle eu setava todas as propriedades do objeto ao modal, caso contrário o objeto era vazio.
Se ao fazer o submit o titulo do modal fosse 'Edit vehicle'
ele chamaria um PUT e editaria as propriedades do veiculo e retornaria parando a execução da função, caso contrário ele faria o POST e adicionaria um novo veiculo ao BDD.
Após adicionar o veiculo, eu pego tudo que tem em vehicles em adiciono o newVehicle quem vem de response.data ou {data} como usei.

Em handleChange eu peguei o e.target.value.ToLowerCase() para comparar, depois de um loop, com o nome de cada veiculo com o includes, caso fosse true, eu fazia o push para filtrarVeiculos e retornava.
Caso não exista e.target.value eu faço uma nova requisição para vehicles, pois novamente ele mudou meu array original.
