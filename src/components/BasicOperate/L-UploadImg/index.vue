<template>
  <el-upload :file-list="modelValue" :http-request="uploadImage" list-type="picture-card"
    :on-preview="handlePictureCardPreview" :on-remove="handleRemove" @change="updateValue">
    <el-icon>
      <Plus />
    </el-icon>
  </el-upload>
  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { defineProps, defineEmits } from 'vue'
import axios from 'axios'

import type { UploadProps, UploadUserFile } from 'element-plus'
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
interface Config {
  label: string
  field: string
}
const props = defineProps<{
  config: Config
}>()
const { } = props.config

const modelValue = ref<UploadUserFile[]>([]) // 存储图片列表

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

// 监听图片变化
const updateValue = (value: any) => {
  // 更新图片
  // emits('update:modelValue', value)
}

// 自定义上传方法
const uploadImage = async (options: any) => {
  const { file, onSuccess, onError } = options
  const formData = new FormData()
  formData.append('image', file)

  try {
    const response = await axios.post(apiBaseUrl + '/api/public/uploadImgs', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    const imageUrl = response.data.data.imageUrl
    onSuccess(imageUrl)

    // 将返回的图片地址添加到 modelValue 中
    modelValue.value.push({
      url: imageUrl,
    })
    emits('update:modelValue', modelValue.value)
    // 打印返回的图片地址
    console.log('Upload successful:', imageUrl)
  } catch (error) {
    console.error('Upload failed:', error)
    onError(error)
  }
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