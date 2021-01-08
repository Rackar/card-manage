<template>
  <h3>输入卡片信息</h3>
  <van-field
    label="商户名"
    v-model="state.name"
    name="pattern"
    placeholder="店名"
    required
    error-message="店名不能为空"
  />
  <van-field
    v-model="state.hangye"
    readonly
    clickable
    label="行业"
    placeholder="可选择行业"
    @click="state.showPicker = true"
  />
  <van-popup v-model:show="state.showPicker" round position="bottom">
    <van-picker
      :columns="state.columns"
      @cancel="state.showPicker = false"
      @confirm="onConfirmHangye"
    />
  </van-popup>
  <van-field name="radio" label="卡类型">
    <template #input>
      <van-radio-group v-model="checked" direction="horizontal">
        <van-radio name="1">储值预存</van-radio>
        <van-radio name="2">计次</van-radio>
        <van-radio name="3">打折</van-radio>
      </van-radio-group>
    </template>
  </van-field>
  <van-field
    label="金额"
    v-model="state.money"
    name="pattern"
    placeholder="余额"
    required
    error-message="金额不能为空"
  />

  <van-cell
    style="text-align: left"
    title="选择截止日期"
    :value="state.endDate && state.endDate.toLocaleDateString()"
    @click="state.showCalendar = true"
  />
  <van-calendar
    v-model:show="state.showCalendar"
    :show-confirm="false"
    @confirm="onConfirm"
  />
  <van-button type="primary" @click="saveCard">保存卡信息</van-button>

  <router-link to="/"> <van-button>取消</van-button></router-link>
</template>

<script>
import { reactive, ref } from "vue";
import { instance } from "../utils/axios";
import { useRouter } from "vue-router";
export default {
  setup() {
    let router = useRouter();
    const state = reactive({
      name: "",
      money: "",
      hangye: "",
      endDate: "",
      showCalendar: false,

      showPicker: false,
      columns: ["超市", "美发", "健身", "娱乐", "其他消费"],
    });
    const pattern = /\d{6}/;

    const checked = ref("1");
    const onConfirmHangye = (value) => {
      state.hangye = value;
      state.showPicker = false;
    };
    const onConfirm = (date) => {
      state.endDate = date;
      state.showCalendar = false;
    };

    const saveCard = () => {
      console.log(state);
      let data = {
        name: state.name,
        money: state.money,
        hangye: state.hangye,
        endDate: state.endDate,
      };
      instance.post("/api/cards", { card: data }).then((res) => {
        console.log(res);
        if (res.status === 200) {
          router.push("/");
        }
      });
    };

    return { state, pattern, checked, onConfirm, onConfirmHangye, saveCard };
  },
};
</script>
