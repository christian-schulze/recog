import { ApolloServer } from '@apollo/server';

export interface ApolloServerFactory<> {
  create: <Context extends {}>() => Promise<ApolloServer<Context>>;
}
