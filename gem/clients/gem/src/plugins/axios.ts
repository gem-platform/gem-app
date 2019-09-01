import store from "@/store";
import axios from "axios";

const port = process.env.VUE_APP_GEM_APP_PORT;
if (!port) {
  throw Error("No port of a backend provided");
}
axios.defaults.baseURL = "http://localhost:" + port;

axios.interceptors.request.use(
  config => {
    // @ts-ignore
    const token = store.state.auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(undefined, err => {
  return new Promise((resolve, reject) => {
    if (
      err.response.status === 401 &&
      err.response.config &&
      !err.response.config.__isRetryRequest &&
      store.getters["auth/isAuthenticated"]
    ) {
      store.commit("auth/logout");
    }
    reject(err);
  });
});
