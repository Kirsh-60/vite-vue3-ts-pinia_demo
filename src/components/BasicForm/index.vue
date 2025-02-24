<template>
    <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto"
        class="demo-ruleForm" :size="formSize" status-icon>
        <template v-for="(options) in compile">
            <!-- 输入框 -->
            <LInput v-if="options.component == 'LInput'" :label="options.label" :prop="options.field"
                v-model="ruleForm[options.field]" :placeholder="options.placeholder" />
            <!-- 选择器 -->
            <LSelect v-if="options.component == 'LSelect'" :label="options.label" :prop="options.field"
                v-model="ruleForm[options.field]" :placeholder="options.placeholder"
                :options="options.componentProps.options" />
        </template>
        <el-form-item v-if="isShowFormBtn">
            <el-button size="small" type="primary" @click="submitForm()">
                保存
            </el-button>
            <el-button size="small" @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>


import LInput from '@/components/BasicOperate/L-Input/index.vue'
import LSelect from '@/components/BasicOperate/L-Select/index.vue'
import { submitForm, resetForm, ruleForm, ruleFormRef, rules, formSize } from './formMethods'

const props = defineProps<{
    formOptions: any
}>()
const { compile, isShowFormBtn: showFormBtn } = props.formOptions // 获取组件传递值
const isShowFormBtn = showFormBtn ?? true // 是否显示按钮

// 遍历表单配置，生成表单验证规则
compile.forEach((option: any) => {
    if (option.required) {
        rules[option.field] = [
            { required: true, message: `请输入${option.label}`, trigger: ['blur', 'change'] },
        ]
    }
})

function logs() {
    console.log('log')
}
defineExpose({
    logs, submitForm, resetForm
})
</script>