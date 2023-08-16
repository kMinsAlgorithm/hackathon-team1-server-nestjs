import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    // origin: new RegExp(process.env.CORS_WHITELIST_REGEX),
    origin: [
      'http://localhost:3000',
      'https://hackathon-team1-6n5652jde-hackathon-team1-web.vercel.app',
    ],
  });
  await app.listen(3000);
}
bootstrap();
