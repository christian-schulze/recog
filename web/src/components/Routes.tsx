import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";

import { PrivateRoute } from "components/PrivateRoute";

import { Main } from "pages/Main";

function Routes() {
  return (
    <Switch>
      <PrivateRoute
        exact
        path="/notebooks/:notebookId?"
        component={() => <Main />}
      />
      <PrivateRoute
        exact
        path="/notebooks/:notebookId?/notes/:noteId?"
        component={() => <Main />}
      />
      <Route component={() => <Redirect to="/notebooks" />} />
    </Switch>
  );
}

export { Routes };
