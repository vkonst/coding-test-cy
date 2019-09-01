import {
    IAtmTransacrionSrvcAuthorizeReq,
    IAtmTransactionSrvcAuthorizeResp,
    IAtmTransactionSrvcResp,
    IAtmTransactionSrvcUpdateReq,
} from './types';
import IAtmTransactionService from './atmTransactionService.interface';
import { v4 as uuid } from 'uuid';

const atmTxs = {};

export default class AtmTransactionService implements IAtmTransactionService {
    public async authorizeTx(params: IAtmTransacrionSrvcAuthorizeReq): Promise<IAtmTransactionSrvcAuthorizeResp> {
        const { txType, txStatus, atmSessId, txAmount, txCurrency } = params;
        let txId = 'undefined';
        let status = 'not_authorized';
        if (await this.isValidSession(atmSessId)) {
            // TODO: implement ATM transaction authorization logic
            if (txStatus === 'new' && txType === 'withdrawal' && txAmount > 0) {
                txId = uuid();
                status = 'authorized';
                atmTxs[txId] = { atmSessId, status };
            }
        }
        return Promise.resolve({ txId, status });
    }

    public async updateTx(params: IAtmTransactionSrvcUpdateReq): Promise<IAtmTransactionSrvcResp> {
        const { txId, txStatus } = params;
        // TODO: implement ATM transaction status update logic
        let status = 'not_authorized';
        if (atmTxs[txId] !== undefined) {
            status = 'updated';
            atmTxs[txId].status = txStatus;
        }
        return Promise.resolve({ status });
    }

    private async isValidSession(atmSessId: string): Promise<boolean> {
        // TODO: implement session id verification logic
        return Promise.resolve(true);
    }
}
