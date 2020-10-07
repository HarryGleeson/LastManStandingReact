import React, { Component } from "react";
import GetFixtures from "./GetFixtures";
import "./App.css";

function App() {
  return (
    <div className="app">
      <h1>This Weeks Fixtures</h1>
      <GetFixtures />
    </div>
  );
}
export default App;
