export enum EnvironmentEnum {
  LIVE = 'live',
  SANDBOX = 'sandbox'
}

export type ConfigType = {
  apiKey: string | null;
  environment: EnvironmentEnum;
  apiBase: string;
};

export type AppInfo = {
  name: string;
  version?: string;
};
