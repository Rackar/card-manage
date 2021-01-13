<template>
  <van-form @submit="saveCard">
    <h3>输入卡片信息</h3>
    <van-field
      label="商户名"
      v-model="state.name"
      name="pattern"
      placeholder="店名"
      :rules="[{ required: true, message: '请填入商户名' }]"
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
      type="number"
      placeholder="储值金额"
      :rules="[{ required: true, message: '请输入可用余额或次数' }]"
    />

    <van-cell
      style="text-align: left"
      title="选择截止日期"
      :value="state.endDate && state.endDate.toLocaleDateString()"
      @click="state.showCalendar = true"
      :rules="[{ required: true, message: '请填入商户名' }]"
    />
    <!-- <van-calendar v-model:show="state.showCalendar" :show-confirm="false" @confirm="onConfirm" /> -->
    <van-popup v-model:show="state.showCalendar" position="bottom">
      <van-datetime-picker
        v-model="state.endDate"
        type="date"
        title="选择年月日"
        :min-date="state.minDate"
        @confirm="onConfirm"
      />
    </van-popup>
    <van-button type="primary" native-type="submit">保存卡信息</van-button>

    <router-link to="/"> <van-button>取消</van-button></router-link>
  </van-form>
</template>

<script>
import { reactive, ref } from "vue";
import { instance } from "../utils/axios";
import { config } from "../utils/config";
import { useRouter } from "vue-router";
import { Toast } from "vant";
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
      columns: ["餐饮", "超市", "美发", "酒店", "健身", "娱乐", "其他"],
      minDate: new Date(),
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
      if (!state.endDate) {
        Toast("请填入截止日期");
      } else {
        instance.post(config("api/cards").URL, { card: data }).then((res) => {
          console.log(res);
          if (res.status === 200) {
            router.push("/");
          }
        });
      }
    };

    return { state, pattern, checked, onConfirm, onConfirmHangye, saveCard };
  },
};
</script>
