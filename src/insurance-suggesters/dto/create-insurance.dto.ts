import { InsuranceType } from '@prisma/client';

export class CreateInsuranceDto {
  readonly insuranceName: string;
  readonly premiumMale: number;
  readonly premiumFemale: number;
  readonly insuranceAgeGroup: number;
  readonly companyName: string;
  readonly productName: string;
  readonly insuranceType: InsuranceType;
  readonly registrationType: string;
  readonly registrationLink: string;
  readonly premiumRenewable: boolean;
  readonly cancellationRefund: number;
  readonly cancellationPeriod: number;
  readonly priceIndex: number;
  readonly depositorProtection: number;
  readonly guaranteeInsurance: boolean;
  readonly actualLossCoverage: boolean;
  readonly fixedInterestRate: boolean;
}
