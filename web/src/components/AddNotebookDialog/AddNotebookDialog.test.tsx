import { vitest } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AddNotebookDialog } from './AddNotebookDialog';

describe('<AddNotebookDialog>', () => {
  describe('When open is false', () => {
    it('does not render dialog', () => {
      const open = false;
      const onClickCancel = vitest.fn();
      const onClickAdd = vitest.fn();
      render(
        <AddNotebookDialog
          open={open}
          onClickCancel={onClickCancel}
          onClickAdd={onClickAdd}
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
      render(
        <AddNotebookDialog
          open={open}
          onClickCancel={onClickCancel}
          onClickAdd={onClickAdd}
        />,
      );

      expect(screen.getByRole('presentation')).toBeInTheDocument();
    });
  });

  describe('When clicking cancel button', () => {
    it('calls onClickCancel', () => {
      const open = true;
      const onClickCancel = vitest.fn();
      const onClickAdd = vitest.fn();
      render(
        <AddNotebookDialog
          open={open}
          onClickCancel={onClickCancel}
          onClickAdd={onClickAdd}
        />,
      );

      userEvent.click(screen.getByText('Cancel'));

      expect(onClickCancel).toHaveBeenCalled();
    });
  });

  describe('When clicking add button', () => {
    it('calls onClickAdd', async () => {
      const open = true;
      const onClickCancel = vitest.fn();
      const onClickAdd = vitest.fn();
      render(
        <AddNotebookDialog
          open={open}
          onClickCancel={onClickCancel}
          onClickAdd={onClickAdd}
        />,
      );

      await userEvent.type(
        screen.getByRole('textbox', { name: 'Notebook Name' }),
        'test',
      );
      await userEvent.click(screen.getByText('Add'));

      expect(onClickAdd).toHaveBeenCalledWith({ name: 'test' });
    });
  });
});
