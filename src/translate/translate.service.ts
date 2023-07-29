import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigType } from '@nestjs/config';
import translateConfig from 'src/config/translateConfig';

@Injectable()
export class TranslateService {
  constructor(
    @Inject(translateConfig.KEY)
    readonly config: ConfigType<typeof translateConfig>,
    private readonly httpService: HttpService,
  ) {}
  async translate(
    sourceLanguage: string,
    targetLanguage: string,
    question: string,
  ) {
    const api_url = this.config.naverTranslateUrl;
    const data = {
      source: sourceLanguage, // 변경된 부분: 'sourc' -> 'source'
      target: targetLanguage,
      text: question,
    };
    const headers = {
      'X-Naver-Client-Id': this.config.naverClientId,
      'X-Naver-Client-Secret': this.config.naverClientSecret,
    };
    try {
      const response = await this.httpService
        .post(api_url, data, { headers })
        .toPromise();
      return response.data;
    } catch (error) {
      console.log(error);
      console.error('error =', error.response.status);
      throw new Error('Translation failed');
    }
  }
}
