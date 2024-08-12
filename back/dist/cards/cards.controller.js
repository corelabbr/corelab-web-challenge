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
exports.CardsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cards_service_1 = require("./cards.service");
const create_card_dto_1 = require("./dto/create-card.dto");
const update_card_dto_1 = require("./dto/update-card.dto");
let CardsController = class CardsController {
    constructor(cardsService) {
        this.cardsService = cardsService;
    }
    create(createCardDto) {
        return this.cardsService.create(createCardDto);
    }
    findAll() {
        return this.cardsService.findAll();
    }
    search(title, color, isFavorite) {
        return this.cardsService.search({ title, color, isFavorite });
    }
    async findOne(id) {
        const card = await this.cardsService.findOne(id);
        if (!card) {
            throw new common_1.NotFoundException(`Card not found`);
        }
        return card;
    }
    async update(id, updateCardDto) {
        const updatedCard = await this.cardsService.update(id, updateCardDto);
        if (!updatedCard) {
            throw new common_1.NotFoundException(`Card not found`);
        }
        return updatedCard;
    }
    async remove(id) {
        try {
            await this.cardsService.remove(id);
        }
        catch (error) {
            throw new common_1.NotFoundException(`Card not found`);
        }
    }
};
exports.CardsController = CardsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Criar um novo card' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'O card foi criado com sucesso.',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erro de validação' }),
    (0, swagger_1.ApiBody)({ type: create_card_dto_1.CreateCardDto }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        exceptionFactory: (errors) => new common_1.BadRequestException(errors),
    })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_card_dto_1.CreateCardDto]),
    __metadata("design:returntype", void 0)
], CardsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Pegar todos os cards' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Todos os cards retornados com sucesso.',
        type: [create_card_dto_1.CreateCardDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CardsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiOperation)({ summary: 'Encontrar cards por parametros' }),
    (0, swagger_1.ApiQuery)({ name: 'title', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'color', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'isFavorite', required: false, type: Boolean }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Cards encontrados com sucesso.',
        type: [create_card_dto_1.CreateCardDto],
    }),
    __param(0, (0, common_1.Query)('title')),
    __param(1, (0, common_1.Query)('color')),
    __param(2, (0, common_1.Query)('isFavorite')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Boolean]),
    __metadata("design:returntype", void 0)
], CardsController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Pegar um card pelo ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Card retornado com sucesso.',
        type: create_card_dto_1.CreateCardDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Card não encontrado' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: Number,
        description: 'ID do card que deseja encontrar',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CardsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar um card pelo ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Card atualizado com sucesso.',
        type: create_card_dto_1.CreateCardDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Card não encontrado' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: Number,
        description: 'ID do card que deseja atualizar',
    }),
    (0, swagger_1.ApiBody)({ type: update_card_dto_1.UpdateCardDto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_card_dto_1.UpdateCardDto]),
    __metadata("design:returntype", Promise)
], CardsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Deletar um card pelo ID' }),
    (0, swagger_1.ApiResponse)({
        status: 204,
        description: 'Card deletado com sucesso.',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Card não encontrado' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: Number,
        description: 'ID do card que deseja deletar',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CardsController.prototype, "remove", null);
exports.CardsController = CardsController = __decorate([
    (0, swagger_1.ApiTags)('cards'),
    (0, common_1.Controller)('cards'),
    __metadata("design:paramtypes", [cards_service_1.CardsService])
], CardsController);
//# sourceMappingURL=cards.controller.js.map