import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
export declare class CardsController {
    private readonly cardsService;
    constructor(cardsService: CardsService);
    create(createCardDto: CreateCardDto): Promise<import("./entities/card.entity").Card>;
    findAll(): Promise<import("./entities/card.entity").Card[]>;
    search(title: string, color: string, isFavorite: boolean): Promise<import("./entities/card.entity").Card[]>;
    findOne(id: number): Promise<import("./entities/card.entity").Card>;
    update(id: number, updateCardDto: UpdateCardDto): Promise<import("./entities/card.entity").Card>;
    remove(id: number): Promise<void>;
}
