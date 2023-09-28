import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(4444);
}
bootstrap();

// https://www.youtube.com/watch?v=uAKzFhE3rxU&t=2026s&ab_channel=CodewithVlad 1:13:35 / 1:44:12
