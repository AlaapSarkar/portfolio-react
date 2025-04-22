import * as React from "react";
import { Switch, Route, Router } from "wouter";
import {routes} from "./routes.jsx";

function PageRouter() {
  return (
    <Switch>
      {Object.keys(routes).map((path, i) => (
        <Route key={`route_${i}`} path={path} component={routes[path].component} />
      ))}
    </Switch>
  );
}

export default PageRouter;