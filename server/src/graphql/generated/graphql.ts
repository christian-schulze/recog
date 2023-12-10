/* eslint-disable */
import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Mutation = {
  __typename?: 'Mutation';
  addNote: Note;
  addNotebook: Notebook;
  addTag: NotesTags;
  deleteNote: Scalars['Boolean']['output'];
  deleteNotebook: Scalars['Boolean']['output'];
  deleteTag: Scalars['Boolean']['output'];
  saveNote: Scalars['Boolean']['output'];
  saveNotebook: Scalars['Boolean']['output'];
};

export type MutationAddNoteArgs = {
  body: Scalars['String']['input'];
  notebookId: Scalars['ID']['input'];
  tagNames: Array<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type MutationAddNotebookArgs = {
  name: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type MutationAddTagArgs = {
  name: Scalars['String']['input'];
  noteId: Scalars['ID']['input'];
  notebookId: Scalars['ID']['input'];
};

export type MutationDeleteNoteArgs = {
  noteId: Scalars['ID']['input'];
};

export type MutationDeleteNotebookArgs = {
  notebookId: Scalars['ID']['input'];
};

export type MutationDeleteTagArgs = {
  name: Scalars['String']['input'];
  noteId: Scalars['ID']['input'];
  notebookId: Scalars['ID']['input'];
};

export type MutationSaveNoteArgs = {
  body: Scalars['String']['input'];
  noteId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};

export type MutationSaveNotebookArgs = {
  name: Scalars['String']['input'];
  notebookId: Scalars['ID']['input'];
};

export type Note = {
  __typename?: 'Note';
  body: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  notebook: Notebook;
  tags: Array<Tag>;
  title: Scalars['String']['output'];
};

export type Notebook = {
  __typename?: 'Notebook';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  notes: Array<Note>;
  userId: Scalars['String']['output'];
};

export type NotesTags = {
  __typename?: 'NotesTags';
  noteId: Scalars['ID']['output'];
  tagId: Scalars['ID']['output'];
};

export type Query = {
  __typename?: 'Query';
  getNote: Note;
  getNotebook: Notebook;
  getNotebooks: Array<Notebook>;
  getNotes: Array<Note>;
};

export type QueryGetNoteArgs = {
  id: Scalars['ID']['input'];
};

export type QueryGetNotebookArgs = {
  id: Scalars['ID']['input'];
};

export type QueryGetNotebooksArgs = {
  userId: Scalars['String']['input'];
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  notebook: Notebook;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {},
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Note: ResolverTypeWrapper<Note>;
  Notebook: ResolverTypeWrapper<Notebook>;
  NotesTags: ResolverTypeWrapper<NotesTags>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Tag: ResolverTypeWrapper<Tag>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  ID: Scalars['ID']['output'];
  Mutation: {};
  Note: Note;
  Notebook: Notebook;
  NotesTags: NotesTags;
  Query: {};
  String: Scalars['String']['output'];
  Tag: Tag;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation'],
> = {
  addNote?: Resolver<
    ResolversTypes['Note'],
    ParentType,
    ContextType,
    RequireFields<
      MutationAddNoteArgs,
      'body' | 'notebookId' | 'tagNames' | 'title'
    >
  >;
  addNotebook?: Resolver<
    ResolversTypes['Notebook'],
    ParentType,
    ContextType,
    RequireFields<MutationAddNotebookArgs, 'name' | 'userId'>
  >;
  addTag?: Resolver<
    ResolversTypes['NotesTags'],
    ParentType,
    ContextType,
    RequireFields<MutationAddTagArgs, 'name' | 'noteId' | 'notebookId'>
  >;
  deleteNote?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteNoteArgs, 'noteId'>
  >;
  deleteNotebook?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteNotebookArgs, 'notebookId'>
  >;
  deleteTag?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteTagArgs, 'name' | 'noteId' | 'notebookId'>
  >;
  saveNote?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationSaveNoteArgs, 'body' | 'noteId' | 'title'>
  >;
  saveNotebook?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationSaveNotebookArgs, 'name' | 'notebookId'>
  >;
};

export type NoteResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Note'] = ResolversParentTypes['Note'],
> = {
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  notebook?: Resolver<ResolversTypes['Notebook'], ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NotebookResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Notebook'] = ResolversParentTypes['Notebook'],
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  notes?: Resolver<Array<ResolversTypes['Note']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NotesTagsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['NotesTags'] = ResolversParentTypes['NotesTags'],
> = {
  noteId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  tagId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = {
  getNote?: Resolver<
    ResolversTypes['Note'],
    ParentType,
    ContextType,
    RequireFields<QueryGetNoteArgs, 'id'>
  >;
  getNotebook?: Resolver<
    ResolversTypes['Notebook'],
    ParentType,
    ContextType,
    RequireFields<QueryGetNotebookArgs, 'id'>
  >;
  getNotebooks?: Resolver<
    Array<ResolversTypes['Notebook']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetNotebooksArgs, 'userId'>
  >;
  getNotes?: Resolver<Array<ResolversTypes['Note']>, ParentType, ContextType>;
};

export type TagResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Tag'] = ResolversParentTypes['Tag'],
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  notebook?: Resolver<ResolversTypes['Notebook'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Mutation?: MutationResolvers<ContextType>;
  Note?: NoteResolvers<ContextType>;
  Notebook?: NotebookResolvers<ContextType>;
  NotesTags?: NotesTagsResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Tag?: TagResolvers<ContextType>;
};
