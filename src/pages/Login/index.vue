<template>
    <el-row class="main-contenir">
        <el-col :lg="16" :md="12" class="left">
            <div>
                <div>欢迎光临</div>
                <div>Vjifen开发演示网站
                </div>
            </div>
        </el-col>
        <el-col :lg="8" :md="12" class="right">
            <h2 class="title">欢迎回来</h2>
            <div class="litter">
                <span class="line"></span>
                <span>账号密码登陆</span>
                <span class="line"></span>
            </div>
            <el-form :model="form" ref="ruleFormRef" class="w-[250px]" :rules="rules">
                <el-form-item prop="username">
                    <el-input v-model="form.username" placeholder="请输入用户名">
                        <template #prefix>
                            <el-icon class="el-input__icon">
                                <User />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="form.password" placeholder="请输入密码" show-password>
                        <template #prefix>
                            <el-icon class="el-input__icon">
                                <Lock />
                            </el-icon>
                        </template></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="w-250px" round color="#626aef" type="primary" @click="onSubmit(ruleFormRef)"
                        :loading="loading">登陆</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useRouter } from 'vue-router'
import { toast } from "@/composables/utils";

import { useUserInfoStore } from '@/store'
const store = useUserInfoStore()
const router = useRouter()

const loading = ref(false)
const form = reactive({
    username: '' as string,
    password: '' as string
})
const ruleFormRef = ref<FormInstance>() //获取form表单demo

interface RuleForm {// 定义接口类型
    username: string,
    password: string
}
const rules = reactive<FormRules<RuleForm>>({ //规则校验
    username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
    password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
})

const onSubmit = async (formEl: FormInstance | undefined) => { //提交表单
    if (!formEl) return
    await formEl.validate((valid: any, fields: any) => {
        if (valid) {
            console.log('submit!')
            loading.value = true
            let data = form
            store.login(data).then(() => {
                toast("登陆成功！");
                router.push('/') //跳转首页
            }).finally(() => {
                loading.value = false
            })
            //跳到首页  
        } else {
            console.log('error submit!', fields)
        }
    })
}


</script>
<style scoped>
.main-contenir {
    @apply min-h-screen bg-indigo-500;
}

.main-contenir .left {
    @apply flex items-center justify-center;
}

.left>div>div:first-child {
    @apply font-bold text-5xl text-light-50 mb-4;
}

.left>div>div:last-child {
    @apply text-1xl text-light-50;
}

.main-contenir .right {
    @apply bg-light-50 flex items-center justify-center flex-col;
}

.right .title {
    @apply font-bold text-3xl text-gray-800;
}

.right .litter {
    @apply flex items-center justify-center my-5 text-gray-300 space-x-2;
}

.litter .line {
    @apply h-[1px] w-16 bg-gray-200;
}
</style>