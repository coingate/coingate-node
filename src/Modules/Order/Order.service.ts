import { CoinGateClient } from '#Modules/Client/CoinGate.client';

import {
  Checkout,
  CheckoutBody,
  CreateOrderBody,
  ListOrdersData,
  Order
} from './types';

/**
 * Class representing a Order Service
 * @extends CoinGateClient
 */
export class OrderService extends CoinGateClient {
  /**
   * Create order at CoinGate and redirect shopper to invoice (payment_url).
   *
   * @param  {CreateOrderBody} body
   * @returns {Order} order
   */
  public async createOrder(body: CreateOrderBody): Promise<Order> {
    return this.post('/v2/orders/', body);
  }

  /**
   * Placing created order with pre-selected payment currency (BTC, LTC, ETH, etc).
   * @param {number} id
   * @param  {CheckoutBody} body
   * @returns {Checkout} checkout
   */
  public checkout(id: number, body: CheckoutBody): Promise<Checkout> {
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
  public getOrder(id: number): Promise<Order> {
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
  public async listOrders(params?: ListOrdersData): Promise<Order[]> {
    return this.get({ path: '/v2/orders/', params });
  }
}
