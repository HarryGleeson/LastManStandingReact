import React, { Component, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

import "../App.css";

class GetFixtures extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      currentSelection: "",
      hasBeenSelected: 0,
    };
  }

  componentDidMount() {
    const week = 6;
    const url = `https://livescore-api.com/api-client/fixtures/matches.json?competition_id=2&round=${week}&key=pRzsdYttAIYZCtvl&secret=p1eh5O8oqpcDmtaLkJdyIH2jp1i2vNoU`;
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          isLoaded: true,
          fixtureList: json,
        });
      });
  }

  hasTeamBeenSelected = (teamName) => {
    Axios.get("http://localhost:3001/api/get", {
      params: {
        teamName: teamName,
      },
    }).then((response) => {
      return response.data[0].beenSelected;
    });
  };

  submitTeam = () => {
    Axios.post("http://localhost:3001/api/insert", {
      teamName: this.state.currentSelection,
      beenSelected: 1,
    }).then(() => {
      alert("successful insert");
    });
  };

  render() {
    var {
      isLoaded,
      fixtureList,
      currentSelection,
      hasBeenSelected,
    } = this.state;
    var homeDisplay = 0;
    var awayDisplay = 0;
    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="GetFixtures">
          <h1>This Weeks Fixtures</h1>
          <ul>
            {fixtureList.data.fixtures.map((fixture) => (
              <li className="fixturesList" key={fixture.id}>
                {fixture.date} - {fixture.time}
                {this.hasTeamBeenSelected(fixture.home_name)}
                <button
                  onClick={() => {
                    this.setState({ currentSelection: fixture.home_name });
                  }}
                  className="btn btn-secondary btn-sm mr-1 ml-1"
                  disabled={0}
                >
                  {fixture.home_name}
                </button>
                vs
                {this.hasTeamBeenSelected(fixture.away_name)}
                <button
                  onClick={() => {
                    this.setState({ currentSelection: fixture.away_name });
                  }}
                  className="btn btn-secondary btn-sm mr-1 ml-1"
                  disabled={0}
                >
                  {fixture.away_name}
                </button>
              </li>
            ))}
          </ul>
          Current Selection: {currentSelection}
          <Link
            to={{
              pathname: "/submit",
              className: "btn btn-secondary btn-sm",
              state: {
                selection: currentSelection,
              },
            }}
          >
            <button
              onClick={this.submitTeam}
              disabled={!this.state.currentSelection}
              className="btn btn-primary btn-sm ml-1"
            >
              Submit
            </button>
          </Link>
        </div>
      );
    }
  }
}

export default GetFixtures;
