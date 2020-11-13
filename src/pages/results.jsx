import React from "react";
import Axios from "axios";

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      week: this.props.location.state.week,
      //NEED TO FIX FINISHED VARIBALE**
      //finished: this.props.location.state.gameWeekFinished,
      finished: true,
      users: [],
    };
  }

  componentDidMount() {
    Axios.get("http://localhost:3001/api/getUsers")
      .then((response) => {
        this.setState({ users: response.data });
      })
      .then(() => {
        var finished = this.state.finished;
        if (finished) {
          this.processResults();
        }
        for (var i = 0; i < this.state.users.length; i++) {
          Axios.post("http://localhost:3001/api/insertFinalSelection", {
            username: this.state.users[i]["Username"],
            teamName: this.state.users[i]["currentSelection"],
          }).then(() => {
            console.log("Successful insert");
            alert("successful insert");
          });
        }
      });
  }

  processResults() {
    for (let n = 0; n < this.state.users.length; n++) {
      Axios.get("http://localhost:3001/api/getResult", {
        params: {
          venue: this.state.users[n]["selectionVenue"],
          team: this.state.users[n]["currentSelection"],
        },
      }).then((response) => {
        var result = response.data[0]["result"];
        if (
          (this.state.users[n]["selectionVenue"] === "home" && result !== 1) ||
          (this.state.users[n]["selectionVenue"] === "away" && result !== 2)
        ) {
          console.log("Eliminating: " + this.state.users[n]["Username"]);
          Axios.post("http://localhost:3001/api/eliminateUser", {
            username: this.state.users[n]["Username"],
          }).then(() => {
            alert("successful insert");
          });
        }
      });
    }
  }

  render() {
    return (
      <div>
        <p>HERE {this.state.week}</p>
      </div>
    );
  }
}

export default Results;
