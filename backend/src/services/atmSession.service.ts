import IAtmSessionService from './atmSessionService.interface';
import { IAtmSessionSrvcCloseReq, IAtmSessionSrvcOpenReq, IAtmSessionSrvcOpenResp, IAtmSessionSrvcResp } from './types';
import { v4 as uuid } from 'uuid';
import IAtmDeviceService from './atmDeviceService.interface';

// TODO: implement class AtmSessions (and AtmSession)
const atmSessions = {};

export default class AtmSessionService implements IAtmSessionService {
    constructor(private readonly atmDeviceService: IAtmDeviceService, readonly logger = console) {}

    public async openSession(params: IAtmSessionSrvcOpenReq): Promise<IAtmSessionSrvcOpenResp> {
        const { atmId, clientId, clientPassw } = params;
        let sessId = 'undefined';
        let status = 'not_authorized';
        if ((await this.isValidClient(clientId, clientPassw)) && (await this.isValidAtm(atmId))) {
            // TODO: implement session opening logic
            sessId = uuid();
            status = 'open';
            atmSessions[sessId] = { atmId, status, clientId, opened: Date.now() };
            this.logger.debug(`atmSessions updated: ${JSON.stringify(atmSessions)}`);
        }
        return Promise.resolve({ sessId, status });
    }

    public async closeSession(params: IAtmSessionSrvcCloseReq): Promise<IAtmSessionSrvcResp> {
        const { atmId, sessId } = params;
        // TODO: implement session closing logic
        // TODO: clear sessionId (for JWT)
        let status = 'not_authorized';
        if (await this.isValidSession(sessId, atmId)) {
            status = 'closed';
            atmSessions[sessId].status = status;
            atmSessions[sessId].closed = Date.now();
            this.logger.debug(`atmSessions updated: ${JSON.stringify(atmSessions)}`);
        }
        return Promise.resolve({ status });
    }

    public async isValidSession(sessId, atmId): Promise<boolean> {
        // TODO: implement session validation logic
        const isValid =
            atmSessions[sessId] !== undefined &&
            atmSessions[sessId].status === 'open' &&
            atmSessions[sessId].atmId === atmId;
        return Promise.resolve(isValid);
    }

    private async isValidAtm(atmId: string): Promise<boolean> {
        const isValid = await this.atmDeviceService.isValidAtm(atmId);
        this.logger.debug(`ATM ${atmId} is ${isValid ? 'valid and regestered' : 'invalid or not registered'}`);
        return Promise.resolve(isValid);
    }

    private async isValidClient(clientId: string, clientPassw: string): Promise<boolean> {
        // TODO: implement ATM client verification/authorization
        const isAuthorized = clientId !== '' && clientPassw !== '';
        this.logger.debug(`Client ${clientId} is${isAuthorized ? ' ' : ' not '}authorized`);
        return Promise.resolve(isAuthorized);
    }
}
