import React, { Component } from "react";
import { withAlert } from "react-alert";
import { editFlag } from "../../actions/redflag";
import { checkToken } from "../../actions/auth";

export class Update extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      comment: "",
      location: ""
    };
  }
  onSubmit = e => {
    e.preventDefault();

    const { alert } = this.props;

    const flagId = window.location.href.split("=")[1];

    const { title, comment, location } = this.state;

    let flag = {};

    if (title) {
      flag = {
        title
      };
    } else if (comment) {
      flag = {
        comment
      };
    } else if (location) {
      flag = {
        location
      };
    } else if (title && comment) {
      flag = {
        title,
        comment
      };
    } else if (title && comment && location) {
      flag = {
        title,
        comment,
        location
      };
    } else if (!title && !comment && !location) {
      alert.error("Please provide at least one field to update");
    }

    if (Object.keys(flag).length > 0) {
      editFlag(flag, flagId, this.props);
    }
  };

  onChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    });

  render() {
    const { title, comment, location } = this.state;

    if (!localStorage.getItem("token")) {
      this.props.history.push("/login");
    } else {
      checkToken(this.props);
    }

    return (
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Update Redflag</h2>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                className="form-control"
                name="title"
                onChange={this.onChange}
                value={title}
              />
            </div>
            <div className="form-group">
              <label>Comment</label>
              <input
                type="text"
                className="form-control"
                name="comment"
                onChange={this.onChange}
                value={comment}
              />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                className="form-control"
                name="location"
                onChange={this.onChange}
                value={location}
              />
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Update Record
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withAlert()(Update);
