<template>
  <div>
    <!-- 查询&表格组件 -->
    <search-table ref="searchTableRef" :table-data="tableData" :table-options="tableOptions">
      <template #handleOptions>
        <el-button size="small" type="primary" @click="handleAdd()">新增</el-button>
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
        <el-button type="primary" link @click="editOrder(scope.row)"> 编辑 </el-button>
        <i style="width: 10px; display: inline-block"></i>
        <el-dropdown @command="(command: any) => handleCommand(command, scope.row)" trigger="click">
          <span class="el-dropdown-link" style="line-height: 24px; color: #409eff">
            更多
            <el-icon class="">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="addSon">添加下级</el-dropdown-item>
              <el-dropdown-item command="dataRule">数据规则</el-dropdown-item>
              <el-dropdown-item command="defaultPage">设置默认首页</el-dropdown-item>
              <el-dropdown-item command="detele">删除</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </search-table>

    <!-- dialog弹窗组件 -->
    <basic-mode v-model:dialogVisible="dialogVisible" :dialog-props="dialogProps" :form-options="formOptions"
      @onSave="handleSave">
      <!-- 自定义表单项 -->
      <template #customForm="{ scope }">
        <!-- 自定义表单项内容 -->
        <el-input v-model="scope.value.username" :placeholder="scope.placeholder" />
      </template>
    </basic-mode>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { singTable, searchForm, formOptions } from './singTable'
import { confirm } from '@/utils/confirm'

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
const handleCommand = async (command: string | number | object, scope: any) => {
  console.log(command)
  console.log(scope)
  if (command === 'addSon') {
    // 添加下级
  } else if (command === 'dataRule') {
    // 数据规则
  } else if (command === 'defaultPage') {
    // 设置默认首页
    const isConfirmed = await confirm('确认设置成默认首页吗？', '确认')
    if (isConfirmed) {
      // 关闭操作
    } else {
      // 取消操作
    }
  } else if (command === 'detele') {
    // 删除
    const isConfirmed = await confirm(`确认删除 “${scope.name}” 吗？`, '确认')
    if (isConfirmed) {
      // 关闭操作
    } else {
      // 取消操作
    }
  }
}
onMounted(() => { })
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
<style scoped>
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
