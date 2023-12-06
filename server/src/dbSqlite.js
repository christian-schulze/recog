import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { INTEGER, Sequelize, STRING } from 'sequelize';

const _dirname = path.dirname(fileURLToPath(import.meta.url));

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(_dirname, '/db/notes.sqlite')
});

const Notebook = sequelize.define('notebook', {
  name: { type: STRING, allowNull: false },
  userId: { type: STRING, allowNull: false }
});

const Note = sequelize.define('note', {
  title: { type: STRING, allowNull: false },
  body: { type: STRING, allowNull: false }
});

const Tag = sequelize.define('tag', {
  name: { type: STRING, allowNull: false }
});

const NotesTags = sequelize.define(
  'notes_tags',
  {
    noteId: { type: INTEGER },
    tagId: { type: INTEGER }
  },
  {
    freezeTableName: true
  }
);

Notebook.hasMany(Note);
Notebook.hasMany(Tag);
Note.belongsToMany(Tag, {
  through: { model: NotesTags, foreignKey: 'tagId' }
});
Tag.belongsToMany(Note, {
  through: { model: NotesTags, foreignKey: 'noteId' }
});

Notebook.sync();
Note.sync();
Tag.sync();
NotesTags.sync();

export const db = {
  async getAllNotes() {
    const notes = await Note.findAll({
      include: [{ model: Tag }]
    });

    return notes.map((note) => {
      return {
        id: note.id,
        title: note.title,
        body: note.body,
        tags: note.tags.map((tag) => tag.name),
        notebookId: note.notebookId
      };
    });
  },

  async getNotesForNotebook(notebookId) {
    const notes = await Note.findAll({
      where: {
        notebookId
      },
      include: [{ model: Tag }]
    });

    return notes.map((note) => {
      return {
        id: note.id,
        title: note.title,
        body: note.body,
        tags: note.tags.map((tag) => tag.name),
        notebookId: note.notebookId
      };
    });
  },

  async getNote(noteId) {
    const note = await Note.findByPk(noteId, {
      include: [{ model: Tag }]
    });

    return {
      id: note.id,
      title: note.title,
      body: note.body,
      tags: note.tags.map((tag) => tag.name),
      notebookId: note.notebookId
    };
  },

  async addNote(title, body, tagNames, notebookId) {
    return await Note.create(
      {
        title,
        body,
        tags: tagNames.map((name) => ({ name, notebookId })),
        notebookId
      },
      {
        include: [Tag]
      }
    );
  },

  async saveNote(noteId, title, body) {
    const note = await Note.findOne({ where: { id: noteId } });
    if (note) {
      note.title = title;
      note.body = body;
      note.save();
    }
    return true;
  },

  async deleteNote(noteId) {
    await Note.destroy({ where: { id: noteId } });
    return true;
  },

  async getNotebook(notebookId) {
    return await Notebook.findByPk(notebookId);
  },

  async getAllNotebooks(userId) {
    return await Notebook.findAll({ where: { userId } });
  },

  async addNotebook(name, userId) {
    return await Notebook.create({ name, userId });
  },

  async saveNotebook(notebookId, name) {
    const notebook = await Notebook.findOne({ where: { id: notebookId } });
    if (notebook) {
      notebook.name = name;
      notebook.save();
    }
    return true;
  },

  async deleteNotebook(notebookId) {
    await Notebook.destroy({ where: { id: notebookId } });
    return true;
  },

  async addTag(notebookId, noteId, name) {
    const existingTag = await Tag.findOne({ where: { name, notebookId } });
    if (existingTag) {
      await NotesTags.create({ noteId, tagId: existingTag.id });
    } else {
      const newTag = await Tag.create({ name, notebookId });
      await NotesTags.create({ noteId, tagId: newTag.id });
    }
  },

  async deleteTag(notebookId, noteId, name) {
    const tag = await Tag.findOne({ where: { name, notebookId } });
    await NotesTags.destroy({ where: { noteId, tagId: tag.id } });

    // destroy tag if not assigned to any notes
    const notesTags = await NotesTags.findAll({
      where: { tagId: tag.id }
    });
    if (notesTags.length === 0) {
      tag.destroy();
    }
  }
};
