import { Injectable } from '@nestjs/common';
import {
  Insurance,
  Company,
  Gender,
  RegistrationType,
  PriceRangeType,
  ValueType,
  PriceMinMaxType,
  InsuranaceType,
} from '../insurance-suggesters/interfaces/question-tagged.interface';

@Injectable()
export class FilteringService {
  private mapCompanyName(name: string): Company | undefined {
    const enumKey = Object.keys(Company).find(
      (key) => Company[key as keyof typeof Company] === name,
    );
    return enumKey ? Company[enumKey as keyof typeof Company] : undefined;
  }

  private mapPriceRange(range: any[]): [PriceRangeType?, ValueType?] {
    const rangeType = Object.values(PriceRangeType).find(
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

    return {
      companyName: data['Company Name'].map(this.mapCompanyName),
      gender: matchedGenderKey
        ? Gender[matchedGenderKey as keyof typeof Gender]
        : undefined,
      registrationType: matchedRegistrationTypeKey
        ? RegistrationType[
            matchedRegistrationTypeKey as keyof typeof RegistrationType
          ]
        : undefined,
      insurancePriceRangeIndex: data['Insurance Price Range Index'].map(
        this.mapPriceRange,
      ),
      insuranceType:
        InsuranaceType[data['Insurance Type'] as keyof typeof InsuranaceType],
      age: data['Age'],
      priceIndex: parseFloat(data['Price Index']),
      price: parseFloat(data['Insurance Price'] ?? '0'),
    };
  }

  async filtering(data: Insurance): Promise<string[]> {
    const filteringIds = ['6d63fb72-fe0a-4a45-8e16-5b61dbf586c1', ''];
    return filteringIds;
  }
}
