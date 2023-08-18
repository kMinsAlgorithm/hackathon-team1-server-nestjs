import { IsString, MaxLength } from 'class-validator';

export class InsuranceSuggesterDto {
  @IsString()
  @MaxLength(100, { message: '질문은 최대 100자 이내로 입력해주세요.' })
  'question': string;

  'sourceLanguage': string;
}
