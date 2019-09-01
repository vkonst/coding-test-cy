import IAtmDeviceService from './atmDeviceService.interface';
import { IAtmDeviceSrvcRegisterReq, IAtmDeviceSrvcResp, IAtmDeviceSrvcUpdateReq } from './types';

export default class AtmDeviceService implements IAtmDeviceService {
    public async registerAtm(params: IAtmDeviceSrvcRegisterReq): Promise<IAtmDeviceSrvcResp> {
        const { atmId, token } = params;
        // TODO: implement device registration logic
        return Promise.resolve({
            status: (await this.isValidAtmToken(token, atmId)) ? 'registered' : 'not_authorized',
        });
    }

    public async updateAtm(params: IAtmDeviceSrvcUpdateReq): Promise<IAtmDeviceSrvcResp> {
        // const { atmId, atmCash } = params;
        return Promise.resolve({ status: 'updated' });
    }

    private async isValidAtmToken(token: string, atmId: string): Promise<boolean> {
        // TODO: implement token verification
        return Promise.resolve(true);
    }
}
