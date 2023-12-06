import { vitest } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Auth0 from '@auth0/auth0-react';

import { PrivateRoute } from './PrivateRoute';

vitest.mock('@auth0/auth0-react', () => {
  return {
    useAuth0() {
      return {};
    },
  };
});

describe('<PrivateRoute>', () => {
  function renderComponent() {
    return render(
      <MemoryRouter initialEntries={['/testurl']} initialIndex={0}>
        <PrivateRoute component={<div>test</div>} path="/testurl" />
      </MemoryRouter>,
    );
  }

  beforeEach(() => {
    vitest.resetAllMocks();
  });

  describe('When loading is false and isAuthenticated is false', () => {
    const loginWithRedirect = vitest.fn();

    beforeEach(() => {
      const spy = vitest.spyOn(Auth0, 'useAuth0');
      spy.mockImplementation(() => {
        return {
          loading: false,
          isAuthenticated: false,
          loginWithRedirect,
        } as unknown as ReturnType<typeof Auth0.useAuth0>;
      });
    });

    it('does not call loginWithRedirect', () => {
      renderComponent();

      expect(loginWithRedirect).toBeCalledWith({
        appState: { targetUrl: '/' },
      });
      expect(screen.queryByText('test')).toBeNull();
    });
  });

  describe('When loading is true and isAuthenticated is false', () => {
    const loginWithRedirect = vitest.fn();

    beforeEach(() => {
      const spy = vitest.spyOn(Auth0, 'useAuth0');
      spy.mockImplementation(() => {
        return {
          loading: true,
          isAuthenticated: false,
          loginWithRedirect,
        } as unknown as ReturnType<typeof Auth0.useAuth0>;
      });
    });

    it('does not call loginWithRedirect', () => {
      renderComponent();

      expect(loginWithRedirect).not.toBeCalled();
      expect(screen.queryByText('test')).toBeNull();
    });
  });

  describe('When loading is false and isAuthenticated is true', () => {
    const loginWithRedirect = vitest.fn();

    beforeEach(() => {
      const spy = vitest.spyOn(Auth0, 'useAuth0');
      spy.mockImplementation(() => {
        return {
          loading: false,
          isAuthenticated: true,
          loginWithRedirect,
        } as unknown as ReturnType<typeof Auth0.useAuth0>;
      });
    });

    it('does not call loginWithRedirect', () => {
      renderComponent();

      expect(loginWithRedirect).not.toBeCalled();
      expect(screen.queryByText('test')).toBeInTheDocument();
    });
  });
});
