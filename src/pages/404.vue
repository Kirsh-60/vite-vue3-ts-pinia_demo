<template>
    <el-result icon="warning" title="404" sub-title="您访问的页面丢失了~">
        <template #extra>
            <el-button type="primary"><router-link to="/">返回</router-link></el-button>
        </template>
    </el-result>
</template>