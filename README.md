# Frontend – React

## 🖼 Stack

- Vite + React
- TypeScript
- MUI (Material UI)
- React Query
- React Router

## 📁 Structure

- `src/components/` – Reusable UI components
- `src/hooks/` – React Query hooks
- `src/interfaces/` – Shared types
- `src/constants/` – Shared constants
- `src/providers/` – Shared providers

## 🔄 API Integration

Uses React Query. Example:

```ts
const { data } = useQuery({
  queryKey: ['tasks'],
  queryFn: () => axios.get('/api/tasks').then(res => res.data)
});
```

## 🌐 Environment Variables

Configure in .env:

```ts
VITE_API_URL="http://localhost:3000"
```
