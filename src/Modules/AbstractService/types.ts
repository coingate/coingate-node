import { GetAccountParamsType } from '#Modules/Ledger/types';
import { PaymentParamType } from '#Modules/Order/types';
import {
  GetCurrenciesData,
  GetExchangeRateData,
  SeparatorType
} from '#Modules/Public/types';
import { RefundParamsType } from '#Modules/Refunds/types';

export type BuildPathInput = {
  path: string;
  params?:
    | GetExchangeRateData
    | GetCurrenciesData
    | PaymentParamType
    | SeparatorType
    | RefundParamsType
    | GetAccountParamsType;
};
