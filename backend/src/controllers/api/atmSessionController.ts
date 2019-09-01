import { httpStatusCodes } from '../../lib/httpStatusCodes';
import { Request, Response } from 'express';
import IController from '../controller.interface';
import { Router } from 'express';
import { IAtmSessionSrvcCloseReq, IAtmSessionSrvcOpenReq, IAtmSessionSrvcResp } from '../../services/types';
import IAtmSessionService from '../../services/atmSessionService.interface';

/*
    POST /api/session/open
    data: {credentials /* base64('user_id:passwd')}
    response: {sess_id, status: 'open'}

    POST /api/session/close
    data:  {session_id}
    response: <- {sess_id, status: 'open'}
*/

class AtmSessionController implements IController {
    public readonly path = '/api/session/:action';
    public readonly router = Router();
    private readonly processors = {};

    constructor(private readonly atmSessionService: IAtmSessionService) {
        this.router.post(this.path, (req: Request, res: Response) => this.processRequest(req, res));
        this.processors = {
            open: async (sessionReq: IAtmSessionSrvcOpenReq) => atmSessionService.openSession(sessionReq),
            close: async (sessionReq: IAtmSessionSrvcCloseReq) => atmSessionService.closeSession(sessionReq),
        };
    }

    private async processRequest(req: Request, res: Response) {
        const { action } = req.params;
        if (!action) return res.sendStatus(httpStatusCodes.NOT_FOUND);
        const processor = this.processors[action];
        if (processor === undefined) return res.sendStatus(httpStatusCodes.NOT_FOUND);

        const response = await processor((req.body as unknown) as IAtmSessionSrvcResp);

        // TODO: Set JWT ({sessId})
        if (response.status === 'not_authorized') {
            return res.sendStatus(httpStatusCodes.FORBIDDEN);
        }
        return res.send(response);
    }
}

export default AtmSessionController;
