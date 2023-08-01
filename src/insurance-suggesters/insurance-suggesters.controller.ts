import { Controller, Post, Body } from '@nestjs/common';
import { InsuranceSuggestersService } from './insurance-suggesters.service';
import { InsuranceSuggesterDto } from './dto/insurance-suggester.dto';

@Controller('insurance-suggesters')
export class InsuranceSuggestersController {
  constructor(
    private readonly insuranceSuggestersService: InsuranceSuggestersService,
  ) {}

  @Post()
  insuranceSuggest(@Body() createInsuranceSuggesterDto: InsuranceSuggesterDto) {
    return this.insuranceSuggestersService.insuranceSuggest(
      createInsuranceSuggesterDto,
    );
  }
}
