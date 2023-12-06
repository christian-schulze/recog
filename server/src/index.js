import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import http from 'http';

import resolvers from './resolvers';
import typeDefs from './schema';
import { db } from './dbSqlite';

const app = express();

const apolloServer = new ApolloServer({
  dataSources: () => ({
    db
  }),
  resolvers,
  typeDefs
});

await apolloServer.start();

apolloServer.applyMiddleware({ app });

const httpServer = http.createServer(app);

if (import.meta.env.PROD) {
  httpServer.listen({ port: 4000 }, () => {
    const { port } = httpServer.address();
    console.log(
      `🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`
    );
    console.log(
      `🚀 Subscriptions ready at ws://localhost:${port}${apolloServer.subscriptionsPath}`
    );
  });
}

export const recogServer = app;
