/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsBoolean()
  isFavorite?: boolean = false;

  @IsNotEmpty()
  @IsString()
  color: string;
} 