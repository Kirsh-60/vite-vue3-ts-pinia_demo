<template>
  <search-table
    ref="searchTableRef"
    :table-data="tableData"
    :table-options="tableOptions"
  >
  </search-table>
</template>

<script setup lang="ts">
import { ref, reactive, inject } from "vue";
import SearchTable from "@/components/SearchTable/Table.vue";
const data = inject<any>("data");
if (!data) {
  throw new Error("未找到 data 对象，请检查 provide/inject 配置");
}
const tableData = data.tableData;
const tableOptions = reactive({
  border: true,
  singTable: [
    {
      prop: "title",
      label: "标题",
      width: "",
      fixed: "left",
      align: "center",
    },
    {
      prop: "desc",
      label: "描述",
      width: "",
      fixed: "left",
      align: "center",
    },
    {
      prop: "status",
      label: "状态",
      width: "",
      fixed: "left",
      align: "center",
    },
    {
      prop: "price",
      label: "价格",
      width: "",
      fixed: "left",
      align: "center",
    },
  ],
  pageSet: {
    currentPage: 1,
    pageSize: 10,
    size: [10, 20, 30],
  },
  tableSize: "small",
  disabled: false,
  background: "#f5f7fa",
});
</script>

<style lang="scss" scoped></style>
