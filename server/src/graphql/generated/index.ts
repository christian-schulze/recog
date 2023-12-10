import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';
import { ApolloServer } from '@apollo/server';

import { type ApolloServerFactory } from '../types.ts';
import { resolvers } from './resolvers.ts';

const _dirname = path.dirname(fileURLToPath(import.meta.url));

const typeDefs = readFileSync(
  path.resolve(_dirname, '../src/graphql/generated/schema.graphql'),
  'utf8',
);

export const GeneratedGraphqlFactory: ApolloServerFactory = {
  async create<Context extends {}>() {
    return new ApolloServer<Context>({
      typeDefs,
      resolvers,
      status400ForVariableCoercionErrors: true,
    });
  },
};
