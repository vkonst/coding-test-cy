import { NextFunction, Request, Response } from 'express';

function authorizeMiddleware(request: Request, response: Response, next: NextFunction) {
    //TODO: implement JWT check
    // it shall update (or clear) atmId and sessId in the req.body with the value form the JWT
    next();
}

export default authorizeMiddleware;
