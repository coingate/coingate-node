export type GetExchangeRateData = { from: string; to: string };

export type GetCurrenciesData = {
  native?: boolean;
  enabled?: boolean;
  merchant_pay?: boolean;
  merchant_receive?: boolean;
  kind?: CurrencyKindEnum;
};

export enum CurrencyKindEnum {
  FIAT = 'fiat',
  CRYPTO = 'crypto'
}

export type SeparatorType = {
  separator: string;
};
