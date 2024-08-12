import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCardDto {
  @ApiProperty({
    example: 'Iniciar um projeto em HTML',
    description: 'O título principal do carde',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example:
      'Aqui está as informações que deverão ser seguidas no projeto HTML',
    description: 'A descrição do card',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: 'true', description: 'Se o card é favorito' })
  @IsOptional()
  @IsBoolean()
  isFavorite: boolean;

  @ApiProperty({ example: '#FFFFFF', description: 'Cor do card' })
  @IsOptional()
  @IsString()
  color: string;
}
