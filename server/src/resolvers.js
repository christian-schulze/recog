import { db } from "./dbSqlite";

const resolvers = {
  Query: {
    getNotebook: (_parent, { id }, _context, _info) => {
      return db.getNotebook(id);
    },
    getNotebooks: (_parent, { userId }, _context, _info) => {
      return db.getAllNotebooks(userId);
    },
    getNote: (_parent, { id }, _context, _info) => {
      return db.getNote(id);
    },
    getNotes: (_parent, _args, _context, _info) => {
      return db.getAllNotes();
    },
  },
  Mutation: {
    addNotebook: async (_parent, { name, userId }, _context, _info) => {
      const notebook = await db.addNotebook(name, userId);
      return notebook;
    },
    saveNotebook: async (_parent, { notebookId, name }, _context, _info) => {
      await db.saveNotebook(notebookId, name);
      return true;
    },
    deleteNotebook: async (_parent, { notebookId }, _context, _info) => {
      await db.deleteNotebook(notebookId);
      return true;
    },
    addNote: async (
      _parent,
      { title, body, tags, notebookId },
      _context,
      _info
    ) => {
      const note = await db.addNote(title, body, tags, notebookId);
      return note;
    },
    saveNote: async (_parent, { noteId, title, body }, _context, _info) => {
      await db.saveNote(noteId, title, body);
      return true;
    },
    deleteNote: async (_parent, { noteId }, _context, _info) => {
      await db.deleteNote(noteId);
      return true;
    },
    addTag: async (_parent, { notebookId, noteId, name }, _context, _info) => {
      await db.addTag(notebookId, noteId, name);
      return true;
    },
    deleteTag: async (
      _parent,
      { notebookId, noteId, name },
      _context,
      _info
    ) => {
      await db.deleteTag(notebookId, noteId, name);
      return true;
    },
  },
  Note: {
    notebook: (parent, _args, _context, _info) => {
      return db.getNotebook(parent.notebookId);
    },
  },
  Notebook: {
    notes: (parent, _args, _context, _info) => {
      return db.getNotesForNotebook(parent.id);
    },
  },
};

export default resolvers;
