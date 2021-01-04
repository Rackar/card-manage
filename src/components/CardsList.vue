<template>
  我的会员卡
  <router-link to="/add">
    <van-button type="primary" size="large"
      >添加新会员卡</van-button
    ></router-link
  >

  <CardSingle v-for="card in state.cards" :key="card.id" :cardData="card" />

  <div v-if="!state.cards || !state.cards.length">尚未添加会员卡</div>
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
