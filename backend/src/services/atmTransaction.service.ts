import {
    IAtmTransacrionSrvcAuthorizeReq,
    IAtmTransactionSrvcAuthorizeResp,
    IAtmTransactionSrvcResp,
    IAtmTransactionSrvcUpdateReq,
} from './types';
import IAtmTransactionService from './atmTransactionService.interface';
import { v4 as uuid } from 'uuid';
import IAtmSessionService from './atmSessionService.interface';

// TODO: implement classes AtmTxs (and AtmTx)
const atmTxs = {};

export default class AtmTransactionService implements IAtmTransactionService {
    constructor(private readonly atmSessionService: IAtmSessionService, readonly logger = console) {}

    public async authorizeTx(params: IAtmTransacrionSrvcAuthorizeReq): Promise<IAtmTransactionSrvcAuthorizeResp> {
        const { atmId, sessId, txType, txStatus, txCurrency, txAmount } = params;
        let txId = 'undefined';
        let status = 'not_authorized';
        if (await this.isValidSession(sessId, atmId)) {
            // TODO: implement ATM transaction authorization logic
            if (txStatus === 'new' && txType === 'withdrawal' && txAmount > 0) {
                txId = uuid();
                status = 'authorized';
                atmTxs[txId] = { sessId, status, txStatus, txCurrency, txAmount };
                this.logger.debug(`atmTxs updated: ${JSON.stringify(atmTxs)}`);
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
            this.logger.debug(`atmTxs updated: ${JSON.stringify(atmTxs)}`);
        }
        return Promise.resolve({ status });
    }

    private async isValidSession(sessId: string, atmId: string): Promise<boolean> {
        // TODO: implement session id verification logic
        const isValid = await this.atmSessionService.isValidSession(sessId, atmId);
        this.logger.debug(`Session ${sessId} is ${isValid ? '' : 'in'}valid`);
        return Promise.resolve(isValid);
    }
}
