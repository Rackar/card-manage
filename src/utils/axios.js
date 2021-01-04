import axios, { axiosInstance } from "axios";

let instance = axios.create({
  baseURL: "http://localhost:3006",
  timeout: 50000 * 2,
});

instance.interceptors.request.use(
  (config) => {
    var token = window.localStorage.token;
    config.headers = {
      "Content-Type": " application/json",
    };
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // config.headers[] = localStorage.token;
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
export { instance };
