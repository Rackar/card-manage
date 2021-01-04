import { createStore } from "vuex";

// Create a new store instance.
const store = createStore({
  state() {
    return {
      count: 0,
      temp: {
        ifTemp: false,
        title: "",
        content: "",
      },
      token: "",
      userid: "",
      username: "",
      currentPerson: {
        articles: [],
        name: "",
        _id: "",
        info: "",
      },
    };
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    login_saveToken(state, tokenWithB) {
      console.log("保存token");
      let token = tokenWithB.split(" ")[1]
        ? tokenWithB.split(" ")[1]
        : tokenWithB;
      let userinfo = setUserIdAndNameFormToken(token);
      state.userid = userinfo.userid;
      state.username = userinfo.username;
      state.token = token;
      window.localStorage.setItem("token", token);
      function parseJwt(token) {
        let secPart = token.split(".")[1];
        let userString = decodeURIComponent(
          escape(window.atob(secPart.replace(/-/g, "+").replace(/_/g, "/")))
        );

        return JSON.parse(userString);
      }
      function setUserIdAndNameFormToken(token) {
        let payloadInfo = parseJwt(token);
        let result = {
          userid: payloadInfo.userid,
          username: payloadInfo.username,
        };
        return result;
      }
    },

    logout_delToken(state) {
      state.token = "";
      window.localStorage.removeItem("token");

      // console.log(dd);
      state.userid = "";
      state.username = "";
    },
    saveTempContent(state, data) {
      state.temp.title = data.title;
      state.temp.content = data.content;
      state.temp.ifTemp = true;
    },
    setCurrentPerson(state, data) {
      state.currentPerson = data;
    },
  },
});

export { store };
