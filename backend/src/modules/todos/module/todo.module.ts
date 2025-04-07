/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoController } from '../controllers/todo.controller';
import { TodoService } from '../services/todo.service';
import { Todo, TodoSchema } from '../schemas/todo.schema';
import { databaseConfig } from '../../../config/databaseConfig';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/todolist_db', databaseConfig),
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }])
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {} 