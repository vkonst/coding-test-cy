import { AtmClientId } from '../atmClient/types';
import { AtmDeviceId } from '../atmDevice/types';
import { AtmSessionId, AtmSessionStatus } from './types';

interface IAtmSession {
    readonly id: AtmSessionId;
    readonly atmDeviceId: AtmDeviceId;
    readonly atmClientId: AtmClientId;
    readonly expire: Date;
    status: AtmSessionStatus;
}

export default IAtmSession;
