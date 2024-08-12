import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { DeleteResult, ILike, Repository } from 'typeorm';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private cardsRepository: Repository<Card>,
  ) {}

  async create(card: CreateCardDto): Promise<Card> {
    return this.cardsRepository.save(card);
  }

  async findAll(): Promise<Card[]> {
    return this.cardsRepository.find();
  }

  async findOne(id: number): Promise<Card> {
    return this.cardsRepository.findOneBy({ id });
  }

  async update(id: number, card: UpdateCardDto): Promise<Card> {
    await this.cardsRepository.update(id, card);
    return this.cardsRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<DeleteResult> {
    const result = await this.cardsRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`Card not found`);
    }
    return result;
  }

  async findFavorites(isFavorite: boolean): Promise<Card[]> {
    return this.cardsRepository.find({ where: { isFavorite } });
  }

  async search(params: {
    title?: string;
    color?: string;
    isFavorite?: boolean;
  }): Promise<Card[]> {
    const where: any[] = [];

    if (params.title) {
      where.push({ title: ILike(`%${params.title}%`) });
    }

    if (params.color) {
      where.push({ color: ILike(`%${params.color}%`) });
    }

    if (where.length) {
      where.forEach((condition) => {
        condition.isFavorite = params.isFavorite;
      });
    } else {
      where.push({ isFavorite: params.isFavorite });
    }

    return this.cardsRepository.find({
      where: where.length ? where : undefined,
      order: { updatedAt: 'DESC', createdAt: 'DESC', id: 'DESC' },
    });
  }
}
