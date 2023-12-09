import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { gql } from '@/__generated__/gql.ts';

import { Note as NoteComponent } from './Note.tsx';

export interface Tag {
  id: string;
  name: string;
}

export interface Note {
  id: string;
  title: string;
  body: string;
  tags?: Tag[];
}

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
      noteId: noteId || '',
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
