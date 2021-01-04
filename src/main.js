import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import Vant from "vant";
import "vant/lib/index.css";
import { createRouter, createWebHashHistory } from "vue-router";
import { store } from "./utils/store";

import CardsList from "./components/CardsList.vue";
import AddCard from "./components/AddCard.vue";
const routes = [
  { path: "/", component: CardsList },
  { path: "/add", component: AddCard },
  {
    name: "login",
    path: "/login",
    component: () =>
      import(/* webpackChunkName: "login" */ "./components/login.vue"),
  },
  {
    name: "signup",
    path: "/signup",
    component: () =>
      import(/* webpackChunkName: "signup" */ "./components/signup.vue"),
  },
];

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});

let app = createApp(App);
app.use(Vant);
app.use(router);
app.use(store);
app.mount("#app");
