import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import axios from "axios";
import { getTokenConfig } from "../../actions/auth";

export class Redflag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flags: [],
      isError: null,
      isLoaded: null
    };
  }

  fetchNext(data) {
    const { alert } = this.props;
    if (data.next) {
      this.getFlags(data.next);
      window.scroll(0, 0);
    } else alert.error("No more redflags to display");
  }

  fetchPrevious(data) {
    const { alert } = this.props;
    if (data.previous) {
      this.getFlags(data.previous);
      window.scroll(0, 0);
    } else alert.error("No more redflags to display");
  }

  getFlags(url) {
    const { alert } = this.props;
    const config = getTokenConfig();
    axios
      .get(url, config)
      .then(res => {
        this.setState({
          flags: res.data,
          isLoaded: true
        });
      })
      .catch(err => {
        this.setState({
          isError: true
        });
        if (
          err.response.data.detail.includes("signature") ||
          err.response.data.detail.includes("expired")
        ) {
          alert.error("Please login in to continue");
          this.props.history.push("/login");
        } else {
          this.props.history.push("/login");
        }
      });
  }

  deleteFlag(id) {
    const { alert } = this.props;
    const config = getTokenConfig();
    axios
      .delete(
        `https://ireporter-drf-api-staging.herokuapp.com/api/redflags/${id}/`,
        config
      )
      .then(res => {
        alert.success("Redflag Deleted Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch(err => {
        this.setState({
          isError: true
        });

        if (err.response.data.detail) {
          if (err.response.data.detail.includes("signature")) {
            alert.error("Please login in to continue");
            this.props.history.push("/login");
          }
        } else if (err.response.data.error) {
          alert.error(err.response.data.error);
        }
      });
  }

  componentDidMount() {
    this.getFlags(
      "https://ireporter-drf-api-staging.herokuapp.com/api/redflags/"
    );
  }

  render() {
    if (this.state.isLoaded) {
      const { flags } = this.state;

      const path = window.location.href.split("#")[0];

      const topMargin = {
        marginTop: "1.5em",
        marginBottom: "1.5em"
      };

      const noDecoration = {
        textDecoration: "none"
      };

      const buttonLink = {
        color: "white",
        textDecoration: "none"
      };

      return (
        <Fragment>
          <div className="container-fluid col-9">
            {flags.results.map(redflag => (
              <div
                className="card rounded shadow-lg p-3 mb-5 bg-white rounded"
                style={topMargin}
                key={redflag.id}
              >
                <object
                  data="https://picsum.photos/200/300/?random"
                  type="image/png"
                >
                  <img
                    src={[
                      "https://ireporter-drf-api-staging.herokuapp.com" +
                        redflag.Image
                    ]}
                    alt=""
                    className="card-img-top"
                  />
                </object>

                <div className="card-body">
                  <h3 className="card-title">
                    {" "}
                    <a
                      href={"" + path + `#/flag/?fid=${redflag.id}`}
                      style={noDecoration}
                    >
                      <strong>{redflag.title}</strong>
                    </a>
                  </h3>
                  <span>
                    {" "}
                    Created By:{" "}
                    <p className="text-muted">{redflag.createdBy}</p>
                  </span>{" "}
                  <span>
                    {" "}
                    Created On:{" "}
                    <p className="text-muted">{redflag.createdOn}</p>
                  </span>{" "}
                  <span>
                    {" "}
                    Location: <p className="text-muted">{redflag.location}</p>
                  </span>{" "}
                  <span>
                    {" "}
                    Status: <p className="badge ">{redflag.status}</p>
                  </span>{" "}
                  <p className="card-text">{redflag.comment}</p>
                  <div className="btn-group mt-4 mr-5">
                    <button className="btn btn-primary ">
                      <a
                        href={"" + path + `#/updateflag/?fid=${redflag.id}`}
                        style={buttonLink}
                      >
                        {" "}
                        Update Record
                      </a>
                    </button>
                    <button
                      className="btn btn-danger ml-4"
                      onClick={() => {
                        this.deleteFlag(redflag.id);
                      }}
                    >
                      Delete Record
                    </button>
                  </div>
                  <div className="btn-group ml-5 mt-4">
                    <a href={redflag.facebook}>
                      <i className="fab fa-facebook fa-2x" />
                    </a>
                    <a href={redflag.twitter}>
                      <i className="fab fa-twitter fa-2x ml-4" />
                    </a>
                    <a href={redflag.linkedIn}>
                      <i className="fab fa-linkedin fa-2x ml-4" />
                    </a>
                    <a href={redflag.mail}>
                      <i className="fas fa-envelope-open fa-2x ml-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="container-fluid col-9">
            <div className="d-flex align-items-center justify-content-center h-100">
              <nav aria-label="Page navigation " className="mx-auto">
                <ul className="pagination">
                  <li className="page-item">
                    <a
                      className="page-link"
                      onClick={() => {
                        this.fetchPrevious(flags);
                      }}
                    >
                      Previous
                    </a>
                  </li>

                  <li className="page-item">
                    <button
                      className="page-link"
                      onClick={() => {
                        this.fetchNext(flags);
                      }}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </Fragment>
      );
    } else if (this.state.isError) {
      return (
        <div className="d-flex justify-content-center mt-5">
          <h2 className="text-center mt-5">
            SORRY, THIS REQUEST COULD NOT BE COMPLETED
          </h2>
        </div>
      );
    } else {
      const divStyle = {
        width: "10rem",
        height: "10rem",
        marginTop: "18em"
      };
      return (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" style={divStyle} role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }
  }
}

export default withAlert()(Redflag);
