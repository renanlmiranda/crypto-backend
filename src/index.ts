import { createKoaServer } from 'routing-controllers';
import path from 'path';
import 'reflect-metadata';

const app = createKoaServer({
  cors: true,
  controllers: [path.join(`${__dirname}/**/*.controller.ts`)],
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Koa started');
});