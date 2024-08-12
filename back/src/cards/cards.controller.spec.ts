import { Test, TestingModule } from '@nestjs/testing';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { NotFoundException } from '@nestjs/common';

describe('CardsController', () => {
  let controller: CardsController;
  let service: CardsService;

  const mockCardService = {
    create: jest.fn((dto) => ({
      id: Date.now(),
      ...dto,
    })),
    findAll: jest.fn(() => [
      { id: 1, title: 'Card 1', color: 'red', isFavorite: false },
    ]),
    search: jest.fn(() => [
      { id: 2, title: 'Card 2', color: 'blue', isFavorite: true },
    ]),
    findOne: jest.fn((id) => ({
      id,
      title: 'Card 1',
      color: 'red',
      isFavorite: false,
    })),
    update: jest.fn((id, dto) => ({
      id,
      ...dto,
    })),
    remove: jest.fn((id) => ({ id })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardsController],
      providers: [
        {
          provide: CardsService,
          useValue: mockCardService,
        },
      ],
    }).compile();

    controller = module.get<CardsController>(CardsController);
    service = module.get<CardsService>(CardsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a card', async () => {
      const dto: CreateCardDto = {
        title: 'Test Card',
        description: 'Test Description',
        color: 'green',
        isFavorite: true,
      };
      expect(await controller.create(dto)).toEqual({
        id: expect.any(Number),
        ...dto,
      });
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of cards', async () => {
      expect(await controller.findAll()).toEqual([
        { id: 1, title: 'Card 1', color: 'red', isFavorite: false },
      ]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('search', () => {
    it('should return an array of cards based on search query', async () => {
      const query = { title: 'Card 2', color: 'blue', isFavorite: true };
      expect(
        await controller.search(query.title, query.color, query.isFavorite),
      ).toEqual([{ id: 2, title: 'Card 2', color: 'blue', isFavorite: true }]);
      expect(service.search).toHaveBeenCalledWith(query);
    });
  });

  describe('findOne', () => {
    it('should return a card by ID', async () => {
      const id = 1;
      expect(await controller.findOne(id)).toEqual({
        id,
        title: 'Card 1',
        color: 'red',
        isFavorite: false,
      });
      expect(service.findOne).toHaveBeenCalledWith(id);
    });

    it('should throw a NotFoundException if card not found', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(null);
      await expect(controller.findOne(2)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a card by ID', async () => {
      const id = 1;
      const dto: UpdateCardDto = {
        title: 'Updated Card',
        color: 'blue',
        isFavorite: true,
      };
      expect(await controller.update(id, dto)).toEqual({
        id,
        ...dto,
      });
      expect(service.update).toHaveBeenCalledWith(id, dto);
    });

    it('should throw a NotFoundException if card not found during update', async () => {
      jest.spyOn(service, 'update').mockResolvedValueOnce(null);
      await expect(controller.update(2, {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a card by ID', async () => {
      const id = 1;
      expect(await controller.remove(id));
      expect(service.remove).toHaveBeenCalledWith(id);
    });

    it('should throw a NotFoundException if card not found during removal', async () => {
      jest
        .spyOn(service, 'remove')
        .mockRejectedValueOnce(new NotFoundException());
      await expect(controller.remove(2)).rejects.toThrow(NotFoundException);
    });
  });
});
