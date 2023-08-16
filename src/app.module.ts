import { Module } from '@nestjs/common';
import { TranslateModule } from './translate/translate.module';
import { ConfigModule } from '@nestjs/config';
import { InsuranceSuggestersModule } from './insurance-suggesters/insurance-suggesters.module';
import { FilesModule } from './files/files.module';
import { PrismaModule } from './prisma/prisma.module';
import translateConfig from './config/translateConfig';
import filesConfig from './config/filesConfig';
import { ThrottlerModule } from '@nestjs/throttler';
import { FilteringModule } from './filtering/filtering.module';
import insuranceConfig from './config/insuranceConfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [translateConfig, filesConfig, insuranceConfig],
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    PrismaModule,
    TranslateModule,
    InsuranceSuggestersModule,
    FilteringModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
