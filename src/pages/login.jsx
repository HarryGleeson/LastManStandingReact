import React from "react";
import "../App.css";
import Axios from "axios";

Axios.defaults.withCredentials = true;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loginStatus: "",
    };
  }

  login = () => {
    Axios.post("http://localhost:3001/api/login", {
      username: this.state.username,
      password: this.state.password,
    }).then((response) => {
      if (response.data.message) {
        this.setState({ loginStatus: response.data.message });
      } else {
        if (response.data[0].stillRemaining === 1) {
          this.props.history.push({
            pathname: "/select",
            state: { username: this.state.username },
          });
        } else {
          this.setState({
            loginStatus:
              "Sorry, you have been eliminated! Better luck next time!",
          });
        }
      }
    });
  };

  render() {
    return (
      <div className="LoginRegisterScreen">
        <div className="LoginRegister">
          <h1>Login</h1>
          <form>
            <p>Username</p>
            <input
              type="text"
              placeholder="Enter Username"
              onChange={(e) => {
                this.setState({ username: e.target.value });
              }}
            />
            <p>Password</p>
            <input
              type="password"
              placeholder="Enter Password"
              onChange={(e) => {
                this.setState({ password: e.target.value });
              }}
            />
          </form>
          <button
            onClick={this.login}
            className="btn btn-secondary btn-sm mr-1 ml-1"
          >
            Login
          </button>
          <a href="./register">Don't have an account?</a>
          <h3>{this.state.loginStatus}</h3>
        </div>
      </div>
    );
  }
}

export default Login;
