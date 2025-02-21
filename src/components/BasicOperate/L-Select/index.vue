<template>
    <el-form-item :label="options.label" :prop="options.field">
        <el-select v-model="ruleForm[options.field]" placeholder="Activity zone">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
        </el-select>
    </el-form-item>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue"
const props = defineProps<{
    options: any
}>()
const { options } = props

const ruleForm = reactive<any>({})
console.log(options, 'optionsoptionsoptions');

Object.keys(options).forEach((key: string) => {
    ruleForm[key] = ""
})
</script>

<style lang="scss" scoped></style>
