import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ApolloServer } from '@apollo/server';
import { buildSchema } from 'type-graphql';

import { NotebookResolver, NoteResolver, Resolvers } from './resolvers.ts';

const _dirname = path.dirname(fileURLToPath(import.meta.url));

export async function bootstrapApolloServer<Context extends {}>() {
  const schema = await buildSchema({
    resolvers: [NotebookResolver, NoteResolver, Resolvers],
    emitSchemaFile: path.resolve(_dirname, 'schema.graphql'),
  });

  const apolloServer = new ApolloServer<Context>({
    schema,
    status400ForVariableCoercionErrors: true,
  });

  await apolloServer.start();

  return apolloServer;
}
