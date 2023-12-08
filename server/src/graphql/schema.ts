import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildSchema } from 'type-graphql';

import { NotebookResolver, NoteResolver, Resolvers } from './resolvers.ts';

const _dirname = path.dirname(fileURLToPath(import.meta.url));

export const schema = await buildSchema({
  resolvers: [NotebookResolver, NoteResolver, Resolvers],
  emitSchemaFile: path.resolve(_dirname, "schema.graphql"),
});
