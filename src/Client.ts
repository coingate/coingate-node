import {
  OrderService,
  PublicService,
  RefundsService,
  AbstractService,
  WithdrawalsService,
  LedgerService
} from '#Modules';
import { InvalidArgumentException } from '#Exception';
import { BaseUrlEnum } from '#Modules/Client/types';

import { AppInfo, ConfigType, EnvironmentEnum } from './types';

/**
 * Class representing a Client
 * @extends AbstractService
 */
export class Client extends AbstractService {
  /** Services array
   * @private services
   */
  private services: [
    PublicService,
    OrderService,
    RefundsService,
    LedgerService,
    WithdrawalsService
  ];

  /** App configuration
   * @private config
   */
  private config: ConfigType;

  /** App information set by user
   * @private app information
   */
  private appInfo: AppInfo | undefined;

  /**
   * @public public service
   */
  public public!: PublicService;

  /**
   * @public order service
   */
  public order!: OrderService;

  /**
   * @public ledger service
   */
  public ledger!: LedgerService;

  /**
   * @public withdrawals service
   */
  public withdrawals!: WithdrawalsService;

  /**
   * @public refunds service
   */
  public refunds!: RefundsService;

  /** @constructor */
  constructor(
    protected apiKey?: string | null,
    protected useSandboxEnv?: boolean | null
  ) {
    super();
    this.config = {
      ...this.getDefaultConfig(useSandboxEnv),
      ...{
        apiKey: apiKey || null,
        environment: useSandboxEnv
          ? EnvironmentEnum.SANDBOX
          : EnvironmentEnum.LIVE
      }
    };

    this.validateConfig();

    const { apiBase } = this.config;

    this.prepareModules(apiBase);
    this.services = [
      this.public,
      this.order,
      this.refunds,
      this.ledger,
      this.withdrawals
    ];
    this.setApiKey(this.config.apiKey);
  }

  /**
   * @param {boolean|null} useSandboxEnv
   * @returns {ConfigType} config
   */
  private getDefaultConfig(useSandboxEnv?: boolean | null) {
    return {
      apiKey: null,
      apiBase: useSandboxEnv
        ? BaseUrlEnum.SANDBOX_DEFAULT_API_BASE
        : BaseUrlEnum.DEFAULT_API_BASE,
      environment: EnvironmentEnum.LIVE
    };
  }

  /**
   * Prepares all modules
   * @param {string} apiBase
   */
  private prepareModules(apiBase: string) {
    this.public = new PublicService(apiBase);
    this.refunds = new RefundsService(apiBase);
    this.order = new OrderService(apiBase);
    this.ledger = new LedgerService(apiBase);
    this.withdrawals = new WithdrawalsService(apiBase);
  }

  /**
   * Config validator
   * @param {ConfigType} config
   */
  private validateConfig(config?: ConfigType) {
    const { apiBase, apiKey, environment } = config || this.config;

    this.validateApiKey(apiKey);

    if (typeof apiBase !== 'string') {
      throw new InvalidArgumentException('apiBase must be a string');
    }

    if (
      ![EnvironmentEnum.LIVE, EnvironmentEnum.SANDBOX].includes(environment)
    ) {
      throw new InvalidArgumentException(
        `Environment does not exist. Available environments: ${Object.values(
          EnvironmentEnum
        ).join(', ')}`
      );
    }
  }

  /**
   * @param {EnvironmentEnum} environment
   */
  private setBaseUrlByEnv(environment: EnvironmentEnum) {
    this.services.forEach((client) => {
      switch (environment) {
        case EnvironmentEnum.SANDBOX:
          return client.setBaseUrl(BaseUrlEnum.SANDBOX_DEFAULT_API_BASE);
        case EnvironmentEnum.LIVE:
        default:
          return client.setBaseUrl(BaseUrlEnum.DEFAULT_API_BASE);
      }
    });
  }

  /**
   * @returns {AppInfo|null} app information
   */
  public getAppInfo() {
    return this.appInfo;
  }

  /**
   * @returns {string|null} api key or null
   */
  public getApiKey() {
    return this.config.apiKey;
  }

  /**
   * @returns {EnvironmentEnum} environment
   */
  public getEnvironment() {
    return this.config.environment;
  }

  /**
   * Tests api connection
   * @param {string} apiKey
   * @returns {boolean} boolean
   */
  public testConnection(apiKey: string) {
    return this.public.test(apiKey);
  }

  /**
   * @param {AppInfo} appInfo
   */
  public setAppInfo({ name, version }: AppInfo) {
    this.appInfo = { name: name.trim(), version: version?.trim() };
    this.services.forEach((client) => client.setAppInfo({ name, version }));
  }

  /**
   * Set request timeout
   * @param {number} timeout
   */
  public setRequestTimeout(timeout: number) {
    this.services.forEach((client) => client.setRequestTimeout(timeout));
  }

  /**
   * @param {string|null} apiKey
   */
  public setApiKey(apiKey: string | null) {
    const config = { ...this.config, apiKey };
    this.validateConfig(config);
    this.config = config;

    this.services.forEach((client) => client.setApiKey(this.config.apiKey));
  }

  /**
   *
   * @param {EnvironmentEnum|string} environment
   */
  public setEnvironment(environment: EnvironmentEnum | string) {
    const config = {
      ...this.config,
      environment: environment as EnvironmentEnum
    };

    this.validateConfig(config);
    this.config = config;
    this.setBaseUrlByEnv(this.config.environment);
  }
}
