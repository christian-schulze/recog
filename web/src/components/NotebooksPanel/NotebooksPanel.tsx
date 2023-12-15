import { MouseEvent, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import AddIcon from '@material-ui/icons/Add';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import type { DraftNotebook, Notebook } from '@/types';

import { QueryStringLink } from '@/components/QueryStringLink';
import { AddNotebookDialog } from '@/components/AddNotebookDialog';
import { RenameNotebookDialog } from '@/components/RenameNotebookDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  subHeader: {
    display: 'flex',
    alignItems: 'center',
  },
  subHeaderLeftItem: {
    flexGrow: 1,
  },
}));

export interface NotebooksPanelProps {
  notebookId: number;
  notebooks: Notebook[];
  addNotebook: (notebook: DraftNotebook) => void;
  deleteNotebook: (notebookId: number) => void;
  saveNotebook: (notebook: Notebook) => void;
}

function NotebooksPanel({
  notebookId,
  notebooks,
  addNotebook,
  deleteNotebook,
  saveNotebook,
}: NotebooksPanelProps) {
  const [addNotebookDialogOpen, setAddNotebookDialogOpen] = useState(false);
  const [renameNotebookDialogOpen, setRenameNotebookDialogOpen] = useState<
    number | null
  >(null);
  const menuRef = useRef<HTMLElement | null>(null);
  const [menuOpen, setMenuOpen] = useState<number | null>(null);

  const classes = useStyles();

  const handleClickAddNotebookButton = () => {
    setAddNotebookDialogOpen(true);
  };

  const handleClickCancelAddNotebook = () => {
    setAddNotebookDialogOpen(false);
  };

  const handleClickAddNotebook = async (notebook: DraftNotebook) => {
    addNotebook(notebook);
    setAddNotebookDialogOpen(false);
  };

  const handleClickCancelRenameNotebook = () => {
    setRenameNotebookDialogOpen(null);
  };

  const handleClickSaveRenameNotebook = async (notebook: Notebook) => {
    saveNotebook(notebook);
    setRenameNotebookDialogOpen(null);
  };

  const handleClickNotebookMenu = (
    event: MouseEvent<HTMLElement>,
    notebookId: number,
  ) => {
    event.preventDefault();
    menuRef.current = event.target as HTMLElement;
    setMenuOpen(notebookId);
  };

  const handleCloseNotebookMenu = () => {
    setMenuOpen(null);
  };

  const handleClickRenameNotebook = () => {
    setRenameNotebookDialogOpen(menuOpen);
    setMenuOpen(null);
  };

  const handleClickDeleteNotebook = () => {
    if (menuOpen) {
      deleteNotebook(menuOpen);
      setMenuOpen(null);
    }
  };

  return (
    <>
      <List
        component="nav"
        aria-labelledby="notebooks-list-subheader"
        subheader={
          <div className={classes.subHeader}>
            <ListSubheader
              component="div"
              id="notebooks-list-subheader"
              className={classes.subHeaderLeftItem}
            >
              Notebooks
            </ListSubheader>
            <IconButton onClick={handleClickAddNotebookButton}>
              <AddIcon fontSize="large" />
            </IconButton>
          </div>
        }
        className={classes.root}
      >
        {notebooks.map((notebook) => {
          return (
            <QueryStringLink to={`/notebooks/${notebook.id}`} key={notebook.id}>
              <ListItem button selected={notebookId === notebook.id}>
                <ListItemText primary={notebook.name} />
                <IconButton
                  onClick={(event) =>
                    handleClickNotebookMenu(event, notebook.id!)
                  }
                  size="small"
                >
                  <MoreVertIcon />
                </IconButton>
              </ListItem>
            </QueryStringLink>
          );
        })}
      </List>
      <AddNotebookDialog
        open={addNotebookDialogOpen}
        onClickCancel={handleClickCancelAddNotebook}
        onClickAdd={handleClickAddNotebook}
      />
      <RenameNotebookDialog
        openNotebookId={renameNotebookDialogOpen}
        onClickCancel={handleClickCancelRenameNotebook}
        onClickSave={handleClickSaveRenameNotebook}
      />
      <Menu
        anchorEl={menuRef.current}
        keepMounted
        open={!!menuOpen}
        onClose={handleCloseNotebookMenu}
      >
        <MenuItem onClick={handleClickRenameNotebook}>Rename Notebook</MenuItem>
        <MenuItem onClick={handleClickDeleteNotebook}>Delete Notebook</MenuItem>
      </Menu>
    </>
  );
}

export { NotebooksPanel };
