export declare enum EnvironmentEnum {
    LIVE = "live",
    SANDBOX = "sandbox"
}
export declare type ConfigType = {
    apiKey: string | null;
    environment: EnvironmentEnum;
    apiBase: string;
};
export declare type AppInfo = {
    name: string;
    version?: string;
};
