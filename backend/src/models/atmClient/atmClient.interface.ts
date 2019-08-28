import { AtmClientId, AtmClientStatus } from './types';

interface IAtmClient {
    id: AtmClientId;
    name: string;
    password: string;
    status: AtmClientStatus;
}

export default IAtmClient;
