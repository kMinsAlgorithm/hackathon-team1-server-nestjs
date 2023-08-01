import { Module } from '@nestjs/common';
import { TranslateService } from './translate.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [TranslateService],
  exports: [TranslateService],
})
export class TranslateModule {}
