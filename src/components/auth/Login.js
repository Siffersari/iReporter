import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAlert } from "react-alert";
import { login } from "../../actions/auth";
import { checkIsAuthenticated } from "../../actions/auth";

export class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  onSubmit = e => {
    e.preventDefault();

    const { username, password } = this.state;

    const newUser = {
      username,
      password
    };

    login(newUser, this.props, this.state);

    this.setState({
      isAuthenticated: true
    });
  };

  onChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    });

  render() {
    const { username, password } = this.state;

    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");

      checkIsAuthenticated(this.props);
    }

    return (
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Login </h2>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                onChange={this.onChange}
                value={username}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={this.onChange}
                value={password}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default withAlert()(Login);
