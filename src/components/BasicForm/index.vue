<template>
    <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto"
        class="demo-ruleForm" :size="formSize" status-icon>
        <template v-for="(options, index) in formOptions">
            <LInput v-if="options.component == 'LInput'" :options="options" @input-change="inputChange" />
            <LSelect v-if="options.component == 'LSelect'" :options="options" @select-change="selectChange" />
        </template>
        <!-- <el-form-item label="Activity zone" prop="region">
            <el-select v-model="ruleForm.region" placeholder="Activity zone">
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
            </el-select>
        </el-form-item>
        <el-form-item label="Activity count" prop="count">
            <el-select-v2 v-model="ruleForm.count" placeholder="Activity count" :options="options" />
        </el-form-item>
        <el-form-item label="Activity time" required>
            <el-col :span="11">
                <el-form-item prop="date1">
                    <el-date-picker v-model="ruleForm.date1" type="date" aria-label="Pick a date"
                        placeholder="Pick a date" style="width: 100%" />
                </el-form-item>
            </el-col>
            <el-col class="text-center" :span="2">
                <span class="text-gray-500">-</span>
            </el-col>
            <el-col :span="11">
                <el-form-item prop="date2">
                    <el-time-picker v-model="ruleForm.date2" aria-label="Pick a time" placeholder="Pick a time"
                        style="width: 100%" />
                </el-form-item>
            </el-col>
        </el-form-item>
        <el-form-item label="Instant delivery" prop="delivery">
            <el-switch v-model="ruleForm.delivery" />
        </el-form-item>
        <el-form-item label="Activity location" prop="location">
            <el-segmented v-model="ruleForm.location" :options="locationOptions" />
        </el-form-item>
        <el-form-item label="Activity type" prop="type">
            <el-checkbox-group v-model="ruleForm.type">
                <el-checkbox value="Online activities" name="type">
                    Online activities
                </el-checkbox>
                <el-checkbox value="Promotion activities" name="type">
                    Promotion activities
                </el-checkbox>
                <el-checkbox value="Offline activities" name="type">
                    Offline activities
                </el-checkbox>
                <el-checkbox value="Simple brand exposure" name="type">
                    Simple brand exposure
                </el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item label="Resources" prop="resource">
            <el-radio-group v-model="ruleForm.resource">
                <el-radio value="Sponsorship">Sponsorship</el-radio>
                <el-radio value="Venue">Venue</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="Activity form" prop="desc">
            <el-input v-model="ruleForm.desc" type="textarea" />
        </el-form-item> -->
        <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)">
                Create
            </el-button>
            <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import LInput from '@/components/BasicOperate/L-Input/index.vue'
import LSelect from '@/components/BasicOperate/L-Select/index.vue'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'

const props = defineProps<{
    formOptions: any
}>()
const { formOptions } = props
// interface RuleForm {
//     name: string
//     // region: string
//     // count: string
//     // date1: string
//     // date2: string
//     // delivery: boolean
//     // location: string
//     // type: string[]
//     // resource: string
//     // desc: string
// }

const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<any>({})

// const locationOptions = ['Home', 'Company', 'School']

const rules = reactive<FormRules<any>>({})

formOptions.forEach((option: any) => {
    if (option.required) {
        rules[option.field] = [
            { required: true, message: `请输入${option.label}`, trigger: 'blur' },
        ]
    }
})

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!', fields)
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
function inputChange(inputForm: any) { // 回调函数
    ruleForm[inputForm.label] = inputForm.value
}
</script>