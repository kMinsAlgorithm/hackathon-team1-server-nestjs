export enum Company {
  'DB 손해보험' = 'DB Insurance', //DB생명도
  'MG 손해보험' = 'MG Insurance',
  '현대해상' = 'Hyundai Marine & Fire Insurance',
  '교보생명' = 'Kyobo Life Insurance',
  '농협 손해보험' = 'Nonghyup Non-Life Insurance',
  '농협생명' = 'Nonghyup Life Insurance',
  '동양생명' = 'Dongyang Life Insurance',
  '롯데 손해보험' = 'Lotte Non-Life Insurance',
  '메리츠화재' = 'Meritz Fire & Marine Insurance',
  '삼성생명' = 'Samsung Life Insurance',
  '삼성화재' = 'Samsung Fire & Marine Insurance',
  '한화 손해보험' = 'Hanwha Non-Life Insuranace',
  '한화생명' = 'Hanwha Life Insurance',
  '흥국생명' = 'Heungkuk Life Insurance',
  '흥국화재' = 'Heungkuk Fire & Marine Insurance',
}

export enum Gender {
  Male = 'man',
  Female = 'female',
}

export enum RegistrationType {
  Agent = 'agent',
  Online = 'online',
  Mail = 'mail',
  Visit = 'visit',
}

export enum ValueType {
  Age = 'age',
  PriceIndex = 'priceIndex',
  InsurancePrice = 'price',
}

export enum PriceRangeType {
  Over = 'over',
  Less = 'less',
  Around = 'around',
}

export enum InsuranaceType {
  ActualCost = 'ActualCost',
  PreExistingConditionActualCost = 'PreExistingConditionActualCost',
}

export enum PriceMinMaxType {
  Min = 'min',
  Max = 'max',
  Mid = 'mid',
}

type PriceRangeIndex = [PriceRangeType, ValueType];
type PriceMinMaxIndex = [PriceMinMaxType, ValueType];

export interface Insurance {
  companyName: Company[];
  gender?: Gender;
  registrationType?: RegistrationType;
  insurancePriceRangeIndex?: PriceRangeIndex[];
  insurancePriceMinMaxIndex?: PriceMinMaxIndex[];
  insuranceType?: InsuranaceType;
  age?: number;
  priceIndex?: number;
  price?: number;
}
