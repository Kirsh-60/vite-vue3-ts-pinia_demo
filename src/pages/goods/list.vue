<template>
  <search-table
    :searchform="searchform"
    :tableData="tableData"
    :tableOptions="tableOptions"
  />
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import SearchTable from '@/components/SearchTable/index.vue'
const searchform = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})
const tableData = ref([
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
])
const tableOptions = ref({
  disabled: false, // 是否禁用
  background: '', // 表格样式
  tableSize: '', // 表格尺寸
  border: true, // 是否显示纵向边框
  pageSet: {
    // 分页设置
    total: 400, // 总条数
    size: [10, 20, 30, 40], // 每页显示条数选项
    currentPage: 1, // 当前页
    pageSize: 10, // 每页显示条数
  },
})
</script>

<style scoped></style>
