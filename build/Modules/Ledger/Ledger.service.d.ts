import { CoinGateClient } from '../../Modules/Client/CoinGate.client';
import { PaginationParams } from '../../Modules/types';
/**
 * Class representing a Ledger Service
 * @extends CoinGateClient
 */
export declare class LedgerService extends CoinGateClient {
    /**
     * Retrieving a specific ledger account.
     * @param {string} id
     * @returns Account
     */
    getAccount(id: string): Promise<any>;
    /**
     * Retrieving all ledger accounts.
     * @param {PaginationParams} params page number and number of accounts per page
     * @returns Accounts
     */
    listAccounts(params?: PaginationParams): Promise<any>;
}
