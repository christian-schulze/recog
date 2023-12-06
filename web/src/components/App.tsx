import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { RouterProvider } from 'react-router-dom';

import { useAuth0 } from '@auth0/auth0-react';

import { router } from '@/components/Routes.tsx';

// TODO: extract theme to separate file
const theme = createTheme({
  spacing: 8,
});

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <CssBaseline>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <RouterProvider router={router} />
        </ApolloProvider>
      </ThemeProvider>
    </CssBaseline>
  );
}

export default App;
