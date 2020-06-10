import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

interface DraftNotebook {
  name: string;
}

interface Props {
  open: boolean;
  onClickCancel: () => void;
  onClickAdd: (notebook: DraftNotebook) => void;
}

function AddNotebookDialog({ open, onClickCancel, onClickAdd }: Props) {
  const [notebookName, setNotebookName] = useState("");

  const handleChangeNotebookName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNotebookName(event.target.value);
  };

  const handleClose = () => {
    onClickCancel();
  };

  const handleClickAdd = () => {
    onClickAdd({ name: notebookName });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="add-notebook-dialog-title"
    >
      <DialogTitle id="add-notebook-dialog-title">Add Notebook</DialogTitle>
      <DialogContent>
        <DialogContentText></DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Notebook Name"
          type="text"
          fullWidth
          onChange={handleChangeNotebookName}
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

export { AddNotebookDialog };
