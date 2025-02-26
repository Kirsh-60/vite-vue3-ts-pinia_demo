<template>
  <el-form-item :label="label" :prop="prop">
    <el-checkbox-group
      v-model="modelValue"
      :placeholder="placeholder"
      @change="updateValue"
    >
      <el-checkbox
        v-for="(item, index) in options"
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
const props = defineProps<{
  label: string
  prop: string
  placeholder: string
  options: Array<{ label: string; value: any; disabled?: boolean }>
}>()
const { label, prop, placeholder } = props
const emits = defineEmits(['update:modelValue'])

const updateValue = (value: any) => {
  emits('update:modelValue', value)
}
</script>
