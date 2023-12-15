import { ChangeEvent, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import type { DraftNote } from '@/types';

export interface AddNoteDialogProps {
  open: boolean;
  onClickCancel: () => void;
  onClickAdd: (note: DraftNote) => void;
  notebookId: number;
}

function AddNoteDialog({
  open,
  onClickCancel,
  onClickAdd,
  notebookId,
}: AddNoteDialogProps) {
  const [noteTitle, setNoteTitle] = useState('');

  const handleChangeNoteTitle = (event: ChangeEvent<HTMLInputElement>) => {
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

export { AddNoteDialog };
