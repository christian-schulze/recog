import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Notebook {
    id: ID!
    name: String!
    notes: [Note!]!
    userId: String!
  }

  type Note {
    id: ID!
    title: String!
    body: String!
    tags: [String!]!
    notebook: Notebook!
  }

  type Query {
    getNotebook(id: ID!): Notebook
    getNotebooks(userId: String!): [Notebook!]!
    getNote(id: ID!): Note
    getNotes: [Note!]!
  }

  type Mutation {
    addNotebook(name: String!, userId: String!): Notebook!
    saveNotebook(notebookId: ID!, name: String!): Boolean!
    deleteNotebook(notebookId: ID!): Boolean!
    addNote(
      title: String!
      body: String!
      tags: [String!]!
      notebookId: ID!
    ): Note!
    saveNote(noteId: ID!, title: String!, body: String!): Boolean!
    deleteNote(noteId: ID!): Boolean!
    addTag(notebookId: ID!, noteId: ID!, name: String!): Boolean!
    deleteTag(notebookId: ID!, noteId: ID!, name: String!): Boolean!
  }
`;

export default typeDefs;
