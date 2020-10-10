import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../App.css";

class GetFixtures extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      currentSelection: "",
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
          items: json,
        });
      });
  }

  render() {
    var { isLoaded, items } = this.state;
    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="GetFixtures">
          <h1>This Weeks Fixtures</h1>
          <ul>
            {items.data.fixtures.map((item) => (
              <li className="fixturesList" key={item.id}>
                {item.date} - {item.time}
                <button
                  onClick={() => {
                    this.setState({ currentSelection: item.home_name });
                  }}
                  className="btn btn-secondary btn-sm mr-1 ml-1"
                >
                  {item.home_name}
                </button>
                vs
                <button
                  onClick={() => {
                    this.setState({ currentSelection: item.away_name });
                  }}
                  className="btn btn-secondary btn-sm mr-1 ml-1"
                >
                  {item.away_name}
                </button>
              </li>
            ))}
          </ul>
          Current Selection: {this.state.currentSelection}
          <Link
            to={{
              pathname: "/submit",
              className: "btn btn-secondary btn-sm",
              state: {
                selection: this.state.currentSelection,
              },
            }}
          >
            <button
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
