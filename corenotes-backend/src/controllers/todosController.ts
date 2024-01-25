import { type Request, type Response } from "express";
import { TodoModel } from "../models/todo";

export async function getAllTodos(
  request: Request,
  response: Response,
): Promise<void> {
  try {
    const data = await TodoModel.find();
    response.json(data);
  } catch (e: any) {
    response.status(404).json(e.message);
  }
}

export async function getTodo(
  request: Request,
  response: Response,
): Promise<void> {
  try {
    const id = request.params.id;
    const data = await TodoModel.find({ _id: id });

    if (data.length == 0) {
      throw new Error("Todo not found");
    }

    response.json(data);
  } catch (e: any) {
    response.status(404).json(e.message);
  }
}

export async function createTodo(
  request: Request,
  response: Response,
): Promise<void> {
  try {
    const newTodo = new TodoModel(request.body);
    const data = await newTodo.save();
    response.json(data);
  } catch (e: any) {
    response.status(400).json(e.message);
  }
}

export async function updateTodo(
  request: Request,
  response: Response,
): Promise<void> {
  try {
    const id = request.params.id;
    const data = await TodoModel.findOneAndUpdate({ _id: id }, request.body, {
      new: true,
    });
    response.json(data);
  } catch (e: any) {
    response.status(400).json(e.message);
  }
}

export async function deleteTodo(
  request: Request,
  response: Response,
): Promise<void> {
  try {
    const id = request.params.id;
    const data = await TodoModel.findOneAndDelete({ _id: id });

    if (data == null) {
      throw new Error("Todo not found");
    }

    response.json(data);
  } catch (e: any) {
    response.status(404).json(e.message);
  }
}
