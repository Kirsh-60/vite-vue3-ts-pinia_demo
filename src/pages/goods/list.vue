<template>
  <div>
    <!-- 查询&表格组件 -->
    <search-table
      ref="searchTableRef"
      :table-data="tableData"
      :table-options="tableOptions"
    >
      <template #handleOptions>
        <el-button size="small" type="primary" @click="handleAdd()"
          >新增</el-button
        >
        <el-button size="small" @click="handleAvidete()">表单校验</el-button>
        <el-button size="small" @click="handleAvidete()">获取数据</el-button>
        <el-button size="small" @click="handleAvidete()">设置值</el-button>
        <el-button size="small" @click="handleAvidete()">清空选中</el-button>
      </template>

      <template #title="{ scope }">
        {{ scope.row.title }}
      </template>
      <template #desc="{ scope }">
        <el-button
          v-if="scope.row.title != '新品手机'"
          type="primary"
          link
          @click="editOrder()"
        >
          编辑
        </el-button>
      </template>
    </search-table>

    <!-- dialog弹窗组件 -->
    <basic-mode
      v-model:dialogVisible="dialogVisible"
      :dialog-props="dialogProps"
      :form-options="formOptions"
      @onSave="handleSave"
    >
      <!-- 自定义表单项 -->
      <template #customForm="{ scope }">
        <!-- 自定义表单项内容 -->
        <el-input
          v-model="scope.value.username"
          :placeholder="scope.placeholder"
        />
      </template>
    </basic-mode>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'

import { singTable, searchForm, tabbars, formOptions } from './singTable'
import {
  tableData,
  tableModel,
  dialogProps,
  searchTableRef,
} from './singTable/options.ts'
import {
  dialogVisible,
  handleAdd,
  editOrder,
  handleAvidete,
} from './singTable/baseApi.ts'
const tableOptions = tableModel(singTable, searchForm, tabbars)
const handleSave = () => {
  // 获取提供的 ruleForm
}
onMounted(() => {})
</script>
