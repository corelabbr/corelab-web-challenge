/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdateTodoDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isFavorite?: boolean;

  @IsOptional()
  @IsString()
  color?: string;
} 