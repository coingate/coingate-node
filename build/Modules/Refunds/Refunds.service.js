"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefundsService = void 0;
const CoinGate_client_1 = require("../../Modules/Client/CoinGate.client");
/**
 * Class representing a Refunds Service
 * @extends CoinGateClient
 */
class RefundsService extends CoinGate_client_1.CoinGateClient {
    /**
     * Creates refund for provided order
     *
     * @param {number} order_id
     * @param {CreateOrderRefundBody} body
     * @returns refund
     */
    createOrderRefund(order_id, body) {
        const path = this.buildPath({
            path: '/v2/orders/:order_id/refunds',
            params: { order_id }
        });
        return this.post(path, body);
    }
    /**
     * Retrieving information of a specific refund by CoinGate order ID and refund ID.
     *
     * @param {number} order_id
     * @param {number} id
     * @returns refund
     */
    getOrderRefund(order_id, id) {
        const path = this.buildPath({
            path: '/v2/orders/:order_id/refunds/:id',
            params: { order_id, id }
        });
        return this.get({ path });
    }
    /**
     * Retrieving all refunds of a specific order by CoinGate order ID.
     *
     * @param {number} order_id
     * @returns refunds
     */
    getOrderRefunds(order_id) {
        const path = this.buildPath({
            path: '/v2/orders/:order_id/refunds',
            params: { order_id }
        });
        return this.get({ path });
    }
    /**
     * Retrieving all refunds of a specific order by CoinGate order ID.
     *
     */
    getRefunds() {
        return this.get({ path: '/v2/refunds' });
    }
}
exports.RefundsService = RefundsService;
