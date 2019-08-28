export type AtmSessionId = string;

export enum AtmSessionKnownStatus {
    open, // new transactions enabled
    closed, // ended, no outstanding transactions
    pending, // new transactions are disabled
}
export type AtmSessionStatus = undefined | AtmSessionKnownStatus;
