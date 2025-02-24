<template>
    <el-form-item :label="label" :prop="prop">
        <el-input v-model="modelValue" :placeholder="placeholder" @change="updateValue" />
    </el-form-item>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
const modelValue = defineModel()
const props = defineProps<{
    label: string,
    prop: string,
    placeholder: string
}>()
const { label, prop, placeholder } = props
const emits = defineEmits(['update:modelValue'])

const updateValue = (value: any) => {
    emits('update:modelValue', value)
}
</script>