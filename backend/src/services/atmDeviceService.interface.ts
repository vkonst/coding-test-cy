import { IAtmDeviceSrvcResp, IAtmDeviceSrvcRegisterReq, IAtmDeviceSrvcUpdateReq } from './types';

export default interface IAtmDeviceService {
    registerAtm(atmRequest: IAtmDeviceSrvcRegisterReq): Promise<IAtmDeviceSrvcResp>;
    updateAtm(atmRequest: IAtmDeviceSrvcUpdateReq): Promise<IAtmDeviceSrvcResp>;
    // static async getAtmState
}
