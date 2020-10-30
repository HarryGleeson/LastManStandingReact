import React from "react";
import "../App.css";
import Axios from "axios";

Axios.defaults.withCredentials = true;

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameReg: "",
      passwordReg: "",
    };
  }
  register = () => {
    Axios.post("http://localhost:3001/api/register", {
      username: this.state.usernameReg,
      password: this.state.passwordReg,
    }).then((response) => {
      this.props.history.push("/");
    });
  };

  render() {
    return (
      <div className="LoginRegisterScreen">
        <div className="LoginRegister">
          <h1>Registration</h1>
          <form>
            <p>Username</p>
            <input
              type="text"
              placeholder="Enter Username"
              onChange={(e) => {
                this.setState({ usernameReg: e.target.value });
              }}
            />
            <p>Password</p>
            <input
              type="password"
              placeholder="Enter Password"
              onChange={(e) => {
                this.setState({ passwordReg: e.target.value });
              }}
            />
          </form>
          <button
            onClick={this.register}
            className="btn btn-secondary btn-sm mr-1 ml-1"
          >
            Register
          </button>
        </div>
      </div>
    );
  }
}

export default Register;
