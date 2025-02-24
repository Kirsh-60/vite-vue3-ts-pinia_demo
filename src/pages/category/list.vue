<template>
  <div style="border: 1px solid #ccc;min-width: 365px; max-width: 100%; ">
    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
    <Editor style="height: 500px; overflow-y: hidden;" v-model="content" :defaultConfig="editorConfig" :mode="mode"
      @onCreated="handleCreated" @onChange="handleChange" @onDestroyed="handleDestroyed" @onFocus="handleFocus"
      @onBlur="handleBlur" @customAlert="customAlert" @customPaste="customPaste" />
  </div>
  <button @click="submit">提交</button>
</template>

<script setup>
import { ref, reactive, shallowRef, onBeforeUnmount } from 'vue'
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
const content = ref('')

const submit = () => {
  console.log(content.value);
}

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()




// 工具栏配置
const toolbarConfig = {
  toolbarKeys: [
    "headerSelect",  // 标题选择
    'bold', // 加粗
    'italic', // 斜体
    'through', // 删除线
    'underline', // 下划线
    'justifyCenter', // 居中对齐
    'justifyJustify', // 两端对齐
    'justifyLeft', // 左对齐
    'justifyRight', // 右对齐
    'bulletedList', // 无序列表
    'numberedList', // 有序列表
    'color', // 文字颜色
    'insertLink', // 插入链接
    'fontSize', // 字体大小
    'lineHeight', // 行高
    'delIndent', // 缩进
    'indent', // 增进
    'divider', // 分割线
    'insertTable', // 插入表格
    'undo', // 撤销
    'redo', // 重做
    'clearStyle', // 清除格式
    'fullScreen', // 全屏
    "blockquote", // 引用
    "codeBlock", // 代码块
    "insertImage", // 插入图片
    "uploadImage", // 上传图片
    "insertVideo", // 插入视频
  ]
}


// 编辑器配置
const editorConfig = {
  placeholder: '请输入内容...',
  MENU_CONF: {
    uploadImage: {
      server: '/vjifen/uploadFile/imgUploadUrl', // 上传接口 URL
      fieldName: 'files', // 图片字段名称
      // meta: {
      //   token: '' // 如果需要的话
      // },
      headers: {
        token: '41e1f29b-ea50-4d96-8ad6-3d1671933a4c' // 在请求头中设置token
      },
      // 上传成功回调
      onSuccess(file, res) {
        // res 是服务端返回的结果
        // 假设服务端返回格式为 { code: 200, data: { url: 'xxx' } }
        if (res.code === 0) {
          console.log(res.data[0].domainUrl)
          return {
            url: res.data[0].domainUrl, // 图片 url
            alt: file.name, // 图片描述
            // href: res.data.url // 图片的链接，可选
          }
        }
        return ''
      }
    }
  }
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})


const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
  console.log('created', editor)
}
const handleChange = (editor) => {
  console.log('change:', editor.children)
}
const handleDestroyed = (editor) => {
  console.log('destroyed', editor)
}
const handleFocus = (editor) => {
  console.log('focus', editor)
}
const handleBlur = (editor) => {
  console.log('blur', editor)
}
const customAlert = (info, type) => {
  alert(`【自定义提示】${type} - ${info}`)
}
const customPaste = (editor, event, callback) => {
  console.log('ClipboardEvent 粘贴事件对象', event)
  // const html = event.clipboardData.getData('text/html') // 获取粘贴的 html
  // const text = event.clipboardData.getData('text/plain') // 获取粘贴的纯文本
  // const rtf = event.clipboardData.getData('text/rtf') // 获取 rtf 数据（如从 word wsp 复制粘贴）

  // 自定义插入内容
  editor.insertText('xxx')

  // 返回 false ，阻止默认粘贴行为
  event.preventDefault()
  callback(false) // 返回值（注意，vue 事件的返回值，不能用 return）

  // 返回 true ，继续默认的粘贴行为
  // callback(true)
}

</script>

<style lang='scss' scoped>
button {
  margin-top: 20px;
  padding: 2px 5px;
  background-color: #57a3ef;
  border: none;
  color: #fff;
  border-radius: 2px;
}
</style>