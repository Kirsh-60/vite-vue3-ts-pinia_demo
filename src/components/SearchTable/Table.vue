<template>
    <el-table :data="props.tableData" :border="props.tableOptions.border" style="width: 100%"
        v-loading="props.tLoading">
        <el-table-column v-for="(item, index) in props.tableOptions.singTable" :key="index" :prop="item.prop"
            :label="item.label" :width="item.width" :fixed="item.fixed" :align="item.align">
            <template v-if="item.custom">
                <slot :name="item.prop" />
            </template>
            <template v-if="item.prop === 'desc'">
                <slot name="desc" />
            </template>
        </el-table-column>
    </el-table>
    <el-pagination v-model:current-page="props.tableOptions.pageSet.currentPage"
        v-model:page-size="props.tableOptions.pageSet.pageSize" :page-sizes="props.tableOptions.pageSet.size"
        :size="props.tableOptions.tableSize" :disabled="props.tableOptions.disabled"
        :background="props.tableOptions.background" layout="total, prev, pager, next, jumper"
        :total="props.totalCount" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
</template>

<script setup lang="ts">
import { defineProps } from "vue"
const emit = defineEmits(["sizeChange", "currentChange"]);
const props = defineProps<{
    tableOptions: {
        border: boolean,
        singTable: any,
        pageSet: {
            currentPage: number,
            pageSize: number,
            size: number[]
        },
        tableSize: string,
        disabled: boolean,
        background: string
    },
    tableData: any[],
    tLoading: boolean,
    totalCount: number,
    showOperate: boolean
}>()

const handleSizeChange = (val: number) => {
    // 每页显示条数变化
    emit("sizeChange", val)
}

const handleCurrentChange = (val: number) => {
    // 当前页变化
    emit("currentChange", val)
}

</script>

<style lang="scss" scoped>
.el-pagination {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end !important;
    /* 使用 flex-end 代替 right */
}
</style>
