import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';

function errorMiddleware(error: HttpException, request: Request, response: Response, _: NextFunction) {
    const status = error.status || 500;
    const message = error.message || 'Empty error message';
    response.status(status).send({
        message,
        status,
    });
}

export default errorMiddleware;
