import { BrowserRouter } from "react-router-dom";
import { Header } from "./components/Header";
import { Router } from "./routes/Router";
import { ToastContainer } from "react-toastify";
import { NoteProvider } from "./contexts/NotesContext";

export function App() {
  return (
    <BrowserRouter>
      <NoteProvider>
        <Header />
        <Router />

        <ToastContainer autoClose={2000} theme="light" />
      </NoteProvider>
    </BrowserRouter>
  );
}
