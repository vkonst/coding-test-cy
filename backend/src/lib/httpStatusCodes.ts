export enum httpStatusCodes {
    OK = 200,
    BAD_REQUEST = 400,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
    GATEWAY_TIMEOUT = 504,
}

export const httpStatusCodeText = {
    [httpStatusCodes.OK]: 'OK',
    [httpStatusCodes.BAD_REQUEST]: 'Bad Request',
    [httpStatusCodes.FORBIDDEN]: 'Forbidden',
    [httpStatusCodes.NOT_FOUND]: 'Not Found',
    [httpStatusCodes.INTERNAL_SERVER_ERROR]: 'Server Error',
    [httpStatusCodes.NOT_IMPLEMENTED]: 'Not Implemented',
    [httpStatusCodes.GATEWAY_TIMEOUT]: 'Gateway Timeout',
};
