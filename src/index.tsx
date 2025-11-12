import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.module.scss";
import "./styles/global.scss";
import reportWebVitals from "./reportWebVitals";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { FeedbackProvider } from "./providers/FeedbackProvider";
import { AuthProvider } from "./providers/AuthProvider";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <FeedbackProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </FeedbackProvider>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
