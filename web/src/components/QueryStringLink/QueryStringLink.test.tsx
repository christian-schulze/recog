import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import { QueryStringLink } from './QueryStringLink.tsx';

describe('<QueryStringLink>', () => {
  it('renders an anchor tag with correct href', () => {
    render(
      <MemoryRouter>
        <QueryStringLink to="/testurl">click me</QueryStringLink>
      </MemoryRouter>,
    );

    expect(screen.getByText('click me')).toHaveAttribute('href', '/testurl');
  });
});
