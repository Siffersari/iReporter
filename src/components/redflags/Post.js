import React, { Component } from "react";
import { withAlert } from "react-alert";
import { postFlag } from "../../actions/redflag";
import { checkToken } from "../../actions/auth";

export class Post extends Component {
  constructor(props) {
    super(props);
    this.onFormChange = this.onFormChange.bind(this);
    this.state = {
      title: "",
      comment: "",
      location: "",
      image: ""
    };
  }

  onSubmit = e => {
    e.preventDefault();

    const { title, comment, location, image } = this.state;

    const formData = new FormData();

    formData.append("image", image);
    formData.append("title", title);
    formData.append("comment", comment);
    formData.append("location", location);

    postFlag(formData, this.props);
  };

  onChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    });

  onFormChange = e => {
    this.setState({
      image: e.target.files[0]
    });
  };

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
          <h2 className="text-center">Create Redflag</h2>
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
              <label>Image</label>
              <input
                type="file"
                className="form-control"
                name="image"
                onChange={this.onFormChange}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Create Record
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withAlert()(Post);
