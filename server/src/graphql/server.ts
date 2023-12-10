import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';
import { ApolloServer } from '@apollo/server';

// import { buildGraphqlSchema } from './typeGraphql/resolvers.ts';
import { resolvers } from './generated/resolvers.ts';

const _dirname = path.dirname(fileURLToPath(import.meta.url));

const typeDefs = readFileSync(
  path.resolve(_dirname, '../src/graphql/generated/schema.graphql'),
  'utf8',
);

export async function bootstrapApolloServer<Context extends {}>() {
  // const schema = await buildGraphqlSchema(path.resolve(_dirname, 'schema.graphql'));
  //
  // const apolloServer = new ApolloServer<Context>({
  //   schema,
  //   status400ForVariableCoercionErrors: true,
  // });

  const apolloServer = new ApolloServer<Context>({
    typeDefs,
    resolvers,
    status400ForVariableCoercionErrors: true,
  });

  await apolloServer.start();

  return apolloServer;
}
