import { GeneratedGraphqlFactory } from './generated';
import { TypeGraphqlFactory } from './typeGraphql';

const apolloServerFactoryMap = {
  generated: GeneratedGraphqlFactory,
  'type-graphql': TypeGraphqlFactory,
};

export async function bootstrapApolloServer<Context extends {}>(
  type: keyof typeof apolloServerFactoryMap,
) {
  const factory = apolloServerFactoryMap[type];
  const apolloServer = await factory.create<Context>();

  await apolloServer.start();

  return apolloServer;
}
