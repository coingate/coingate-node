import { CoinGateClient } from '../../Modules/Client/CoinGate.client';
import { PaginationParams } from '../../Modules/types';
/**
 * Class representing a Withdrawals Service
 * @extends CoinGateClient
 */
export declare class WithdrawalsService extends CoinGateClient {
    /**
     * Retrieving a specific withdrawal.
     * @param {number} id
     * @returns Withdrawal
     */
    getWithdrawal(id: number): Promise<any>;
    /**
     * Retrieving all withdrawals
     * @param {PaginationParams} params page number and number of withdrawals per page
     * @returns Withdrawals
     */
    getWithdrawals(params?: PaginationParams): Promise<any>;
}
