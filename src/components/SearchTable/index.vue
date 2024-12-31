<template>
  <el-form :model="searchform" :inline="true" label-width="auto" style="width: 100%">
    <el-form-item label="用户姓名">
      <el-input v-model="searchform.name" style="min-width: 200px" />
    </el-form-item>
    <el-form-item label="所在省份">
      <el-select
        v-model="searchform.region"
        placeholder="请选择"
        style="min-width: 200px"
      >
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="doSearch"
        ><el-icon><Search /></el-icon>查询</el-button
      >
      <el-button @click="doReset"
        ><el-icon><RefreshLeft /></el-icon>重置</el-button
      >
    </el-form-item>
  </el-form>
  <el-table :data="tableData" :border="tableOptions.border" style="width: 100%">
    <el-table-column fixed prop="date" label="Date" width="150" />
    <el-table-column prop="name" label="Name" width="120" />
    <el-table-column prop="state" label="State" width="120" />
    <el-table-column prop="city" label="City" width="320" />
    <el-table-column prop="address" label="Address" width="600" />
    <el-table-column prop="zip" label="Zip" />
  </el-table>
  <el-pagination
    v-model:current-page="tableOptions.pageSet.currentPage"
    v-model:page-size="tableOptions.pageSet.pageSize"
    :page-sizes="tableOptions.pageSet.size"
    :size="tableOptions.tableSize"
    :disabled="tableOptions.disabled"
    :background="tableOptions.background"
    layout="total, sizes, prev, pager, next, jumper"
    :total="tableOptions.pageSet.total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script lang="ts" setup>
import { ref, reactive, defineProps } from 'vue'

// 定义表格选项类型
interface TableOptions {
  disabled: boolean
  background: string
  tableSize: string
  border: boolean
  pageSet: {
    total: number
    size: number[]
    currentPage: number
    pageSize: number
  }
}
// 定义表格选项
const props = defineProps<{
  searchform: { [key: string]: any }
  tableData: { [key: string]: any }
  tableOptions: TableOptions
}>()
const searchform = reactive(props.searchform) // 搜索表单数据
const tableData = ref(props.tableData) // 表格数据
const tableOptions = ref(props.tableOptions) // 表格选项

const doSearch = () => { // 查询
  console.log('submit!')
}
const doReset = () => { // 重置
  console.log('reset!')
}
const handleSizeChange = (val: number) => { // 每页显示条数变化
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => { // 当前页变化
  console.log(`current page: ${val}`)
}
</script>

<style scoped>
.el-pagination {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end !important; /* 使用 flex-end 代替 right */
}
</style>
