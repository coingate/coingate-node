import { CoinGateClient } from '../../Modules/Client/CoinGate.client';
import { Checkout, CheckoutBody, CreateOrderBody, ListOrdersData, Order } from './types';
/**
 * Class representing a Order Service
 * @extends CoinGateClient
 */
export declare class OrderService extends CoinGateClient {
    /**
     * Create order at CoinGate and redirect shopper to invoice (payment_url).
     *
     * @param  {CreateOrderBody} body
     * @returns {Order} order
     */
    createOrder(body: CreateOrderBody): Promise<Order>;
    /**
     * Placing created order with pre-selected payment currency (BTC, LTC, ETH, etc).
     * @param {number} id
     * @param  {CheckoutBody} body
     * @returns {Checkout} checkout
     */
    checkout(id: number, body: CheckoutBody): Promise<Checkout>;
    /**
     * Retrieving information of a specific order by CoinGate order ID.
     *
     * @param {number} id
     * @returns {Order} order
     */
    getOrder(id: number): Promise<Order>;
    /**
     * Retrieving information of all placed orders.
     *
     * @param {ListOrdersData} params
     * @returns {Order[]} order array
     */
    listOrders(params?: ListOrdersData): Promise<Order[]>;
}
