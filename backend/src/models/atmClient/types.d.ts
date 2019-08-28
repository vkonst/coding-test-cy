export type AtmClientId = string;
export enum AtmClientKnownStatus {
    authenticated,
    notAuthenticated,
}
export type AtmClientStatus = undefined | AtmClientKnownStatus;
