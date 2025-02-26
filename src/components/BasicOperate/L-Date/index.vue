<template>
  <el-form-item :label="label" :prop="prop" style="width: 22rem">
    <el-date-picker
      v-model="modelValue"
      :type="dateOptions.dateType"
      :placeholder="placeholder"
      :value-format="dateOptions.valueFormat"
      :range-separator="dateOptions.rangeSeparator"
      :start-placeholder="dateOptions.startPlaceholder"
      :end-placeholder="dateOptions.endPlaceholder"
      :picker-options="dateOptions.pickerOptions"
      @change="updateValue"
    />
  </el-form-item>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
const modelValue = defineModel()
const props = defineProps<{
  label: string
  prop: string
  placeholder: string
  dateOptions: {
    dateType: string
    format: string
    valueFormat: string
    rangeSeparator: string
    startPlaceholder: string
    endPlaceholder: string
    pickerOptions: any
  }
}>()
const { label, prop, placeholder, dateOptions } = props
const emits = defineEmits(['update:modelValue'])

const updateValue = (value: any) => {
  emits('update:modelValue', value)
}
</script>
