import express from 'express';
import * as bodyParser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json';
import * as dotenv from 'dotenv';
dotenv.config();

class App {
    public app: express.Application;

    public constructor() {
        this.app = express();

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(helmet());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.app.use(
            morgan(':date[iso] :method :url :status :response-time ms - :res[content-length]'),
        );
    }

    routes() {
        this.app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

        this.app.route('/status').get((_req, res) => {
            res.json({
                success: true,
                serverStatus: 'OK',
                port: process.env.PORT || 3001,
            });
        });
    }
}

export default new App();
