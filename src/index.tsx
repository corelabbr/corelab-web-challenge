import React from "react";
import ReactDOM from "react-dom/client";
import "./index.module.scss";
import TasksPage from "./pages/Tasks";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <TasksPage />
  </React.StrictMode>
);
