<template>
    <el-form-item :label="options.label" :prop="options.field">
        <el-input v-model="ruleForm[options.field]" @change="inputChange()" />
    </el-form-item>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue"
const props = defineProps<{
    options: any
}>()
const emit = defineEmits(['input-change'])
const { options } = props

const ruleForm = reactive<any>({})
console.log(options, 'optionsoptionsoptions');

Object.keys(options).forEach((key: string) => {
    ruleForm[key] = ""
})
function inputChange() {
    console.log(ruleForm[options.field])
    emit('input-change', { label: options.field, value: ruleForm[options.field] })
}
</script>

<style lang="scss" scoped></style>