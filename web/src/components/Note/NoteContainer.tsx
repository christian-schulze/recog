import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import { Note } from "./Note";

const NOTE_QUERY = gql`
  query GetNote($noteId: ID!) {
    getNote(id: $noteId) {
      id
      title
      body
      tags
    }
  }
`;

function NoteContainer() {
  const { noteId } = useParams();

  const { loading, error, data } = useQuery(NOTE_QUERY, {
    variables: {
      noteId,
    },
    fetchPolicy: "cache-and-network",
  });

  const [note, setNote] = useState();
  useEffect(() => {
    if (data && !loading && !error) {
      setNote(data.getNote);
    }
  }, [data, loading, error]);

  if (note) {
    return <Note note={note} />;
  } else {
    return null;
  }
}

export { NoteContainer };
