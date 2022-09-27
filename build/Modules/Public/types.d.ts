export declare type GetExchangeRateData = {
    from: string;
    to: string;
};
export declare type GetCurrenciesData = {
    native?: boolean;
    enabled?: boolean;
    merchant_pay?: boolean;
    merchant_receive?: boolean;
    kind?: CurrencyKindEnum;
};
export declare enum CurrencyKindEnum {
    FIAT = "fiat",
    CRYPTO = "crypto"
}
export declare type SeparatorType = {
    separator: string;
};
