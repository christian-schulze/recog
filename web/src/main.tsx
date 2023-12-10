import React from 'react';
import ReactDOM from 'react-dom/client';

import { Auth0Provider } from '@auth0/auth0-react';
import config from './auth_config.json';
import history from './utils/history';

import App from './components/App.tsx';

import './index.css';

const onRedirectCallback = (appState: any) => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname,
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Auth0Provider
      domain={config.domain}
      clientId={config.clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
);
