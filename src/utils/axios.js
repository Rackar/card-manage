import axios, { axiosInstance } from "axios";
import { Toast } from "vant";
import {router} from "./router"
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

instance.interceptors.response.use(
  function(response) {
    // 用户信息是否超时，重定向到登录页面
    // debugger;
    console.log(response)
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
      Toast("请登录后操作");
    }
    // Do something with response error
    return Promise.reject(error);
  }
);

export { instance };
