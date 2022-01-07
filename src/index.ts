/* eslint-disable @typescript-eslint/no-var-requires */
import { createKoaServer } from 'routing-controllers';
import path from 'path';
import 'reflect-metadata';

require('dotenv').config();

const app = createKoaServer({
  cors: true,
  controllers: [path.join(`${__dirname}/**/*.controller.ts`)],
});

app.listen(3001, () => {
  // eslint-disable-next-line no-console
  console.log('Koa started');
});
