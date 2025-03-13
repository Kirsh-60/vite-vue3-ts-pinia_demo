<template>
  <el-upload
    v-model:file-list="modelValue"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    list-type="picture-card"
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove"
    @change="updateValue"
  >
    <el-icon><Plus /></el-icon>
  </el-upload>
  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { defineProps, defineEmits } from 'vue'

import type { UploadProps, UploadUserFile } from 'element-plus'

// const modelValue = defineModel()

interface Config {
  label: string
  field: string
}
const props = defineProps<{
  config: Config
}>()
const {} = props.config

// {
//   name: 'food.jpeg',
//   url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
// },
const modelValue = ref<UploadUserFile[]>([])

const dialogImageUrl = ref('') // 弹窗展示图片
const dialogVisible = ref(false) // 弹窗是否展示

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  // 删除图片
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  // 预览图片
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

const emits = defineEmits(['update:modelValue']) // 自定义事件

const updateValue = (value: any) => {
  // 更新图片
  emits('update:modelValue', value)
}
</script>
<style lang="scss" scoped>
::v-deep .el-upload--picture-card {
  --el-upload-picture-card-size: 100px !important;
}
::v-deep .el-upload-list--picture-card {
  --el-upload-list-picture-card-size: 100px;
}
</style>
