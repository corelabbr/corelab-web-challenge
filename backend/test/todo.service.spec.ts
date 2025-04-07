import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from '../src/modules/todos/services/todo.service';
import { getModelToken } from '@nestjs/mongoose';
import { Todo } from '../src/modules/todos/schemas/todo.schema';
import { NotFoundException } from '@nestjs/common';

describe('TodoService', () => {
  let service: TodoService;
  let mockTodoModel: any;

  const mockTodo = {
    _id: '507f1f77bcf86cd799439011',
    title: 'Test Todo',
    description: 'Test Description',
    isFavorite: false,
    color: '#4caf50',
    createdAt: new Date(),
    toObject: jest.fn().mockReturnValue({
      _id: '507f1f77bcf86cd799439011',
      title: 'Test Todo',
      description: 'Test Description',
      isFavorite: false,
      color: '#4caf50',
      createdAt: new Date(),
    }),
  };

  beforeEach(async () => {
    mockTodoModel = {
      new: jest.fn().mockReturned(mockTodo),
      constructor: jest.fn().mockReturned(mockTodo),
      find: jest.fn(),
      findById: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      findByIdAndDelete: jest.fn(),
      save: jest.fn(),
      exec: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: getModelToken(Todo.name),
          useValue: mockTodoModel,
        },
      ],
    }).compile();

    service = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of todos', async () => {
      const mockTodos = [mockTodo];
      mockTodoModel.find = jest.fn().mockReturnValue({
        sort: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(mockTodos),
        }),
      });

      const result = await service.findAll();
      expect(result.length).toBeGreaterThan(0);
      expect(mockTodoModel.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a todo by id', async () => {
      mockTodoModel.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockTodo),
      });

      const result = await service.findOne('1');
      expect(result).toBeDefined();
      expect(mockTodoModel.findById).toHaveBeenCalled();
    });

    it('should throw NotFoundException if todo not found', async () => {
      mockTodoModel.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });
}); 