<template>
  <div class="my-card" v-if="state.cardShowed">
    <van-row justify="space-between">
      <van-col span="6"
        ><div class="my-store-name">{{ state.name }}</div>
        <div class="my-store-hangye">{{ state.hangye }}</div></van-col
      >
      <van-col span="12" class="card-center">
        <div class="card-center-title">余额：</div>
        <van-circle v-model:current-rate="rate" :rate="100" :color="gradientColor" :stroke-width="60" :text="'' + currentMoney + '元'"
      /></van-col>
      <van-col span="6">
        <div class="card-right-button"><van-button size="small" type="primary" @click="state.useShow = true">消费</van-button></div>
        <div class="card-right-button"><van-button size="small" @click="state.detailShow = true">明细</van-button></div>
        <div class="card-right-button"><van-button size="small" type="warning" @click="deleteCard">删除</van-button></div>
      </van-col>
    </van-row>
    <van-divider dashed></van-divider>
    <van-progress :percentage="state.dayRate" stroke-width="3" :pivot-text="`过期还剩` + (state.leftDay < 1 ? state.leftDay : Math.round(state.leftDay)) + `天`" />
  </div>
  <van-dialog v-model:show="state.useShow" title="本次消费金额或次数（如储值请输入负数）" show-cancel-button @confirm="useCard">
    <van-field v-model="state.number" :placeholder="currentMoney" type="number" />
    <!-- <van-button>确定</van-button> -->
  </van-dialog>
  <van-dialog v-model:show="state.detailShow" title="历史明细：">
    <div>{{ new Date(state.createdAt).toLocaleDateString() }} : {{ state.money }}</div>
    <div v-for="log in state.log" :key="log._id">{{ new Date(log.changeDate).toLocaleDateString() }} : {{ log.detail }}</div>
  </van-dialog>
</template>

<script>
import { reactive, ref, computed } from "vue";
import { instance } from "../utils/axios";
import { Dialog } from "vant";
export default {
  props: {
    cardData: Object,
  },
  setup(props) {
    let state = reactive(props.cardData);
    state.cardShowed = true;
    state.detailShow = false;
    state.useShow = false;
    state.number = null;
    const gradientColor = {
      "0%": "#ff0000",
      "100%": "#6149f6",
    };
    // let currentMoney = computed(() => {
    //   let detail = state.log.reduce((prev, next) => prev.detail + next.detail);
    //   debugger;
    //   console.log(detail);
    //   return state.money + detail;
    // });

    // let rate = computed(() => (currentMoney / state.money) * 100);
    let currentMoney = ref(state.money);
    recalcCurrent();
    function recalcCurrent() {
      currentMoney.value = state.money;
      if (state.log && state.log.length) {
        let detail = state.log.map((log) => log.detail);
        let te = detail.reduce((p, n) => {
          return p + n;
        });
        currentMoney.value += te;
      }
    }

    // let rate = computed(() => (currentMoney.value / state.money) * 100);
    let rate = (currentMoney.value / state.money) * 100;
    if (rate > 100 || rate < 0.000001) rate = 0;
    // let currentMoney = state.total;
    // const calcRate = (log) => {
    //   log.forEach((e) => {
    //     currentMoney += e.detail;
    //   });
    // };

    // let allDay = calcDateDis(new Date(2021, 0, 4), state.endDate);
    // state.leftDay = calcDateDis(new Date(2021, 0, 6), state.endDate);

    let allDays = calcDateDis(state.createdAt, state.endDate);
    let leftDays = calcDateDis(Date.now(), state.endDate);
    state.dayRate = (leftDays / allDays) * 100;
    if (state.dayRate > 100 || state.dayRate < 0.000001) state.dayRate = 0;
    state.leftDay = leftDays < 0 ? 0 : Math.round(leftDays * 10) / 10;

    function calcDateDis(dateBegin, dateEnd) {
      let b = new Date(dateBegin).getTime();
      let e = new Date(dateEnd).getTime();
      return (e - b) / 3600 / 24 / 1000;
    }

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
            state.log.push({ detail: state.number * -1, _id: state._id, changeDate: Date.now() });
            recalcCurrent();
          } else {
            console.log("修改不成功");
          }
        });
    };
    const deleteCard = () => {
      console.log(state);
      // const beforeClose = (action, done) =>
      //   new Promise((resolve, reject) => {
      //     if (action === "confirm") {
      //       instance
      //         .delete("/api/cards", { params: { id: state._id } })
      //         .then((data) => {
      //           console.log(data);
      //           if (data.data.status === 1) {
      //             console.log("删除成功");
      //             state.cardShowed = false;
      //           } else {
      //             console.log("删除不成功");
      //           }
      //           resolve(true);
      //         })
      //         .catch(() => resolve(true));
      //     } else {
      //       // 拦截取消操作
      //       resolve(true);
      //       // done();
      //     }
      //   });

      Dialog.confirm({
        title: "删除",
        message: "确定删除本卡片？",
      })
        .then(() => {
          // on confirm
          instance.delete("/api/cards", { params: { id: state._id } }).then((data) => {
            console.log(data);
            if (data.data.status === 1) {
              console.log("删除成功");
              state.cardShowed = false;
            } else {
              console.log("删除不成功");
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    };
    return { state, rate, currentMoney, useCard, deleteCard, gradientColor };
  },
};
</script>
<style>
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
  font-weight: bold;
  font-size: 20px;
}
.my-store-hangye {
  padding-top: 16px;
  font-size: 16px;
  color: grey;
}
.card-right-button {
  margin-top: 4px;
  margin-bottom: 4px;
}

.card-center {
  position: relative;
}
.card-center-title {
  position: absolute;
  left: 0;
  right: 0;
  top: 15px;
  margin-left: auto;
  margin-right: auto;
  font-size: 12px;
  color: grey;
}
</style>
