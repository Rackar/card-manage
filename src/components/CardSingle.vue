<template>
  <div class="my-card">
    <van-row justify="space-between">
      <van-col span="6"
        ><div class="my-store-name">{{ state.name }}</div>
        <div class="my-store-hangye">{{ state.hangye }}</div></van-col
      >
      <van-col span="12"
        ><van-circle
          v-model:current-rate="rate"
          :rate="100"
          :stroke-width="60"
          :text="'余额：' + state.money + '元'"
      /></van-col>
      <van-col span="4">
        <div><van-button @click="useCard">消费</van-button></div>
        <div><van-button @click="deleteCard">删除</van-button></div>
      </van-col>
    </van-row>
    <van-divider dashed></van-divider>
    <van-progress :percentage="50" stroke-width="3" pivot-text="过期还剩xx天" />
  </div>
</template>

<script>
import { reactive, computed } from "vue";
export default {
  props: {
    cardData: Object,
  },
  setup(props) {
    let state = props.cardData;
    // {
    //       name: "店名",
    //       hangye: "美食",
    //       type: 0,
    //       total: 3000,
    //       money: 1111,
    //       endDate: "20201010",
    //     };

    let rate = computed(() => (state.money / state.total) * 100);

    const useCard = () => {};
    const deleteCard = () => {};
    return { state, rate, useCard, deleteCard };
  },
};
</script>
<style >
.my-card {
  margin: 26px 16px;
  min-height: 160px;
  padding: 10px 4px;
  border-radius: 10px;
  /* background-color: grey; */
  border: 1px solid rgb(202, 202, 202);
  text-align: center;
  box-shadow: rgb(99, 99, 99) 3px 3px 12px;
}
.my-store-name {
  line-height: 34px;

  font-size: 20px;
}
.my-store-hangye {
  padding-top: 10px;
  font-size: 16px;
  color: grey;
}
</style>