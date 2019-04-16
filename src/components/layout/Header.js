import React, { Component } from "react";
import { Link } from "react-router-dom";
import { checkToken } from "../../actions/auth";

export class Header extends Component {
  render() {
    const authLinks = (
      <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
        {" "}
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
      </ul>
    );

    const userLinks = (
      <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
        <li className="nav-item">
          <Link to="/redflags" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/postflag" className="nav-link">
            Create Redflag
          </Link>
        </li>
      </ul>
    );
    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <a className="navbar-brand" href="#">
              iReporter{" "}
            </a>
          </div>
          {checkToken(this.props) ? authLinks : userLinks}
        </div>
      </nav>
    );
  }
}

export default Header;
