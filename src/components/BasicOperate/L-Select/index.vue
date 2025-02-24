<template>
    <el-form-item :label="label" :prop="prop">
        <el-select v-model="modelValue" :placeholder="placeholder" @change="updateValue">
            <el-option v-for="selectItem in options" :key="selectItem.value" :label="selectItem.label" :value="selectItem.value"/>
        </el-select>
    </el-form-item>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
const modelValue = defineModel()
const props = defineProps<{
    label: string,
    prop: string,
    placeholder: string,
    options: Array<{ label: string, value: any }>
}>()
const { label, prop, placeholder } = props
const emits = defineEmits(['update:modelValue'])

const updateValue = (value: any) => {
    emits('update:modelValue', value)
}
</script>