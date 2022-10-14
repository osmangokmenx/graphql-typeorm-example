import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import * as Express from 'express';

const main = async () => {
  const app = Express();
  app.get('/', (req: Express.Request, res: Express.Response) => {
    return res.send('Hello World');
  });
  app.listen(3003, () => {
    console.log('Server started on http://localhost:3003');
  });
};
main();
