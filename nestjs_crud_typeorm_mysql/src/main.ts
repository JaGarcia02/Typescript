import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(8888);
}
bootstrap();

// https://www.youtube.com/watch?v=W1gvIw0GNl8&t=174s&ab_channel=AnsontheDeveloper  46:48 / 1:17:37
