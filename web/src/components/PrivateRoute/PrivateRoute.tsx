import { ReactNode, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export interface PrivateRouteProps {
  element: ReactNode;
}

function PrivateRoute({ element }: PrivateRouteProps) {
  const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (isLoading || isAuthenticated) {
      return;
    }

    const fn = async () => {
      await loginWithRedirect({
        appState: { targetUrl: window.location.pathname },
      });
    };

    fn();
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  if (!isAuthenticated) {
    return null;
  }

  return element;
}

export { PrivateRoute };
