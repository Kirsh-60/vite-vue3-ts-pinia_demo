<template>
  <el-select
    v-model="modelValue"
    :placeholder="placeholder"
    @change="updateValue"
  >
    <el-option
      v-for="selectItem in componentProps.options"
      :key="selectItem.value"
      :label="selectItem.label"
      :value="selectItem.value"
    />
  </el-select>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
const modelValue = defineModel()
interface Config {
  placeholder: string
  label: string
  field: string
  componentProps: {
    options: Array<{ value: any; label: string }>
  }
}

const props = defineProps<{
  config: Config
}>()
const { placeholder, componentProps } = props.config
const emits = defineEmits(['update:modelValue'])

const updateValue = (value: any) => {
  emits('update:modelValue', value)
}
</script>
