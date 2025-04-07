/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo, TodoDocument } from '../schemas/todo.schema';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import { IdFormatter } from '../../../config/id-formatter';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name) private todoModel: Model<TodoDocument>
  ) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const createdTodo = new this.todoModel(createTodoDto);
    const savedTodo = await createdTodo.save();
    
    // Converter o _id do MongoDB para um número para compatibilidade com o frontend
    const todoObj = savedTodo.toObject();
    todoObj.id = IdFormatter.toNumber(savedTodo._id);
    
    return todoObj;
  }

  async findAll(): Promise<Todo[]> {
    const todos = await this.todoModel.find().sort({ isFavorite: -1, createdAt: -1 }).exec();
    
    // Converter os _ids do MongoDB para números para compatibilidade com o frontend
    return todos.map(todo => {
      const todoObj = todo.toObject();
      todoObj.id = IdFormatter.toNumber(todo._id);
      return todoObj;
    });
  }

  async findOne(id: string | number): Promise<Todo> {
    const objectId = IdFormatter.toObjectId(id);
    const todo = await this.todoModel.findById(objectId).exec();
    
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    
    // Converter o _id do MongoDB para um número para compatibilidade com o frontend
    const todoObj = todo.toObject();
    todoObj.id = IdFormatter.toNumber(todo._id);
    
    return todoObj;
  }

  async update(id: string | number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    // Obter todos os todos
    const todos = await this.todoModel.find().exec();
    
    // Encontrar o todo com id correspondente
    const todoToUpdate = todos.find(todo => {
      const numericId = IdFormatter.toNumber(todo._id);
      return numericId.toString() === id.toString();
    });
    
    if (!todoToUpdate) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    
    // Atualizar o todo encontrado
    const updatedTodo = await this.todoModel
      .findByIdAndUpdate(todoToUpdate._id, updateTodoDto, { new: true })
      .exec();
    
    // Converter o _id do MongoDB para um número para compatibilidade com o frontend
    const todoObj = updatedTodo.toObject();
    todoObj.id = IdFormatter.toNumber(updatedTodo._id);
    
    return todoObj;
  }

  async remove(id: string | number): Promise<void> {
    // Obter todos os todos
    const todos = await this.todoModel.find().exec();
    
    // Encontrar o todo com id correspondente
    const todoToDelete = todos.find(todo => {
      const numericId = IdFormatter.toNumber(todo._id);
      return numericId.toString() === id.toString();
    });
    
    if (!todoToDelete) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    
    // Excluir o todo encontrado
    await this.todoModel.findByIdAndDelete(todoToDelete._id).exec();
  }
} 