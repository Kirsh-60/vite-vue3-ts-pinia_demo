<template>
  <el-form-item :label="label" :prop="field">
    <el-input
      v-model="modelValue"
      :placeholder="placeholder"
      @change="updateValue"
    />
  </el-form-item>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
const modelValue = defineModel()
interface Config {
  label: string
  field: string
  placeholder: string
}

const props = defineProps<{
  config: Config
}>()
const { label, field, placeholder } = props.config
const emits = defineEmits(['update:modelValue'])

const updateValue = (value: any) => {
  emits('update:modelValue', value)
}
</script>
