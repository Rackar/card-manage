<template>
  <router-view></router-view>
  <!-- <img alt="Vue logo" src="./assets/logo.png" />
  <CardSingle v-for="card in cards" :key="card.id" :cardData="card" />
  haha
  <van-button type="primary">主要按钮</van-button>
  <van-button type="success">成功按钮</van-button>
  <van-button type="primary" size="large">大号按钮</van-button>
  <AddCard /> -->
</template>

<script>
import CardsList from "./components/CardsList.vue";
import AddCard from "./components/AddCard.vue";
import { store } from "./utils/store";
import { router } from "./utils/router";
export default {
  name: "App",
  components: {
    CardsList,
    AddCard,
  },
  setup() {
    var token = window.localStorage.token;
    if (token) {
      store.commit("login_saveToken", token);
    } else {
      router.push("/login");
    }
    let cards = [
      {
        name: "店名",
        hangye: "美食",
        type: 0,
        total: 3000,
        money: 1111,
        endDate: "20201010",
      },
      {
        name: "店名2",
        hangye: "美食2",
        type: 0,
        total: 600,
        money: 151,
        endDate: "20201010",
      },
    ];

    return { cards };
  },
};
</script>
