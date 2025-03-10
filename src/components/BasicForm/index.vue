<template>
  <el-form
    ref="ruleFormRef"
    style="max-width: 100%"
    :model="ruleForm"
    :rules="rules"
    label-width="auto"
    class="demo-ruleForm"
    :size="formSize"
  >
    <template v-for="options in compile">
      <!-- 输入框 -->
      <LInput
        v-if="options.component == 'LInput'"
        v-model="ruleForm[options.field]"
        :config="options"
      />
      <!-- 选择器 -->
      <LSelect
        v-if="options.component == 'LSelect'"
        v-model="ruleForm[options.field]"
        :config="options"
      />
      <!-- 时间选择器 -->
      <LDate
        v-if="options.component == 'LDate'"
        v-model="ruleForm[options.field]"
        :config="options"
      />
      <!-- 复选框选择器 -->
      <LCheckBox
        v-if="options.component == 'LCheckBox'"
        :config="options"
        v-model="ruleForm[options.field]"
      />
      <!-- 选择器 -->
      <LSelectArea
        v-if="options.component == 'LSelectArea'"
        v-model="ruleForm[options.field]"
        :config="options"
      />
      <!-- 编辑器 -->
      <LEdit
        ref="editRef"
        v-if="options.component == 'LEdit'"
        :label="options.label"
        :prop="options.field"
        v-model="ruleForm[options.field]"
        :placeholder="options.placeholder"
      />
    </template>
    <el-form-item
      v-if="isShowFormBtn"
      align="center"
      style="justify-content: center"
    >
      <el-button size="small" type="primary" @click="validateForm()"
        >保存</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import LInput from '@/components/BasicOperate/L-Input/index.vue'
import LSelect from '@/components/BasicOperate/L-Select/index.vue'
import LEdit from '@/components/BasicOperate/L-Edit/index.vue'
import LDate from '@/components/BasicOperate/L-Date/index.vue'
import LCheckBox from '@/components/BasicOperate/L-CheckBox/index.vue'
import LSelectArea from '@/components/BasicOperate/L-SelectArea/index.vue'
import {
  resetForm,
  ruleForm,
  ruleFormRef,
  rules,
  formSize,
} from './formMethods'

const editRef = ref(null) // 富文本编辑器实例

const props = defineProps<{
  formOptions: any
}>()
const { compile, isShowFormBtn: showFormBtn } = props.formOptions // 获取组件传递值
const isShowFormBtn = showFormBtn ?? true // 是否显示按钮

// 表单验证规则
const validateForm = () => {
  return new Promise((resolve, reject) => {
    if (ruleFormRef.value) {
      ruleFormRef.value.validate((valid, fields) => {
        if (valid) {
          resolve(true) // 验证通过，返回 true
        } else {
          reject(fields) // 验证失败，返回错误字段
        }
      })
    } else {
      reject(new Error('Form reference is not available')) // 表单引用不可用
    }
  })
}

// 遍历表单配置，生成表单验证规则
compile.forEach((option: any) => {
  console.log(option, 'option')

  if (option.required) {
    rules[option.field] = [
      {
        required: true,
        message: option.placeholder
          ? option.placeholder
          : `请输入${option.label}`,
        trigger: ['blur', 'change'],
      },
    ]
  }
})

defineExpose({
  resetForm,
  validateForm,
})
</script>
