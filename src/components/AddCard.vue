<template>
  <h3>输入卡片信息</h3>
  <van-field
    label="商户名"
    v-model="state.name"
    name="pattern"
    placeholder="店名"
    :rules="[{ pattern, message: '请输入正确内容' }]"
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
    :rules="[{ pattern, message: '请输入正确内容' }]"
  />

  <van-cell
    style="text-align: left"
    title="选择截止日期"
    :value="state.endDate"
    @click="state.showCalendar = true"
  />
  <van-calendar
    v-model:show="state.showCalendar"
    :show-confirm="false"
    @confirm="onConfirm"
  />
  <van-button type="primary" @click="saveCard">保存卡信息</van-button>
</template>

<script>
import { reactive, ref } from "vue";
export default {
  setup() {
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
      state.endDate = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`;
      state.showCalendar = false;
    };

    const saveCard = () => {
      console.log(state);
    };

    return { state, pattern, checked, onConfirm, onConfirmHangye, saveCard };
  },
};
</script>
