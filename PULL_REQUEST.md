# Pull Request: CoreNotes Application

## Overview

This pull request introduces a fullstack application named **CoreNotes**. It is designed to manage todo notes with various features, including creating, editing, deleting, and searching notes. The application is built with a Node.js backend and a React frontend, following best practices in terms of structure, testing, and deployment.

## Features Implemented

### 1. Backend (Node.js)
- **Node.js with Express:** Developed a RESTful API using Node.js and Express, structured with an MVC pattern.
- **Database Management with Sequelize:** 
  - Integrated Sequelize ORM to interact with a PostgreSQL database.
  - Implemented database migrations and seeders.
- **Swagger Documentation:**
  - Used Swagger for API documentation, allowing easy access and understanding of the available endpoints.
- **Unit Testing:**
  - Developed comprehensive unit tests for all API actions using Jest and Supertest.
  - Achieved a high level of code coverage.
- **Docker Integration:**
  - Configured Docker for containerized deployment.
  - Added `docker-compose` for easier environment setup, including the PostgreSQL database.
  
### 2. Frontend (React)
- **React with Tailwind CSS:**
  - Built a user interface using React, styled with Tailwind CSS.
  - Implemented components for note management, including adding, editing, deleting, and searching notes.
- **State Management:**
  - Managed application state using React hooks.
  - Created custom hooks like `useFetchNotes` and `useFavoriteToggle` to handle API interactions.
- **Unit Testing:**
  - Developed unit tests for all components and hooks using Jest and React Testing Library.
  - Achieved comprehensive test coverage to ensure UI reliability.
- **Responsive Design:**
  - Ensured the UI is fully responsive and works seamlessly across various devices.

## Repo link

You can find the code solution at:

[Repo link](https://github.com/Xarlie-Xarlie/corenotes)

## Conclusion

This pull request encapsulates a comprehensive, fullstack notes management application, complete with backend and frontend, testing, and deployment configurations. Every aspect has been carefully crafted to meet industry standards and best practices. 

I appreciate your time in reviewing this pull request, and I'm open to any feedback or suggestions.
