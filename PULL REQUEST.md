# Desafio Corelaba Web

Olá, meu nome é Guilherme sou apaixonado por tecnologia e vou me tornar um desenvolvedor.

## Qual era o desafio?

Criar e consumir uma API para gerenciar um CRUD de veiculos!

## Tecnologias usadas

1. React.TS para o front-end.
2. AdonisTS para o back-end.
3. MySql como o banco de dados.
4. styled-components e SASS para estilizaçãos dos principais components.
5. Axios para gerenciar rotas no Front-end.
6. React-Icons para icones na aplicação.
7. Thunder-Client para testar as rotas.
8. Café para manter o dev acordado enquanto ele programava ou aprendia uma nova tecnologia.

## Como iniciar o programa

_Front-End_

```
  yarn init
  yarn start
```

o programa vai iniciar no localhost na port 3000.

_Back-End_

```
  yarn
  npm run dev
```

o programa vai iniciar no localhost na port 3333.

## Problemas encontrado

De cara alguma problema que não consegui identificar estava empedindo que o NPM rodasse o projeto então resolvi deixar a cargo do yarn para gerenciar pacotes.

Problemas de conexão entre Back e front e back e banco foram constantes normalmente acontecia de algum nome de variavel esta errado e assim com o tempo conseguia identificar e resolver

Na reta final descobri um bug no componente `ModalAddVehicle` no qual não consegui resolver,
esse problema consiste em quando acontece o `onBlur` alguns input não aparece o erro e so aparece quando acontece novamente o `onBlur` em outro input

## Funcionalidades

1. Ao clicar em um botão "Adicionar novo veículo", um novo formulário deve ser aberto para criar um novo veículo [✔️].

   - Quando clica no botão add new vehicle um modal aparece para o usuario digitar os dados do veiculo e se todos os dados estiver preenchidos com os dados que passem pela validação que esta no [arquivo de validação](/src/assets/validate.ts) ele é feito um `POST` que vai adicionar o veiculo na lista

2. Ao submeter o formulário, o novo veículo deve ser salvo [✔️].

   - Quando ele é submetido ele passa pelo back-end e é salvo no banco de dados com todas as colunas mais a createdAt que eu deixei a cargo do adonis criar e a updateAt para quando ele tiver atualização ser salvo no banco de dados.

3. Ao digitar algo no de pesquisa, deve-se filtrar os veículos
   comparando qualquer que seja a propriedade do veículo. Por
   exemplo: deve-se comparar o termo procurado com o nome, ou
   a descrição, ou o preço, ou qualquer outro campo do veículo[✔️].

   - Ao digitar qualquer coisa no campo de pesquisa ele é feito um filter no array `vehicles` dinamicamente que resulta em aparecer qualquer resultado que contenha o que esta escrito no campo o codigo se encontra em [CardList](./src/components/CardList/index.tsx)

4. Ao clicar em um ícone de coração, deve-se favoritar o veículo.[✔️]

   - Quando se clica no coração eu faço um `PUT` para a minha api onde modifico apenas a opção `isfavorite` para true e ele muda a opção no banco de false para true.

5. Ao clicar em um ícone de edição, deve-se abrir novamente o
   formulário do veículo selecionado para editá-lo[❌] - Infelizmente tal funcionalidade não deu para implementar mas, eu poderia fazer um modal com um `GET` onde no parametro passava o ID do carro que iria ser modificado e logo depois um `PUT` com as informações atualizadas.

6. Ao clicar no botão no deletar, deve-se remover o veículo[✔️]
   - No botão deletar eu chamo um função que faz um `DELETE` e da um reload na pagina para atulizar a lista dinamicamente.
7. Ao clicar no botão de filtro, deve-se abrir um formulário de
   filtros, e quando os filtros forem selecionados, deve-se filtrar os
   veículos baseados nos valores[❌]
   - Infelizmente essa funcionalidade não deu para fazer também mas, eu ja fiz uma bem parecida no meu projeto [Gui-Countrie](https://github.com/GuilhermeAGoncalves/Gui-Countrie/blob/main/src/components/Countries.jsx) o filtro em questão fica na linha 11. Fiz uma lista de paises com alguns dados relevantes, usando um api publica onde dependendo da região(África, Oceania, Europa...) aparece apenas os paises daquela região.
8. Os cards devem ter a cor de fundo baseadas na cor do veículo.
   (Ex: Veículo branco, card deve ser branco.)[✔️] - Ultilizei o styled-components para pegar dinamicamente os dados de cor que o usuarios cadastrou, mas dependendo da língua que ele coloca não funciona, so funciona apenas se for em EN-US(red, orange, blue) ou ele colocar um hex(#fff, #000, #ff0) e para não ficar todo branco se o veiculo for branco as letras ficam em preto.

## Desafios Back-End

Não conhecia o suficiente o Adonis nem como ele resolvia o meu problema e muito menos quais eram as vantagens de ter ele no meu projeto, mas, coloquei esse desafio para aprender essa tecnologia e foi umas das melhores experiencias que tive até agora no mundo de programação, estudar uma tecnologia enquanto usava ela para algo real e que tinha impacto na minha vida foi maravilhoso. Entender o conceito das migrations e como ela funcionava por trás dos panos para facilitar mudanças no bando de dados foi surpreendente, a criação dos models e controlers através do `ace:make` foi uma das novidades para mim.

## Routes

Segui o seguinte modelo:

```TS
Route.get('/', async () => {
  return { hello: 'word' }
})

Route.get('/vehicles', 'VehiclesController.index')
Route.post('/vehicles', 'VehiclesController.store')
Route.get('/vehicles/:id', 'VehiclesController.show')
Route.delete('vehicles/:id', 'VehiclesController.delete')
Route.put('/vehicles/:id', 'VehiclesController.update')
```

## Agradecimentos

Obrigado a todos da corelab por esse desafio de codigo aprendi muito enquanto eu estava produzindo linhas e mais linhas de codigo, espero passar para a proxima fase e continuar aprendendo mais com vocês, aguardo o contato e até breve.
