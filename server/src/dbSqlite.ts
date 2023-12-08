import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Sequelize,
  Table,
} from 'sequelize-typescript';

const _dirname = path.dirname(fileURLToPath(import.meta.url));

@Table({ tableName: 'notebooks' })
class Notebook extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare userId: string;

  @HasMany(() => Note)
  declare notes?: Array<Note>;
}

@Table({ tableName: 'notes' })
class Note extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  declare title: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare body: string;

  @ForeignKey(() => Notebook)
  @Column({ type: DataType.INTEGER })
  declare notebookId: number;

  @BelongsTo(() => Notebook)
  declare notebook?: Notebook;

  @BelongsToMany(() => Tag, () => NotesTags)
  declare tags?: Array<Tag>;
}

@Table({ tableName: 'tags' })
class Tag extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @ForeignKey(() => Notebook)
  @Column({ type: DataType.INTEGER })
  declare notebookId: number;

  @BelongsToMany(() => Note, () => NotesTags)
  declare notes?: Array<Note>;
}

@Table({ tableName: 'notes_tags' })
class NotesTags extends Model {
  @ForeignKey(() => Note)
  @Column({ type: DataType.INTEGER })
  declare noteId: number;

  @ForeignKey(() => Tag)
  @Column({ type: DataType.INTEGER })
  declare tagId: number;
}

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(_dirname, '../db/notes.sqlite'),
  models: [Notebook, Note, Tag, NotesTags],
});

export const db = {
  async getAllNotes() {
    return await Note.findAll({
      include: Tag,
    });
  },

  async getNotesForNotebook(notebookId: number) {
    return await Note.findAll({
      where: {
        notebookId,
      },
      include: [{ model: Tag }],
    });
  },

  async getNote(noteId: number) {
    return await Note.findByPk(noteId, {
      include: [{ model: Tag }],
    });
  },

  async addNote(
    title: string,
    body: string,
    tagNames: Array<string>,
    notebookId: number,
  ) {
    return await Note.create(
      {
        title,
        body,
        tags: tagNames.map((name) => ({ name, notebookId })),
        notebookId,
      },
      {
        include: Tag,
      },
    );
  },

  async saveNote(noteId: number, title: string, body: string) {
    const note = await Note.findOne({ where: { id: noteId } });
    if (note) {
      note.title = title;
      note.body = body;
      await note.save();
    }
    return true;
  },

  async deleteNote(noteId: number) {
    await Note.destroy({ where: { id: noteId } });
    return true;
  },

  async getNotebook(notebookId: number) {
    return await Notebook.findByPk(notebookId);
  },

  async getAllNotebooks(userId: string) {
    return await Notebook.findAll({ where: { userId } });
  },

  async addNotebook(name: string, userId: string) {
    return await Notebook.create({ name, userId });
  },

  async saveNotebook(id: number, name: string) {
    const notebook = await Notebook.findOne({ where: { id } });
    if (notebook) {
      notebook.name = name;
      await notebook.save();
    }
    return true;
  },

  async deleteNotebook(id: number) {
    await Notebook.destroy({ where: { id } });
    return true;
  },

  async addTag(notebookId: number, noteId: number, name: string) {
    const existingTag = await Tag.findOne({ where: { name, notebookId } });

    if (existingTag) {
      return await NotesTags.create({ noteId, tagId: existingTag.id });
    } else {
      const newTag = await Tag.create({ name, notebookId });
      return await NotesTags.create({ noteId, tagId: newTag.id });
    }
  },

  async deleteTag(notebookId: number, noteId: number, name: string) {
    const tag = await Tag.findOne({ where: { name, notebookId } });

    if (tag) {
      await NotesTags.destroy({ where: { noteId, tagId: tag.id } });

      // destroy tag if not assigned to any notes
      const notesTags = await NotesTags.findAll({
        where: { tagId: tag.id },
      });
      if (notesTags.length === 0) {
        await tag.destroy();
      }
    }

    return true;
  },
};
