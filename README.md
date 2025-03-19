# Core Notes Front-end

## About the project

Aplication to help manage tasks and reminders.
The project has customization by colors, search and favorites.

For more information, see [PULL_REQUEST.md](PULL_REQUEST.md).

### The application has the following features

- Users are able to create, read, update and delete pending tasks using the API.
- Users can mark an item as a favorite.
- Users can set a color for each task item.
- User task list in a responsive and visually appealing way, with the ability to filter items.
- Favorite items are displayed at the top of the list.
- The application was made to adapt to smaller screens in the best possible way.

### Extras

- Authentication and profile.

More features in [PULL_REQUEST.md](PULL_REQUEST.md).

## Tecnologies

- Vite
- React TS
- TypeScript
- Styled Components
- React Icons
- Axios

## Figma (the layout)

Open the [layout mockup](https://www.figma.com/file/sQrUVHTlyogq3qGdkqGTXN/mockup?node-id=7%3A2&t=ANTOTiqjqGWYuoUr-0) in desktop and mobile version and **this design conforms as much as possible**.

## Docker

```bash
$ docker compose -f docker-compose.yml up
```

or

```bash
$ docker compose -f docker-compose.yml up -d
```

Image: Nodejs 22 (Alpine)

Port: 5173

## Without Docker

Install dependencies: `yarn`

Execute: `yarn run dev`

Port: 5173

## LICENSE

The project is licensed under: [MIT](LICENSE.md)
