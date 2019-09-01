import IAtmSessionService from './atmSessionService.interface';
import { IAtmSessionSrvcCloseReq, IAtmSessionSrvcOpenReq, IAtmSessionSrvcOpenResp, IAtmSessionSrvcResp } from './types';
import { v4 as uuid } from 'uuid';

const atmSessions = {};

export default class AtmSessionService implements IAtmSessionService {
    public async openSession(params: IAtmSessionSrvcOpenReq): Promise<IAtmSessionSrvcOpenResp> {
        const { clientId, clientPassw } = params;
        let sessId = 'undefined';
        let status = 'not_authorized';
        if (await this.isValidClient(clientId, clientPassw)) {
            // TODO: implement session opening logic
            sessId = uuid();
            status = 'open';
            atmSessions[sessId] = { status };
        }
        return Promise.resolve({ sessId, status });
    }

    public async closeSession(params: IAtmSessionSrvcCloseReq): Promise<IAtmSessionSrvcResp> {
        const { sessId } = params;
        // TODO: implement session closing logic
        // TODO: clear sessionId (for JWT)
        let status = 'not_authorized';
        if (atmSessions[sessId] !== undefined) {
            status = 'closed';
            atmSessions[sessId].status = status;
        }
        return Promise.resolve({ status });
    }

    private async isValidClient(clientId: string, clientPassw: string): Promise<boolean> {
        // TODO: implement ATM client verification/authorization
        return Promise.resolve(true);
    }
}
