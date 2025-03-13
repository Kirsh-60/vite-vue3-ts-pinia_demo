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
      <template #type="{ scope }">
        <el-tag type="primary" v-if="scope.row.level == 1">一级菜单</el-tag>
        <el-tag type="info" v-if="scope.row.level == 2">二级菜单</el-tag>
      </template>
      <template #icon="{ scope }">
        <component :is="scope.row.icon" class="icon-preview" />
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

import { singTable, searchForm } from './singTable'
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
const tableOptions = tableModel(singTable, searchForm, [])
const handleSave = () => {
  // 获取提供的 ruleForm
}
onMounted(() => {})
</script>
<style lang="scss" scoped>
/* 图标大小 14px */
.icon-preview {
  font-size: 18px;
  width: 18px;
  height: 18px;
  margin: 0 auto;
}
</style>
