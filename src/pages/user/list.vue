<template>
  <div>
    <div style="width: 500px; height: 500px">
      <van-circle
        v-model:current-rate="currentRate"
        :rate="rate"
        :speed="speed"
        :text="text"
      />
    </div>
    <van-button type="primary" @click="rateAdd()">加+</van-button>
    <van-button type="primary" @click="rateCone()">减-</van-button>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
const currentRate = ref(0);
const rate = ref(20);
const speed = ref(80);
const text = computed(() => currentRate.value.toFixed(0) + "%");
const rateAdd = () => {
  rate.value += 10;
  // currentRate.value = rate.value;
  // speed.value = 80;
};
const rateCone = () => {
  rate.value -= 10;
  // currentRate.value = rate.value;
  // speed.value = 80;
};
</script>
<style scoped lang="scss"></style>
