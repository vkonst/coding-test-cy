export type AtmDeviceId = string;
export enum AtmDeviceKnownStatus {
    authenticated,
    notAuthenticated,
}
export type AtmDeviceStatus = undefined | AtmDeviceKnownStatus;
