import React from "react";
import ReactDOM from "react-dom/client";
import "./index.module.scss";
import TasksList from "./pages/TaskList";
import reportWebVitals from "./reportWebVitals";
import { TasksProvider } from "./contexts/TasksContext";
import Layout from "./pages/layout";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <TasksProvider>
      <Layout>
        <TasksList />
      </Layout>
    </TasksProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
