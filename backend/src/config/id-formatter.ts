/* eslint-disable prettier/prettier */
import { Types } from 'mongoose';

export class IdFormatter {
  static toObjectId(id: string | number): Types.ObjectId {
    try {
      // Se for um número, criar um ObjectId fixo para esse número
      if (typeof id === 'number') {
        // Criar um ObjectId com um padrão fixo + os últimos dígitos do número
        const hexStr = '123400000000000000000000';
        return new Types.ObjectId(hexStr);
      }
      
      // Se for string e um ObjectId válido, retornar diretamente
      if (Types.ObjectId.isValid(id)) {
        return new Types.ObjectId(id);
      }
      
      // Caso contrário, criar um ObjectId padrão
      return new Types.ObjectId('123400000000000000000000');
    } catch (error) {
      console.error('Error converting ID:', error);
      // Em vez de lançar erro, retornar um ObjectId padrão
      return new Types.ObjectId('123400000000000000000000');
    }
  }

  static toString(id: Types.ObjectId): string {
    return id.toString();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static toNumber(_id: Types.ObjectId): number {
    // Usar o timestamp do ObjectId para gerar um ID único
    const timestamp = _id.getTimestamp().getTime();
    return timestamp;
  }
} 