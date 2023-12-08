import 'reflect-metadata';
import {
  Arg,
  Field,
  FieldResolver,
  ID,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import { db } from '../dbSqlite.ts';

@ObjectType()
class Notebook {
  @Field((_) => ID)
  id!: number;
  @Field()
  name!: string;
  @Field((_) => [Note])
  notes!: Note[];
  @Field()
  userId!: string;
}

@ObjectType()
class Note {
  @Field((_) => ID)
  id!: number;
  @Field()
  title!: string;
  @Field()
  body!: string;
  @Field((_) => [Tag])
  tags!: Tag[];
  @Field()
  notebook!: Notebook;
}

@ObjectType()
class Tag {
  @Field((_) => ID)
  id!: number;
  @Field()
  name!: string;
  @Field()
  notebook!: Notebook;
}

@ObjectType()
class NotesTags {
  @Field((_) => ID)
  noteId!: number;
  @Field((_) => ID)
  tagId!: number;
}

@Resolver()
export class Resolvers {
  constructor() {}

  @Query((_) => Notebook)
  async getNotebook(@Arg('id', (_) => ID) id: number) {
    const notebook = await db.getNotebook(id);
    return notebook?.dataValues;
  }

  @Query((_) => [Notebook])
  async getNotebooks(@Arg('userId') userId: string) {
    const notebooks = await db.getAllNotebooks(userId);
    return notebooks?.map((notebook) => notebook.dataValues);
  }

  @Query((_) => Note)
  async getNote(@Arg('id', (_) => ID) id: number) {
    const note = await db.getNote(id);
    if (note) {
      return {
        ...note?.dataValues,
        tags: note.tags?.map((tag) => tag.dataValues),
      };
    }
  }

  @Query((_) => [Note])
  async getNotes() {
    const notes = await db.getAllNotes();
    return notes.map((note) => {
      return {
        ...note.dataValues,
        tags: note.tags?.map((tag) => tag.dataValues),
      };
    });
  }

  @Mutation((_) => Notebook)
  async addNotebook(@Arg('name') name: string, @Arg('userId') userId: string) {
    const notebook = await db.addNotebook(name, userId);
    return notebook.dataValues;
  }

  @Mutation((_return) => Boolean)
  async saveNotebook(
    @Arg('notebookId', (_) => ID) notebookId: number,
    @Arg('name') name: string,
  ) {
    return await db.saveNotebook(notebookId, name);
  }

  @Mutation((_return) => Boolean)
  async deleteNotebook(@Arg('notebookId', (_) => ID) notebookId: number) {
    return await db.deleteNotebook(notebookId);
  }

  @Mutation((_) => Note)
  async addNote(
    @Arg('title') title: string,
    @Arg('body') body: string,
    @Arg('tagNames', (_) => [String]) tagNames: Array<string>,
    @Arg('notebookId', (_) => ID) notebookId: number,
  ) {
    const note = await db.addNote(title, body, tagNames, notebookId);
    return note.dataValues;
  }

  @Mutation((_) => Boolean)
  async saveNote(
    @Arg('noteId', (_) => ID) noteId: number,
    @Arg('title') title: string,
    @Arg('body') body: string,
  ) {
    return await db.saveNote(noteId, title, body);
  }

  @Mutation((_) => Boolean)
  async deleteNote(@Arg('noteId', (_) => ID) noteId: number) {
    return await db.deleteNote(noteId);
  }

  @Mutation((_) => NotesTags)
  async addTag(
    @Arg('notebookId', (_) => ID) notebookId: number,
    @Arg('noteId', (_) => ID) noteId: number,
    @Arg('name') name: string,
  ) {
    const notesTags = await db.addTag(notebookId, noteId, name);
    return {
      noteId: notesTags.noteId,
      tagId: notesTags.tagId,
    };
  }

  @Mutation((_) => Boolean)
  async deleteTag(
    @Arg('notebookId', (_) => ID) notebookId: number,
    @Arg('noteId', (_) => ID) noteId: number,
    @Arg('name') name: string,
  ) {
    return await db.deleteTag(notebookId, noteId, name);
  }
}

@Resolver((_) => Notebook)
export class NotebookResolver {
  @FieldResolver((_) => [Note])
  async notes(@Root() parent: Notebook) {
    const notes = await db.getNotesForNotebook(parent.id);
    return notes.map((note) => {
      return {
        ...note.dataValues,
        tags: note.tags?.map((tag) => tag.dataValues),
      };
    });
  }
}

@Resolver((_) => Note)
export class NoteResolver {
  @FieldResolver((_) => Notebook)
  async notebook(@Root() parent: Note) {
    const notebook = await db.getNotebook(parent.notebook.id);
    return notebook?.dataValues;
  }
}
