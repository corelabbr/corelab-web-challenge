/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';

export interface Todo {
  title: string;
  description: string;
  isFavorite: boolean;
  color: string;
  createdAt: Date;
}

export interface TodoDocument extends Todo, Document {} 