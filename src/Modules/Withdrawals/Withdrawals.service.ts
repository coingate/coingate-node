import { CoinGateClient } from '#Modules/Client/CoinGate.client';

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
   * @returns Withdrawals
   */
  public getWithdrawals() {
    return this.get({ path: '/v2/withdrawals' });
  }
}
