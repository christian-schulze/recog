import { vitest } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as Auth0 from '@auth0/auth0-react';

import App from './App.tsx';

vitest.mock('@auth0/auth0-react', async () => {
  return {
    ...await vitest.importActual('@auth0/auth0-react'),
  };
});

describe('<App>', () => {
  beforeEach(() => {
    vitest.resetAllMocks();
  });

  describe('When loading', () => {
    beforeEach(() => {
      const spy = vitest.spyOn(Auth0, 'useAuth0');
      spy.mockImplementation(() => {
        return {
          isLoading: true,
        } as unknown as ReturnType<typeof Auth0.useAuth0>;
      });
    });

    it('renders loading text', () => {
      render(<App />);

      expect(screen.getByText(/Loading/)).toBeInTheDocument();
    });
  });

  describe('When loaded', () => {
    beforeEach(() => {
      const spy = vitest.spyOn(Auth0, 'useAuth0');
      spy.mockImplementation(() => {
        return {
          isLoading: false,
          isAuthenticated: true,
          user: {},
        } as unknown as ReturnType<typeof Auth0.useAuth0>;
      });
    });

    it('renders without crashing', () => {
      render(<App />);
    });
  });
});
