<template>
  <el-input
    v-model="modelValue"
    :placeholder="placeholder"
    @change="updateValue"
  />
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
const { placeholder } = props.config
const emits = defineEmits(['update:modelValue'])

const updateValue = (value: any) => {
  emits('update:modelValue', value)
}
</script>
