import { Test, TestingModule } from '@nestjs/testing';
import { CardsService } from './cards.service';
import { Card } from './entities/card.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { DeleteResult } from 'typeorm';

describe('CardsService', () => {
  let service: CardsService;
  let repository: Repository<Card>;

  const mockCardRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CardsService,
        {
          provide: getRepositoryToken(Card),
          useValue: mockCardRepository,
        },
      ],
    }).compile();

    service = module.get<CardsService>(CardsService);
    repository = module.get<Repository<Card>>(getRepositoryToken(Card));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new card', async () => {
      const dto: CreateCardDto = {
        title: 'Test Card',
        description: 'Test Description',
        color: 'green',
        isFavorite: true,
      };
      const card = { id: 1, ...dto };
      mockCardRepository.save.mockResolvedValue(card);

      expect(await service.create(dto)).toEqual(card);
      expect(repository.save).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of cards', async () => {
      const cards = [
        { id: 1, title: 'Card 1', color: 'red', isFavorite: false },
      ];
      mockCardRepository.find.mockResolvedValue(cards);

      expect(await service.findAll()).toEqual(cards);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a card by ID', async () => {
      const card = { id: 1, title: 'Card 1', color: 'red', isFavorite: false };
      mockCardRepository.findOneBy.mockResolvedValue(card);

      expect(await service.findOne(1)).toEqual(card);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });

    it('should return null if card not found', async () => {
      mockCardRepository.findOneBy.mockResolvedValue(null);

      expect(await service.findOne(2)).toBeNull();
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 2 });
    });
  });

  describe('update', () => {
    it('should update a card by ID', async () => {
      const dto: UpdateCardDto = {
        title: 'Updated Card',
        color: 'blue',
        isFavorite: true,
      };
      const updatedCard = { id: 1, ...dto };
      mockCardRepository.update.mockResolvedValue({ affected: 1 });
      mockCardRepository.findOneBy.mockResolvedValue(updatedCard);

      expect(await service.update(1, dto)).toEqual(updatedCard);
      expect(repository.update).toHaveBeenCalledWith(1, dto);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });
  });

  describe('remove', () => {
    it('should remove a card by ID', async () => {
      const deleteResult: DeleteResult = { affected: 1, raw: [] };
      mockCardRepository.delete.mockResolvedValue(deleteResult);

      expect(await service.remove(1)).toEqual(deleteResult);
      expect(repository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw an error if card not found during removal', async () => {
      const deleteResult: DeleteResult = { affected: 0, raw: [] };
      mockCardRepository.delete.mockResolvedValue(deleteResult);

      await expect(service.remove(2)).rejects.toThrow('Card not found');
      expect(repository.delete).toHaveBeenCalledWith(2);
    });
  });

  describe('findFavorites', () => {
    it('should return an array of favorite cards', async () => {
      const favoriteCards = [
        { id: 1, title: 'Favorite Card', color: 'red', isFavorite: true },
      ];
      mockCardRepository.find.mockResolvedValue(favoriteCards);

      expect(await service.findFavorites(true)).toEqual(favoriteCards);
      expect(repository.find).toHaveBeenCalledWith({
        where: { isFavorite: true },
      });
    });
  });

  describe('search', () => {
    it('should return an array of cards based on search parameters', async () => {
      const searchResults = [
        { id: 2, title: 'Card 2', color: 'blue', isFavorite: true },
      ];
      mockCardRepository.find.mockResolvedValue(searchResults);

      const params = { title: 'Card 2', color: 'blue', isFavorite: true };
      expect(await service.search(params)).toEqual(searchResults);
      expect(repository.find).toHaveBeenCalledWith({
        where: [
          { title: ILike(`%Card 2%`), isFavorite: true },
          { color: ILike(`%blue%`), isFavorite: true },
        ],
        order: { updatedAt: 'DESC', createdAt: 'DESC', id: 'DESC' },
      });
    });
  });
});
