import { httpStatusCodes } from '../../lib/httpStatusCodes';
import { Request, Response } from 'express';
import IController from '../controller.interface';
import { Router } from 'express';
import { IAtmDeviceSrvcRegisterReq, IAtmDeviceSrvcUpdateReq } from '../../services/types';
import IAtmDeviceService from '../../services/atmDeviceService.interface';

/*
    POST /api/atm/register
    data: {atmId, token, atm_status: {'not_registered', cash: [<coins>]}}
    response: {status: 'registered'}

    POST /api/atm/update
    data: {atmId, atm_status: {'registered', cash: [<coins>]}}
    response: {status: 'updated'}
*/

class AtmDeviceController implements IController {
    public readonly path = '/api/atm/:action';
    public readonly router = Router();
    private readonly processors = {};

    constructor(private readonly atmDeviceService: IAtmDeviceService) {
        this.router.post(this.path, (req: Request, res: Response) => this.processRequest(req, res));
        this.processors = {
            register: async (deviceRequest: IAtmDeviceSrvcRegisterReq) => atmDeviceService.registerAtm(deviceRequest),
            update: async (deviceRequest: IAtmDeviceSrvcUpdateReq) => atmDeviceService.updateAtm(deviceRequest),
        };
    }

    private async processRequest(req: Request, res: Response) {
        const { action } = req.params;
        if (!action) return res.sendStatus(httpStatusCodes.NOT_FOUND);
        const processor = this.processors[action];
        if (processor === undefined) return res.sendStatus(httpStatusCodes.NOT_FOUND);

        const response = await processor((req.body as unknown) as IAtmDeviceSrvcUpdateReq);

        // TODO: Set JWT ({atmId})
        if (response.status === 'not_authorized') {
            return res.sendStatus(httpStatusCodes.FORBIDDEN);
        }
        return res.send(response);
    }
}

export default AtmDeviceController;
