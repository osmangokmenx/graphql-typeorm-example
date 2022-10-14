import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import * as Express from 'express';
import { buildSchema } from 'type-graphql';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core/dist/plugin/landingPage/graphqlPlayground';
import { UserResolver } from './resolver/user';
import { db } from './data-source';

const main = async () => {
  db.initialize()
    .then(() => {
      console.log('Data Source has been initialized!');
    })
    .catch((err) => {
      console.log(`Error during Data Source initialization: ${err}`);
    });
  // build TypeGraphQL executable schema
  const schema = await buildSchema({
    resolvers: [UserResolver],
  });
  const apolloServer = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
  });

  const app = Express();
  apolloServer.start().then(() => {
    apolloServer.applyMiddleware({
      app: app,
      path: '/graphql',
      cors: false,
    });
  });
  app.listen(3003, () => {
    console.log('Server started on http://localhost:3003');
  });
};
main();
