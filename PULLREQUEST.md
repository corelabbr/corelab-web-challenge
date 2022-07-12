 
# >DesafioCorelab<  

Desafio técnico cujo objetivo foi criar uma aplicação web e consumir uma API para gerenciar o CRUD de veículos. 
Apresentaçao do projeto no Youtube
 ```
 https://youtu.be/2IathE2inAQ
 ```

## Installing / Getting started

```shell
  cd corelab-api-challenge
  npm run dev

  cd ..

  cd corelab-web-challenge
  npm run start
```


## Developing

### Built With
```shell

  Frontend
  "@reduxjs/toolkit": "^1.8.3",
  "react": "^18.1.0",
  "react-icons": "^4.4.0",
  "react-redux": "^8.0.2",
  "typescript": "^4.6.4",

  Backend
  "typescript": "~4.6",
  "@adonisjs/core": "^5.7.6",
  "sqlite3": "^5.0.8"
  "node": "^16.15.0",
```

### Prerequisites
```shell
  API Env variables

  PORT=
  HOST=
  NODE_ENV=
  APP_KEY=
  DRIVE_DISK=
  DB_CONNECTION=

```
 

## Api Reference


* ### Create Vehicle
  * Método: POST
  * Path: `/api/vehicles`
  * input:
    ```
      {
	    "description": "The Honda Civic is a series of automobiles manufactured by Honda since 1972.",
	    "plate": "5634",
	    "is_favorite": false,
	    "year": 2022,
	    "color": "black",
	    "price": 34323,
	    "name":"honda civic"
      }
    ```
  * output:
    ```
     {
        "name": "honda civic",
        "description": "The Honda Civic is a series of automobiles manufactured by Honda since 1972.",
        "plate": "5634",
        "is_favorite": false,
        "year": 2022,
        "color": "black",
        "price": 34323,
        "created_at": "2022-07-06T12:02:13.830-03:00",
        "updated_at": "2022-07-06T12:02:13.830-03:00",
        "id": 4
      }
    ```
* ### Delete Vehicle
* Método: DELETE
* Path: `/api/vehicles/4`
* output:
  ```
    "message": "Vechicle deleted"
  ```
* ### Edit a Vehicle
* Método: PATCH
* Path: `api/vehicles/4`
* input:
  ```
    "description": "Vechicle Sold"
  ```
* output:
  ```
    {
      "name": "honda civic",
      "description": "Vechicle Sold",
      "plate": "5634",
      "is_favorite": false,
      "year": 2022,
      "color": "black",
      "price": 34323,
      "created_at": "2022-07-06T12:02:13.830-03:00",
      "updated_at": "2022-07-06T12:02:13.830-03:00",
      "id": 4
    }
  ```

* ### Get a Vehicle
* Método: GET
* Path: `api/vehicles/4`
* output:
  ```
    {
      "id": 96,
      "name": "Vectra",
      "description": "Vectra car 2022",
      "plate": "CORElAB",
      "is_favorite": 1,
      "year": 2022,
      "color": "black",
      "price": 84999,
      "created_at": "2022-07-11T15:23:48.000-03:00",
      "updated_at": "2022-07-11T18:08:58.000-03:00"
    }
  ```
* ### Get all Vehicle
* Método: GET
* Path: `/api/vehicles`
* output:
  ```
    [
      {
        "id": 1,
        "name": "Vectra",
        "description": "Vectra car",
        "plate": "asdsdsd",
        "is_favorite": 0,
        "year": sdsss,
        "color": "orange",
        "price": 343,
        "created_at": "2022-07-11T15:21:48.000-03:00",
        "updated_at": "2022-07-11T18:08:58.000-03:00"
      },
      {
        "id": 84,
        "name": "Gol",
        "description": "Gol description",
        "plate": "ASDS",
        "is_favorite": 0,
        "year": 2021,
        "color": "purple",
        "price": 2122,
        "created_at": "2022-07-11T10:21:43.000-03:00",
        "updated_at": "2022-07-11T18:08:57.000-03:00"
      },
      {
        "id": 82,
        "name": "hilux",
        "description": "hilux description",
        "plate": "SDSX343",
        "is_favorite": 1,
        "year": 2023,
        "color": "black",
        "price": 0,
        "created_at": "2022-07-11T02:10:50.000-03:00",
        "updated_at": "2022-07-11T18:16:34.000-03:00"
      }
    ]
  ```
## Database

* ### Model
  ```
    import { DateTime } from 'luxon'
    import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

    export default class Vehicle extends BaseModel {
      @column({ isPrimary: true })
      public id: number

      @column()
      public name: string

      @column()
      public description: string

      @column()
      public plate: string
    
      @column()
      public is_favorite: boolean

      @column()
      public year: number

      @column()
      public color: string

      @column()
      public price: number

      @column.dateTime({ autoCreate: true })
      public createdAt: DateTime

      @column.dateTime({ autoCreate: true, autoUpdate: true })
      public updatedAt: DateTime
    }
  ```

## Sobre o projeto

Na página Vehicles, usando o useEffect fiz o fetch dos veículos salvos no banco de dados[SQLITE3]. Para ter acesso a outros componentes e evitar prop drilling usei ReduxToolkit e nesse primeiro momento fiz o dispatch para salvar os veículos no estado global. Assim como os veículos, criei um estado global responsável para alternar de true para false e assim termos acesso ao Modal. Já com os dados setados, fiz o map na pagina vehicles para mostrar em tela. Encadeado ao map, utilizei o método filter, para filtrar veiculos ao passo que for digitado no component SEARCH.

Já no componente CARD, tem-se a funcionalidade de deletar ,favoritar,editar o veículo. Para deletar, ja com a rota definida no backend, forneci o ID necessário para tal ação, logo em seguida fiz o dispatch para remover, usando filter, o veículo do estado global. Quando clicado no edit ICON do card, fiz o dispatch para setar o valor para true e assim abrir o modal de edição.
