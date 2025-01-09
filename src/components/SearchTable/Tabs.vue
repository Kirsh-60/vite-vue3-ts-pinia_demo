<template>
  <el-tabs v-model="tabSet.defaultSelect" @tab-change="changeTab()">
    <el-tab-pane v-for="(item, index) in tabSet.tabbers" :key="index" :label="item.name" :name="item.key"></el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const emit = defineEmits(["tabChange"]);
const props = defineProps<{
  tabSet: {
    key: string
    defaultSelect: string
    tabbers: { name: string; key: string }[]
  }
}>()
const tabSet = ref(props.tabSet)

function changeTab() { // 切换选项卡
  emit("tabChange", tabSet.value.defaultSelect)
}
</script>

<style lang="scss" scoped></style>
