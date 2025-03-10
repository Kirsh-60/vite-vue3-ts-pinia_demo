<template>
  <el-form-item :label="label" :prop="field">
    <el-checkbox-group
      v-model="modelValue"
      :placeholder="placeholder"
      @change="updateValue"
    >
      <el-checkbox
        v-for="(item, index) in componentProps.options"
        :key="index"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
      />
    </el-checkbox-group>
  </el-form-item>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
const modelValue = defineModel()
interface Config {
  label: string
  field: string
  placeholder: string
  componentProps: {
    options: Array<{ value: any; label: string; disabled: boolean }>
  }
}
const props = defineProps<{
  config: Config
}>()
const { label, field, placeholder, componentProps } = props.config
console.log('props', field)
const emits = defineEmits(['update:modelValue'])

const updateValue = (value: any) => {
  emits('update:modelValue', value)
}
</script>
