# task-manager

Full-stack application with React frontend and NestJS backend.

## 🔧 Tech Stack and Features

- **Database:** MySQL
- **API Protocol:** REST
### Frontend

- Vite + React
- TypeScript
- MUI (Material UI)
- React Query
- Mobile-first responsive


### Backend

- NestJS
- TypeORM
- MySQL
- Class Validator
- CORS enabled for frontend



## 📂 Project Structure

### Frontend
- `corelab-web-challenge/` – React application
- `corelab-web-challenge/src/components/` – Reusable UI components
- `corelab-web-challenge/src/hooks/` – React Query hooks
- `corelab-web-challenge/src/interfaces/` – Shared types
- `corelab-web-challenge/src/constants/` – Shared constants
- `corelab-web-challenge/src/providers/` – Shared providers

### Backend
- `corelab-api-challenge/` – NestJS API server
- `corelab-api-challenge/src/modules/tasks/` – Example domain module
- `corelab-api-challenge/src/common/` – DTOs, interceptors, guards
- `corelab-api-challenge/src/config/` – Environment setup

## 🌐 Environment Variables

### Frontend

Configure in .env:
```ts
VITE_API_URL="http://localhost:3000"
```

### Backend
Create .env file:

```ini
MYSQL_CLIENT=mysql2
MYSQL_HOST=localhost
MYSQL_PORT=3307
MYSQL_ROOT_PASSWORD=admin
MYSQL_DATABASE=task-manager-mysql
MYSQL_USER=admin
MYSQL_PASSWORD=admin
```

## 🚀 Getting Started


### 1. Clone the repo

```bash
git clone https://github.com/Nick-Fran/corelab-web-challenge
git clone https://github.com/Nick-Fran/corelab-api-challenge
```

### 2. Install dependencies

```bash
cd corelab-api-challenge && npm install
cd ../corelab-web-challenge && npm install
```

### 3. Run Docker

```bash
cd ../corelab-api-challenge
sudo docker compose up --build -d
```

### 4. Run dev servers

```bash
# Frontend
cd ../corelab-web-challenge
npm run dev

# Backend
cd ../corelab-api-challenge
npm run start:dev
```