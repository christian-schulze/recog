import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter as Router } from "react-router-dom";
import { RecoilRoot } from "recoil";

import { useAuth0 } from "react-auth0-spa";

import { Routes } from "components/Routes";

// TODO: extract theme to separate file
const theme = createMuiTheme({
  spacing: 8,
});

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
});

function App() {
  const { loading } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <CssBaseline>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <RecoilRoot>
            <Router>
              <Routes />
            </Router>
          </RecoilRoot>
        </ApolloProvider>
      </ThemeProvider>
    </CssBaseline>
  );
}

export default App;
