import { createRouter, createWebHashHistory } from "vue-router";
import CardsList from "../components/CardsList.vue";
import AddCard from "../components/AddCard.vue";

const routes = [
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: "CardsList" */ "../components/CardsList.vue"), },
  { path: "/add", component: () =>
      import(/* webpackChunkName: "AddCard" */ "../components/AddCard.vue"), },
  {
    name: "login",
    path: "/login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../components/login.vue"),
  },
  {
    name: "signup",
    path: "/signup",
    component: () =>
      import(/* webpackChunkName: "signup" */ "../components/signup.vue"),
  },
];

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});


export { router };
