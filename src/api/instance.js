import axios from "axios";
import { isEmpty } from "lodash";
// import i18n from "../config/i18n";
import { BACKEND_CONTENT_TYPE, BACKEND_URL } from "../configs";

// const { API_VERSION, BACKEND_CONTENT_TYPE } = require("../config/variables");

const instance = axios.create({
  baseURL: BACKEND_URL + `/api/`,
  headers: {
    Accept: BACKEND_CONTENT_TYPE,
    "Content-Type": BACKEND_CONTENT_TYPE,
  }
});

instance.interceptors.request.use(function (config) {
  //   config.headers["Accept-Language"] = i18n.language;
  const token = localStorage.getItem("token");
  if (!isEmpty(token)) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
