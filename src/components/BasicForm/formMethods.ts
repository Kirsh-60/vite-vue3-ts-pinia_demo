import { reactive, ref } from 'vue'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
const formSize = ref<ComponentSize>('default') // 默认表格大小

export const resetForm = async () => {
  const formEl = ruleFormRef.value
  if (!formEl) return
  formEl.resetFields()
  Object.keys(ruleForm).forEach(key => delete ruleForm[key]) // 重置表单数据
}

const ruleForm = reactive<any>({}) // 声明表单对象

const ruleFormRef = ref<FormInstance>() // 表单校验规则
const rules = reactive<FormRules<any>>({}) // 声明表单规则

export { ruleForm, ruleFormRef, rules, formSize }
