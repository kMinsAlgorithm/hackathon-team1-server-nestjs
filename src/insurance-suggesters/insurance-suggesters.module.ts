import { Module, forwardRef } from '@nestjs/common';
import { InsuranceSuggestersService } from './insurance-suggesters.service';
import { InsuranceSuggestersController } from './insurance-suggesters.controller';
import { TranslateModule } from 'src/translate/translate.module';
import { FilteringModule } from 'src/filtering/filtering.module';

@Module({
  imports: [TranslateModule, forwardRef(() => FilteringModule)],
  controllers: [InsuranceSuggestersController],
  providers: [InsuranceSuggestersService],
  exports: [InsuranceSuggestersService],
})
export class InsuranceSuggestersModule {}
