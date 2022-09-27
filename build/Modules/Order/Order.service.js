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
exports.OrderService = void 0;
const CoinGate_client_1 = require("../../Modules/Client/CoinGate.client");
/**
 * Class representing a Order Service
 * @extends CoinGateClient
 */
class OrderService extends CoinGate_client_1.CoinGateClient {
    /**
     * Create order at CoinGate and redirect shopper to invoice (payment_url).
     *
     * @param  {CreateOrderBody} body
     * @returns {Order} order
     */
    createOrder(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.post('/v2/orders/', body);
        });
    }
    /**
     * Placing created order with pre-selected payment currency (BTC, LTC, ETH, etc).
     * @param {number} id
     * @param  {CheckoutBody} body
     * @returns {Checkout} checkout
     */
    checkout(id, body) {
        const path = this.buildPath({
            path: '/v2/orders/:id/checkout',
            params: { id }
        });
        return this.post(path, body);
    }
    /**
     * Retrieving information of a specific order by CoinGate order ID.
     *
     * @param {number} id
     * @returns {Order} order
     */
    getOrder(id) {
        const path = this.buildPath({
            path: '/v2/orders/:id/',
            params: { id }
        });
        return this.get({ path });
    }
    /**
     * Retrieving information of all placed orders.
     *
     * @param {ListOrdersData} params
     * @returns {Order[]} order array
     */
    listOrders(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.get({ path: '/v2/orders/', params });
        });
    }
}
exports.OrderService = OrderService;
