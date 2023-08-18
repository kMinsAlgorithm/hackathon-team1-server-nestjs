import { Module } from '@nestjs/common';
import { FilteringService } from './filtering.service';

@Module({
  imports: [],
  providers: [FilteringService],
  exports: [FilteringService],
})
export class FilteringModule {}
