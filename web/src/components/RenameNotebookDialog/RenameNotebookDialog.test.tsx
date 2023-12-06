import { vitest } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RenameNotebookDialog } from './RenameNotebookDialog';

describe('<RenameNotebookDialog>', () => {
  describe('When open is false', () => {
    it('does not render dialog', () => {
      const openNotebookId = null;
      const onClickCancel = vitest.fn();
      const onClickSave = vitest.fn();
      render(
        <RenameNotebookDialog
          openNotebookId={openNotebookId}
          onClickCancel={onClickCancel}
          onClickSave={onClickSave}
        />,
      );
    });

    expect(screen.queryByRole('presentation')).toBeNull();
  });

  describe('When open is true', () => {
    it('renders the dialog', () => {
      const openNotebookId = '1';
      const onClickCancel = vitest.fn();
      const onClickSave = vitest.fn();
      render(
        <RenameNotebookDialog
          openNotebookId={openNotebookId}
          onClickCancel={onClickCancel}
          onClickSave={onClickSave}
        />,
      );

      expect(screen.getByRole('presentation')).toBeInTheDocument();
    });
  });

  describe('When clicking cancel button', () => {
    it('calls onClickCancel', () => {
      const openNotebookId = '1';
      const onClickCancel = vitest.fn();
      const onClickSave = vitest.fn();
      render(
        <RenameNotebookDialog
          openNotebookId={openNotebookId}
          onClickCancel={onClickCancel}
          onClickSave={onClickSave}
        />,
      );

      userEvent.click(screen.getByText('Cancel'));

      expect(onClickCancel).toHaveBeenCalled();
    });
  });

  describe('When clicking add button', () => {
    it('calls onClickAdd', async () => {
      const openNotebookId = '1';
      const onClickCancel = vitest.fn();
      const onClickSave = vitest.fn();
      render(
        <RenameNotebookDialog
          openNotebookId={openNotebookId}
          onClickCancel={onClickCancel}
          onClickSave={onClickSave}
        />,
      );

      await userEvent.type(
        screen.getByRole('textbox', { name: 'Notebook Name' }),
        'test',
      );
      await userEvent.click(screen.getByText('Save'));

      expect(onClickSave).toHaveBeenCalledWith({ id: '1', name: 'test' });
    });
  });
});
