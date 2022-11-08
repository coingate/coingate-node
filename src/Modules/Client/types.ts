export type GetRequestType = {
  path: string;
  params?: object;
  apiKey?: string;
  searchParams?: URLSearchParams;
};

export type HeadersType = {
  'Content-Type'?: string;
  Authorization?: string;
  'User-Agent'?: string;
};

export enum BaseUrlEnum {
  SANDBOX_DEFAULT_API_BASE = 'https://api-sandbox.coingate.com',
  DEFAULT_API_BASE = 'https://api.coingate.com'
}
