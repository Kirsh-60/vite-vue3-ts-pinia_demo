<template>
  <div class="container" v-loading.fullscreen.lock="saveLoading">
    <el-dialog
      v-model="props.dialogVisible"
      :fullscreen="fullscreen"
      :width="props.dialogProps.width"
      title="Tips"
      destroy-on-close
      :before-close="handleClose"
      draggable
      :show-close="false"
      :close-on-click-modal="false"
      :align-center="true"
    >
      <template #header="{ close, titleId, titleClass }">
        <div class="my-header">
          <h4 :id="titleId" :class="titleClass" class="flex items-center">
            <SvgIcon
              :name="props.dialogProps.icon"
              width="20px"
              height="20px"
            ></SvgIcon>
            <text style="font-size: 16px">{{ props.dialogProps.title }}</text>
          </h4>
          <div class="dialog-btn">
            <el-tooltip
              v-if="!fullscreen"
              class="box-item"
              content="全屏"
              placement="bottom"
            >
              <el-icon @click="fullscreen = true">
                <FullScreen />
              </el-icon>
            </el-tooltip>
            <el-tooltip
              v-else
              class="box-item"
              content="半屏"
              placement="bottom"
            >
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
      <div style="min-height: 300px">
        <BasicForm
          v-if="formOptions"
          ref="basicFormRef"
          :formOptions="formOptions"
        />
        <slot v-else default=""></slot>
      </div>
      <el-divider />
      <template #footer>
        <div class="dialog-footer text-center">
          <el-button size="small" @click="closeDialog()">关闭</el-button>
          <el-button size="small" type="primary" @click="handleSave()"
            >保存</el-button
          >
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { confirm } from '@/utils/confirm'
import { showMessage } from '@/utils/message'
import BasicForm from '@/components/BasicForm/index.vue'
const props = defineProps(['dialogVisible', 'dialogProps', 'formOptions'])
const emit = defineEmits(['update:dialogVisible', 'onSave'])
const fullscreen = ref(false)
const saveLoading = ref(false)
// 获取 BasicForm 的引用
const basicFormRef = ref(null)
// 处理关闭操作
const handleClose = async () => {
  const isConfirmed = await confirm('确认关闭吗？', '确认')
  if (isConfirmed) {
    // console.log('执行关闭操作');
    closeDialog()
  } else {
    // console.log('取消关闭');
  }
}

// 关闭对话框的函数
function closeDialog(): void {
  basicFormRef.value?.resetForm()
  emit('update:dialogVisible', false)
}

// 处理保存操作
async function handleSave() {
  if (!props.formOptions) {
    // 没有表单的情况下直接关闭弹窗
    closeDialog() // 关闭弹窗
  } else {
    basicFormRef.value
      ?.validateForm()
      .then(async () => {
        const isConfirmed = await confirm('确认保存吗？', '确认')
        if (isConfirmed) {
          saveLoading.value = true
          setTimeout(() => {
            closeDialog() // 关闭弹窗
            showMessage('success', '保存成功')
            saveLoading.value = false
          }, 2000)
        } else {
        }
      })
      .catch(() => {
        saveLoading.value = false
      })
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
body {
  margin: 0;
}
.example-showcase .el-loading-mask {
  z-index: 9;
}
</style>
