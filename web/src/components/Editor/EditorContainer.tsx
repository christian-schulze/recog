import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import type { Note } from '@/types';

import { gql } from '@/__generated__/gql.ts';

import { setShouldReFetch } from '@/state/notebook.ts';

import { Editor } from './Editor.tsx';

const NOTE_QUERY = gql(/* GraphQL */ `
  query GetNote($noteId: ID!) {
    getNote(id: $noteId) {
      id
      title
      body
      tags {
        id
        name
      }
    }
  }
`);

const ADD_TAG_MUTATION = gql(/* GraphQL */ `
  mutation AddTag($notebookId: ID!, $noteId: ID!, $name: String!) {
    addTag(notebookId: $notebookId, noteId: $noteId, name: $name) {
      noteId
      tagId
    }
  }
`);

const DELETE_TAG_MUTATION = gql(/* GraphQL */ `
  mutation DeleteTag($notebookId: ID!, $noteId: ID!, $name: String!) {
    deleteTag(notebookId: $notebookId, noteId: $noteId, name: $name)
  }
`);

const SAVE_NOTE_MUTATION = gql(/* GraphQL */ `
  mutation SaveNote($noteId: ID!, $title: String!, $body: String!) {
    saveNote(noteId: $noteId, title: $title, body: $body)
  }
`);

function EditorContainer() {
  const { notebookId, noteId } = useParams();

  const { loading, error, data, refetch } = useQuery(NOTE_QUERY, {
    variables: {
      noteId: parseInt(noteId || '', 10),
    },
    fetchPolicy: 'cache-and-network',
  });

  const [addTag] = useMutation(ADD_TAG_MUTATION);

  const [deleteTag] = useMutation(DELETE_TAG_MUTATION);

  const [saveNote] = useMutation(SAVE_NOTE_MUTATION);

  const [note, setNote] = useState<Note | null>(null);
  useEffect(() => {
    if (data && !loading && !error) {
      setNote(data.getNote);
    }
  }, [data, loading, error]);

  const handleAddTag = async (name: string) => {
    await addTag({
      variables: {
        notebookId: parseInt(notebookId || ''),
        noteId: parseInt(noteId || '', 10),
        name,
      },
    });
    return true;
  };

  const handleDeleteTag = async (name: string) => {
    await deleteTag({
      variables: {
        notebookId: parseInt(notebookId || '', 10),
        noteId: parseInt(noteId || '', 10),
        name,
      },
    });
    return true;
  };

  const handleSaveNote = async (title: string, body: string) => {
    await saveNote({
      variables: { noteId: parseInt(noteId || '', 10), title, body },
    });
    setShouldReFetch(true);
  };

  const handleReloadNote = async () => {
    const { data: refetchedData } = await refetch();
    if (refetchedData) {
      setNote({
        ...refetchedData.getNote,
        tags: [...(refetchedData.getNote.tags || [])],
      });
    }
  };

  if (note) {
    return (
      <Editor
        note={note}
        onDeleteTag={handleDeleteTag}
        onAddTag={handleAddTag}
        onSaveNote={handleSaveNote}
        onReloadNote={handleReloadNote}
      />
    );
  } else {
    return null;
  }
}

export { EditorContainer };
