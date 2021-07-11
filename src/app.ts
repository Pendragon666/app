import express, { Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import fs from 'fs';
import { connect } from 'mongoose';
import { config } from 'dotenv';
import { logError, logSuccess, setPath } from '@harukazeorg/logger';
import { AuthRouter } from './routes';
import { errorMiddleware, notFoundMiddlware } from './middlewares/handlers';

import SwaggerUI from 'swagger-ui-express';
import SwaggerJSON from './swagger.json';

config();

(async () => {
  const app = express();

  app.set('trust proxy', true);

  if (process.env.NODE_ENV == 'production') {
    app.use(
      morgan('combined', {
        stream: fs.createWriteStream('./access.log', { flags: 'a' }),
      }),
    );
  } else {
    app.use(morgan('dev'));
  }

  app.use(express.json());
  app.disable('etag');
  app.use(cors());

  const port = process.env.PORT || 5000;
  setPath('./server.log');

  app.get('/', (_: Request, res: Response) => res.status(200).send('hello young skywalker' + _.ip));
  app.use('/auth/v1', AuthRouter);
  app.use('/api-docs', SwaggerUI.serve, SwaggerUI.setup(SwaggerJSON, {}));

  app.use(notFoundMiddlware);
  app.use(errorMiddleware);

  await connect(process.env.MONGO || '', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }).catch(() => logError('Problem connecting with database, check mongodb connection string'));

  app.listen(port, () => logSuccess(`Server stared on port: ${port}`));
})();
