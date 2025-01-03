<template>
  <el-tabs v-model="tabSet.defaultSelect" @tab-change="changeTab()">
    <el-tab-pane
      v-for="(item, index) in tabSet.tabbers"
      :key="index"
      :label="item.name"
      :name="item.key"
    ></el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  tabSet: {
    key: string
    defaultSelect: string
    tabbers: { name: string; key: string }[]
  }
}>()
const tabSet = ref(props.tabSet)
console.log(tabSet.value, 'ddd')

function changeTab() {
  console.log('changeTab')
}
</script>

<style lang="scss" scoped></style>
