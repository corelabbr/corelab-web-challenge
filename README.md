# CoreNotes Frontend

This is the frontend part of the To-Do List application, built with React + TypeScript + Vite. It provides a responsive and visually appealing interface for users to create, manage, and organize their to-do lists.

## Getting Started

> [!IMPORTANT]  
> Make sure you have Node.js and npm installed on your machine before proceeding.

To run the project locally, follow these steps:

### Prerequisites

- **Node.js**: v18+ or v20+. 
- **npm**: ^8.5.5

> [!TIP]
> You can check if Node.js and npm are installed by running `node -v` and `npm -v` in your terminal.

### Installation

1. **Clone the repository:**

  ```
  git clone -b core-notes https://github.com/izJoey/corelab-web-challenge.git
  ```
2. **Navigate to the project directory:**
  ```
  cd corelab-web-challenge
  ```
3. **Install the dependencies:**
  ```
  npm install
  ```
> [!NOTE]
> The npm install command will install all necessary dependencies listed in the package.json file.



### Running the Application

  ```
  npm run dev
  ```

Open your browser and navigate to:

  ```
  http://localhost:5173/
  ```

> [!CAUTION]
> Avoid running the application on ports already in use. If port 5173 is occupied, you might need to specify a different port.

#### Configuration:

> [!NOTE]
> There are no additional configurations needed for running the frontend locally. The application connects to the backend API at a predefined URL. Ensure the backend is running before interacting with the app.


#### Features:

- CRUD Operations: Add, edit, delete, and view to-do items.
- Favorites: Mark to-do items as favorites to display them at the top.
- Color Coding: Assign colors to items for better organization.
- Responsive Design: Works well on both desktop and mobile devices.
