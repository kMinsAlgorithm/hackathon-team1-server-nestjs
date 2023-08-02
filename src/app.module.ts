import { Module } from '@nestjs/common';
import { TranslateModule } from './translate/translate.module';
import { ConfigModule } from '@nestjs/config';
import { InsuranceSuggestersModule } from './insurance-suggesters/insurance-suggesters.module';
import { FilesModule } from './files/files.module';
import translateConfig from './config/translateConfig';
import filesConfig from './config/filesConfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [translateConfig, filesConfig],
    }),
    TranslateModule,
    InsuranceSuggestersModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
