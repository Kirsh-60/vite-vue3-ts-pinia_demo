<template>
  <!-- 固定高度，如 400px -->
  <div ref="chartRef" style="width: 100%; height: 250px"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as echarts from "echarts";

const chartRef = ref<HTMLDivElement | null>(null);

onMounted(() => {
  if (chartRef.value) {
    const chart = echarts.init(chartRef.value);
    const option = {
      tooltip: {},
      xAxis: {
        type: "category",
        boundaryGap: false, // 坐标轴两端留白策略
        data: ["2025-04-04", "2025-04-05", "2025-04-06", "2025-04-07", "2025-04-08", "2025-04-09"],
      },
      yAxis: { type: "value" },
      series: [
        {
          name: "访问量", // 系列名称
          type: "line", // 图表类型
          data: [20, 50, 91, 34, 29, 133, 10], // 数据
          smooth: true, // 平滑曲线
          lineStyle: {
            // 线条样式
            color: "#249eff", // 线条颜色
            width: 2, // 线条宽度
          },
          areaStyle: {
            // 区域填充样式 纵向渐变色 由白到#249eff
            color: {
              type: "linear",
              x: 0,
              y: 1,
              x2: 0,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: "#fff", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#249eff", // 100% 处的颜色
                },
              ],
            },
          },
        },
      ],
    };
    chart.setOption(option);
  }
});
</script>
