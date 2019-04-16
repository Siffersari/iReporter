import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAlert } from "react-alert";
import { register } from "../../actions/auth";
import { checkIsAuthenticated } from "../../actions/auth";

export class Register extends Component {
  state = {
    first_name: "",
    last_name: "",
    other_name: "",
    username: "",
    email: "",
    mobile_number: "",
    password: "",
    password2: ""
  };

  onSubmit = e => {
    e.preventDefault();

    const { alert } = this.props;

    const {
      first_name,
      last_name,
      other_name,
      username,
      email,
      mobile_number,
      password,
      password2
    } = this.state;

    if (password !== password2) {
      alert.error("Passwords don't match");
    } else {
      const newUser = {
        first_name,
        last_name,
        other_name,
        username,
        email,
        mobile_number,
        password
      };

      register(newUser, this.props);
    }
  };

  onChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    });

  render() {
    const {
      first_name,
      last_name,
      other_name,
      username,
      email,
      mobile_number,
      password,
      password2
    } = this.state;

    if (localStorage.getItem("token")) {
      checkIsAuthenticated(this.props);
    }

    return (
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Register</h2>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                className="form-control"
                name="first_name"
                onChange={this.onChange}
                value={first_name}
              />
            </div>
            <div className="form-group">
              <label>Middle Name</label>
              <input
                type="text"
                className="form-control"
                name="other_name"
                onChange={this.onChange}
                value={other_name}
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                className="form-control"
                name="last_name"
                onChange={this.onChange}
                value={last_name}
              />
            </div>
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
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={this.onChange}
                value={email}
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                className="form-control"
                name="mobile_number"
                onChange={this.onChange}
                value={mobile_number}
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
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                name="password2"
                onChange={this.onChange}
                value={password2}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default withAlert()(Register);
