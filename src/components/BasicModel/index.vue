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
import { ElMessageBox } from 'element-plus'
const props = defineProps(['dialogVisible', 'dialogProps']);
const emit = defineEmits(['update:dialogVisible']);
const fullscreen = ref(false);
/**
 * 处理关闭操作
 *
 * @param done 关闭操作完成后需要调用的函数
 */
const handleClose = (done: () => void) => {
    ElMessageBox.confirm('确认关闭吗?')
        .then(() => {
            done()
            emit('update:dialogVisible', false);
        })
        .catch(() => {
            // catch error
        })
}
/**
 * 关闭对话框的函数
 *
 * @returns {void} 无返回值
 */
function closeDialog() {
    emit('update:dialogVisible', false);
}
function handleSave() {
    ElMessageBox.confirm('确认保存吗?')
        .then(() => {
            emit('update:dialogVisible', false);
        })
        .catch(() => {
            // catch error
        })
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
