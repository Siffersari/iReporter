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
        if (err.response.data.detail.includes("signature")) {
          alert.error("Please login in to continue");
          this.props.history.push("/login");
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

      return (
        <Fragment>
          <div className="container-fluid col-9">
            {flags.results.map(redflag => (
              <div className="card rounded" style={topMargin} key={redflag.id}>
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
