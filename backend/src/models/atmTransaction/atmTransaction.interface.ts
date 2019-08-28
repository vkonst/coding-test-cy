import { Currency } from '../../@types/types';
import { AtmSessionId } from '../atmSession/types';
import { AtmTransactionId, AtmTransactionResult, AtmTransactionStatus, AtmTransactionType } from './types';

interface IAtmTransaction {
    readonly id: AtmTransactionId;
    readonly type: AtmTransactionType;
    readonly ccy: Currency;
    readonly value: number;
    readonly session: AtmSessionId;
    status: AtmTransactionStatus;
    result: AtmTransactionResult;
}

export default IAtmTransaction;
