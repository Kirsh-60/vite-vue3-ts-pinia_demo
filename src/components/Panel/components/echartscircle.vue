<template>
  <!-- 固定高度，如 400px -->
  <div ref="chartRef" style="width: 100%; height: 200px"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as echarts from "echarts";

const chartRef = ref<HTMLDivElement | null>(null);

onMounted(() => {
  if (chartRef.value) {
    const chart = echarts.init(chartRef.value);
    const option = {
      tooltip: {
        trigger: "item",
      },
      legend: {
        show: false,
        top: "5%",
        left: "center",
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: false },
        },
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false, // 是否避免标签重叠
          label: {
            // 标签样式
            show: false, // 是否显示标签
            position: "center", // 标签位置
          },
          emphasis: {
            // 鼠标悬停时的样式
            label: {
              show: true,
              fontSize: 40,
              fontWeight: "bold",
            },
          },
          labelLine: {
            // 标签线样式
            show: false,
          },
          data: [
            { value: 1048, name: "Search Engine" },
            { value: 735, name: "Direct" },
            { value: 580, name: "Email" },
            { value: 484, name: "Union Ads" },
            { value: 300, name: "Video Ads" },
          ],
        },
      ],
    };
    chart.setOption(option);
  }
});
</script>
