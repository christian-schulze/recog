/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  '\n  query GetNote($noteId: ID!) {\n    getNote(id: $noteId) {\n      id\n      title\n      body\n      tags {\n        id\n        name\n      }\n    }\n  }\n':
    types.GetNoteDocument,
  '\n  mutation AddTag($notebookId: ID!, $noteId: ID!, $name: String!) {\n    addTag(notebookId: $notebookId, noteId: $noteId, name: $name) {\n      noteId\n      tagId\n    }\n  }\n':
    types.AddTagDocument,
  '\n  mutation DeleteTag($notebookId: ID!, $noteId: ID!, $name: String!) {\n    deleteTag(notebookId: $notebookId, noteId: $noteId, name: $name)\n  }\n':
    types.DeleteTagDocument,
  '\n  mutation SaveNote($noteId: ID!, $title: String!, $body: String!) {\n    saveNote(noteId: $noteId, title: $title, body: $body)\n  }\n':
    types.SaveNoteDocument,
  '\n  query GetNotebooks($userId: String!) {\n    getNotebooks(userId: $userId) {\n      id\n      name\n      userId\n    }\n  }\n':
    types.GetNotebooksDocument,
  '\n  mutation AddNotebook($name: String!, $userId: String!) {\n    addNotebook(name: $name, userId: $userId) {\n      id\n      name\n      userId\n    }\n  }\n':
    types.AddNotebookDocument,
  '\n  mutation DeleteNotebook($notebookId: ID!) {\n    deleteNotebook(notebookId: $notebookId)\n  }\n':
    types.DeleteNotebookDocument,
  '\n  mutation SaveNotebook($notebookId: ID!, $name: String!) {\n    saveNotebook(notebookId: $notebookId, name: $name)\n  }\n':
    types.SaveNotebookDocument,
  '\n  query GetNotebook($notebookId: ID!) {\n    getNotebook(id: $notebookId) {\n      id\n      name\n      notes {\n        id\n        title\n        body\n        tags {\n          id\n          name\n        }\n      }\n    }\n  }\n':
    types.GetNotebookDocument,
  '\n  mutation AddNote($title: String!, $notebookId: ID!) {\n    addNote(title: $title, body: "", tagNames: [], notebookId: $notebookId) {\n      id\n      title\n      body\n    }\n  }\n':
    types.AddNoteDocument,
  '\n  mutation DeleteNote($noteId: ID!) {\n    deleteNote(noteId: $noteId)\n  }\n':
    types.DeleteNoteDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetNote($noteId: ID!) {\n    getNote(id: $noteId) {\n      id\n      title\n      body\n      tags {\n        id\n        name\n      }\n    }\n  }\n',
): (typeof documents)['\n  query GetNote($noteId: ID!) {\n    getNote(id: $noteId) {\n      id\n      title\n      body\n      tags {\n        id\n        name\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation AddTag($notebookId: ID!, $noteId: ID!, $name: String!) {\n    addTag(notebookId: $notebookId, noteId: $noteId, name: $name) {\n      noteId\n      tagId\n    }\n  }\n',
): (typeof documents)['\n  mutation AddTag($notebookId: ID!, $noteId: ID!, $name: String!) {\n    addTag(notebookId: $notebookId, noteId: $noteId, name: $name) {\n      noteId\n      tagId\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation DeleteTag($notebookId: ID!, $noteId: ID!, $name: String!) {\n    deleteTag(notebookId: $notebookId, noteId: $noteId, name: $name)\n  }\n',
): (typeof documents)['\n  mutation DeleteTag($notebookId: ID!, $noteId: ID!, $name: String!) {\n    deleteTag(notebookId: $notebookId, noteId: $noteId, name: $name)\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation SaveNote($noteId: ID!, $title: String!, $body: String!) {\n    saveNote(noteId: $noteId, title: $title, body: $body)\n  }\n',
): (typeof documents)['\n  mutation SaveNote($noteId: ID!, $title: String!, $body: String!) {\n    saveNote(noteId: $noteId, title: $title, body: $body)\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetNotebooks($userId: String!) {\n    getNotebooks(userId: $userId) {\n      id\n      name\n      userId\n    }\n  }\n',
): (typeof documents)['\n  query GetNotebooks($userId: String!) {\n    getNotebooks(userId: $userId) {\n      id\n      name\n      userId\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation AddNotebook($name: String!, $userId: String!) {\n    addNotebook(name: $name, userId: $userId) {\n      id\n      name\n      userId\n    }\n  }\n',
): (typeof documents)['\n  mutation AddNotebook($name: String!, $userId: String!) {\n    addNotebook(name: $name, userId: $userId) {\n      id\n      name\n      userId\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation DeleteNotebook($notebookId: ID!) {\n    deleteNotebook(notebookId: $notebookId)\n  }\n',
): (typeof documents)['\n  mutation DeleteNotebook($notebookId: ID!) {\n    deleteNotebook(notebookId: $notebookId)\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation SaveNotebook($notebookId: ID!, $name: String!) {\n    saveNotebook(notebookId: $notebookId, name: $name)\n  }\n',
): (typeof documents)['\n  mutation SaveNotebook($notebookId: ID!, $name: String!) {\n    saveNotebook(notebookId: $notebookId, name: $name)\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetNotebook($notebookId: ID!) {\n    getNotebook(id: $notebookId) {\n      id\n      name\n      notes {\n        id\n        title\n        body\n        tags {\n          id\n          name\n        }\n      }\n    }\n  }\n',
): (typeof documents)['\n  query GetNotebook($notebookId: ID!) {\n    getNotebook(id: $notebookId) {\n      id\n      name\n      notes {\n        id\n        title\n        body\n        tags {\n          id\n          name\n        }\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation AddNote($title: String!, $notebookId: ID!) {\n    addNote(title: $title, body: "", tagNames: [], notebookId: $notebookId) {\n      id\n      title\n      body\n    }\n  }\n',
): (typeof documents)['\n  mutation AddNote($title: String!, $notebookId: ID!) {\n    addNote(title: $title, body: "", tagNames: [], notebookId: $notebookId) {\n      id\n      title\n      body\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation DeleteNote($noteId: ID!) {\n    deleteNote(noteId: $noteId)\n  }\n',
): (typeof documents)['\n  mutation DeleteNote($noteId: ID!) {\n    deleteNote(noteId: $noteId)\n  }\n'];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
