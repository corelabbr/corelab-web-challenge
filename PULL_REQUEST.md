
<h1 align="center"> Corelab Challenge </h1>

## 📖 About the Project

This is a web application designed for users to create and manage their to-do lists. The application includes a responsive webpage built with React and an API developed using Node.js to store and manage the to-do items.

## 💻 Backend

- TypeScript
- Node.js
- Express
- Zod
- Prisma
- SQLite

### Setting Up and Running the Application Locally

**Requirements:** Node.js (v20.16.0 or higher), npm (v10.8.1 or higher)

**Environment Variables:**

Ensure the following variable is set in your `.env` file:

```
DATABASE_URL="file:./dev.db"
```

The color options for the to-do blocks can be inserted manually into the database, or you can run the command `npm run seed` to automatically generate 10 color entries.

**Steps to Run the Backend:**

1. **Clone the repository:**

   ```bash
   git clone https://github.com/YuriMont/corelab-web-challenge
   ```

2. **Navigate to the project directory:**

   ```bash
   cd ./corelab-web-challenge/server
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Generate Prisma client:**

   ```bash
   npx prisma generate
   ```

5. **Start the server:**

   ```bash
   npm run dev
   ```

## 🌐 Web

- TypeScript
- React.js
- Tailwind CSS
- Axios
- Zod
- React Query
- React Hook Form
- ESLint

### Setting Up and Running the Application Locally

**Requirements:** Node.js (v20.16.0 or higher), npm (v10.8.1 or higher)

**Environment Variables:**

Ensure the following variable is set in your `.env.local` file:

```
VITE_API_BACKEND_URL="http://localhost:3333"
```

**Steps to Run the Frontend:**

1. **Navigate to the web directory:**

   ```bash
   cd ./corelab-web-challenge/web
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the frontend server:**

   ```bash
   npm run dev
   ```

## 📌 Features

- Users can create, read, update, and delete to-do items via the API.
- Users can mark items as favorites.
- Users can assign a color to each to-do item.
- The React frontend displays the user's to-do list in a responsive and visually appealing manner, with the ability to filter by favorite items and color.
- Favorited items are displayed at the top of the list.

## 🛠️ Technologies

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)&nbsp;
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)&nbsp;
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)&nbsp;
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)&nbsp;
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)&nbsp;
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)&nbsp;
![GitHub](https://img.shields.io/badge/GitHub-20232A?style=for-the-badge&logo=GitHub&logoColor=white)&nbsp;
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white)&nbsp;
![VSCode](https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)&nbsp;

</div>