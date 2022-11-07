"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const _Modules_1 = require("./Modules");
const _Exception_1 = require("./Exception");
const types_1 = require("./Modules/Client/types");
const types_2 = require("./types");
/**
 * Class representing a Client
 * @extends AbstractService
 */
class Client extends _Modules_1.AbstractService {
    /** @constructor */
    constructor(apiKey, useSandboxEnv) {
        super();
        this.apiKey = apiKey;
        this.useSandboxEnv = useSandboxEnv;
        this.config = Object.assign(Object.assign({}, this.getDefaultConfig(useSandboxEnv)), {
            apiKey: apiKey || null,
            environment: useSandboxEnv
                ? types_2.EnvironmentEnum.SANDBOX
                : types_2.EnvironmentEnum.LIVE
        });
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
    getDefaultConfig(useSandboxEnv) {
        return {
            apiKey: null,
            apiBase: useSandboxEnv
                ? types_1.BaseUrlEnum.SANDBOX_DEFAULT_API_BASE
                : types_1.BaseUrlEnum.DEFAULT_API_BASE,
            environment: types_2.EnvironmentEnum.LIVE
        };
    }
    /**
     * Prepares all modules
     * @param {string} apiBase
     */
    prepareModules(apiBase) {
        this.public = new _Modules_1.PublicService(apiBase);
        this.refunds = new _Modules_1.RefundsService(apiBase);
        this.order = new _Modules_1.OrderService(apiBase);
        this.ledger = new _Modules_1.LedgerService(apiBase);
        this.withdrawals = new _Modules_1.WithdrawalsService(apiBase);
    }
    /**
     * Config validator
     * @param {ConfigType} config
     */
    validateConfig(config) {
        const { apiBase, apiKey, environment } = config || this.config;
        this.validateApiKey(apiKey);
        if (typeof apiBase !== 'string') {
            throw new _Exception_1.InvalidArgumentException('apiBase must be a string');
        }
        if (![types_2.EnvironmentEnum.LIVE, types_2.EnvironmentEnum.SANDBOX].includes(environment)) {
            throw new _Exception_1.InvalidArgumentException(`Environment does not exist. Available environments: ${Object.values(types_2.EnvironmentEnum).join(', ')}`);
        }
    }
    /**
     * @param {EnvironmentEnum} environment
     */
    setBaseUrlByEnv(environment) {
        this.services.forEach((client) => {
            switch (environment) {
                case types_2.EnvironmentEnum.SANDBOX:
                    return client.setBaseUrl(types_1.BaseUrlEnum.SANDBOX_DEFAULT_API_BASE);
                case types_2.EnvironmentEnum.LIVE:
                default:
                    return client.setBaseUrl(types_1.BaseUrlEnum.DEFAULT_API_BASE);
            }
        });
    }
    /**
     * @returns {AppInfo|null} app information
     */
    getAppInfo() {
        return this.appInfo;
    }
    /**
     * @returns {string|null} api key or null
     */
    getApiKey() {
        return this.config.apiKey;
    }
    /**
     * @returns {EnvironmentEnum} environment
     */
    getEnvironment() {
        return this.config.environment;
    }
    /**
     * Tests api connection
     * @param {string} apiKey
     * @returns {boolean} boolean
     */
    testConnection(apiKey) {
        return this.public.test(apiKey);
    }
    /**
     * @param {AppInfo} appInfo
     */
    setAppInfo({ name, version }) {
        this.appInfo = { name: name.trim(), version: version === null || version === void 0 ? void 0 : version.trim() };
        this.services.forEach((client) => client.setAppInfo({ name, version }));
    }
    /**
     * Set request timeout
     * @param {number} timeout
     */
    setRequestTimeout(timeout) {
        this.services.forEach((client) => client.setRequestTimeout(timeout));
    }
    /**
     * @param {string|null} apiKey
     */
    setApiKey(apiKey) {
        const config = Object.assign(Object.assign({}, this.config), { apiKey });
        this.validateConfig(config);
        this.config = config;
        this.services.forEach((client) => client.setApiKey(this.config.apiKey));
    }
    /**
     *
     * @param {EnvironmentEnum|string} environment
     */
    setEnvironment(environment) {
        const config = Object.assign(Object.assign({}, this.config), { environment: environment });
        this.validateConfig(config);
        this.config = config;
        this.setBaseUrlByEnv(this.config.environment);
    }
}
exports.Client = Client;
