export enum Company {
  DB = 'DB Insurance',
  MG = 'MG Insurance',
  Hyundai_Fire = 'Hyundai Marine & Fire Insurance',
  Kyobo = 'Kyobo Life Insurance',
  NH_None_Life = 'Nonghyup Non-Life Insurance',
  NH_Life = 'Nonghyup Life Insurance',
  Dongyang = 'Dongyang Life Insurance',
  Lotte = 'Lotte Non-Life Insurance',
  Meritz = 'Meritz Fire & Marine Insurance',
  Samsung_Life = 'Samsung Life Insurance',
  Samsung_Fire = 'Samsung Fire & Marine Insurance',
  Hanwha_None_Life = 'Hanwha Non-Life Insuranace',
  Hanwha_Life = 'Hanwha Life Insurance',
  Heunguk_Life = 'Heungkuk Life Insurance',
  Heunguk_Fire = 'Heungkuk Fire & Marine Insurance',
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
  Under = 'under',
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
