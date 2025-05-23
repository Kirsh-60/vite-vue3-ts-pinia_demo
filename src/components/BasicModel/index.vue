<template>
  <div class="container" v-loading.fullscreen.lock="saveLoading">
    <el-dialog v-model="props.dialogVisible" :fullscreen="fullscreen" :width="props.dialogProps.width" title="Tips"
      destroy-on-close :before-close="handleClose" draggable :show-close="false" :close-on-click-modal="false"
      :align-center="true">
      <template #header="{ close, titleId, titleClass }">
        <div class="my-header">
          <h4 :id="titleId" :class="titleClass" class="flex items-center">
            <SvgIcon :name="props.dialogProps.icon" width="20px" height="20px"></SvgIcon>
            <text class="ml-2" style="font-size: 16px">{{ props.dialogProps.title }}</text>
          </h4>
          <div class="dialog-btn">
            <el-tooltip v-if="!fullscreen" class="box-item" content="全屏" placement="bottom">
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
      <div style="min-height: 300px">
        <BasicForm v-if="formOptions" ref="basicFormRef" :formOptions="formOptions">
          <!-- 转发插槽 -->
          <template v-for="(_, name) in $slots" v-slot:[name]="slotProps" #default="scope">
            <slot :name="name" v-bind="slotProps" />
          </template>
        </BasicForm>

        <slot v-else default=""></slot>
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
import { useDialog } from './useDialog'
import { defineProps, defineEmits } from 'vue'
import BasicForm from '@/components/BasicForm/index.vue'

const props = defineProps(['dialogVisible', 'dialogProps', 'formOptions'])
const emit = defineEmits(['update:dialogVisible', 'onSave'])

const {
  fullscreen,
  saveLoading,
  basicFormRef,
  handleClose,
  closeDialog,
  handleSave,
} = useDialog(props, emit)
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
