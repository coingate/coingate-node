"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LedgerService = void 0;
const CoinGate_client_1 = require("../../Modules/Client/CoinGate.client");
/**
 * Class representing a Ledger Service
 * @extends CoinGateClient
 */
class LedgerService extends CoinGate_client_1.CoinGateClient {
    /**
     * Retrieving a specific ledger account.
     * @param {string} id
     * @returns Account
     */
    getAccount(id) {
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
    listAccounts(params) {
        const searchParams = this.formatPaginationParams(params);
        return this.get({ path: '/v2/ledger/accounts', searchParams });
    }
}
exports.LedgerService = LedgerService;
