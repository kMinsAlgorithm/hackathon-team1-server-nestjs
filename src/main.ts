import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    // origin: new RegExp(process.env.CORS_WHITELIST_REGEX),
    origin: 'http://localhost:3000',
  });
  await app.listen(3000);
}
bootstrap();
