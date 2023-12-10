import 'reflect-metadata';
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  ID,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
} from 'type-graphql';

import { type Context } from '../data';

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
  async getNotebook(@Arg('id', (_) => ID) id: number, @Ctx() ctx: Context) {
    const notebook = await ctx.db.getNotebook(id);
    return notebook?.dataValues;
  }

  @Query((_) => [Notebook])
  async getNotebooks(@Arg('userId') userId: string, @Ctx() ctx: Context) {
    const notebooks = await ctx.db.getAllNotebooks(userId);
    return notebooks?.map((notebook) => notebook.dataValues);
  }

  @Query((_) => Note)
  async getNote(@Arg('id', (_) => ID) id: number, @Ctx() ctx: Context) {
    const note = await ctx.db.getNote(id);
    if (note) {
      return {
        ...note?.dataValues,
        tags: note.tags?.map((tag) => tag.dataValues),
      };
    }
  }

  @Query((_) => [Note])
  async getNotes(@Ctx() ctx: Context) {
    const notes = await ctx.db.getAllNotes();
    return notes.map((note) => {
      return {
        ...note.dataValues,
        tags: note.tags?.map((tag) => tag.dataValues),
      };
    });
  }

  @Mutation((_) => Notebook)
  async addNotebook(
    @Arg('name') name: string,
    @Arg('userId') userId: string,
    @Ctx() ctx: Context,
  ) {
    const notebook = await ctx.db.addNotebook(name, userId);
    return notebook.dataValues;
  }

  @Mutation((_return) => Boolean)
  async saveNotebook(
    @Arg('notebookId', (_) => ID) notebookId: number,
    @Arg('name') name: string,
    @Ctx() ctx: Context,
  ) {
    return await ctx.db.saveNotebook(notebookId, name);
  }

  @Mutation((_return) => Boolean)
  async deleteNotebook(
    @Arg('notebookId', (_) => ID) notebookId: number,
    @Ctx() ctx: Context,
  ) {
    return await ctx.db.deleteNotebook(notebookId);
  }

  @Mutation((_) => Note)
  async addNote(
    @Arg('title') title: string,
    @Arg('body') body: string,
    @Arg('tagNames', (_) => [String]) tagNames: Array<string>,
    @Arg('notebookId', (_) => ID) notebookId: number,
    @Ctx() ctx: Context,
  ) {
    const note = await ctx.db.addNote(title, body, tagNames, notebookId);
    return note.dataValues;
  }

  @Mutation((_) => Boolean)
  async saveNote(
    @Arg('noteId', (_) => ID) noteId: number,
    @Arg('title') title: string,
    @Arg('body') body: string,
    @Ctx() ctx: Context,
  ) {
    return await ctx.db.saveNote(noteId, title, body);
  }

  @Mutation((_) => Boolean)
  async deleteNote(
    @Arg('noteId', (_) => ID) noteId: number,
    @Ctx() ctx: Context,
  ) {
    return await ctx.db.deleteNote(noteId);
  }

  @Mutation((_) => NotesTags)
  async addTag(
    @Arg('notebookId', (_) => ID) notebookId: number,
    @Arg('noteId', (_) => ID) noteId: number,
    @Arg('name') name: string,
    @Ctx() ctx: Context,
  ) {
    const notesTags = await ctx.db.addTag(notebookId, noteId, name);
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
    @Ctx() ctx: Context,
  ) {
    return await ctx.db.deleteTag(notebookId, noteId, name);
  }
}

@Resolver((_) => Notebook)
export class NotebookResolver {
  @FieldResolver((_) => [Note])
  async notes(@Root() parent: Notebook, @Ctx() ctx: Context) {
    const notes = await ctx.db.getNotesForNotebook(parent.id);
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
  async notebook(@Root() parent: Note, @Ctx() ctx: Context) {
    const notebook = await ctx.db.getNotebook(parent.notebook.id);
    return notebook?.dataValues;
  }
}
