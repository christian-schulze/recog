import React, { useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import { QueryStringLink } from "components/QueryStringLink";
import { AddNoteDialog } from "components/AddNoteDialog";
import { DraftNote, Note } from "./NotesPanelContainer";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  subHeader: {
    display: "flex",
    alignItems: "center",
  },
  subHeaderLeftItem: {
    flexGrow: 1,
  },
}));

interface Props {
  notebookId: string;
  noteId: string;
  notes: Note[];
  addNote: (note: DraftNote) => void;
  deleteNote: (noteId: string) => void;
  searchText: string;
  onChangeSearchText: (text: string) => void;
}

function NotesPanel({
  notebookId,
  noteId,
  notes,
  addNote,
  deleteNote,
  searchText,
  onChangeSearchText,
}: Props) {
  const [addNoteDialogOpen, setAddNoteDialogOpen] = useState(false);
  const menuRef = useRef<HTMLElement | null>(null);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  const classes = useStyles();

  const handleClickAddNoteButton = () => {
    setAddNoteDialogOpen(true);
  };

  const handleClickCancel = () => {
    setAddNoteDialogOpen(false);
  };

  const handleClickAdd = async (note: DraftNote) => {
    await addNote(note);
    setAddNoteDialogOpen(false);
  };

  const handleChangeSearchText = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChangeSearchText(event.target.value);
  };

  const handleClickListItemMenu = (
    event: React.MouseEvent<HTMLElement>,
    noteId: string
  ) => {
    event.preventDefault();
    menuRef.current = event.target as HTMLElement;
    setMenuOpen(noteId);
  };

  const handleCloseListItemMenu = () => {
    setMenuOpen(null);
  };

  const handleClickDeleteNote = async () => {
    if (menuOpen) {
      await deleteNote(menuOpen);
      setMenuOpen(null);
    }
  };

  return (
    <>
      <Input
        style={{ padding: 8 }}
        value={searchText}
        onChange={handleChangeSearchText}
        endAdornment={
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        }
        aria-describedby="search-notes"
        inputProps={{
          "aria-label": "search",
        }}
        fullWidth
        placeholder="Search Notes"
      />
      <List
        style={{ overflowX: "hidden", height: "calc(100% - 50px)" }}
        component="nav"
        aria-labelledby="notes-list-subheader"
        subheader={
          <div className={classes.subHeader}>
            <ListSubheader
              component="div"
              id="notes-list-subheader"
              className={classes.subHeaderLeftItem}
            >
              Notes
            </ListSubheader>
            <IconButton onClick={handleClickAddNoteButton}>
              <AddIcon fontSize="large" />
            </IconButton>
          </div>
        }
        className={classes.root}
      >
        {notes.map((note) => {
          return (
            <QueryStringLink
              to={`/notebooks/${notebookId}/notes/${note.id}`}
              key={note.id}
            >
              <ListItem button selected={noteId === note.id}>
                <ListItemText primary={note.title} />
                <IconButton
                  onClick={(event) => handleClickListItemMenu(event, note.id)}
                  size="small"
                >
                  <MoreVertIcon />
                </IconButton>
              </ListItem>
            </QueryStringLink>
          );
        })}
      </List>
      <AddNoteDialog
        open={addNoteDialogOpen}
        onClickCancel={handleClickCancel}
        onClickAdd={handleClickAdd}
        notebookId={notebookId}
      />
      <Menu
        anchorEl={menuRef.current}
        keepMounted
        open={!!menuOpen}
        onClose={handleCloseListItemMenu}
      >
        <MenuItem onClick={handleClickDeleteNote}>Delete Note</MenuItem>
      </Menu>
    </>
  );
}

export { NotesPanel };
