import { AbstractService } from '../../Modules/AbstractService/Abstract.service';
import { CreateOrderRefundBody } from '../../Modules/Refunds/types';
import { CheckoutBody, CreateOrderBody } from '../../Modules/Order/types';
import { AppInfo } from '../../types';
import { BaseUrlEnum, GetRequestType } from './types';
/**
 * Class representing a CoinGate client
 * @extends AbstractService
 */
export declare class CoinGateClient extends AbstractService {
    /**
     * @description coingate-sdk version
     */
    private VERSION;
    /**
     * @description Axios instance
     */
    private client;
    /**
     * @description api key for requests
     */
    private apiKey;
    /**
     * @description default request timeout is 30 seconds
     */
    private timeout;
    /**
     * @description base url
     */
    protected baseUrl: string;
    /**
     * @description App information set by user
     */
    protected appInfo: AppInfo | undefined;
    /** @constructor */
    constructor(baseUrl: string);
    /**
     *
     * @param {RequestTypeEnum} requestType
     * @param {string} apiKey
     * @returns headers
     */
    private getDefaultHeaders;
    /**
     *
     * @param {string} path
     * @param {CreateOrderRefundBody|CreateOrderBody|CheckoutBody} body
     * @returns {Promise}
     */
    protected post(path: string, body: CreateOrderRefundBody | CreateOrderBody | CheckoutBody): Promise<any>;
    /**
     *
     * @param {GetRequestType} params
     * @returns {Promise}
     */
    protected get({ path, params, apiKey }: GetRequestType): Promise<any>;
    /**
     * Set request timeout
     * @param {number} timeout
     */
    setRequestTimeout(timeout: number): void;
    /**
     * @param {string|null} apiKey
     */
    setApiKey(apiKey: string | null): void;
    /**
     *
     * @param {BaseUrlEnum} baseUrl
     */
    setBaseUrl(baseUrl: BaseUrlEnum): void;
    /**
     *
     * @param {AppInfo} appInfo
     */
    setAppInfo({ name, version }: AppInfo): void;
}
