import { CoinGateClient } from '#Modules/Client/CoinGate.client';
import { PaginationParams } from '#Modules/types';

/**
 * Class representing a Withdrawals Service
 * @extends CoinGateClient
 */
export class WithdrawalsService extends CoinGateClient {
  /**
   * Retrieving a specific withdrawal.
   * @param {number} id
   * @returns Withdrawal
   */
  public getWithdrawal(id: number) {
    const path = this.buildPath({
      path: '/v2/withdrawals/:id',
      params: { id }
    });

    return this.get({ path });
  }

  /**
   * Retrieving all withdrawals
   * @param {PaginationParams} params page number and number of withdrawals per page
   * @returns Withdrawals
   */
  public getWithdrawals(params?: PaginationParams) {
    const searchParams = this.formatPaginationParams(params);
    return this.get({ path: '/v2/withdrawals', searchParams });
  }
}
