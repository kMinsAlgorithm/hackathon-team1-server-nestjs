import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InsuranceSuggesterDto } from './dto/insurance-suggester.dto';
import { TranslateService } from 'src/translate/translate.service';
import { FindManyInsuracesInfoDto } from './dto/find-many-insurances.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateInsuranceDto } from './dto/create-insurance.dto';
import axios from 'axios';

@Injectable()
export class InsuranceSuggestersService {
  constructor(
    private readonly translateService: TranslateService,
    private readonly prisma: PrismaService,
  ) {}

  async insuranceSuggest(insuranceSuggesterDto: InsuranceSuggesterDto) {
    const { question, sourceLanguage } = insuranceSuggesterDto;
    const targetLanguage = 'en';
    const translatedText = await this.translateService.translate(
      sourceLanguage,
      targetLanguage,
      question,
    );
    // 해당 텍스트로 추천 기능 요청하는 기능은 추후 개발 예정입니다.

    return translatedText;
  }

  async createInsurance(createInsuranceDto: CreateInsuranceDto) {
    const {
      insuranceName,
      premiumMale,
      premiumFemale,
      insuranceAgeGroup,
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

    //보험 로고 검색
    const insuranceLogo = await this.prisma.insuranceLogo.findUnique({
      where: { filename: companyName },
    });

    try {
      const insurance = await this.prisma.insuranceInfo.create({
        data: {
          insuranceName,
          premiumMale,
          premiumFemale,
          insuranceAgeGroup,
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

    // 데이터베이스에서 가져온 객체의 키 값들
    const fetchedIds = insuranceInfos.map((info) => info.infoId);

    // 존재하지 않는 키 값들 찾기
    const missingKeys = insuranceIds.filter(
      (infoId) => !fetchedIds.includes(infoId),
    );

    if (missingKeys.length > 0) {
      throw new NotFoundException(
        `Objects with keys [${missingKeys.join(', ')}] not found.`,
      );
    }
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
}
