import { Injectable } from '@nestjs/common';
import {
  Insurance,
  Company,
  Gender,
  RegistrationType,
  PriceRangeType,
  ValueType,
  InsuranaceType,
  PriceMinMaxType,
} from '../insurance-suggesters/interfaces/question-tagged.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { NumericalExistsStatus } from './interfaces/numerical-exists.interface';

@Injectable()
export class FilteringService {
  constructor(private readonly prismaService: PrismaService) {}
  private mapCompanyName(name: string) {
    const enumKey = Object.keys(Company).find(
      (key) => Company[key as keyof typeof Company] === name,
    );
    return enumKey ? (enumKey as keyof typeof Company) : undefined;
  }

  private mapPriceRange(range: any[]): [PriceRangeType?, ValueType?] {
    const rangeType = Object.values(PriceRangeType).find(
      (val) => val === range[0],
    );
    const valueType = Object.values(ValueType).find((val) => val === range[1]);
    return [rangeType, valueType];
  }

  private mapMinMaxRange(range: any[]): [PriceMinMaxType?, ValueType?] {
    const rangeType = Object.values(PriceMinMaxType).find(
      (val) => val === range[0],
    );
    const valueType = Object.values(ValueType).find((val) => val === range[1]);
    return [rangeType, valueType];
  }

  async mapResponseToInsuranceType(data: Insurance): Promise<Insurance> {
    const matchedGenderKey = Object.keys(Gender).find(
      (key) => Gender[key as keyof typeof Gender] === data['Gender'],
    );

    const matchedRegistrationTypeKey = Object.keys(RegistrationType).find(
      (key) =>
        RegistrationType[key as keyof typeof RegistrationType] ===
        data['Registration Type'],
    );

    const tags = {
      companyName: data['Company Name']
        ? data['Company Name'].map(this.mapCompanyName)
        : undefined,
      gender: matchedGenderKey
        ? Gender[matchedGenderKey as keyof typeof Gender]
        : undefined,
      registrationType: matchedRegistrationTypeKey
        ? RegistrationType[
            matchedRegistrationTypeKey as keyof typeof RegistrationType
          ]
        : undefined,
      insurancePriceRangeIndex: data['Insurance Price Range Index']
        ? data['Insurance Price Range Index'].map(this.mapPriceRange)
        : undefined,
      insurancePriceMinMaxIndex: data['Insurance Price MinMax Index']
        ? data['Insurance Price MinMax Index'].map(this.mapMinMaxRange)
        : undefined,
      insuranceType: data['Insurance Type']
        ? InsuranaceType[data['Insurance Type'] as keyof typeof InsuranaceType]
        : undefined,
      age: data['Age'] ? data['Age'] : undefined,
      priceIndex: data['Price Index']
        ? parseFloat(data['Price Index'])
        : undefined,
      price: data['Insurance Price']
        ? parseFloat(data['Insurance Price'])
        : undefined,
    };
    return tags;
  }

  async filtering(data: Insurance) {
    const {
      companyName,
      gender,
      registrationType,
      insurancePriceRangeIndex,
      insurancePriceMinMaxIndex,
      price,
      priceIndex,
      age,
    } = data;
    let where = {};
    const filteringList = [];
    let priceField = 'premiumFemale';
    console.log(data);
    const numerical_exists = {
      insurancePrice: NumericalExistsStatus.None,
      priceIndex: NumericalExistsStatus.None,
      age: NumericalExistsStatus.None,
    };

    if (age) {
      numerical_exists['age'] = NumericalExistsStatus.NoneChecked;
    }

    if (priceIndex) {
      numerical_exists['priceIndex'] = NumericalExistsStatus.NoneChecked;
    }

    if (price) {
      numerical_exists['insurancePrice'] = NumericalExistsStatus.NoneChecked;
    }

    if (gender) {
      filteringList.push(`성별: ${gender === 'man' ? '남성' : '여성'}`);
    }

    // 1. 보험 이름 조회
    if (companyName) {
      where = {
        ...where,
        OR: companyName.map((name) => ({ companyName: name })),
      };
      filteringList.push(`회사 이름: ${companyName.join(', ')}`);
    }

    // 2. 가입 방법 필터링
    if (registrationType) {
      const regist =
        registrationType === 'online' ? '온라인가입' : '설계사 상담';
      where = {
        ...where,
        registrationType: regist,
      };
      filteringList.push(`가입 방법: ${regist}`);
    }
    // 3. 이상 이하 범위 지정
    if (insurancePriceRangeIndex) {
      console.log('hi');
      const rangeConditions = [];
      console.log(insurancePriceRangeIndex);
      for (const range of insurancePriceRangeIndex) {
        console.log(range);
        if (!range[1]) continue;
        switch (range[1]) {
          case 'price':
            console.log(range[0]);

            if (gender) {
              priceField = gender === 'man' ? 'premiumMale' : 'premiumFemale';

              if (range[0] === 'over') {
                rangeConditions.push({ [priceField]: { gte: price } });
                filteringList.push(`보험료 ${price}이상`);
              } else if (range[0] === 'less') {
                rangeConditions.push({ [priceField]: { lte: price } });
                filteringList.push(`보험료 ${price}이하`);
              } else if (range[0] === 'around') {
                rangeConditions.push({
                  [priceField]: { gte: price - 2000, lte: price + 2000 },
                });
              }
              numerical_exists['insurancePrice'] =
                NumericalExistsStatus.Checked;
            }
            break; // 'break'를 추가해서 이 case 블록이 종료된 후 다른 case로 넘어가지 않도록 합니다.

          case 'age':
            if (range[0] === 'over') {
              rangeConditions.push({ insuranceAgeGroup: { gte: age } });
              filteringList.push(`나이 ${age} 이상`);
            } else if (range[0] === 'less') {
              rangeConditions.push({ insuranceAgeGroup: { lte: age } });
              filteringList.push(`나이 ${age}이하`);
            } else if (range[0] === 'around') {
              rangeConditions.push({
                insuranceAgeGroup: { gte: age - 5, lte: age + 5 },
              });
              filteringList.push(`나이 ${age}대`);
            }
            numerical_exists['age'] = NumericalExistsStatus.Checked;
            break;

          case 'priceIndex':
            if (range[0] === 'over') {
              rangeConditions.push({ priceIndex: { gte: priceIndex } });
              filteringList.push(`보험가입 지수: ${priceIndex}이상`);
            } else if (range[0] === 'less') {
              rangeConditions.push({ priceIndex: { lte: priceIndex } });
              filteringList.push(`보험 가입 지수: ${priceIndex}이하`);
            } else if (range[0] === 'around') {
              rangeConditions.push({
                priceIndex: { gte: priceIndex - 5, lte: priceIndex + 5 },
              });
            }
            numerical_exists['priceIndex'] = NumericalExistsStatus.Checked;
            break;
        }
      }
      if (rangeConditions.length) {
        where = {
          ...where,
          AND: rangeConditions,
        };
      }
    }

    // 5. 최대 최소 범위 지정
    if (insurancePriceMinMaxIndex) {
      const minMaxConditions = [];
      for (const range of insurancePriceMinMaxIndex) {
        if (!range[1]) continue;

        switch (range[1]) {
          case 'price':
            if (gender) {
              priceField = gender === 'man' ? 'premiumMale' : 'premiumFemale';
              console.log(range[0]);
              if (range[0] === 'max') {
                minMaxConditions.push({ [priceField]: { gte: price } });
                filteringList.push(`최대 보험료 ${price}`);
              } else if (range[0] === 'min') {
                minMaxConditions.push({ [priceField]: { lte: price } });
                filteringList.push(`최소 보험료 ${price}`);
              } else if (range[0] === 'mid') {
                minMaxConditions.push({
                  [priceField]: { gte: price - 2000, lte: price + 2000 },
                });
              }
              numerical_exists['insurancePrice'] =
                NumericalExistsStatus.Checked;
            }
            break; // 'break'를 추가해서 이 case 블록이 종료된 후 다른 case로 넘어가지 않도록 합니다.

          case 'age':
            if (range[0] === 'max') {
              minMaxConditions.push({ insuranceAgeGroup: { gte: age } });
              filteringList.push(`나이 최대${age}`);
            } else if (range[0] === 'min') {
              minMaxConditions.push({ insuranceAgeGroup: { lte: age } });
              filteringList.push(`나이 최소 ${age}`);
            } else if (range[0] === 'mid') {
              minMaxConditions.push({
                insuranceAgeGroup: { gte: age - 10, lte: age + 10 },
              });
              filteringList.push(`나이 중반 ${age}`);
            }
            numerical_exists['age'] = NumericalExistsStatus.Checked;
            break;

          case 'priceIndex':
            if (range[0] === 'max') {
              minMaxConditions.push({ priceIndex: { gte: priceIndex } });
              filteringList.push(`보험가입 지수: 최대 ${priceIndex}`);
            } else if (range[0] === 'min') {
              minMaxConditions.push({ priceIndex: { lte: priceIndex } });
              filteringList.push(`보험 가입 지수: 최소 ${priceIndex}`);
            } else if (range[0] === 'mid') {
              minMaxConditions.push({
                priceIndex: { gte: priceIndex - 5, lte: priceIndex + 5 },
              });
              filteringList.push(`보험 가입 지수: 최소 ${priceIndex}`);
            }
            numerical_exists['priceIndex'] = NumericalExistsStatus.Checked;
            break;
        }
      }

      if (minMaxConditions.length) {
        where = {
          ...where,
          AND: minMaxConditions,
        };
      }
    }

    // 6. 만약 insurancePriceMinMaxIndex, insurancePriceRangeIndex를 거치지 않은 age, price, priceIndex가 있다면
    // 그 주변 범위의 값을 필터링
    const numericalConditions = [];

    if (numerical_exists['age'] === NumericalExistsStatus.NoneChecked) {
      numericalConditions.push({
        insuranceAgeGroup: { gte: age - 5, lte: age + 5 },
      });
      filteringList.push(`나이 ${age}대`);
    }

    if (numerical_exists['priceIndex'] === NumericalExistsStatus.NoneChecked) {
      numericalConditions.push({
        priceIndex: { gte: priceIndex - 5, lte: priceIndex + 5 },
      });
      filteringList.push(`보험 가격지수 ${priceIndex}대`);
    }

    if (
      numerical_exists['insurancePrice'] === NumericalExistsStatus.NoneChecked
    ) {
      if (gender) {
        numericalConditions.push({
          [priceField]: { gte: price - 2000, lte: price + 2000 },
        });
      } else {
        numericalConditions.push({
          premiumFemale: { gte: price - 2000, lte: price + 2000 },
        });
      }

      filteringList.push(`보험가격 ${price}대`);
    }

    if (numericalConditions.length) {
      where = {
        ...where,
        AND: numericalConditions,
      };
    }
    const filtered = filteringList.join(', ');
    console.log(filtered);
    const insuranceInfos = await this.prismaService.insuranceInfo.findMany({
      where: where,
      include: {
        insuranceLogo: true,
      },
    });
    return { insuranceInfos, filtered };
  }
}
