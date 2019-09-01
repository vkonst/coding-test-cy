import { httpStatusCodes } from '../../lib/httpStatusCodes';
import { Request, Response } from 'express';
import IController from '../controller.interface';
import { Router } from 'express';
import {
    IAtmTransacrionSrvcAuthorizeReq,
    IAtmTransactionSrvcReq,
    IAtmTransactionSrvcUpdateReq,
} from '../../services/types';
import IAtmTransactionService from '../../services/atmTransactionService.interface';

/*
    POST /api/tx/withdraw/authorize
    data: {sess_id, debitAcc: 'tbd', currency: 'EUR', amount }
    response: {tx_id, status: 'authorized'}

    POST /api/tx/withdraw/update
    data: {sess_id, tx_id, status: 'done'}
    response: {tx_id, status: 'done'}
 */

class AtmTransactionController implements IController {
    public readonly path = '/api/transaction/:txType/:action';
    public readonly router = Router();
    private readonly processors = {};

    constructor(private readonly atmTransactionService: IAtmTransactionService) {
        this.router.post(this.path, (req: Request, res: Response) => this.processRequest(req, res));
        this.processors = {
            authorize: async (txReq: IAtmTransacrionSrvcAuthorizeReq) => atmTransactionService.authorizeTx(txReq),
            update: async (txReq: IAtmTransactionSrvcUpdateReq) => atmTransactionService.updateTx(txReq),
        };
    }

    private async processRequest(req: Request, res: Response) {
        const { action, txType } = req.params;
        if (!action) return res.sendStatus(httpStatusCodes.NOT_FOUND);
        const processor = this.processors[action];
        if (processor === undefined) return res.sendStatus(httpStatusCodes.NOT_FOUND);

        const reqParams = Object.assign({}, req.body, { txType });
        const response = await processor((reqParams as unknown) as IAtmTransactionSrvcReq);

        if (response.status === 'not_authorized') {
            return res.sendStatus(httpStatusCodes.FORBIDDEN);
        }
        return res.send(response);
    }
}

export default AtmTransactionController;
