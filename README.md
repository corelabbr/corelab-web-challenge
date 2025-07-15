## Corelab Challenge:

You are tasked with building a web application that allows users to create and manage their to-do lists. The application should consist of a responsive webpage built in React, and an API built in Node.js to store and manage the to-do lists.

### The repositories

The [frontend repository](https://github.com/corelabbr/corelab-web-challenge)

If you feel more comfortable, you can pick another React framework and show us your skills.

The [backend repository](https://github.com/corelabbr/corelab-api-challenge)

If you feel more comfortable, you can pick another Node JS framework and show us your skills.

### The Layout

Open the [layout mockup](https://www.figma.com/file/sQrUVHTlyogq3qGdkqGTXN/mockup?node-id=7%3A2&t=ANTOTiqjqGWYuoUr-0) in desktop and mobile version and follow this design as much as possible.

### The application should have the following functionality:

1. Users should be able to create, read, update, and delete to-do items using the API.
2. Users should be able to mark an item as a favorite.
3. Users should be able to set a color for each to-do item.
4. The React frontend should display the user's to-do list in a responsive and visually appealing manner, with the ability to filter by favorite items and color.
5. The favorited items should be displayed at the top of the list.

### Technical Requirements:

1. The backend API should be built in Node.js framework and use a database of your choice (e.g., MongoDB, PostgreSQL, etc.).
2. The frontend should be built in React and use modern web development tools and best practices.
3. The application should be responsive and visually appealing.

### Deliverables:

1. A link to a GitHub repository containing the complete source code for the project.
2. A written description of how to set up and run the application locally.

### Evaluation Criteria:

1. Code Quality
2. Code Format
3. Code Perfomance
4. Frontend Design
5. If your code is Easily Readable
6. Mobile First approach
7. Code Responsability
8. Features Work
9. Responsiveness
10. Does the application meet the functionality requirements listed above?
11. Is the code well-organized, easy to read, and well-documented?
12. Are modern web development tools and best practices used?
13. Is the application visually appealing and responsive?

### Backend

Repository:

1. Node: ^16.15.0
2. NPM: ^8.5.5
3. Framework: Adonis TS or any other node framework you know.
4. Database: Choose your own, you can even save in memory.

### Frontend

Repository:

1. Node: ^16.15.0
2. NPM: ^8.5.5
3. Framework: React TS
4. Sass or other preprocessor

### Want to impress us even more?

If you feel comfortable and want to impress us even more, you can do the following:

1. Work on correct types and interfaces
2. Work on eslint rules
3. Work prettier config
4. Work on docker containers
5. Work on tests
6. Work on CI/CD

### What to do when you finish?

Create a file PULL_REQUEST.md where you will describe what you did and how in as much detail as possible. Feel free to add videos for better explanation.

Create a new pull request using the same branch name for Backend and Frontend

Send us the pull requests and that's all!

#### Good luck! The sky is the limit 🚀

---

## Getting Started

There are two ways to run this project: with Docker for a one-command setup, or by setting up each service manually.

### Running with Docker

This is the simplest way to get the entire application running.

**Prerequisites:**

- Docker Desktop installed and running.

**Steps:**

1.  Clone both the frontend (`corelab-web-challenge`) and backend (`corelab-api-challenge`) repositories into the same parent directory. Your folder structure should look like this:

    ```
    your-main-folder/
    ├── corelab-api-challenge/
    └── corelab-web-challenge/
    ```

2.  In the root `your-main-folder`, create a new file named `docker-compose.yml`.

3.  Paste the following content into the `docker-compose.yml` file:

    ```yaml
    version: "3.8"

    services:
      backend:
        build: ./corelab-api-challenge
        container_name: corelab-api
        ports:
          - "3333:3333"
        volumes:
          - ./corelab-api-challenge:/app
          - /app/node_modules
        environment:
          - DATABASE_URL=file:./dev.db

      frontend:
        build: ./corelab-web-challenge
        container_name: corelab-web
        ports:
          - "3000:3000"
        volumes:
          - ./corelab-web-challenge:/app
          - /app/node_modules
        depends_on:
          - backend
    ```

4.  Open a terminal in the root directory and run:

    ```bash
    docker compose up --build
    ```

5.  Access the application at `http://localhost:3000`.

### Running Locally (Without Docker)

**Prerequisites:**

- Node.js `v16.15.0`
- NPM `v8.5.5`

#### Backend Setup

1.  Navigate to the `corelab-api-challenge` directory.
2.  Install dependencies: `npm install`
3.  Create the environment file and generate an app key:
    ```bash
    cp .env.example .env
    node ace generate:key
    ```
4.  Run the database migration: `npx prisma migrate dev`
5.  Start the server (runs on `http://localhost:3333`):
    ```bash
    npm run dev
    ```

#### Frontend Setup

1.  In a **new terminal**, navigate to the `corelab-web-challenge` directory.
2.  Install dependencies: `npm install`
3.  Start the development server (opens `http://localhost:3000`):
    ```bash
    npm start
    ```
