import { CoinGateClient } from '#Modules/Client/CoinGate.client';
import { ListAccountsParams } from './types';

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
   * @param {ListAccountsParams} params page number and
   * @returns Accounts
   */
  public listAccounts(params: ListAccountsParams) {
    return this.get({ path: '/v2/ledger/accounts', params });
  }
}
