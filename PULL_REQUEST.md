# To Do List App - Nélio Dias

link to  my github repository [front-end repository](https://github.com/jrneliodias/corel-lab-todo-app-nelio)

## Instalation
To install the project, you have to clone the project, install the dependecies of package.json and run the Node server.

After install Prisma Client, you have to create a temporary Railway Postgres database to store the Tasks.


## Application Overview

This frontend application is crafted using Next.js 14, Typescript, Prisma ORM, Daisy UI Components, Postgres SQL, and Railway for Database Server.

The design prioritizes mobile-first styling, allowing users to seamlessly create, update, and delete their todos. Additionally, users can filter their todos based on favorites and assign various colors to tasks.

To enhance the efficiency of API calls, I implemented asynchronous functions, restructuring methods within the lib/api directory for improved usability of specific functions and error management. The application offers the flexibility to choose between Prisma or Json-server for task storage.

For the front-end, I used React Hooks, useState and useEffect, to handle the user interaction with the commands.

For the initial user interaction, the Add Task button facilitates the management of the favorite checkbox, color selection, and text input, all of which are subsequently sent to the database.

Alright, so when a new task is added in The To-Do App, it triggers a re-render, and voila, the task pops up in the list. Now, here's where it gets interesting. Users can designate a task as a favorite using the star icon, make edits using the pen tool, or straight-up delete it with the trash icon.

And here's a cool feature: if the user hits the star to mark it as a favorite, the app automatically shuffles it right up to the top of the list. It's a neat way to prioritize those important tasks!

Updating a todo involves clicking the pen icon to activate the edit mode modal, followed by sending a PUT request to the database. The database is automatically updated with changes to the favorite status and button color.

So, in the next App launching, it initiates a call to the backend API, retrieves all user todos, and stores in the useState. A duplicate set of todos is displayed on the page. 
