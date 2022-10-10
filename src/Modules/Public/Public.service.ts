import { CoinGateClient } from '#Modules/Client/CoinGate.client';

import {
  CurrencyKindEnum,
  GetCurrenciesData,
  GetExchangeRateData
} from './types';

/**
 * Class representing a Public Service
 * @extends CoinGateClient
 */
export class PublicService extends CoinGateClient {
  /**
   * Current exchange rate for any two currencies, fiat or crypto.
   * @param {Object} params two currencies which exchange rate you want to get. Example: { from: 'GBP', to: 'EUR' }
   * @returns exchange rate
   */
  public getExchangeRate(params: GetExchangeRateData) {
    const path = this.buildPath({
      path: '/v2/rates/merchant/:from/:to',
      params
    });

    return this.get({ path });
  }

  /**
   * Current CoinGate exchange rates for Merchants and Traders.
   * @returns exchange rates
   */
  public listExchangeRates() {
    return this.get({ path: '/v2/rates/' });
  }

  /**
   * A health check endpoint for CoinGate API.
   * @returns pong!
   */
  public ping() {
    return this.get({ path: '/v2/ping/' });
  }

  /**
   * Get IP addresses of CoinGate servers
   * @param {string} separator
   * @returns ip addresses
   */
  public getIPAddresses(separator?: string) {
    return this.get({ path: '/v2/ips-v4/', params: { separator } });
  }

  /**
   * Get Currencies
   * @param {Object} params
   * @param {boolean} params.native
   * @param {boolean} params.enabled
   * @param {boolean} params.merchant_pay
   * @param {boolean} params.merchant_receive
   * @param {CurrencyKindEnum} params.kind
   * @returns currencies
   */
  public getCurrencies(params?: GetCurrenciesData) {
    return this.get({
      path: '/v2/currencies/',
      params
    });
  }

  /**
   * @returns checkout currencies
   */
  public getCheckoutCurrencies() {
    return this.getCurrencies({
      kind: CurrencyKindEnum.CRYPTO,
      native: true,
      merchant_pay: true,
      enabled: true
    });
  }

  /**
   * @returns merchant pay currencies
   */
  public getMerchantPayCurrencies() {
    return this.getCurrencies({
      kind: CurrencyKindEnum.CRYPTO,
      native: false,
      merchant_pay: true
    });
  }

  /**
   * @param {CurrencyKindEnum} kind
   * @returns merchant payout currencies
   */
  public getMerchantPayoutCurrencies(kind?: CurrencyKindEnum) {
    return this.getCurrencies({
      kind,
      native: false,
      merchant_pay: false,
      merchant_receive: true
    });
  }

  /**
   * List platforms
   * @param {boolean} enabled
   * @returns platforms
   */
  public getPlatforms(enabled?: boolean) {
    return this.get({
      path: '/v2/currencies/',
      params: { enabled: enabled ? 'true' : 'false' }
    });
  }

  /**
   * Test method
   * @param {string|null} apiKey
   * @returns boolean
   */
  public async test(apiKey: string): Promise<boolean> {
    try {
      await this.get({ apiKey, path: '/v2/auth/test' });

      return true;
    } catch {
      return false;
    }
  }
}
