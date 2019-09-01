import {
    IAtmTransacrionSrvcAuthorizeReq,
    IAtmTransactionSrvcAuthorizeResp,
    IAtmTransactionSrvcResp,
    IAtmTransactionSrvcUpdateReq,
} from './types';

export default interface IAtmTransactionService {
    authorizeTx(transactionRequest: IAtmTransacrionSrvcAuthorizeReq): Promise<IAtmTransactionSrvcAuthorizeResp>;
    updateTx(transactionRequest: IAtmTransactionSrvcUpdateReq): Promise<IAtmTransactionSrvcResp>;
}
