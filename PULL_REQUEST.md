# 📝 Pull Request: Todo List Application

This PR introduces a comprehensive **Todo List application** built with modern React. It's designed for efficiency and a great user experience, featuring **TanStack Query** for state management and **Sass** for styling.

-----

### **Key Features**

  * **Task Management:** Create, edit, and delete tasks with ease. Deletion is confirmed with a modal to prevent accidental loss.
  * **Favorites:** Pin important tasks to the top of the list by marking them as **favorites**.
  * **Search:** A global search bar allows you to quickly find notes.

-----

### **Technologies Used**

  * React
  * TypeScript
  * TanStack Query
  * Axios
  * Sass
  * React Router DOM
  * Lucide Icons
  * Cypress
  * Framer Motion

-----

### **Technical Highlights**

The application follows best practices to ensure high performance and maintainability.

  * **Data Fetching:** **TanStack Query** manages all data fetching, caching, and mutations. This keeps the UI in sync with the backend and optimizes API call efficiency.
  * **API Service:** A centralized **Axios** service handles API requests, automatically injecting the `userId` to simplify backend communication.
  * **Styling:** The UI is styled with **Sass**, providing a clean, responsive, and customizable design.
  * **Custom Hooks:** The codebase uses custom hooks like `useDebounce` and `useClickOutside` for managing UI logic. A specific hook for TanStack Query centralizes all **CRUD** operations, keeping components lean and focused.

-----

### **Project Structure**

The project structure is organized into clear directories to enhance readability and maintenance.

  * **`app`**: Contains the core application logic.
      * **`hooks`**: Custom hooks.
      * **`services`**: API service.
      * **`entities`**: TypeScript types.
      * **`lib`**: Utility functions.
  * **`views`**: Includes the application pages.
      * **`components`**: UI components.
      * **`styles`**: Sass files.

-----

### **Prerequisites**

Before you begin, you'll need the following tools installed on your machine:

  * Git
  * Node.js

-----

### **Getting Started**

To get the application up and running, follow these simple steps:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Aldovani/corelab-web-challenge.git
    cd corelab-web-challenge
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the project's root directory and add the following:

    ```env
    VITE_API_URL=http://localhost:8080
    ```

4.  **Start the development server:**

    ```bash
    npm run dev
    ```
