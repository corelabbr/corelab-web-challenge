"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const card_entity_1 = require("./entities/card.entity");
const typeorm_2 = require("typeorm");
let CardsService = class CardsService {
    constructor(cardsRepository) {
        this.cardsRepository = cardsRepository;
    }
    async create(card) {
        return this.cardsRepository.save(card);
    }
    async findAll() {
        return this.cardsRepository.find();
    }
    async findOne(id) {
        return this.cardsRepository.findOneBy({ id });
    }
    async update(id, card) {
        await this.cardsRepository.update(id, card);
        return this.cardsRepository.findOneBy({ id });
    }
    async remove(id) {
        const result = await this.cardsRepository.delete(id);
        if (result.affected === 0) {
            throw new Error(`Card not found`);
        }
        return result;
    }
    async findFavorites(isFavorite) {
        return this.cardsRepository.find({ where: { isFavorite } });
    }
    async search(params) {
        const where = [];
        if (params.title) {
            where.push({ title: (0, typeorm_2.ILike)(`%${params.title}%`) });
        }
        if (params.color) {
            where.push({ color: (0, typeorm_2.ILike)(`%${params.color}%`) });
        }
        if (where.length) {
            where.forEach((condition) => {
                condition.isFavorite = params.isFavorite;
            });
        }
        else {
            where.push({ isFavorite: params.isFavorite });
        }
        return this.cardsRepository.find({
            where: where.length ? where : undefined,
            order: { updatedAt: 'DESC', createdAt: 'DESC', id: 'DESC' },
        });
    }
};
exports.CardsService = CardsService;
exports.CardsService = CardsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(card_entity_1.Card)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CardsService);
//# sourceMappingURL=cards.service.js.map