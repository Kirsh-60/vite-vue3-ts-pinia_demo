<template>
    <div
        v-for="(item, index) in data.dataCount || []"
        :key="index"
        class="flex flex-col items-center justify-center w-1/4 rounded-lg p-3 m-2 box-border"
      >
        <div class="text-center">
          <!-- 使用统一的 ref，Vue 会自动将多个引用收集到一个数组中 -->
          <div class="flex justify-center items-center ">
            <div class="w-10 h-10 mr-2 flex justify-center items-center frosted-container">
              <img :src="item.picUrl" alt="图片加载失败"></img>
            </div>
            <div>
              <div class="text-gray-500 text-sm">{{ item.type }}</div>
              <div class="flex justify-center mt-2 items-baseline">
                <div ref="countupEls" class="text-2xl text-gray-500">
                  {{ item.data }}
                </div>
                <text class="text-gray-500 text-xs ml-1">{{
                  item.type == "较昨日新增" ? "%" : "个"
                }}</text>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>

<script setup lang="ts">
import { ref, watch,inject } from "vue";
import { CountUp } from "countup.js";

interface Data {
  dataCount: Array<{ picUrl: string; type: string; data: number }>;
}

const data = inject<Data>("data");
if (!data) {
  throw new Error("未找到 data 对象，请检查 provide/inject 配置");
}

// Vue 3 在 v-for 中多次使用相同的 ref 自动收集为数组
const countupEls = ref<HTMLElement[]>([]);

const options = {
  duration: 2,
  separator: ",",
  decimal: ".",
  prefix: "",
  suffix: "",
};
watch(
  () => data?.dataCount,
  (newVal) => {
    // 当数据变化时，重新启动动画
    if (newVal) {
      countupEls.value.forEach((el, index) => {
        if (el) {
          const c = new CountUp(el, newVal[index]?.data || 0, options);
          c.start();
        }
      });
    }
  },
  { immediate: true }
);
</script>

<style>
image{
    width: 100%;
    height: 100%;
}
</style>
