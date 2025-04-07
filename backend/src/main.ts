/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { corsConfig } from './config/corsConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configuração de validação global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));
  
  // Configuração de CORS
  app.enableCors(corsConfig);
  
  await app.listen(3003);
}
bootstrap();
