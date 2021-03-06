import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

interface DraftNote {
  title: string;
  notebookId: string;
}

interface Props {
  open: boolean;
  onClickCancel: () => void;
  onClickAdd: (note: DraftNote) => void;
  notebookId: string;
}

function AddNoteDialog({ open, onClickCancel, onClickAdd, notebookId }: Props) {
  const [noteTitle, setNoteTitle] = useState("");

  const handleChangeNoteTitle = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNoteTitle(event.target.value);
  };

  const handleClose = () => {
    onClickCancel();
  };

  const handleClickAdd = () => {
    onClickAdd({ title: noteTitle, notebookId });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="add-note-dialog-title"
    >
      <DialogTitle id="add-note-dialog-title">Add Note</DialogTitle>
      <DialogContent>
        <DialogContentText></DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Note Title"
          type="text"
          fullWidth
          onChange={handleChangeNoteTitle}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClickCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClickAdd} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AddNoteDialog.propTypes = {
  open: PropTypes.bool,
  onClickCancel: PropTypes.func,
  onClickAdd: PropTypes.func,
  notebookId: PropTypes.string,
};

export { AddNoteDialog };
