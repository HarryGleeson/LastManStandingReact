import React, { useEffect } from "react";
import "../App.css";
import Axios from "axios";

Axios.defaults.withCredentials = true;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameReg: "",
      passwordReg: "",
      username: "",
      password: "",
      loginStatus: "",
    };
  }
  register = () => {
    Axios.post("http://localhost:3001/api/register", {
      username: this.state.usernameReg,
      password: this.state.passwordReg,
    }).then((response) => {
      alert(response);
    });
  };

  login = () => {
    Axios.post("http://localhost:3001/api/login", {
      username: this.state.username,
      password: this.state.password,
    }).then((response) => {
      if (response.data.message) {
        this.setState({ loginStatus: response.data.message });
      } else {
        this.props.history.push({
          pathname: "/select",
          state: { username: this.state.username },
        });
      }
    });
  };

  render() {
    return (
      <div className="LoginScreen">
        <div className="registration">
          <h3>Registration</h3>
          <label>Username</label>
          <input
            type="text"
            onChange={(e) => {
              this.setState({ usernameReg: e.target.value });
            }}
          />
          <label>Password</label>
          <input
            type="text"
            onChange={(e) => {
              this.setState({ passwordReg: e.target.value });
            }}
          />
          <button
            onClick={this.register}
            className="btn btn-secondary btn-sm mr-1 ml-1"
          >
            Register
          </button>
        </div>
        <div className="login">
          <h3>Password</h3>
          <label>Username</label>
          <input
            type="text"
            onChange={(e) => {
              this.setState({ username: e.target.value });
            }}
          />
          <label>Password</label>
          <input
            type="text"
            onChange={(e) => {
              this.setState({ password: e.target.value });
            }}
          />
          <button
            onClick={this.login}
            className="btn btn-secondary btn-sm mr-1 ml-1"
          >
            Login
          </button>
        </div>
        <h3>{this.state.loginStatus}</h3>
      </div>
    );
  }
}

export default Login;
