import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { type Note } from '@/types';

import { gql } from '@/__generated__/gql.ts';

import { Note as NoteComponent } from './Note.tsx';

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

function NoteContainer() {
  const { noteId } = useParams();
  const [note, setNote] = useState<Note>();

  const { data, error, loading } = useQuery(NOTE_QUERY, {
    variables: {
      noteId: parseInt(noteId || '', 10),
    },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (data && !loading && !error) {
      setNote(data.getNote);
    }
  }, [data, loading, error]);

  if (note) {
    return <NoteComponent note={note} />;
  } else {
    return null;
  }
}

export { NoteContainer };
