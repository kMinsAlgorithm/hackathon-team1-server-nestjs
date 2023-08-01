import { Injectable } from '@nestjs/common';
import { InsuranceSuggesterDto } from './dto/insurance-suggester.dto';
import { TranslateService } from 'src/translate/translate.service';
@Injectable()
export class InsuranceSuggestersService {
  constructor(private readonly translateService: TranslateService) {}
  insuranceSuggest(insuranceSuggesterDto: InsuranceSuggesterDto) {
    const { question, sourceLanguage } = insuranceSuggesterDto;
    const targetLanguage = 'en';
    const translatedText = this.translateService.translate(
      sourceLanguage,
      targetLanguage,
      question,
    );
    // 해당 텍스트로 추천 기능 요청하는 기능은 추후 개발 예정입니다.
    return translatedText;
  }

  findAll() {
    return `This action returns all insuranceSuggesters`;
  }

  findOne(id: number) {
    return `This action returns a #${id} insuranceSuggester`;
  }
}
