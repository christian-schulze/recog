import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './src/graphql/generated/schema.graphql',
  generates: {
    './src/graphql/generated': {
      preset: 'graphql-modules',
      presetConfig: {
        baseTypesPath: './graphql.ts',
        useGraphQLModules: false,
      },
      plugins: [
        {
          add: {
            content: '/* eslint-disable */',
          },
        },
        'typescript',
        'typescript-resolvers',
      ],
    },
  },
};
export default config;
