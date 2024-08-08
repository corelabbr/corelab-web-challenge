import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Message from "./components/layouts/Message";
import MainLayout from "./components/layouts/MainLayout";
import Home from "./pages/Home";
import { NoteProvider } from "./context/NoteContext";

function App() {
  return (
    <Router>
      <NoteProvider>
        <MainLayout>
          <Message />
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </MainLayout>
      </NoteProvider>
    </Router>
  );
}

export default App;
