import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Redflag from "./redflags/Redflag";
import Flag from "./redflags/Flag";
import Post from "./redflags/Post";
import Header from "./layout/Header";

const alertOptions = {
  timeout: 3600,
  position: "top center"
};

export class App extends Component {
  render() {
    return (
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <Router>
          <Fragment>
            <Header />
            <div className="container">
              <Switch>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/redflags" component={Redflag} />
                <Route exact path="/flag" component={Flag} />
                <Route exact path="/postflag" component={Post} />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </AlertProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
