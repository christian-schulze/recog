import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import Fuse from 'fuse.js';

import type { DraftNote, Note } from '@/types';

import { gql } from '@/__generated__/gql.ts';

import { notebook, setShouldReFetch } from '@/state/notebook.ts';

import { NotesPanel } from './NotesPanel.tsx';

const GET_NOTEBOOK_QUERY = gql(/* GraphQL */ `
  query GetNotebook($notebookId: ID!) {
    getNotebook(id: $notebookId) {
      id
      name
      notes {
        id
        title
        body
        tags {
          id
          name
        }
      }
    }
  }
`);

const ADD_NOTE_MUTATION = gql(/* GraphQL */ `
  mutation AddNote($title: String!, $notebookId: ID!) {
    addNote(title: $title, body: "", tagNames: [], notebookId: $notebookId) {
      id
      title
      body
    }
  }
`);

const DELETE_NOTE_MUTATION = gql(/* GraphQL */ `
  mutation DeleteNote($noteId: ID!) {
    deleteNote(noteId: $noteId)
  }
`);

function NotesPanelContainer() {
  const { notebookId, noteId } = useParams();

  const [searchText, setSearchText] = useState('');
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);

  const { data, refetch } = useQuery(GET_NOTEBOOK_QUERY, {
    variables: {
      notebookId: parseInt(notebookId || '', 10),
    },
  });

  const [addNote] = useMutation(ADD_NOTE_MUTATION);
  const [deleteNote] = useMutation(DELETE_NOTE_MUTATION);

  useEffect(() => {
    setNotes(data?.getNotebook?.notes || []);
  }, [data]);

  useEffect(() => {
    if (notebook.shouldReFetch) {
      refetch();
      setShouldReFetch(false);
    }
  }, [refetch, setShouldReFetch, notebook.shouldReFetch]);

  const handleChangeSearchText = (text: string) => {
    setSearchText(text);
  };

  useEffect(() => {
    if (notes.length > 0 && searchText !== '') {
      const options = { keys: ['title', 'tags'], distance: 0 };
      const fuse = new Fuse(notes, options);
      const rawResults = fuse.search(searchText);
      const results = rawResults.map((i) => i.item);
      setFilteredNotes(results);
    } else {
      setFilteredNotes(notes);
    }
  }, [notes, searchText]);

  const handleAddNote = async (note: DraftNote) => {
    await addNote({
      variables: {
        title: note.title,
        notebookId: note.notebookId,
      },
    });
    refetch();
  };

  const handleDeleteNote = async (noteId: number) => {
    await deleteNote({ variables: { noteId } });
    refetch();
  };

  if (filteredNotes) {
    return (
      <NotesPanel
        notebookId={parseInt(notebookId || '', 10)}
        noteId={parseInt(noteId || '', 10)}
        notes={filteredNotes}
        addNote={handleAddNote}
        deleteNote={handleDeleteNote}
        searchText={searchText}
        onChangeSearchText={handleChangeSearchText}
      />
    );
  } else {
    return null;
  }
}

export { NotesPanelContainer };
