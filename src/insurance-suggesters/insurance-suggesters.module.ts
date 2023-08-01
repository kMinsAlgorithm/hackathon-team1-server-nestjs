import { Module } from '@nestjs/common';
import { InsuranceSuggestersService } from './insurance-suggesters.service';
import { InsuranceSuggestersController } from './insurance-suggesters.controller';
import { TranslateModule } from 'src/translate/translate.module';

@Module({
  imports: [TranslateModule],
  controllers: [InsuranceSuggestersController],
  providers: [InsuranceSuggestersService],
})
export class InsuranceSuggestersModule {}
