"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicService = void 0;
const CoinGate_client_1 = require("../../Modules/Client/CoinGate.client");
const types_1 = require("./types");
/**
 * Class representing a Public Service
 * @extends CoinGateClient
 */
class PublicService extends CoinGate_client_1.CoinGateClient {
    /**
     * Current exchange rate for any two currencies, fiat or crypto.
     * @param {Object} params two currencies which exchange rate you want to get. Example: { from: 'GBP', to: 'EUR' }
     * @returns exchange rate
     */
    getExchangeRate(params) {
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
    listExchangeRates() {
        return this.get({ path: '/v2/rates/' });
    }
    /**
     * A health check endpoint for CoinGate API.
     * @returns pong!
     */
    ping() {
        return this.get({ path: '/v2/ping/' });
    }
    /**
     * Get IP addresses of CoinGate servers
     * @param {string} separator
     * @returns ip addresses
     */
    getIPAddresses(separator) {
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
    getCurrencies(params) {
        return this.get({
            path: '/v2/currencies/',
            params
        });
    }
    /**
     * @returns checkout currencies
     */
    getCheckoutCurrencies() {
        return this.getCurrencies({
            kind: types_1.CurrencyKindEnum.CRYPTO,
            native: true,
            merchant_pay: true,
            enabled: true
        });
    }
    /**
     * @returns merchant pay currencies
     */
    getMerchantPayCurrencies() {
        return this.getCurrencies({
            kind: types_1.CurrencyKindEnum.CRYPTO,
            native: false,
            merchant_pay: true
        });
    }
    /**
     * @param {CurrencyKindEnum} kind
     * @returns merchant payout currencies
     */
    getMerchantPayoutCurrencies(kind) {
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
    getPlatforms(enabled) {
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
    test(apiKey) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.get({ apiKey, path: '/v2/auth/test' });
                return true;
            }
            catch (_a) {
                return false;
            }
        });
    }
}
exports.PublicService = PublicService;
