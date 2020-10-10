import React from "react";
import { Link } from "react-router-dom";

class Submit extends React.Component {
  render() {
    return (
      <div>
        <h3>You have selected: {this.props.location.state.selection}</h3>
        <Link to="/">
          <button className="btn btn-primary btn-sm">Home</button>
        </Link>
      </div>
    );
  }
}

export default Submit;
