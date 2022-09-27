import { OrderService, PublicService, RefundsService, AbstractService } from './Modules';
import { AppInfo, EnvironmentEnum } from './types';
/**
 * Class representing a Client
 * @extends AbstractService
 */
export declare class Client extends AbstractService {
    protected apiKey?: string | null;
    protected useSandboxEnv?: boolean | null;
    /** Services array
     * @private services
     */
    private services;
    /** App configuration
     * @private config
     */
    private config;
    /** App information set by user
     * @private app information
     */
    private appInfo;
    /**
     * @public public service
     */
    public: PublicService;
    /**
     * @public order service
     */
    order: OrderService;
    /**
     * @public refunds service
     */
    refunds: RefundsService;
    /** @constructor */
    constructor(apiKey?: string | null, useSandboxEnv?: boolean | null);
    /**
     * @returns {AppInfo|null} app information
     */
    getAppInfo(): AppInfo;
    /**
     * @returns {string|null} api key or null
     */
    getApiKey(): string;
    /**
     * @returns {EnvironmentEnum} environment
     */
    getEnvironment(): EnvironmentEnum;
    /**
     * @param {boolean|null} useSandboxEnv
     * @returns {ConfigType} config
     */
    private getDefaultConfig;
    /**
     * Prepares all modules
     * @param {string} apiBase
     */
    private prepareModules;
    /**
     * Tests api connection
     * @param {string} apiKey
     * @returns {boolean} boolean
     */
    testConnection(apiKey: string): Promise<boolean>;
    /**
     * Config validator
     * @param {ConfigType} config
     */
    private validateConfig;
    /**
     * @param {string|null} apiKey
     */
    setApiKey(apiKey: string | null): void;
    /**
     *
     * @param {EnvironmentEnum|string} environment
     */
    setEnvironment(environment: EnvironmentEnum | string): void;
    /**
     * @param {EnvironmentEnum} environment
     */
    private setBaseUrlByEnv;
    /**
     * @param {AppInfo} appInfo
     */
    setAppInfo({ name, version }: AppInfo): void;
    /**
     * Set request timeout
     * @param {number} timeout
     */
    setRequestTimeout(timeout: number): void;
}
