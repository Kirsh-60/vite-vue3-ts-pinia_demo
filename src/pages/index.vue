<template>
  <Panel />
</template>

<script setup lang="ts">
import { reactive, onMounted, provide } from "vue";
import Panel from "@/components/Panel/index.vue";

const data = reactive({
  dataCount: [
    {
      data: 0,
      type: "线上总内容",
      picUrl:
        "https://p3-armor.byteimg.com/tos-cn-i-49unhts6dw/288b89194e657603ff40db39e8072640.svg~tplv-49unhts6dw-image.image",
    },
    {
      data: 0,
      type: "投放中内容",
      picUrl:
        "https://p3-armor.byteimg.com/tos-cn-i-49unhts6dw/fdc66b07224cdf18843c6076c2587eb5.svg~tplv-49unhts6dw-image.image",
    },
    {
      data: 0,
      type: "日新增评论",
      picUrl:
        "https://p3-armor.byteimg.com/tos-cn-i-49unhts6dw/77d74c9a245adeae1ec7fb5d4539738d.svg~tplv-49unhts6dw-image.image",
    },
    {
      data: 0,
      type: "较昨日新增",
      picUrl:
        "https://p3-armor.byteimg.com/tos-cn-i-49unhts6dw/c8b36e26d2b9bb5dbf9b74dd6d7345af.svg~tplv-49unhts6dw-image.image",
    },
  ] as { data: number; type: string; picUrl: string }[],
  tableData: [
    {
      title: "新品手机",
      desc: "新品手机描述",
      status: 1,
      price: 1000,
    },
    {
      title: "旧款手机",
      desc: "旧款手机描述",
      status: 0,
      price: 500,
    },
  ],
});
onMounted(() => {
  // 模拟数据请求
  setTimeout(() => {
    data.dataCount = [
      {
        data: 3030,
        type: "线上总内容",
        picUrl:
          "https://p3-armor.byteimg.com/tos-cn-i-49unhts6dw/288b89194e657603ff40db39e8072640.svg~tplv-49unhts6dw-image.image",
      },
      {
        data: 632,
        type: "投放中内容",
        picUrl:
          "https://p3-armor.byteimg.com/tos-cn-i-49unhts6dw/fdc66b07224cdf18843c6076c2587eb5.svg~tplv-49unhts6dw-image.image",
      },
      {
        data: 8874,
        type: "日新增评论",
        picUrl:
          "https://p3-armor.byteimg.com/tos-cn-i-49unhts6dw/77d74c9a245adeae1ec7fb5d4539738d.svg~tplv-49unhts6dw-image.image",
      },
      {
        data: 2.8,
        type: "较昨日新增",
        picUrl:
          "https://p3-armor.byteimg.com/tos-cn-i-49unhts6dw/c8b36e26d2b9bb5dbf9b74dd6d7345af.svg~tplv-49unhts6dw-image.image",
      },
    ];
  }, 2000);
});
provide("data", data);
</script>
