<template>
  <router-link to="/add"> <van-button type="primary" class="add-button" color="linear-gradient(to right, rgb(5, 100, 210), rgb(25, 137, 250))">添加新会员卡</van-button></router-link>

  <CardSingle v-for="card in state.cards" :key="card.id" :cardData="card" />

  <router-link to="/add" v-if="state.cards.length > 3">
    <van-button type="primary" class="add-button" color="linear-gradient(to right, rgb(5, 100, 210), rgb(25, 137, 250))">添加新会员卡</van-button></router-link
  >

  <div class="card-info" v-if="!state.cards || !state.cards.length">管理你储值过的各种会员卡，并提醒余额和有效期</div>
</template>

<script>
import { reactive } from "vue";
import CardSingle from "./CardSingle.vue";
// import axios from "axios";
import { instance } from "../utils/axios";
export default {
  name: "App",
  components: {
    CardSingle,
  },
  setup() {
    let state = reactive({
      cards: [],
    });

    const getAllCards = () => {
      instance.get("/api/cards").then((data) => {
        console.log(data);
        if (data && data.data && data.data.data && data.data.data.length) {
          console.log(data.data.data);
          state.cards = data.data.data;
        }
      });
    };

    getAllCards();
    return { state, getAllCards };
  },
  onMounted() {
    getAllCards();
  },
};
</script>
<style>
.add-button {
  box-shadow: rgb(99, 99, 99) 2px 2px 6px;
}
.card-info {
  margin: 10px;
}
</style>
