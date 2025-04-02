<template>
  <el-radio-group v-model="modelValue" :placeholder="placeholder" @change="updateValue">
    <template v-for="(item) in componentProps.options">
      <el-radio :value="item.value">{{ item.label }}</el-radio>
    </template>
  </el-radio-group>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import { ruleForm } from '@/components/BasicForm/formMethods'
const modelValue = defineModel()
interface Config {
  label: string
  field: string
  placeholder: string
  componentProps: {
    options: Array<{ value: any; label: string; disabled: boolean }>
    defaultValue: Number
  }
}
const props = defineProps<{
  config: Config,
}>()
const { field, placeholder, componentProps } = props.config
console.log('props', field)
const emits = defineEmits(['update:modelValue'])

const updateValue = (value: any) => {
  emits('update:modelValue', value)
}
// 设置默认值
if (ruleForm[field]) {
  modelValue.value = ruleForm[field]
} else {
  modelValue.value = componentProps.defaultValue
}
</script>
