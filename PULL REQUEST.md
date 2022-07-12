
## APP WEB REACT Documentation

this pwa uses bootstrap as a styling base, axios api client and react-use-form form validation, and for searching it has a custom useDebounce hook

![alt text](https://github.com/MateusArenas/corelab-web-challenge/blob/main/home.gif "Logo Title Text 1")

## APP WEB REACT Install dependences
yarn or npm install

## API Scripts Run

Use this comands in npm or yarn for run this APP WEB REACT

| Command   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `yarn start` | `local` | This comand run in locale. |
| `yarn build` | `local` | This comand run in locale. |
| `yarn test` | `local` | This comand run in locale. |
| `yarn eject` | `local` | This comand run in locale. |
| `yarn start:docker` | `docker` | This comand run in docker container. |
| `yarn test:docker` | `docker` | This comand run in docker container. |

#### Home Page
this page as all vehicles usage search input and filter form set, has buttons for create new vheicle, edit selected vehicle for options and remove.
```Route
  PAGE /
```

| Query   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `search` | `string` | Type to search vehicle for all field values, this uses collage full text search. |
| `brand` | `string` | Type to search vehicle for brand field. |
| `year` | `string` | Type to search vehicle for year field. |
| `color` | `string` | Type to search vehicle for color field. |
| `isFavorite` | `string` | Type to search vehicle for isFavorite field. |
| `minPrice` | `string` | Type to search vehicle for field price >= minPrice. |
| `maxPrice` | `string` | Type to search vehicle for field price <= maxPrice. |

#### Filter Page
this page as filter form set.
```Route
  PAGE /filter
```

| Query   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `search` | `string` | Type to search vehicle for all field values, this uses collage full text search. |
| `brand` | `string` | Type to search vehicle for brand field. |
| `year` | `string` | Type to search vehicle for year field. |
| `color` | `string` | Type to search vehicle for color field. |
| `isFavorite` | `string` | Type to search vehicle for isFavorite field. |
| `minPrice` | `string` | Type to search vehicle for field price >= minPrice. |
| `maxPrice` | `string` | Type to search vehicle for field price <= maxPrice. |

#### Add new Vehicle Page
create vehicle passing fields in body request
```Route
  PAGE /add-vehicle
```

| Form Body   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | **required**. Please enter a field name! |
| `brand` | `string` | **required**. Please enter a field brand! |
| `description` | `string` | Enter a field description! |
| `color` | `string` | **required**. Please enter a field color! |
| `year` | `string` | **required**. Please enter a field year! |
| `plate` | `string` | **required**. Please enter a field plate! |
| `price` | `string` | **required**. Please enter a field price! |
| `isFavorite` | `string` | Enter a field isFavorite! |

#### Update Vehicle by Id Page
update vehicle passing param id and fields in body request
```Route
  PAGE /edit-vehicle/:id
```

| Parameter   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `string` | **required**. Please enter a param id! |

| Body   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | Enter a field name! |
| `brand` | `string` | Enter a field brand! |
| `description` | `string` | Enter a field description! |
| `color` | `string` | Enter a field color! |
| `year` | `string` | Enter a field year! |
| `plate` | `string` | Enter a field plate! |
| `price` | `string` | Enter a field price! |
| `isFavorite` | `string` | Enter a field isFavorite! |

#### Remove Vehicle by Id Page
remove unique vehicle passing id
```Route
  PAGE /remove-vehicle/:id
```

| Parameter   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `string` | **required**. Please enter a param id! |
