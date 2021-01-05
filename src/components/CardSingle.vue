<template>
  <div class="my-card" v-if="state.cardShowed">
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
        <div><van-button @click="state.useShow = true">消费</van-button></div>
        <div><van-button @click="deleteCard">删除</van-button></div>
      </van-col>
    </van-row>
    <van-divider dashed></van-divider>
    <van-progress :percentage="50" stroke-width="3" pivot-text="过期还剩xx天" />
  </div>
  <van-dialog
    v-model:show="state.useShow"
    title="本次消费金额或次数（如储值请输入负数）"
    show-cancel-button
    @confirm="useCard"
  >
    <van-field
      v-model="state.number"
      :placeholder="state.money"
      type="number"
    />
    <!-- <van-button>确定</van-button> -->
  </van-dialog>
</template>

<script>
import { reactive, computed } from "vue";
import { instance } from "../utils/axios";
export default {
  props: {
    cardData: Object,
  },
  setup(props) {
    let state = props.cardData;
    state.cardShowed = true;
    state.useShow = false;
    state.number = null;
    // {
    //       name: "店名",
    //       hangye: "美食",
    //       type: 0,
    //       total: 3000,
    //       money: 1111,
    //       endDate: "20201010",
    //     };

    let rate = computed(() => (state.money / state.total) * 100);

    const useCard = () => {
      console.log("使用");
      instance
        .put("/api/cards", {
          card: { _id: state._id, changeMoney: state.number * -1 },
        })
        .then((data) => {
          console.log(data);
          if (data.data.status === 1) {
            console.log("修改成功");
          } else {
            console.log("修改不成功");
          }
        });
    };
    const deleteCard = () => {
      console.log(state);
      instance
        .delete("/api/cards", { params: { id: state._id } })
        .then((data) => {
          console.log(data);
          if (data.data.status === 1) {
            console.log("删除成功");
            state.cardShowed = false;
          } else {
            console.log("删除不成功");
          }
        });
    };
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