import React from "react";
import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

//Pages
import Login from "./pages/login";
import Select from "./pages/selectTeam";
import Submit from "./pages/submit";
import NotFoundPage from "./pages/404";

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/select" component={Select} />
          <Route exact path="/submit" component={Submit} />
          <Route exact path="/404" component={NotFoundPage} />
          <Redirect to="/404" />
        </Switch>
      </Router>
    </div>
  );
}
export default App;
