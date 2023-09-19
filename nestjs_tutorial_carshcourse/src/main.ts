import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(3333);
}
bootstrap();

// https://www.youtube.com/watch?v=GHTA143_b-s&t=213s&ab_channel=freeCodeCamp.org 3:36:07 / 3:42:08
