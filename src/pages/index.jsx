import React from "react";
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
      hasBeenSelectedHome: 0,
      hasBeenSelectedAway: 0,
      fixes: [],
    };
  }

  componentDidMount() {
    const week = 7;
    const url = `https://livescore-api.com/api-client/fixtures/matches.json?competition_id=2&round=${week}&key=pRzsdYttAIYZCtvl&secret=p1eh5O8oqpcDmtaLkJdyIH2jp1i2vNoU`;
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          isLoaded: true,
          fixtureList: json.data.fixtures,
        });
      })
      .then(() => {
        this.state.fixtureList.forEach((fixture) => {
          Axios.get("http://localhost:3001/api/get", {
            params: {
              homeName: fixture.home_name,
              awayName: fixture.away_name,
            },
          })
            .then((response) => {
              this.setState({
                hasBeenSelectedHome: response.data[0].beenSelected,
                hasBeenSelectedAway: response.data[1].beenSelected,
              });
            })
            .then(() => {
              this.setState({
                fixes: this.state.fixes.concat({
                  id: fixture.id,
                  date: fixture.date,
                  time: fixture.time,
                  home_name: fixture.home_name,
                  away_name: fixture.away_name,
                  hasBeenSelectedHome: this.state.hasBeenSelectedHome,
                  hasBeenSelectedAway: this.state.hasBeenSelectedAway,
                }),
              });
            });
        });
      });
  }

  submitTeam = () => {
    Axios.post("http://localhost:3001/api/insert", {
      teamName: this.state.currentSelection,
      beenSelected: 1,
    }).then(() => {
      alert("successful insert");
    });
  };

  render() {
    var { isLoaded, fixes, currentSelection } = this.state;
    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="GetFixtures">
          <h1>This Weeks Fixtures</h1>
          <ul>
            {fixes.map((fixture) => (
              <li className="fixturesList" key={fixture.id}>
                {fixture.date} - {fixture.time}
                <button
                  onClick={() => {
                    this.setState({ currentSelection: fixture.home_name });
                  }}
                  className="btn btn-secondary btn-sm mr-1 ml-1"
                  disabled={fixture.hasBeenSelectedHome}
                >
                  {fixture.home_name}
                </button>
                vs
                <button
                  onClick={() => {
                    this.setState({ currentSelection: fixture.away_name });
                  }}
                  className="btn btn-secondary btn-sm mr-1 ml-1"
                  disabled={fixture.hasBeenSelectedAway}
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
