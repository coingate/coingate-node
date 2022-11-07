"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithdrawalsService = void 0;
const CoinGate_client_1 = require("../../Modules/Client/CoinGate.client");
/**
 * Class representing a Withdrawals Service
 * @extends CoinGateClient
 */
class WithdrawalsService extends CoinGate_client_1.CoinGateClient {
    /**
     * Retrieving a specific withdrawal.
     * @param {number} id
     * @returns Withdrawal
     */
    getWithdrawal(id) {
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
    getWithdrawals(params) {
        const searchParams = this.formatPaginationParams(params);
        return this.get({ path: '/v2/withdrawals', searchParams });
    }
}
exports.WithdrawalsService = WithdrawalsService;
