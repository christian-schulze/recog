import { vitest } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AddNoteDialog } from './AddNoteDialog';

describe('<AddNoteDialog>', () => {
  describe('When open is false', () => {
    it('does not render dialog', () => {
      const open = false;
      const onClickCancel = vitest.fn();
      const onClickAdd = vitest.fn();
      const notebookId = '1';
      render(
        <AddNoteDialog
          open={open}
          onClickCancel={onClickCancel}
          onClickAdd={onClickAdd}
          notebookId={notebookId}
        />,
      );
    });

    expect(screen.queryByRole('presentation')).toBeNull();
  });

  describe('When open is true', () => {
    it('renders the dialog', () => {
      const open = true;
      const onClickCancel = vitest.fn();
      const onClickAdd = vitest.fn();
      const notebookId = '1';
      render(
        <AddNoteDialog
          open={open}
          onClickCancel={onClickCancel}
          onClickAdd={onClickAdd}
          notebookId={notebookId}
        />,
      );

      expect(screen.getByRole('presentation')).toBeInTheDocument();
    });
  });

  describe('When clicking cancel button', () => {
    it('calls onClickCancel', async () => {
      const open = true;
      const onClickCancel = vitest.fn();
      const onClickAdd = vitest.fn();
      const notebookId = '1';
      render(
        <AddNoteDialog
          open={open}
          onClickCancel={onClickCancel}
          onClickAdd={onClickAdd}
          notebookId={notebookId}
        />,
      );

      await userEvent.click(screen.getByText('Cancel'));

      expect(onClickCancel).toHaveBeenCalled();
    });
  });

  describe('When clicking add button', () => {
    it('calls onClickAdd', async () => {
      const open = true;
      const onClickCancel = vitest.fn();
      const onClickAdd = vitest.fn();
      const notebookId = '1';
      render(
        <AddNoteDialog
          open={open}
          onClickCancel={onClickCancel}
          onClickAdd={onClickAdd}
          notebookId={notebookId}
        />,
      );

      await userEvent.type(
        screen.getByRole('textbox', { name: 'Note Title' }),
        'test',
      );
      await userEvent.click(screen.getByText('Add'));

      expect(onClickAdd).toHaveBeenCalledWith({ title: 'test', notebookId });
    });
  });
});
