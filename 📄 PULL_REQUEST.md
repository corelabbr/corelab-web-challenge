# Pull Request – Todo List Application (React + React Query + Axios + TailwindCSS)

## 📝 Overview

This PR delivers a **fully functional Todo List application** built with modern React best practices.

Key features include creating, editing, deleting, favoriting, searching, and color-coding tasks. The app uses:

- **React Query** for data fetching & caching
- **Axios** for API requests
- **TailwindCSS** for responsive styling
- **Lucide React** for icons

The UI is designed to be clean, intuitive, and optimized for productivity.

---

## 🔨 Main Features

### Todo Management

- **Add todos** with title, description, and optional color.
- **Edit todos** inline (title is required).
- **Delete todos** with confirmation modal.
- **Favorite/unfavorite** tasks via a star icon.
- **Expand/collapse notes** for detailed editing.

### Categorization

- Todos automatically grouped into:
  - **Favorites** (pinned at top)
  - **Others** (regular tasks)

### Color Picker

- Assign a custom background color per todo via the `ColorPicker` component.
- Organize notes visually by priority or context.

### Search Functionality

- Global search bar in `Header` filters todos by title in real-time.
- Case-insensitive and smoothly integrated with the list.

### API Integration (Axios Service)

- Centralized Axios client (`service/api.ts`).
- Automatically injects `userId` in requests:
  - `GET /` → query param
  - `POST` / `PATCH` → request body
- Configurable base URL (`http://localhost:3000` by default, replaceable via env).

### State & Data Fetching

- **React Query** for fetching, caching, and mutating todos.
- UI stays in sync with backend automatically.

### Responsive UI

- Built with **TailwindCSS** for modern, responsive layouts.
- Works seamlessly on mobile, tablet, and desktop.

---

## 🏗️ Technologies Used

- React 18+
- React Query
- Axios (with userId interceptor)
- TypeScript
- TailwindCSS
- Lucide React
- Custom Hooks (`useTodos`)

---

## 📂 Project Structure (Key Components & Services)

- `Home.tsx` – Main page integrating header, form, and todo list.
- `Header.tsx` – App title & global search bar.
- `TodoForm.tsx` – Todo creation form.
- `TodoList.tsx` – Renders favorites and other todos.
- `TodoItem.tsx` – Single todo with edit, delete, favorite, and color picker.
- `ColorPicker.tsx` – Select background colors for todos.
- `useTodos.ts` – Custom hook handling CRUD + React Query integration.
- `api.ts` – Axios client with userId interceptor.

---

## 🚀 Getting Started

1. **Clone the repository**

git clone <repo-url>
cd <repo-folder>

2. **Install dependecies**

npm install

3. **Start fronted**

npm run dev
