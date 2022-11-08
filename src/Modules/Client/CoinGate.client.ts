import axios, { AxiosError, AxiosInstance } from 'axios';

import { AbstractService } from '#Modules/AbstractService/Abstract.service';
import { handleErrorResponse } from '../../Exception';
import { CreateOrderRefundBody } from '#Modules/Refunds/types';
import { CheckoutBody, CreateOrderBody } from '#Modules/Order/types';
import { AppInfo } from '#types';

import { BaseUrlEnum, GetRequestType, HeadersType } from './types';

/**
 * Class representing a CoinGate client
 * @extends AbstractService
 */
export class CoinGateClient extends AbstractService {
  /**
   * @description coingate-sdk version
   */
  private VERSION = '1.1.2';

  /**
   * @description Axios instance
   */
  private client: AxiosInstance;

  /**
   * @description api key for requests
   */
  private apiKey: string | null;

  /**
   * @description default request timeout is 30 seconds
   */
  private timeout: number = 30000;

  /**
   * @description base url
   */
  protected baseUrl: string;

  /**
   * @description App information set by user
   */
  protected appInfo: AppInfo | undefined;

  /** @constructor */
  constructor(baseUrl: string) {
    super();
    this.baseUrl = baseUrl;
    this.client = axios.create();
    this.apiKey = null;
  }

  /**
   *
   * @param {RequestTypeEnum} requestType
   * @param {string} apiKey
   * @returns headers
   */
  private getDefaultHeaders(apiKey?: string) {
    let headers: HeadersType;

    if (this.apiKey) {
      headers = {
        Authorization: `Bearer ${apiKey || this.apiKey}`,
        ...headers
      };
    }

    if (this.appInfo) {
      headers = {
        'User-Agent': `Coingate/v2 (Node.js library v ${this.VERSION}, ${
          this.appInfo.name
        } ${this.appInfo.version ? 'v ' + this.appInfo.version : ''})`,
        ...headers
      };
    } else {
      headers = {
        'User-Agent': `Coingate/v2 (Node.js library v ${this.VERSION})`,
        ...headers
      };
    }

    return headers;
  }

  /**
   *
   * @param {string} path
   * @param {CreateOrderRefundBody|CreateOrderBody|CheckoutBody} body
   * @returns {Promise}
   */
  protected async post(
    path: string,
    body: CreateOrderRefundBody | CreateOrderBody | CheckoutBody
  ) {
    try {
      const { data } = await this.client.post(this.baseUrl + path, body, {
        headers: this.getDefaultHeaders(),
        timeout: this.timeout
      });

      return data;
    } catch (e) {
      handleErrorResponse(e as AxiosError);
    }
  }

  /**
   *
   * @param {GetRequestType} params
   * @returns {Promise}
   */
  protected async get({ path, params, apiKey, searchParams }: GetRequestType) {
    try {
      const { data } = await this.client.get(this.baseUrl + path, {
        params,
        headers: this.getDefaultHeaders(apiKey),
        timeout: this.timeout,
        data: searchParams
      });

      return data;
    } catch (e) {
      handleErrorResponse(e as AxiosError);
    }
  }

  /**
   * Set request timeout
   * @param {number} timeout
   */
  public setRequestTimeout(timeout: number) {
    this.timeout = timeout;
  }

  /**
   * @param {string|null} apiKey
   */
  public setApiKey(apiKey: string | null) {
    this.validateApiKey(apiKey);
    this.apiKey = apiKey;
  }

  /**
   *
   * @param {BaseUrlEnum} baseUrl
   */
  public setBaseUrl(baseUrl: BaseUrlEnum) {
    this.baseUrl = baseUrl;
  }

  /**
   *
   * @param {AppInfo} appInfo
   */
  public setAppInfo({ name, version }: AppInfo) {
    this.appInfo = { name, version };
  }
}
