export type AtmTransactionId = string;

export enum AtmTransactionKnownStatus {
  new,          // not yet authorized
  processing,   // authorized but not yet finished (or cancelled)
  ended,        // finished (succeeded or failed/cancelled/expired)
}
export type AtmTransactionStatus = undefined | AtmTransactionKnownStatus;

export enum AtmTransactionKnownResult {
  success,
  failure,
  timeout,
}
export type AtmTransactionResult = undefined | AtmTransactionKnownResult;

export enum AtmTransactionKnownType {
  withdraw,
  deposit,
}
export type AtmTransactionType = undefined | AtmTransactionKnownType;
