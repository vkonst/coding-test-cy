import { CashForm, Currency, IBanknoteOrCoin, NominalValue } from '../../@types/types';
import { AtmDeviceId, AtmDeviceStatus } from './types';

export interface IAtmDevice {
    readonly id: AtmDeviceId;
    readonly token: string;
    status: AtmDeviceStatus;
    cash: ICashBoxItem[];
}

export interface ICashBoxItem {
    readonly item: IBanknoteOrCoin;
    num: number;
}
