import { CoinGateClient } from '../../Modules/Client/CoinGate.client';
import { CreateOrderRefundBody } from './types';
/**
 * Class representing a Refunds Service
 * @extends CoinGateClient
 */
export declare class RefundsService extends CoinGateClient {
    /**
     * Creates refund for provided order
     *
     * @param {number} order_id
     * @param {CreateOrderRefundBody} body
     * @returns refund
     */
    createOrderRefund(order_id: number, body: CreateOrderRefundBody): Promise<any>;
    /**
     * Retrieving information of a specific refund by CoinGate order ID and refund ID.
     *
     * @param {number} order_id
     * @param {number} id
     * @returns refund
     */
    getOrderRefund(order_id: number, id: number): Promise<any>;
    /**
     * Retrieving all refunds of a specific order by CoinGate order ID.
     *
     * @param {number} order_id
     * @returns refunds
     */
    getOrderRefunds(order_id: number): Promise<any>;
    /**
     * Retrieving all refunds of a specific order by CoinGate order ID.
     *
     */
    getRefunds(): Promise<any>;
}
