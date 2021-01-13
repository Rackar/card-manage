import axios, { axiosInstance } from "axios";
import { Toast } from "vant";
import { router } from "./router";
let instance = axios.create({
  // baseURL: process.env.NODE_ENV === "production"
  //   ? "https://tools.codingyang.com/api"
  //   : "http://localhost:3006",
  // baseURL: import.meta.env.HOST,
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

instance.interceptors.response.use(
  function (response) {
    // 用户信息是否超时，重定向到登录页面
    // debugger;
    console.log(response);
    if (response.status === 401) {
      localStorage.clear();
      router.replace({
        path: "/login",
        // query: {
        //   redirect: router.currentRoute.fullPath
        // }
      });
      Toast("请登录后操作");
    }
    return response;
  },
  function (error) {
    // debugger;
    // console.log(error)
    if (error == "Error: Request failed with status code 401") {
      localStorage.clear();
      router.replace({
        path: "/login",
      });
      Toast("用户验证失败请重新登录");
    }
    // Do something with response error
    return Promise.reject(error);
  }
);

export { instance };
