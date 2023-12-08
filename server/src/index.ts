import express from 'express';
import http from 'http';
import { AddressInfo } from 'net';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

import { schema } from './graphql/schema';
import { db } from './dbSqlite';

const app = express();

const apolloServer = new ApolloServer({
  schema,
  status400ForVariableCoercionErrors: true,
});

await apolloServer.start();

app.use(
  '/graphql',
  cors<cors.CorsRequest>(),
  express.json(),
  expressMiddleware(apolloServer, {
    context: async () => ({ db }),
  }),
);

const httpServer = http.createServer(app);

if (import.meta.env.PROD) {
  httpServer.listen({ port: 4000 }, () => {
    const { port } = httpServer.address() as AddressInfo;
    console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
    console.log(`🚀 Subscriptions ready at ws://localhost:${port}/graphql`);
  });
}

export const recogServer = app;
