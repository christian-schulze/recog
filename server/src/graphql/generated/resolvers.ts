import { GraphQLError } from 'graphql/error';

import { type Resolvers } from './__generated__/graphql.ts';
import { type Context } from '../../data';

export const resolvers: Resolvers<Context> = {
  Query: {
    getNotebook: async (_parent, { id }, context) => {
      const notebook = await context.db.getNotebook(id);
      if (!notebook) {
        throw new GraphQLError(`Notebook with id "${id}" not found`, {
          extensions: {
            code: 'NOTBOOK_NOT_FOUND',
          },
        });
      }
      return notebook;
    },
    getNotebooks: async (_parent, { userId }, context) => {
      return await context.db.getAllNotebooks(userId);
    },

    getNote: async (_parent, { id }, context) => {
      const note = await context.db.getNote(id);
      if (!note) {
        throw new GraphQLError(`Note with id "${id}" not found`, {
          extensions: {
            code: 'NOTE_NOT_FOUND',
          },
        });
      }
      return note;
    },
    getNotes: async (_parent, _args, context) => {
      console.log('getNotes(): BEGIN');
      const notes = await context.db.getAllNotes();
      console.log('getNotes', notes);
      return notes;
    },
  },

  Mutation: {
    addNotebook: async (_parent, { name, userId }, context) => {
      return await context.db.addNotebook(name, userId);
    },
    saveNotebook: async (_parent, { notebookId, name }, context) => {
      return await context.db.saveNotebook(notebookId, name);
    },
    deleteNotebook: async (_parent, { notebookId }, context) => {
      return await context.db.deleteNotebook(notebookId);
    },

    addNote: async (
      _parent,
      { title, body, tagNames, notebookId },
      context,
    ) => {
      return await context.db.addNote(title, body, tagNames, notebookId);
    },
    saveNote: async (_parent, { noteId, title, body }, context) => {
      return await context.db.saveNote(noteId, title, body);
    },
    deleteNote: async (_parent, { noteId }, context) => {
      return await context.db.deleteNote(noteId);
    },

    addTag: async (_parent, { notebookId, noteId, name }, context) => {
      const notesTags = await context.db.addTag(notebookId, noteId, name);
      return {
        noteId: notesTags.noteId,
        tagId: notesTags.tagId,
      };
    },
    deleteTag: async (_parent, { notebookId, noteId, name }, context) => {
      return await context.db.deleteTag(notebookId, noteId, name);
    },
  },

  Notebook: {
    notes: async (parent, _args, context) => {
      if (!parent.id) {
        throw new GraphQLError(`Parent Notebook has no id set`, {
          extensions: {
            code: 'ID_NOT_SET',
          },
        });
      }
      return await context.db.getNotesForNotebook(parent.id);
    },
  },

  Note: {
    notebook: async (parent, _args, context) => {
      if (!parent.notebook?.id) {
        throw new GraphQLError(`Parent Note has notebookId set`, {
          extensions: {
            code: 'ID_NOT_SET',
          },
        });
      }
      const notebook = await context.db.getNotebook(parent.notebook.id);
      if (!notebook) {
        throw new GraphQLError(
          `Notebook with id "${parent.notebook?.id}" not found`,
          {
            extensions: {
              code: 'NOTBOOK_NOT_FOUND',
            },
          },
        );
      }
      return notebook;
    },
  },
};
