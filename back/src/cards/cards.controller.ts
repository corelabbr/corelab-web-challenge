import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UsePipes,
  ValidationPipe,
  NotFoundException,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@ApiTags('cards')
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo card' })
  @ApiResponse({
    status: 201,
    description: 'O card foi criado com sucesso.',
  })
  @ApiResponse({ status: 400, description: 'Erro de validação' })
  @ApiBody({ type: CreateCardDto })
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: (errors) => new BadRequestException(errors),
    }),
  )
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardsService.create(createCardDto);
  }

  @Get()
  @ApiOperation({ summary: 'Pegar todos os cards' })
  @ApiResponse({
    status: 200,
    description: 'Todos os cards retornados com sucesso.',
    type: [CreateCardDto],
  })
  findAll() {
    return this.cardsService.findAll();
  }

  @Get('search')
  @ApiOperation({ summary: 'Encontrar cards por parametros' })
  @ApiQuery({ name: 'title', required: false, type: String })
  @ApiQuery({ name: 'color', required: false, type: String })
  @ApiQuery({ name: 'isFavorite', required: false, type: Boolean })
  @ApiResponse({
    status: 200,
    description: 'Cards encontrados com sucesso.',
    type: [CreateCardDto],
  })
  search(
    @Query('title') title: string,
    @Query('color') color: string,
    @Query('isFavorite') isFavorite: boolean,
  ) {
    return this.cardsService.search({ title, color, isFavorite });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Pegar um card pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Card retornado com sucesso.',
    type: CreateCardDto,
  })
  @ApiResponse({ status: 404, description: 'Card não encontrado' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID do card que deseja encontrar',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const card = await this.cardsService.findOne(id);
    if (!card) {
      throw new NotFoundException(`Card not found`);
    }
    return card;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um card pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Card atualizado com sucesso.',
    type: CreateCardDto,
  })
  @ApiResponse({ status: 404, description: 'Card não encontrado' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID do card que deseja atualizar',
  })
  @ApiBody({ type: UpdateCardDto })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCardDto: UpdateCardDto,
  ) {
    const updatedCard = await this.cardsService.update(id, updateCardDto);
    if (!updatedCard) {
      throw new NotFoundException(`Card not found`);
    }
    return updatedCard;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um card pelo ID' })
  @ApiResponse({
    status: 204,
    description: 'Card deletado com sucesso.',
  })
  @ApiResponse({ status: 404, description: 'Card não encontrado' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID do card que deseja deletar',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.cardsService.remove(id);
    } catch (error) {
      throw new NotFoundException(`Card not found`);
    }
  }
}
