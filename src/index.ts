import 'reflect-metadata';
import * as Express from 'express';

import { db } from './data-source';

const main = async () => {
  db.initialize()
    .then(() => {
      console.log('Data Source has been initialized!');
    })
    .catch((err) => {
      console.log(`Error during Data Source initialization: ${err}`);
    });

  const app = Express();
  app.get('/', (req: Express.Request, res: Express.Response) => {
    return res.send('Hello World');
  });
  app.listen(3003, () => {
    console.log('Server started on http://localhost:3003');
  });
};
main();
