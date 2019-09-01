import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import IController from './controllers/controller.interface';
import errorMiddleware from './middleware/error.middleware';
import loggerMiddleware from './middleware/logger.middleware';
import authorizeMiddleware from './middleware/authorize.middleware';

class App {
    public app: express.Application;

    constructor(controllers: IController[]) {
        this.app = express();

        this.connectToTheDatabase();
        this.initializeMiddleware();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }

    public listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`App listening on the port ${process.env.PORT}`);
        });
    }

    public getServer() {
        return this.app;
    }

    private initializeMiddleware() {
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
        this.app.use(authorizeMiddleware);
        this.app.use(loggerMiddleware);
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }

    private initializeControllers(controllers: IController[]) {
        controllers.forEach(controller => {
            this.app.use('/', controller.router);
        });
    }

    private connectToTheDatabase() {
        // TODO: implement DB connection (task #04.1)
    }
}

export default App;
