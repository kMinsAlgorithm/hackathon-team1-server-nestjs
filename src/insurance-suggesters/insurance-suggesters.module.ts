import { Module } from '@nestjs/common';
import { InsuranceSuggestersService } from './insurance-suggesters.service';
import { InsuranceSuggestersController } from './insurance-suggesters.controller';
import { TranslateModule } from 'src/translate/translate.module';
import { FilteringModule } from 'src/filtering/filtering.module';

@Module({
  imports: [TranslateModule, FilteringModule],
  controllers: [InsuranceSuggestersController],
  providers: [InsuranceSuggestersService],
})
export class InsuranceSuggestersModule {}
