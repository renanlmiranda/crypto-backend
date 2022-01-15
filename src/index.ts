/* eslint-disable @typescript-eslint/no-var-requires */
import { createKoaServer } from 'routing-controllers';
import path from 'path';
import 'reflect-metadata';
import authorizedMiddleware from './middleware/authorized.middleware';
import currentUserMiddleware from './middleware/currentUser.middleware';
import { envs } from './config/envs';

const app = createKoaServer({
  cors: true,
  defaultErrorHandler: true,
  middlewares: [path.join(`${__dirname}/src/middleware/*.ts`)],
  controllers: [path.join(`${__dirname}/**/*.controller.ts`)],
  authorizationChecker: authorizedMiddleware,
  currentUserChecker: currentUserMiddleware,
});

app.listen(envs.port, () => {
  // eslint-disable-next-line no-console
  console.log('Koa started');
});
