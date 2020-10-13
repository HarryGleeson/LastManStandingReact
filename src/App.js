import React, { Component, useState } from "react";
import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";

//Pages
import GetFixtures from "./pages/index";
import Submit from "./pages/submit";
import NotFoundPage from "./pages/404";

function App() {
  const [teamName, setTeamName] = useState("");
  const [beenSelected, setBeenSelected] = useState("");
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/" component={GetFixtures} />
          <Route exact path="/submit" component={Submit} />
          <Route exact path="/404" component={NotFoundPage} />
          <Redirect to="/404" />
        </Switch>
      </Router>
    </div>
  );
}
export default App;
