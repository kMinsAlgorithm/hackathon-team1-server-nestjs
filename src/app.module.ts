import { Module } from '@nestjs/common';
import { TranslateModule } from './translate/translate.module';
import { ConfigModule } from '@nestjs/config';
import { InsuranceSuggestersModule } from './insurance-suggesters/insurance-suggesters.module';
import translateConfig from './config/translateConfig';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [translateConfig] }),
    TranslateModule,
    InsuranceSuggestersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
