import React, { ReactNode, useEffect } from "react";
import { Route, RouteComponentProps } from "react-router-dom";
import { useAuth0 } from "react-auth0-spa";

interface Props {
  component: ReactNode;
  path: string;
  [key: string]: any;
}

function PrivateRoute({ component: Component, path, ...rest }: Props) {
  const { loading, isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (loading || isAuthenticated) {
      return;
    }
    const fn = async () => {
      await loginWithRedirect({
        appState: { targetUrl: window.location.pathname },
      });
    };
    fn();
  }, [loading, isAuthenticated, loginWithRedirect, path]);

  const render = (props: RouteComponentProps) => {
    // @ts-ignore
    return isAuthenticated === true ? <Component {...props} /> : null;
  };

  return <Route path={path} render={render} {...rest} />;
}

export { PrivateRoute };
