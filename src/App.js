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
import Register from "./pages/register";
import Results from "./pages/results";

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/select" component={Select} />
          <Route exact path="/submit" component={Submit} />
          <Route exact path="/results" component={Results} />
          <Route exact path="/404" component={NotFoundPage} />
          <Redirect to="/404" />
        </Switch>
      </Router>
    </div>
  );
}
export default App;
