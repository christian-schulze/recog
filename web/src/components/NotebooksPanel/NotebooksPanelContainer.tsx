import { gql, useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import { NotebooksPanel } from "./NotebooksPanel";

const GET_NOTEBOOKS_QUERY = gql`
  query GetNotebooks($userId: String!) {
    getNotebooks(userId: $userId) {
      id
      name
      userId
    }
  }
`;

const ADD_NOTEBOOK_MUTATION = gql`
  mutation AddNotebook($name: String!, $userId: String!) {
    addNotebook(name: $name, userId: $userId) {
      id
      name
      userId
    }
  }
`;

const DELETE_NOTEBOOK_MUTATION = gql`
  mutation DeleteNotebook($notebookId: ID!) {
    deleteNotebook(notebookId: $notebookId)
  }
`;

const SAVE_NOTEBOOK_MUTATION = gql`
  mutation SaveNotebook($notebookId: ID!, $name: String!) {
    saveNotebook(notebookId: $notebookId, name: $name)
  }
`;

export interface DraftNotebook {
  name: string;
}

export interface Notebook {
  id: string;
  name: string;
}

function NotebooksPanelContainer() {
  const { notebookId } = useParams();
  const { user } = useAuth0();

  const { data, refetch } = useQuery(GET_NOTEBOOKS_QUERY, {
    variables: { userId: user?.sub },
  });
  const notebooks = data?.getNotebooks || [];

  const [addNotebook] = useMutation(ADD_NOTEBOOK_MUTATION);
  const [deleteNotebook] = useMutation(DELETE_NOTEBOOK_MUTATION);
  const [saveNotebook] = useMutation(SAVE_NOTEBOOK_MUTATION);

  const handleAddNotebook = async (notebook: DraftNotebook) => {
    await addNotebook({ variables: { name: notebook.name, userId: user?.sub } });
    await refetch();
  };

  const handleDeleteNotebook = async (notebookId: string) => {
    await deleteNotebook({ variables: { notebookId } });
    await refetch();
  };

  const handleSaveNotebook = async (notebook: Notebook) => {
    await saveNotebook({
      variables: { notebookId: notebook.id, name: notebook.name },
    });
    await refetch();
  };

  if (notebooks) {
    return (
      <NotebooksPanel
        notebookId={notebookId!}
        notebooks={notebooks}
        addNotebook={handleAddNotebook}
        deleteNotebook={handleDeleteNotebook}
        saveNotebook={handleSaveNotebook}
      />
    );
  } else {
    return null;
  }
}

export { NotebooksPanelContainer };
