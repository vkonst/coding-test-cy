import { IAtmSessionSrvcCloseReq, IAtmSessionSrvcOpenReq, IAtmSessionSrvcOpenResp, IAtmSessionSrvcResp } from './types';

export default interface IAtmSessionService {
    openSession(sessionRequest: IAtmSessionSrvcOpenReq): Promise<IAtmSessionSrvcOpenResp>;
    closeSession(atmRequest: IAtmSessionSrvcCloseReq): Promise<IAtmSessionSrvcResp>;
    isValidSession(sessId: string, atmId: string): Promise<boolean>;
}
