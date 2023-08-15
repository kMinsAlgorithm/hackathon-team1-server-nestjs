import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InsuranceSuggesterDto } from './dto/insurance-suggester.dto';
import { TranslateService } from 'src/translate/translate.service';
import { FindManyInsuracesInfoDto } from './dto/find-many-insurances.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateInsuranceDto } from './dto/create-insurance.dto';
import axios from 'axios';
import insuranceConfig from 'src/config/insuranceConfig';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class InsuranceSuggestersService {
  constructor(
    @Inject(insuranceConfig.KEY)
    readonly config: ConfigType<typeof insuranceConfig>,
    private readonly translateService: TranslateService,
    private readonly prisma: PrismaService,
  ) {}

  async insuranceSuggest(insuranceSuggesterDto: InsuranceSuggesterDto) {
    const { question, sourceLanguage } = insuranceSuggesterDto;
    let questionText = '';
    const targetLanguage = 'en';

    if (sourceLanguage == 'en') {
      questionText = question;
    } else if (sourceLanguage == 'ko' || sourceLanguage == 'zh-CN') {
      const translatedText = await this.translateService.translate(
        sourceLanguage,
        targetLanguage,
        question,
      );
      questionText = translatedText.message.result.translatedText;
    } else {
      throw new BadRequestException(
        `${sourceLanguage}는 지원하지 않는 언어입니다.`,
      );
    }

    const insuranceQuestions = {
      text: questionText,
    };
    // 해당 텍스트로 추천 기능 요청하는 기능은 추후 개발 예정입니다.
    try {
      const response = await axios.post(
        this.config.recommendationUrl,
        insuranceQuestions,
      );

      const insuranceIds = response.data;
      const insurances = await this.findManyInsurance({ insuranceIds });

      const insuranceSearchResults = {
        question,
        insurances,
      };

      return insuranceSearchResults;
    } catch (error) {
      throw new BadRequestException(
        `Failed to request question: ${error.message}`,
      );
    }
  }

  async createInsurance(createInsuranceDto: CreateInsuranceDto) {
    const {
      premiumMale,
      premiumFemale,
      insuranceAgeGroup,
      insuranceAgeGroupStart,
      insuranceAgeGroupEnd,
      companyName,
      productName,
      insuranceType,
      registrationType,
      registrationLink,
      premiumRenewable,
      cancellationRefund,
      cancellationPeriod,
      priceIndex,
      depositorProtection,
      guaranteeInsurance,
      actualLossCoverage,
      fixedInterestRate,
    } = createInsuranceDto;

    const INSURANCE_KEY_VALUE_OBJECT: { [key: string]: string } = {
      'DB 손해보험': 'b2739430-38d0-4177-900e-8cd5e20a1d87',
      DB생명: '4f0bfd7e-0777-4ee1-aa8a-ab8904ae1c74',
      'MG 손해보험': '653c002b-8760-4e7b-b0f3-c13b79240a5b',
      교보생명: 'd555a851-54b8-459d-8717-0bb0e3fc4df8',
      '농협 손해보험': '292d390c-8a14-4002-bae6-c86595032338',
      농협생명: '9f4e9b65-dc6e-4d4b-b18f-796fd12bb680',
      동양생명: 'd401918c-d7f5-4d16-8297-1a19cadb2020',
      '롯데 손해보험': '1fecc7cd-42e7-485c-987b-49a4f89e235b',
      메리츠화재: 'b2a0c2ef-7914-41a6-9b35-0358ead2711a',
      삼성생명: '8f336a47-6476-4f29-846d-49ec21171e8a',
      삼성화재: 'f96e72f6-7630-4ab7-8f3f-6f4801c4aaa3',
      '한화 손해보험': '5d89822f-f9af-4780-8691-6be70c831478',
      한화생명: '9212e2cb-69b1-4ace-88c9-5e7f0c1cd934',
      현대해상: 'efe68f57-bcd9-4baa-8933-beba495f4c9b',
      흥국생명: '943a4fde-8b66-428f-b0ba-67e6cf19fe5e',
      흥국화재: '91179051-c8af-48e5-b79d-b077a7741885',
    };

    // 보험사 이름으로 이미지 URL을 찾는 함수 원래 보험사 이름으로 db에서 검색하려고 했는데 안되더라구요?
    function findImageUrlByCompanyName(companyName: string): string {
      if (INSURANCE_KEY_VALUE_OBJECT.hasOwnProperty(companyName)) {
        return INSURANCE_KEY_VALUE_OBJECT[companyName];
      } else {
        return '이미지 URL을 찾을 수 없습니다.';
      }
    }
    const insuranceLogo = await this.prisma.insuranceLogo.findUnique({
      where: { logoId: findImageUrlByCompanyName(companyName) },
    });

    try {
      const insurance = await this.prisma.insuranceInfo.create({
        data: {
          premiumMale,
          premiumFemale,
          insuranceAgeGroup,
          insuranceAgeGroupStart,
          insuranceAgeGroupEnd,
          companyName,
          productName,
          insuranceType,
          registrationType,
          registrationLink,
          premiumRenewable,
          cancellationRefund,
          cancellationPeriod,
          priceIndex,
          depositorProtection,
          guaranteeInsurance,
          actualLossCoverage,
          fixedInterestRate,
          insuranceLogo: { connect: { logoId: insuranceLogo.logoId } },
        },
      });
      return insurance;
    } catch (error) {
      throw new BadRequestException(
        `Failed to create insurance: ${error.message}`,
      );
    }
  }

  async findOneInsurance(insuranceId: string) {
    const insurance = await this.prisma.insuranceInfo.findUnique({
      where: { infoId: insuranceId },
      include: {
        insuranceLogo: true, // Include the related insuranceLogo
      },
    });
    if (!insurance) {
      throw new NotFoundException(
        `Insurance with ID ${insuranceId} not found.`,
      );
    }
    return insurance;
  }

  async findManyInsurance(findManyInsuracesInfoDto: FindManyInsuracesInfoDto) {
    const { insuranceIds } = findManyInsuracesInfoDto;
    const insuranceInfos = await this.prisma.insuranceInfo.findMany({
      where: {
        infoId: { in: insuranceIds },
      },
      include: {
        insuranceLogo: true, // Include the related insuranceLogo
      },
    });

    // // 데이터베이스에서 가져온 객체의 키 값들
    // const fetchedIds = insuranceInfos.map((info) => info.infoId);

    // // 존재하지 않는 키 값들 찾기
    // const missingKeys = insuranceIds.filter(
    //   (infoId) => !fetchedIds.includes(infoId),
    // );

    // if (missingKeys.length > 0) {
    //   throw new NotFoundException(
    //     `Objects with keys [${missingKeys.join(', ')}] not found.`,
    //   );
    // }

    const insurances = {
      insuranceInfos,
      numberOfInsuranceInfos: insuranceInfos.length,
    };
    return insurances;
  }

  async findAllInsurance() {
    try {
      const insuranceInfos = await this.prisma.insuranceInfo.findMany();
      if (insuranceInfos.length === 0) {
        throw new NotFoundException('No insurance information found.');
      }
      return insuranceInfos;
    } catch (error) {
      throw new BadRequestException(
        `Failed to fetch insurance information: ${error.message}`,
      );
    }
  }

  async deleteInsurances() {
    await this.prisma.insuranceInfo.deleteMany();
  }
}
