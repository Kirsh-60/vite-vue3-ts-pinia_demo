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

      <template #goods_name="{ scope }">
        {{ scope.row.goods_name }}
      </template>
      <template #desc="{ scope }">
        <el-button v-if="scope.row.title != '新品手机'" type="primary" link @click="editOrder()">
          编辑
        </el-button>
        <el-button v-if="scope.row.title != '新品手机'" type="primary" link @click="handleDelete(scope.row.id)">
          删除
        </el-button>
      </template>
    </search-table>

    <!-- dialog弹窗组件 -->
    <basic-mode v-model:dialogVisible="dialogVisible" :dialog-props="dialogProps" :form-options="formOptions"
      @onSave="afterSave">
      <!-- 自定义表单项 -->
      <template #customForm="{ scope }">
        <!-- 自定义表单项内容 -->
        <el-input v-model="scope.value.goods_name" :placeholder="scope.placeholder" />
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
const afterSave = (data: any) => {
  console.log('onSave 事件拿到的数据：', data)
  // 如果你不用组件内部 api，只想完全自己来：
  // await yourSaveApi(data)
  // 新增成功后，调用 SearchTable 暴露的 getData 或 refreshTable 方法刷新列表
  searchTableRef.value?.getData()
}

// 新增一个删除后刷新的方法
const handleDelete = async (id: string) => {
  await handleAvidete(id)
  // 调用 afterSave 来刷新列表
  afterSave(null)
}
onMounted(() => { })
</script>
