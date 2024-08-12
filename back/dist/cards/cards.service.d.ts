import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from './entities/card.entity';
import { DeleteResult, Repository } from 'typeorm';
export declare class CardsService {
    private cardsRepository;
    constructor(cardsRepository: Repository<Card>);
    create(card: CreateCardDto): Promise<Card>;
    findAll(): Promise<Card[]>;
    findOne(id: number): Promise<Card>;
    update(id: number, card: UpdateCardDto): Promise<Card>;
    remove(id: number): Promise<DeleteResult>;
    findFavorites(isFavorite: boolean): Promise<Card[]>;
    search(params: {
        title?: string;
        color?: string;
        isFavorite?: boolean;
    }): Promise<Card[]>;
}
