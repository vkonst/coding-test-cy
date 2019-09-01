import { Currency } from '../@types/types';

// FIXME: make status, atmStatus, sessStatus, txStatus, txType be 'enum' rather then 'string'

export interface IAtmDeviceSrvcReq {
    atmId: string;
    atmStatus: string;
}

export interface IAtmDeviceSrvcRegisterReq extends IAtmDeviceSrvcReq {
    token: string;
}

export interface IAtmDeviceSrvcUpdateReq extends IAtmDeviceSrvcReq {
    // TODO: define atmCash data (coins and banknotes available for pay off)
    atmCash: undefined;
}

export interface IAtmDeviceSrvcResp {
    status: string;
}

export interface IAtmSessionSrvcReq {
    sessStatus: string;
}

export interface IAtmSessionSrvcOpenReq extends IAtmSessionSrvcReq {
    clientId: string;
    clientPassw: string;
}

export interface IAtmSessionSrvcCloseReq extends IAtmSessionSrvcReq {
    sessId: string;
}

export interface IAtmSessionSrvcResp {
    status: string;
}

export interface IAtmSessionSrvcOpenResp {
    sessId: string;
}

export interface IAtmTransactionSrvcReq {
    txType: string;
    txStatus: string;
}

export interface IAtmTransacrionSrvcAuthorizeReq extends IAtmTransactionSrvcReq {
    atmSessId: string;
    txAmount: number;
    txCurrency: Currency;
}

export interface IAtmTransactionSrvcUpdateReq extends IAtmTransactionSrvcReq {
    txId: string;
}

export interface IAtmTransactionSrvcResp {
    status: string;
}

export interface IAtmTransactionSrvcAuthorizeResp extends IAtmTransactionSrvcResp {
    txId: string;
}
