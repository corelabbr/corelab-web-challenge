import express from "express";
import TaskController from "../controllers/TasksController";

const taskRouter = express.Router();

taskRouter.get("/", TaskController.getAllTasks);
taskRouter.get("/:id", TaskController.findTaskById);
taskRouter.post("/", TaskController.createTask);
taskRouter.put("/:id", TaskController.updateTask);
taskRouter.delete("/:id", TaskController.deleteTaskById);

taskRouter.get("/favorites", TaskController.getAllFavoritesTasks);
taskRouter.put("/favorites/:id", TaskController.toggleFavoriteTaskById);

export default taskRouter;

