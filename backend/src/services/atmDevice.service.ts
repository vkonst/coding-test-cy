import IAtmDeviceService from './atmDeviceService.interface';
import { IAtmDeviceSrvcRegisterReq, IAtmDeviceSrvcResp, IAtmDeviceSrvcUpdateReq } from './types';

// TODO: implement class atmDevices (and atmDevice)
const atmDevices = {};

export default class AtmDeviceService implements IAtmDeviceService {
    constructor(protected readonly logger = console) {}
    public async registerAtm(params: IAtmDeviceSrvcRegisterReq): Promise<IAtmDeviceSrvcResp> {
        const { atmId, token } = params;
        // TODO: implement ATM device registration logic
        let status = 'not_authorized';
        if (await this.isValidAtmToken(token, atmId)) {
            const isRegistrationNeeded = atmDevices[atmId] === undefined || atmDevices[atmId].status === 'disconnected';
            if (isRegistrationNeeded) {
                status = 'registered';
                atmDevices[atmId] = { status, lastUpdated: Date.now() };
                this.logger.debug(`atmDevices updated: ${JSON.stringify(atmDevices)}`);
            }
        }
        return Promise.resolve({ status });
    }

    public async updateAtm(params: IAtmDeviceSrvcUpdateReq): Promise<IAtmDeviceSrvcResp> {
        const { atmId, atmCash } = params;
        // TODO: implement ATM device status update logic
        const isUpdateNeeded = atmDevices[atmId] !== undefined && atmDevices[atmId].status !== 'registered';
        let status = 'not_authorized';
        if (isUpdateNeeded) {
            status = 'updated';
            atmDevices[atmId].lastUpdated = Date.now();
            this.logger.debug(`atmDevices updated: ${JSON.stringify(atmDevices)}`);
        }
        return Promise.resolve({ status });
    }

    public async isValidAtm(atmId: string): Promise<boolean> {
        // TODO: implement ATM device validation logic
        let isValid = false;
        if (atmId && atmDevices[atmId]) {
            isValid = atmDevices[atmId].status === 'registered';
        }
        return Promise.resolve(isValid);
    }

    private async isValidAtmToken(token: string, atmId: string): Promise<boolean> {
        // TODO: implement token verification
        const knownTokens = process.env.ATM_TOKENS ? process.env.ATM_TOKENS.split(':') : [];
        const tokenIndex = Number.parseInt(atmId) - 1;
        const isValid =
            tokenIndex !== NaN &&
            tokenIndex >= 0 &&
            knownTokens.length > tokenIndex &&
            knownTokens[tokenIndex] === token;
        this.logger.debug(`Token ${token} for ATM ${atmId} is ${isValid ? '' : 'in'}valid`);
        return Promise.resolve(isValid);
    }
}
