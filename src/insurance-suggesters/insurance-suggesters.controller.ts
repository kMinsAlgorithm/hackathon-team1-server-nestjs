import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { InsuranceSuggestersService } from './insurance-suggesters.service';
import { InsuranceSuggesterDto } from './dto/insurance-suggester.dto';
import { FindManyInsuracesInfoDto } from './dto/find-many-insurances.dto';
import { FindOneInsuracesInfoDto } from './dto/find-one-insurances.dto';
import { CreateInsuranceDto } from './dto/create-insurance.dto';

@Controller('insurance-suggesters')
export class InsuranceSuggestersController {
  constructor(
    private readonly insuranceSuggestersService: InsuranceSuggestersService,
  ) {}

  @Post()
  async insuranceSuggest(
    @Body() createInsuranceSuggesterDto: InsuranceSuggesterDto,
  ) {
    return this.insuranceSuggestersService.insuranceSuggest(
      createInsuranceSuggesterDto,
    );
  }

  @Post('create')
  async createInsurance(@Body() createInsuranceDto: CreateInsuranceDto) {
    return this.insuranceSuggestersService.createInsurance(createInsuranceDto);
  }

  @Get('/one/:insuranceId')
  async findOneInsurance(@Param() { insuranceId }: FindOneInsuracesInfoDto) {
    return this.insuranceSuggestersService.findOneInsurance(insuranceId);
  }

  @Get('/many')
  async findManyInsurance(
    @Body() findManyInsuracesInfoDto: FindManyInsuracesInfoDto,
  ) {
    return this.insuranceSuggestersService.findManyInsurance(
      findManyInsuracesInfoDto,
    );
  }

  @Get('/all')
  async findAllInsurance() {
    return this.insuranceSuggestersService.findAllInsurance();
  }

  //이건 개발 끝나면 막으려고 합니다.
  @Post('/admin/delete-insurances')
  async deleteInsurances() {
    return this.insuranceSuggestersService.deleteInsurances();
  }
}
