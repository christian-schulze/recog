/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
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

export type GetNoteQueryVariables = Exact<{
  noteId: Scalars['ID']['input'];
}>;

export type GetNoteQuery = {
  __typename?: 'Query';
  getNote: {
    __typename?: 'Note';
    id: string;
    title: string;
    body: string;
    tags: Array<{ __typename?: 'Tag'; id: string; name: string }>;
  };
};

export type AddTagMutationVariables = Exact<{
  notebookId: Scalars['ID']['input'];
  noteId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
}>;

export type AddTagMutation = {
  __typename?: 'Mutation';
  addTag: { __typename?: 'NotesTags'; noteId: string; tagId: string };
};

export type DeleteTagMutationVariables = Exact<{
  notebookId: Scalars['ID']['input'];
  noteId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
}>;

export type DeleteTagMutation = { __typename?: 'Mutation'; deleteTag: boolean };

export type SaveNoteMutationVariables = Exact<{
  noteId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
  body: Scalars['String']['input'];
}>;

export type SaveNoteMutation = { __typename?: 'Mutation'; saveNote: boolean };

export type GetNotebooksQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;

export type GetNotebooksQuery = {
  __typename?: 'Query';
  getNotebooks: Array<{
    __typename?: 'Notebook';
    id: string;
    name: string;
    userId: string;
  }>;
};

export type AddNotebookMutationVariables = Exact<{
  name: Scalars['String']['input'];
  userId: Scalars['String']['input'];
}>;

export type AddNotebookMutation = {
  __typename?: 'Mutation';
  addNotebook: {
    __typename?: 'Notebook';
    id: string;
    name: string;
    userId: string;
  };
};

export type DeleteNotebookMutationVariables = Exact<{
  notebookId: Scalars['ID']['input'];
}>;

export type DeleteNotebookMutation = {
  __typename?: 'Mutation';
  deleteNotebook: boolean;
};

export type SaveNotebookMutationVariables = Exact<{
  notebookId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
}>;

export type SaveNotebookMutation = {
  __typename?: 'Mutation';
  saveNotebook: boolean;
};

export type GetNotebookQueryVariables = Exact<{
  notebookId: Scalars['ID']['input'];
}>;

export type GetNotebookQuery = {
  __typename?: 'Query';
  getNotebook: {
    __typename?: 'Notebook';
    id: string;
    name: string;
    notes: Array<{
      __typename?: 'Note';
      id: string;
      title: string;
      body: string;
      tags: Array<{ __typename?: 'Tag'; id: string; name: string }>;
    }>;
  };
};

export type AddNoteMutationVariables = Exact<{
  title: Scalars['String']['input'];
  notebookId: Scalars['ID']['input'];
}>;

export type AddNoteMutation = {
  __typename?: 'Mutation';
  addNote: { __typename?: 'Note'; id: string; title: string; body: string };
};

export type DeleteNoteMutationVariables = Exact<{
  noteId: Scalars['ID']['input'];
}>;

export type DeleteNoteMutation = {
  __typename?: 'Mutation';
  deleteNote: boolean;
};

export const GetNoteDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetNote' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'noteId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getNote' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'noteId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'body' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'tags' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetNoteQuery, GetNoteQueryVariables>;
export const AddTagDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AddTag' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'notebookId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'noteId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'addTag' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'notebookId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'notebookId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'noteId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'noteId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'name' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'name' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'noteId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'tagId' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AddTagMutation, AddTagMutationVariables>;
export const DeleteTagDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteTag' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'notebookId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'noteId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteTag' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'notebookId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'notebookId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'noteId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'noteId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'name' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'name' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteTagMutation, DeleteTagMutationVariables>;
export const SaveNoteDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SaveNote' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'noteId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'title' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'body' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'saveNote' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'noteId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'noteId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'title' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'title' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'body' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'body' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SaveNoteMutation, SaveNoteMutationVariables>;
export const GetNotebooksDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetNotebooks' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'userId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getNotebooks' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'userId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'userId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'userId' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetNotebooksQuery, GetNotebooksQueryVariables>;
export const AddNotebookDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AddNotebook' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'userId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'addNotebook' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'name' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'name' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'userId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'userId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'userId' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AddNotebookMutation, AddNotebookMutationVariables>;
export const DeleteNotebookDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteNotebook' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'notebookId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteNotebook' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'notebookId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'notebookId' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteNotebookMutation,
  DeleteNotebookMutationVariables
>;
export const SaveNotebookDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SaveNotebook' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'notebookId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'saveNotebook' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'notebookId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'notebookId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'name' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'name' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SaveNotebookMutation,
  SaveNotebookMutationVariables
>;
export const GetNotebookDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetNotebook' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'notebookId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getNotebook' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'notebookId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'notes' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'body' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'tags' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetNotebookQuery, GetNotebookQueryVariables>;
export const AddNoteDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AddNote' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'title' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'notebookId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'addNote' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'title' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'title' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'body' },
                value: { kind: 'StringValue', value: '', block: false },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'tagNames' },
                value: { kind: 'ListValue', values: [] },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'notebookId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'notebookId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'body' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AddNoteMutation, AddNoteMutationVariables>;
export const DeleteNoteDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteNote' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'noteId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteNote' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'noteId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'noteId' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteNoteMutation, DeleteNoteMutationVariables>;
