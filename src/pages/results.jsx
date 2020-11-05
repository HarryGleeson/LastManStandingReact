import React from "react";

class Results extends React.Component {
  render() {
    return (
      <div>
        <p>HERE {this.props.location.state.week}</p>
      </div>
    );
  }
}

export default Results;
