<template>
    <div ref="chartRef" style="width:600px; height:400px;"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref<HTMLDivElement | null>(null)

onMounted(() => {
    if (chartRef.value) {
        const chart = echarts.init(chartRef.value)
        const option = {
            title: {
                text: '柱状图示例'
            },
            tooltip: {},
            xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        }
        chart.setOption(option)
    }
})
</script>