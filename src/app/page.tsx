import { Header } from "../components/header";
import { TaskList } from "../components/task-list";
import { TaskCreator } from "../components/task-creator";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <main className="pb-24 flex flex-col gap-10">
      <Header></Header>
      <ToastContainer
        position="top-right"
        theme="colored"
        className="float-right"
      ></ToastContainer>
      <TaskCreator></TaskCreator>
      <TaskList></TaskList>
    </main>
  );
}
