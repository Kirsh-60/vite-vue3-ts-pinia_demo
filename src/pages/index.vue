<template>
    <div class="flex items-center justify-around">
        <div v-for="(item, index) in data.dataCount" :key="index"
            class="flex flex-col items-center justify-center w-1/6 bg-light-200 rounded-lg p-4 shadow-lg m-2"
            :style="{ backgroundColor: item.color }">
            <div class="text-center">
                <!-- 使用统一的 ref，Vue 会自动将多个引用收集到一个数组中 -->
                <div class="text-gray-500 text-sm">{{ item.type }}</div>
                <div ref="countupEls" class="text-1xl  text-gray-500 mt-2">
                    {{ item.data }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, nextTick } from 'vue'
import { CountUp } from 'countup.js'

// Vue 3 在 v-for 中多次使用相同的 ref 自动收集为数组
const countupEls = ref<HTMLElement[]>([])

const options = {
    duration: 2,
    separator: ',',
    decimal: '.',
    prefix: '',
    suffix: ''
}

const data = reactive({
    dataCount: [
        { data: 0, type: '数据总量', color: '#B7F4EC' },
        { data: 0, type: '文章总量', color: '#AFF0B5' },
        { data: 0, type: '用户总量', color: '#FEFEBE' },
        { data: 0, type: '评论总量', color: '#C3E7FE' },
        { data: 0, type: '访问量', color: '#f2f3f5' },
        { data: 0, type: '收藏量', color: '#FDC2DB' },
    ],
})

onMounted(() => {
    // 模拟数据请求
    setTimeout(async () => {
        data.dataCount = [
            { data: 3023123, type: '数据总量', color: '#B7F4EC' },
            { data: 5042312, type: '文章总量', color: '#AFF0B5' },
            { data: 2523, type: '用户总量', color: '#FEFEBE' },
            { data: 151223, type: '评论总量', color: '#C3E7FE' },
            { data: 70123, type: '访问量', color: '#f2f3f5' },
            { data: 30423423, type: '收藏量', color: '#FDC2DB' },
        ]
        // 等待 DOM 更新完成
        await nextTick()
        // 对每个数据项分别启动 CountUp 动画
        countupEls.value.forEach((el, index) => {
            if (el) {
                const c = new CountUp(el, data.dataCount[index].data, options)
                c.start()
            }
        })
    }, 2000)
})
</script>