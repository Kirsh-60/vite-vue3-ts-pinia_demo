<template>
    <div class="container">
        <el-dialog v-model="props.dialogVisible" :fullscreen="fullscreen" :width="props.dialogProps.width" title="Tips"
            destroy-on-close :before-close="handleClose" draggable :show-close="false" :close-on-click-modal="false"
            :align-center="true">
            <template #header="{ close, titleId, titleClass }">
                <div class="my-header">
                    <h4 :id="titleId" :class="titleClass" class="flex items-center">
                        <SvgIcon :name="props.dialogProps.icon" width="20px" height="20px"></SvgIcon>
                        <text style="font-size: 16px;">{{ props.dialogProps.title }}</text>
                    </h4>
                    <div class="dialog-btn">
                        <el-tooltip v-if='!fullscreen' class="box-item" content="全屏" placement="bottom">
                            <el-icon @click="fullscreen = true">
                                <FullScreen />
                            </el-icon>
                        </el-tooltip>
                        <el-tooltip v-else class="box-item" content="半屏" placement="bottom">
                            <el-icon @click="fullscreen = false">
                                <Aim />
                            </el-icon>
                        </el-tooltip>
                        <el-tooltip class="box-item" content="关闭弹窗" placement="bottom">
                            <el-icon @click="close">
                                <CircleClose />
                            </el-icon>
                        </el-tooltip>
                    </div>
                </div>
                <el-divider />
            </template>
            <div style="min-height: 300px;">
                <!-- <BasicForm ref="basicFormRef" :formOptions="formOptions" /> -->
                <slot></slot>
            </div>
            <el-divider />
            <template #footer>
                <div class="dialog-footer text-center">
                    <el-button size="small" @click="closeDialog()">关闭</el-button>
                    <el-button size="small" type="primary" @click="handleSave()">保存</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { confirm } from '@/utils/confirm';
import BasicForm from '@/components/BasicForm/index.vue';

const props = defineProps(['dialogVisible', 'dialogProps']);
const emit = defineEmits(['update:dialogVisible']);
const fullscreen = ref(false);
const basicFormRef = ref(null);
const formOptions = {
    // isShowFormBtn: true, // 是否显示表单按钮 默认为true
    compile: [
        {
            label: '姓名',
            field: 'name',
            component: 'LInput',
            required: true,
            placeholder: '请输入姓名',
        },
        {
            label: '性别',
            field: 'sex',
            component: 'LSelect',
            required: true,
            placeholder: '请选择性别',
            componentProps: {
                options: [
                    { label: '男', value: 1 },
                    { label: '女', value: 2 },
                    { label: '未知', value: 3 },
                ],
            },
        },
    ],
}
// 处理关闭操作
const handleClose = async () => {
    const isConfirmed = await confirm('确认关闭吗？', '确认');
    if (isConfirmed) {
        // console.log('执行关闭操作');
        closeDialog();
    } else {
        // console.log('取消关闭');
    }
}

// 关闭对话框的函数
function closeDialog(): void {
    emit('update:dialogVisible', false);
}

// 处理保存操作
async function handleSave() {
    callLogs();
    // const isConfirmed = await confirm('确认保存吗？', '确认');
    // if (isConfirmed) {
    //     // console.log('执行删除操作');
    //     closeDialog();
    // } else {
    //     // console.log('取消删除');
    // }
}

// 调用 BasicForm 的 logs 方法
function callLogs() {
    if (basicFormRef.value) {
        basicFormRef.value.submitForm();
    }
}
</script>

<style lang="scss" scoped>
.my-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 16px;
}

.dialog-btn {
    display: flex;
    gap: 8px;
    z-index: 999;
}

.dialog-btn :hover {
    cursor: pointer;
}

.el-divider--horizontal {
    margin: 10px 0;
}
</style>