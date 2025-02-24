import { reactive, ref } from 'vue'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
const formSize = ref<ComponentSize>('default') // 默认表格大小
export const submitForm = async () => {
  if (ruleFormRef.value) {
    await ruleFormRef.value.validate((valid, fields) => {
      if (valid) {
        console.log('submit!')
      } else {
        console.log('error submit!', fields)
      }
    })
  }
}

export const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const ruleForm = reactive<any>({}) // 声明表单对象

const ruleFormRef = ref<FormInstance>() // 表单校验规则
const rules = reactive<FormRules<any>>({}) // 声明表单规则

export { ruleForm, ruleFormRef, rules, formSize }
