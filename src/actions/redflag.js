import axios from "axios";
import { getTokenConfig } from "./auth";

export const postFlag = (flag, currentProps) => {
  const { alert } = currentProps;

  const config = getTokenConfig("multipart/form-data");

  axios
    .post(
      "https://ireporter-drf-api-staging.herokuapp.com/api/redflags/",
      flag,
      config
    )
    .then(res => {
      alert.success("Redflag record created successfully");
      currentProps.history.push("/redflags");
    })
    .catch(err => {
      if (err.response.data.title)
        alert.error(`Title: ${err.response.data.title.join()}`);
      if (err.response.data.comment)
        alert.error(`Comment: ${err.response.data.comment.join()}`);
      if (err.response.data.non_field_errs)
        alert.error(err.response.data.non_field_errs.join());
      if (err.response.data.location)
        alert.error(`Location: ${err.response.data.location.join()}`);
      if (err.response.data.detail.includes("signature")) {
        alert.error("Please login in to continue");
        currentProps.history.push("/login");
      } else {
        currentProps.history.push("/login");
      }
    });
};
