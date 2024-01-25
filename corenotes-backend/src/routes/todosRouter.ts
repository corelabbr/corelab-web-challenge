import { Router } from "express";
import {
  getAllTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todosController";

export const todosRouter = Router();

todosRouter.get("/", getAllTodos);
todosRouter.get("/:id", getTodo);
todosRouter.post("/", createTodo);
todosRouter.put("/:id", updateTodo);
todosRouter.delete("/:id", deleteTodo);

export default todosRouter;
