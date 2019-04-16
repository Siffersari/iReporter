import axios from "axios";
import jwt from "jsonwebtoken";

export const register = (user, currentProps) => {
  const { alert } = currentProps;

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  let body = JSON.stringify(user);

  axios
    .post(
      "https://ireporter-drf-api-staging.herokuapp.com/api/auth/signup/",
      body,
      config
    )
    .then(res => {
      body = {
        token: res.data.token,
        uid: res.data.id
      };
      activate(body, config, currentProps);
    })
    .catch(err => {
      if (err.response.data.first_name)
        alert.error(`First Name: ${err.response.data.first_name.join()}`);
      if (err.response.data.last_name)
        alert.error(`Last Name: ${err.response.data.last_name.join()}`);
      if (err.response.data.non_field_errs)
        alert.error(err.response.data.non_field_errs.join());
      if (err.response.data.other_name)
        alert.error(`Middle Name: ${err.response.data.other_name.join()}`);
      if (err.response.data.username)
        alert.error(`Username: ${err.response.data.username.join()}`);
      if (err.response.data.email)
        alert.error(`Email: ${err.response.data.email.join()}`);
      if (err.response.data.password)
        alert.error(`Password: ${err.response.data.password.join()}`);
    });
};

export const login = (credentials, currentProps) => {
  const { alert } = currentProps;

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  let body = JSON.stringify(credentials);
  axios
    .post(
      "https://ireporter-drf-api-staging.herokuapp.com/api/auth/login/",
      body,
      config
    )
    .then(res => {
      localStorage.setItem("token", res.data.token);

      currentProps.history.push("/redflags");

      setTimeout(() => {
        window.location.reload();
      }, 500);
    })
    .catch(err => {
      if (err.response.data.message) alert.error(err.response.data.message);
    });
};

export const activate = (body, config, currentProps) => {
  const { alert } = currentProps;
  axios
    .post(
      "https://ireporter-drf-api-staging.herokuapp.com/api/auth/activate/",
      body,
      config
    )
    .then(res => {
      alert.success(res.data.message);
    })
    .catch(err => {
      alert.error("Sorry, your account might not be active. Try again later");
    });
};

export const getTokenConfig = (contentType = "application/json") => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      "Content-Type": contentType
    }
  };

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
};

export const checkToken = props => {
  const config = getTokenConfig();
  const token = localStorage.getItem("token");
  if (jwt.decode(token)) {
    return false;
  } else {
    axios
      .get(
        "https://ireporter-drf-api-staging.herokuapp.com/api/redflags/",
        config
      )
      .then(res => {})
      .catch(err => {
        if (err.response.data.detail) {
          if (
            err.response.data.detail.includes("signature") ||
            err.response.data.detail.includes("expired")
          ) {
            props.history.push("/login");
            return true;
          }
        }
      });
  }
  return true;
};

export const checkIsAuthenticated = props => {
  const config = getTokenConfig();
  const token = localStorage.getItem("token");

  if (jwt.decode(token)) {
    props.history.push("/redflags");
  } else {
    axios
      .get(
        "https://ireporter-drf-api-staging.herokuapp.com/api/redflags/",
        config
      )
      .then(res => {
        props.history.push("/redflags");
      })
      .catch(err => {});
  }
};
