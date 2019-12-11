import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";

import Admin from "layouts/Admin.js";

// template css, keep this
import "assets/css/material-dashboard-react.css?v=1.8.0";

const hist = createBrowserHistory();

export default function App() {
  return (
    <Router history={hist}>
      <Switch>
        <Route path="/admin" component={Admin} />
        {/* <Route path="/login" component={Login} /> */}
        <Redirect from="/" to="/admin/order_list" />
      </Switch>
    </Router>
  );
}
