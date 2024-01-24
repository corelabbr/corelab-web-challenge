link to github repository [front-end repository](https://github.com/KaduViana1/corelab-web)

## About the APP

This front-end application is made with react and sass, I tried not to change the structure of the original repository as well as create reusable components and functions.

The application styling is all created using the mobile first approach and with focus in make the design as close as possible with the figma mockup while mantaining a good responsiviness.

I used the figma file to get most of the icons as SVG to make the application more performant.

In the application the user can create, update and delete their todos, filter by favorites, not favorites, colors and search by text in the title or in the content of the todos.
In order to update a todo the user most click in the pen icon of the note enabling edit mode and clicking again in the save icon in the heading of the note. (When clicking the colors icon it automatically enter save mode, but the user still has to click the save icon. Favoriting an note automatically saves.)

I used zustand as store management library since is a very light and easy to use lib and is becoming very popular lately so I used this oportunity to use it and learn more about it.

When the application is open it sends a call to the backend API, get back all the users todo and save in the zustand store also making a copy of the todos, it displays the copy in the page, this way when the user tries to apply a filter or search for todos the app only has to filter the original todos state and change the copy to show only the ones that passes the filter, excluding the need to fetch todos again. I used this approach to minimize API calls, since this is a very small application and doesn't even have pagination.
(When creating, updating or deleting todos the app makes the necessary api requests and then update both todos list in the state)

I used axios to make API calls refactoring the lib/api direcotry methods, to more easily use specific methods and get errors.

i also included react-toastify to send a toast notification to the user whenever the user successfully crate, update or delete as well as when something went wrong.

## Eslint and Prettier

I made some configurations in the 'package.json' file, first I noticed that all the dependencies was configured to be instaled as production dependencies so I changed some of them to be dev-dependencies (dependencies like typescript and testing libs). Them I added eslint and prettier configurations to match the configurantions and format of the back-end

Eslint: In the eslint config I just added the prettier plugin and configs to avoid conflicts and added the "no-console" rule to help preventing sending console.logs to production

Prettier: Most of the configurations I copied from the backend repository, only added "semi" true to use semi-colons and "tabWidth 2" for better identation.

## Working with Docker

The repository includes Dockerfile and docker-compose files to easily containerize the application, you just have to add a .env file with a variable 'REACT_APP_API' that points to the backend API (if not provided the application will try to use 'http://localhost:3000')

I also created a monorepo repository in the github with the front-end,back-end and database repositories and docker-compose to run all the containers.
The [monorepo repository](https://github.com/KaduViana1/corelab-monorepo)

## How to run the application

To run the application you just have to add a .env file with a variable 'REACT_APP_API' that points to the backend API (if not provided the application will try to use 'http://localhost:3000') and then run the command 'npm start' in out terminal. Or you can follow the steps from the section above to use it with docker.
