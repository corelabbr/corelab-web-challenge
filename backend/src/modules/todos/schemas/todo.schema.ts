/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TodoDocument = Todo & Document;

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: false } })
export class Todo {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: false })
  isFavorite: boolean;

  @Prop({ required: true })
  color: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const TodoSchema = SchemaFactory.createForClass(Todo); 