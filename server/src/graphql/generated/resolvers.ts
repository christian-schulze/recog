import { type Resolvers } from './graphql.ts';
import { Context } from '../../data';

export const resolvers: Resolvers<Context> = {
  Query: {
    getNotebook: async (_parent, { id }, context) => {
      const notebook = await context.db.getNotebook(parseInt(id));
      return notebook?.dataValues;
    },
    getNotebooks: async (_parent, { userId }, context) => {
      const notebooks = await context.db.getAllNotebooks(userId);
      return notebooks?.map((notebook) => notebook.dataValues);
    },

    getNote: async (_parent, { id }, context) => {
      const note = await context.db.getNote(parseInt(id));
      if (note) {
        return {
          ...note?.dataValues,
          tags: note.tags?.map((tag) => tag.dataValues),
        };
      }
    },
    getNotes: async (_parent, _args, context) => {
      const notes = await context.db.getAllNotes();
      return notes.map((note) => {
        return {
          ...note.dataValues,
          tags: note.tags?.map((tag) => tag.dataValues),
        };
      });
    },
  },

  Mutation: {
    addNotebook: async (_parent, { name, userId }, context) => {
      const notebook = await context.db.addNotebook(name, userId);
      return notebook.dataValues;
    },
    saveNotebook: async (_parent, { notebookId, name }, context) => {
      return await context.db.saveNotebook(parseInt(notebookId), name);
    },
    deleteNotebook: async (_parent, { notebookId }, context) => {
      return await context.db.deleteNotebook(parseInt(notebookId));
    },

    addNote: async (
      _parent,
      { title, body, tagNames, notebookId },
      context,
    ) => {
      const note = await context.db.addNote(
        title,
        body,
        tagNames,
        parseInt(notebookId),
      );
      return note.dataValues;
    },
    saveNote: async (_parent, { noteId, title, body }, context) => {
      return await context.db.saveNote(parseInt(noteId), title, body);
    },
    deleteNote: async (_parent, { noteId }, context) => {
      return await context.db.deleteNote(parseInt(noteId));
    },

    addTag: async (_parent, { notebookId, noteId, name }, context) => {
      const notesTags = await context.db.addTag(
        parseInt(notebookId),
        parseInt(noteId),
        name,
      );
      return {
        noteId: notesTags.noteId.toString(),
        tagId: notesTags.tagId.toString(),
      };
    },
    deleteTag: async (_parent, { notebookId, noteId, name }, context) => {
      return await context.db.deleteTag(
        parseInt(notebookId),
        parseInt(noteId),
        name,
      );
    },
  },

  Notebook: {
    notes: async (parent, _args, context) => {
      const notes = await context.db.getNotesForNotebook(parseInt(parent.id));
      return notes.map((note) => {
        return {
          ...note.dataValues,
          tags: note.tags?.map((tag) => tag.dataValues),
        };
      });
    },
  },

  Note: {
    notebook: async (parent, _args, context) => {
      const notebook = await context.db.getNotebook(
        parseInt(parent.notebook.id),
      );
      return notebook?.dataValues;
    },
  },
};
