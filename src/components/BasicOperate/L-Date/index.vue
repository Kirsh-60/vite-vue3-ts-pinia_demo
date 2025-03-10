<template>
  <el-form-item :label="label" :prop="field" style="width: 22rem">
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
// {
//       label: '日期',
//       field: 'date',
//       component: 'LDate',
//       dateOptions: {
//         dateType: 'daterange', // 日期类型，可选值为 date、daterange、datetime、datetimerange
//         format: 'yyyy-MM-dd', // 展示的日期格式 默认为 yyyy-MM-dd
//         valueFormat: 'yyyy-MM-dd', // 绑定值的日期格式 默认为 yyyy-MM-dd
//         rangeSeparator: '至', // 选择范围时的分隔符 默认为 ' - '
//         startPlaceholder: '开始日期', // 开始日期的占位内容 仅在daterange、datetimerange下有效
//         endPlaceholder: '结束日期', // 结束日期的占位内容 仅在daterange、datetimerange下有效
//         clearable: true, // 是否显示清空按钮 仅在非range下有效
//         editable: false, // 文本框是否可以输入 仅在非range下有效
//         arrowControl: true, // 是否使用箭头进行日期选择 仅在非range下有效
//         align: 'left', // 对齐方式，可选值为 left、center、right
//       },
//       required: true,
//       placeholder: '请选择日期',
//     },
const modelValue = defineModel()
interface Config {
  label: string
  field: string
  placeholder: string
  dateOptions: {
    dateType: string
    valueFormat: string
    rangeSeparator: string
    startPlaceholder: string
    endPlaceholder: string
    pickerOptions: any
    format: string
    clearable: boolean
    editable: boolean
    arrowControl: boolean
    align: string
  }
}
const props = defineProps<{ config: Config }>()
const { label, field, placeholder, dateOptions } = props.config
const emits = defineEmits(['update:modelValue'])

const updateValue = (value: any) => {
  emits('update:modelValue', value)
}
</script>
