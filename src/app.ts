import express, { Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connect } from 'mongoose';
import { config } from 'dotenv';
import { AuthRouter, ProfileRouter, SmsRouter, TeamRouter } from './routes';
import { errorMiddleware, notFoundMiddlware } from './middlewares/handlers';

import SwaggerUI from 'swagger-ui-express';
import SwaggerJSON from './swagger.json';
import { JWT } from './middlewares/jwt';
import { UserI } from './types/User';
// import { createUsers } from './seed/user';

config();

declare namespace Express {
  export interface Request {
    user: UserI;
  }
}

(async () => {
  const app = express();

  app.set('trust proxy', true);
  app.use(cookieParser());

  if (process.env.NODE_ENV == 'production') {
    app.use(morgan('combined', {}));
  } else {
    app.use(morgan('dev'));
  }

  app.use(express.json());
  app.disable('etag');
  app.use(cors());

  // await EmailService.sendMail('saba@harukaze.dev', 'haru');

  const port = process.env.PORT || 5000;
  app.use(JWT.verifyToken);

  app.get('/', (_: Request, res: Response) => res.status(200).send('hello young skywalker'));

  // Public Routes
  app.use('/sms/v1', SmsRouter);
  app.use('/auth/v1', AuthRouter);
  app.use('/api-docs', SwaggerUI.serve, SwaggerUI.setup(SwaggerJSON, {}));

  // Protected Routes
  app.use('/profile/v1', JWT.checkAuth, ProfileRouter);
  app.use('/team/v1', JWT.checkAuth, TeamRouter);

  app.use(notFoundMiddlware);
  app.use(errorMiddleware);

  await connect(process.env.MONGO || '', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }).catch(() => console.error('Problem connecting with database, check mongodb connection string'));

  // seeder to create users
  // createUsers();

  app.listen(port, () => console.info(`Server stared on port: ${port}`));
})();
