export declare type GetRequestType = {
    path: string;
    params?: object;
    apiKey?: string;
    searchParams?: URLSearchParams;
};
export declare type HeadersType = {
    'Content-Type'?: string;
    Authorization?: string;
    'User-Agent'?: string;
};
export declare enum BaseUrlEnum {
    SANDBOX_DEFAULT_API_BASE = "https://api-sandbox.coingate.com",
    DEFAULT_API_BASE = "https://api.coingate.com"
}
