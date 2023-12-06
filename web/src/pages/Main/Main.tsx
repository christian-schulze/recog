import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DraggableEventHandler } from 'react-draggable';
import { useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import { AppToolbar } from '@/components/Toolbar';
import { EditorContainer } from '@/components/Editor';
import { NotebooksPanelContainer } from '@/components/NotebooksPanel';
import { NotesPanelContainer } from '@/components/NotesPanel';
import { VerticalSeparator } from '@/components/VerticalSeparator';
import { NoteContainer } from '@/components/Note/NoteContainer';

const useStyles = makeStyles((_theme) => ({
  root: {
    height: '100vh',
    width: '100vw',
  },
  header: {
    width: '100%',
  },
  middlePanel: {
    height: 'calc(100% - 88px)',
    display: 'flex',
  },
  notebooksPanel: {
    height: '100%',
  },
  notesPanel: {
    height: '100%',
  },
  contentPanel: {
    flexGrow: 1,
    height: '100%',
  },
  footer: {
    width: '100vw',
    height: '24px',
    backgroundColor: 'gray',
  },
}));

function Main() {
  const { user } = useAuth0();
  const { noteId, notebookId } = useParams();

  const [editorEnabled, setEditorEnabled] = useState(
    window.localStorage.getItem(`${user?.sub}:editorEnabled`) === 'true',
  );

  const [notebooksPanelWidth, setNotebooksPanelWidth] = useState(240);
  const [notesPanelWidth, setNotesPanelWidth] = useState(240);
  const classes = useStyles();

  const handleMoveNotebookPanel: DraggableEventHandler = (
    _event,
    draggableData,
  ) => {
    if (draggableData.lastX > 240) {
      setNotebooksPanelWidth(draggableData.lastX);
    }
  };

  const handleMoveNotesPanel: DraggableEventHandler = (
    _event,
    draggableData,
  ) => {
    if (draggableData.lastX > notebooksPanelWidth + 240) {
      setNotesPanelWidth(draggableData.lastX - notebooksPanelWidth);
    }
  };

  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <AppToolbar
          editorEnabled={editorEnabled}
          setEditorEnabled={setEditorEnabled}
        />
      </header>
      <div className={classes.middlePanel}>
        <div
          className={classes.notebooksPanel}
          style={{ width: notebooksPanelWidth }}
        >
          <NotebooksPanelContainer />
        </div>
        <VerticalSeparator onMove={handleMoveNotebookPanel} />
        {notebookId && (
          <>
            <div
              className={classes.notesPanel}
              style={{ width: notesPanelWidth }}
            >
              <NotesPanelContainer />
            </div>
            <VerticalSeparator onMove={handleMoveNotesPanel} />
            <div className={classes.contentPanel}>
              {noteId &&
                (editorEnabled ? <EditorContainer /> : <NoteContainer />)}
            </div>
          </>
        )}
      </div>
      <div className={classes.footer}>&nbsp;</div>
    </div>
  );
}

export { Main };
