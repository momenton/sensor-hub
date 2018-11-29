import bodyParser from 'body-parser';
import express from 'express';
import winston from 'express-winston';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import swaggerJSDoc from 'swagger-jsdoc';
import logger from './utils/logger';
import router from './router';
import * as errorHandlers from './middlewares/errorHandler';

const app = express();
const swaggerSpec = swaggerJSDoc({swaggerDefinition: swaggerDocument, apis: []});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(
  winston.logger({
    winstonInstance: logger,
    meta: false,
    msg: '{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}',
    expressFormat: true,
    colorize: true,
    ignoreRoute: () => false
  })
);

app.use('/api', router);

app.use(errorHandlers.genericErrorHandler);
app.use(errorHandlers.methodNotAllowedHandler);

const port = process.env.PORT || '3000';
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});

export default app;
