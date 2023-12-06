import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { gql, useMutation, useQuery } from '@apollo/client';
import Fuse from 'fuse.js';

import { notebook, setShouldReFetch } from '@/state/notebook.ts';
import { NotesPanel } from './NotesPanel';

const GET_NOTEBOOK_QUERY = gql`
  query GetNotebook($notebookId: ID!) {
    getNotebook(id: $notebookId) {
      id
      name
      notes {
        id
        title
        body
        tags
      }
    }
  }
`;

const ADD_NOTE_MUTATION = gql`
  mutation AddNote($title: String!, $notebookId: ID!) {
    addNote(title: $title, body: "", tags: [], notebookId: $notebookId) {
      id
      title
      body
    }
  }
`;

const DELETE_NOTE_MUTATION = gql`
  mutation DeleteNote($noteId: ID!) {
    deleteNote(noteId: $noteId)
  }
`;

export interface DraftNote {
  title: string;
  notebookId: string;
}

export interface Note {
  id: string;
  title: string;
  body: string;
  tags: string[];
}

function NotesPanelContainer() {
  const { notebookId, noteId } = useParams();

  const [notes, setNotes] = useState<Note[]>([]);
  const { data, refetch } = useQuery(GET_NOTEBOOK_QUERY, {
    variables: {
      notebookId,
    },
  });
  useEffect(() => {
    setNotes(data?.getNotebook?.notes || []);
  }, [data]);

  useEffect(() => {
    if (notebook.shouldReFetch) {
      refetch();
      setShouldReFetch(false);
    }
  }, [refetch, setShouldReFetch, notebook.shouldReFetch]);

  const [searchText, setSearchText] = useState('');
  const handleChangeSearchText = (text: string) => {
    setSearchText(text);
  };

  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
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

  const [addNote] = useMutation(ADD_NOTE_MUTATION);
  const [deleteNote] = useMutation(DELETE_NOTE_MUTATION);

  const handleAddNote = async (note: DraftNote) => {
    await addNote({
      variables: {
        title: note.title,
        notebookId: note.notebookId,
      },
    });
    refetch();
  };

  const handleDeleteNote = async (noteId: string) => {
    await deleteNote({ variables: { noteId } });
    refetch();
  };

  if (filteredNotes) {
    return (
      <NotesPanel
        notebookId={notebookId!}
        noteId={noteId!}
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
