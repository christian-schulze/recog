import { ChangeEvent, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

interface DraftNotebook {
  id: string;
  name: string;
}

interface RenameNotebookDialogProps {
  openNotebookId: string | null;
  onClickCancel: () => void;
  onClickSave: (notebook: DraftNotebook) => void;
}

const RenameNotebookDialog = ({
  openNotebookId,
  onClickCancel,
  onClickSave,
}: RenameNotebookDialogProps) => {
  const [notebookName, setNotebookName] = useState('');

  const handleChangeNotebookName = (event: ChangeEvent<HTMLInputElement>) => {
    setNotebookName(event.target.value);
  };

  const handleClose = () => {
    onClickCancel();
  };

  const handleClickSave = () => {
    if (openNotebookId) {
      onClickSave({ id: openNotebookId, name: notebookName });
    }
  };

  return (
    <Dialog
      open={!!openNotebookId}
      onClose={handleClose}
      aria-labelledby="rename-notebook-dialog-title"
    >
      <DialogTitle id="rename-notebook-dialog-title">
        Rename Notebook
      </DialogTitle>
      <DialogContent>
        <TextField
          value={notebookName}
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
        <Button onClick={handleClickSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { RenameNotebookDialog };
