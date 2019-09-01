import 'dotenv/config';
import App from './app';
import AtmDeviceController from './controllers/api/atmDeviceController';
import validateEnv from './validateEnv';
import AtmDeviceService from './services/atmDevice.service';
import AtmSessionService from './services/atmSession.service';
import AtmSessionController from './controllers/api/atmSessionController';
import AtmTransactionService from './services/atmTransaction.service';
import AtmTransactionController from './controllers/api/atmTransactionController';

validateEnv(process.env);

const services = {
    atmDeviceService: new AtmDeviceService(),
    atmSessionService: new AtmSessionService(),
    atmTransactionService: new AtmTransactionService(),
};

const app = new App([
    new AtmDeviceController(services.atmDeviceService),
    new AtmSessionController(services.atmSessionService),
    new AtmTransactionController(services.atmTransactionService),
]);

app.listen();
