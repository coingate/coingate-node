import { CoinGateClient } from '#Modules/Client/CoinGate.client';
import { PaginationParams } from '#Modules/types';

/**
 * Class representing a Ledger Service
 * @extends CoinGateClient
 */
export class LedgerService extends CoinGateClient {
  /**
   * Retrieving a specific ledger account.
   * @param {string} id
   * @returns Account
   */
  public getAccount(id: string) {
    const path = this.buildPath({
      path: '/v2/ledger/accounts/:id',
      params: { id }
    });

    return this.get({ path });
  }

  /**
   * Retrieving all ledger accounts.
   * @param {PaginationParams} params page number and number of accounts per page
   * @returns Accounts
   */
  public listAccounts(params?: PaginationParams) {
    const searchParams = this.formatPaginationParams(params);
    return this.get({ path: '/v2/ledger/accounts', searchParams });
  }
}
