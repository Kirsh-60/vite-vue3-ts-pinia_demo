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
          v-if="scope.row.title != '11'"
          type="primary"
          link
          @click="editOrder()"
        >
          编辑
        </el-button>
      </template>
    </search-table>

    <!-- dialog弹窗组件 -->
    <BasicMode
      v-model:dialogVisible="dialogVisible"
      :dialog-props="dialogProps"
      :form-options="formOptions"
    >
    </BasicMode>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { confirm } from '@/utils/confirm'
import SearchTable from '@/components/SearchTable/index.vue'
import BasicMode from '@/components/BasicModel/index.vue'
import { singTable, searchForm, tabbars, formOptions } from './singTable'
import {
  tableData,
  tableModel,
  dialogProps,
  dialogVisible,
  handleAdd,
  editOrder,
  handleAvidete,
  searchTableRef,
} from './singTable/options.ts'
const tableOptions = tableModel(singTable, searchForm, tabbars)

onMounted(() => {})
</script>
