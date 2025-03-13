<template>
  <div
    style="border: 1px solid #ccc; min-width: 365px; max-width: 100%"
    :class="{ dark: isDark }"
  >
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 500px; overflow-y: hidden"
      v-model="content"
      :rules="contentRules"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
      @onChange="handleChange"
      @onDestroyed="handleDestroyed"
      @onFocus="handleFocus"
      @onBlur="handleBlur"
      @customAlert="customAlert"
      @customPaste="customPaste"
    />
  </div>
  <!-- <el-button type="primary" @click="clearContent">提交</el-button> -->
</template>

<script setup lang="ts">
import { ref, reactive, shallowRef, onBeforeUnmount } from 'vue'
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { toolbarConfig } from './editMethods.js'
import { defineProps, defineEmits } from 'vue'
import { isDark, toggleDark } from '@/composables'

const modelValue = defineModel()
interface Config {
  label: string
  field: string
  placeholder: string
}
const props = defineProps<{
  config: Config
}>()
const { label, field, placeholder } = props.config
const emits = defineEmits(['update:modelValue'])
const mode = ref('default')
const updateValue = (value) => {
  emits('update:modelValue', value)
}

// #region 编辑器相关
const content = ref('')
const error = ref(false)
const errorMsg = ref('请输入内容')
const submit = () => {
  console.log(content.value)
}
const contentRules = reactive({
  required: true,
  message: '请输入内容',
  trigger: 'blur',
})
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 编辑器配置
const editorConfig = {
  placeholder: '请输入内容...',
  MENU_CONF: {
    uploadImage: {
      server: '/vjifen/uploadFile/imgUploadUrl', // 上传接口 URL
      fieldName: 'files', // 图片字段名称
      headers: {
        token: '56b7b107-9975-400e-b88d-e6a53b461f3b', // 在请求头中设置 token
      },
      // 上传成功回调
      customInsert(res, insertFn) {
        const { result } = res
        // res 即服务端的返回结果
        // 从 res 中找到 url alt href ，然后插入图片
        insertFn(result[0].domainUrl, '', '')
      },
    },
  },
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})
// 清空编辑器内容
const clearContent = () => {
  if (editorRef.value) {
    editorRef.value.clear() // 使用editorRef而不是editor
  }
}
const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
  console.log('created', editor)
}
const handleChange = (editor) => {
  // 当内容改变时，触发
  content.value = content.value === '<p><br></p>' ? undefined : content.value
  emits('update:modelValue', content.value)
}
const handleDestroyed = (editor) => {
  // 当编辑器被销毁时，触发
  // console.log('destroyed', editor)
}
const handleFocus = (editor) => {
  // 当编辑器获得焦点时，触发
  // console.log('focus', editor)
}
const handleBlur = (editor) => {
  // 当编辑器失去焦点时，触发
  content.value = content.value === '<p><br></p>' ? undefined : content.value
  emits('update:modelValue', content.value)
}
const customAlert = (info, type) => {
  // 自定义提示
  alert(`【自定义提示】${type} - ${info}`)
}
const customPaste = (editor, event, callback) => {
  // 自定义粘贴
  console.log('ClipboardEvent 粘贴事件对象', event)
  // const html = event.clipboardData.getData('text/html') // 获取粘贴的 html
  const text = event.clipboardData.getData('text/plain') // 获取粘贴的纯文本
  // const rtf = event.clipboardData.getData('text/rtf') // 获取 rtf 数据（如从 word wsp 复制粘贴）

  // 自定义插入内容
  editor.insertText(text)

  // 返回 false ，阻止默认粘贴行为
  event.preventDefault()
  // callback(false) // 返回值（注意，vue 事件的返回值，不能用 return）

  // 返回 true ，继续默认的粘贴行为
  callback(true)
}
//#endregion
</script>

<style lang="scss" scoped>
button {
  margin-top: 20px;
  padding: 2px 5px;
  background-color: #57a3ef;
  border: none;
  color: #fff;
  border-radius: 2px;
}
.dark {
  --w-e-textarea-bg-color: #333;
  --w-e-textarea-color: #fff;
}
</style>
