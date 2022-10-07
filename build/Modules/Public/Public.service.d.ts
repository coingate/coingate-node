import { CoinGateClient } from '../../Modules/Client/CoinGate.client';
import { CurrencyKindEnum, GetCurrenciesData, GetExchangeRateData } from './types';
/**
 * Class representing a Public Service
 * @extends CoinGateClient
 */
export declare class PublicService extends CoinGateClient {
    /**
     * Current exchange rate for any two currencies, fiat or crypto.
     * @param {Object} params two currencies which exchange rate you want to get. Example: { from: 'GBP', to: 'EUR' }
     * @returns exchange rate
     */
    getExchangeRate(params: GetExchangeRateData): Promise<any>;
    /**
     * Current CoinGate exchange rates for Merchants and Traders.
     * @returns exchange rates
     */
    listExchangeRates(): Promise<any>;
    /**
     * A health check endpoint for CoinGate API.
     * @returns pong!
     */
    ping(): Promise<any>;
    /**
     * Get IP addresses of CoinGate servers
     * @param {string} separator
     * @returns ip addresses
     */
    getIPAddresses(separator?: string): Promise<any>;
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
    getCurrencies(params?: GetCurrenciesData): Promise<any>;
    /**
     * @returns checkout currencies
     */
    getCheckoutCurrencies(): Promise<any>;
    /**
     * @returns merchant pay currencies
     */
    getMerchantPayCurrencies(): Promise<any>;
    /**
     * @param {CurrencyKindEnum} kind
     * @returns merchant payout currencies
     */
    getMerchantPayoutCurrencies(kind?: CurrencyKindEnum): Promise<any>;
    /**
     * List platforms
     * @param {boolean} enabled
     * @returns platforms
     */
    getPlatforms(enabled?: boolean): Promise<any>;
    /**
     * Test method
     * @param {string|null} apiKey
     * @returns boolean
     */
    test(apiKey: string): Promise<boolean>;
}
