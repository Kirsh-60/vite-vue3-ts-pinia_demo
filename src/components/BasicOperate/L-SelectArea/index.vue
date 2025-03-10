<template>
  <el-form-item :label="label" :prop="field">
    <el-cascader
      :props="propcCascader"
      v-model="modelValue"
      :placeholder="placeholder"
      :options="areaList"
      :clearable="componentProps.clearable"
      @change="updateValue"
      style="width: 50%"
    />
  </el-form-item>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import { areaList } from '@/assets/area.ts'

const modelValue = defineModel()
interface Config {
  label: string
  field: string
  placeholder: string
  areaList: any[]
  componentProps: {
    clearable: boolean
    multiple: boolean
    checkStrictly: boolean
  }
}

const props = defineProps<{
  config: Config
}>()
const { label, field, placeholder, componentProps } = props.config
console.log('componentProps', label, field, placeholder, componentProps)
const propcCascader = {
  multiple: componentProps.multiple, // 多选
  checkStrictly: componentProps.checkStrictly, // 严格的父子节点选中状态
}
const emits = defineEmits(['update:modelValue'])

const updateValue = (value: any) => {
  emits('update:modelValue', value)
}
</script>
