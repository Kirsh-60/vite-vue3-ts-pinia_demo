<template>
  <search-table ref="searchTableRef" :tableData="tableData" :tableOptions="tableOptions">
    <template v-slot:title="{ scope }">
      <pre>{{ scope.title }}</pre> <!-- 调试 scope 内容 -->
    </template>
  </search-table>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { getGoodsList } from '@/api/goods'
import SearchTable from '@/components/SearchTable/index.vue'
import { singTable, searchForm, tabbars } from './singTable'

const searchTableRef = ref(null)
const tableData = ref([])
const tableOptions = ref({
  disabled: false, // 是否禁用
  background: "", // 表格样式
  tableSize: '', // 表格尺寸
  border: true, // 是否显示纵向边框
  singTable: singTable, // 表格配置
  searchForm: searchForm, // 搜索表单配置
  showOperate: true, // 是否显示操作列
  api: getGoodsList, // 请求接口
  tabSet: {
    // 选项卡设置
    key: 'tab',
    defaultSelect: 'all',
    tabbers: tabbars,
  },
  pageSet: {
    // 分页设置
    size: [10, 20, 30, 40], // 每页显示条数选项
    currentPage: 1, // 当前页
    pageSize: 10, // 每页显示条数
  },
})
onMounted(() => { })
</script>

<style scoped></style>
