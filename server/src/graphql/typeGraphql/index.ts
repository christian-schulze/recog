import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ApolloServer } from '@apollo/server';

import { type ApolloServerFactory } from '../types.ts';
import { buildGraphqlSchema } from './resolvers.ts';

const _dirname = path.dirname(fileURLToPath(import.meta.url));

/*
 * NOTE
 *
 * At the date of implementation (2023-12-11), the `type-graphql` library depends
 * on an older version of `graphql`: ^15.3.0, whereas the latest version is 16.8.1.
 * You will likely need to downgrade the graphql version in package,json, otherwise
 * you will see an error like the following during build:
 *
 * │[1] UnmetGraphQLPeerDependencyError: Looks like you use an incorrect version of the 'graphql' package: "16.8.1". Please ensure that you have installed a ver
 * │sion that meets TypeGraphQL's requirement: "^15.3.0".
 *
 */

export const TypeGraphqlFactory: ApolloServerFactory = {
  async create<Context extends {}>() {
    const schema = await buildGraphqlSchema(
      path.resolve(_dirname, 'schema.graphql'),
    );

    return new ApolloServer<Context>({
      schema,
      status400ForVariableCoercionErrors: true,
    });
  },
};
