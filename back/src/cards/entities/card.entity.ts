import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsBoolean, IsDate, IsNotEmpty, IsString } from 'class-validator';

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  description: string;

  @Column({ default: false })
  @IsBoolean()
  isFavorite: boolean;

  @Column({ nullable: true })
  @IsString()
  @IsNotEmpty()
  color: string;

  @CreateDateColumn()
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn()
  @IsDate()
  updatedAt: Date;
}
