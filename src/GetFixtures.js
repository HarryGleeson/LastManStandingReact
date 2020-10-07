import React, { Component } from "react";
import "./App.css";

class GetFixtures extends Component {
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
          <ul>
            {items.data.fixtures.map((item) => (
              <li key={item.id}>
                {item.date} - {item.time}
                <button
                  onClick={() => {
                    this.setState({ currentSelection: item.home_name });
                  }}
                  className="btn btn-primary btn-sm"
                >
                  {item.home_name}
                </button>
                vs
                <button
                  onClick={() => {
                    this.setState({ currentSelection: item.away_name });
                  }}
                  className="btn btn-danger btn-sm"
                >
                  {item.away_name}
                </button>
              </li>
            ))}
          </ul>
          Current Selection: {this.state.currentSelection}
        </div>
      );
    }
  }
}

export default GetFixtures;
