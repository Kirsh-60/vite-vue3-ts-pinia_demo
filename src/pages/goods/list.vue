<template>
  <el-tabs v-model="tab">
    <el-tab-pane
      :label="item.name"
      :name="item.key"
      v-for="(item, index) in tabbars"
      :key="index"
    ></el-tab-pane>
  </el-tabs>
  <search-table
    :searchform="searchform"
    :tableData="tableData"
    :tableOptions="tableOptions"
  />
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { getGoodsList } from '@/api/goods'
import SearchTable from '@/components/SearchTable/index.vue'
import { singTable } from './singTable'
import { t } from '@element-plus/locale'

const searchform = reactive({
  name: '',
})
const tableData = ref([])
const tableOptions = ref({
  disabled: false, // 是否禁用
  background: '', // 表格样式
  tableSize: '', // 表格尺寸
  border: true, // 是否显示纵向边框
  singTable: singTable, // 表格配置
  tLoading: true, // 是否显示加载中
  pageSet: {
    // 分页设置
    total: 400, // 总条数
    size: [10, 20, 30, 40], // 每页显示条数选项
    currentPage: 1, // 当前页
    pageSize: 10, // 每页显示条数
  },
})
const tab = ref('all')
const tabbars = [
  {
    key: 'all',
    name: '全部',
  },
  {
    key: 'checking',
    name: '审核中',
  },
  {
    key: 'saling',
    name: '出售中',
  },
  {
    key: 'off',
    name: '已下架',
  },
  {
    key: 'min_stock',
    name: '库存预警',
  },
  {
    key: 'delete',
    name: '回收站',
  },
]

async function getData() {
  const result = (await getGoodsList(1, 2).finally(() => {
    tableOptions.value.tLoading = false
  })) as any
  tableData.value = result?.list || []
}
onMounted(() => {
  getData()
})
</script>

<style scoped></style>
