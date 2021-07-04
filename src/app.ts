import express, { Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { connect } from 'mongoose';
import { config } from 'dotenv';
import { logError, logSuccess, setPath } from '@harukazeorg/logger';
import { AuthRouter } from './routes';

config();

(async () => {
  const app = express();

  app.use(morgan('dev'));
  app.use(express.json());
  app.disable('etag');
  app.use(cors());

  const port = process.env.PORT || 5000;
  setPath('./server.log');

  app.get('/', (_: Request, res: Response) => res.status(200).send('hello young skywalker'));
  app.use('/auth/v1', AuthRouter);

  await connect(process.env.MONGO || '', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }).catch(() => logError('Problem connecting with database, check mongodb connection string'));

  app.listen(port, () => logSuccess(`Server stared on port: ${port}`));
})();
