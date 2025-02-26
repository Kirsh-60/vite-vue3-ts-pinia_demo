import { ref, reactive, shallowRef, onBeforeUnmount, onMounted } from 'vue'
const content = ref('')

const submit = () => {
  console.log(content.value)
}

onMounted(() => {
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()
})
const editorRef = shallowRef()

// 工具栏配置
const toolbarConfig = {
  toolbarKeys: [
    'headerSelect', // 标题选择
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
    'blockquote', // 引用
    'codeBlock', // 代码块
    'insertImage', // 插入图片
    'uploadImage', // 上传图片
    'insertVideo', // 插入视频
  ],
}

// 编辑器配置
const editorConfig = {
  placeholder: '请输入内容...',
  MENU_CONF: {
    uploadImage: {
      server: '/vjifen/uploadFile/imgUploadUrl', // 上传接口 URL
      fieldName: 'files', // 图片字段名称
      headers: {
        token: 'deffb7f9-bd88-4615-96c7-a81e50643946', // 在请求头中设置 token
      },
      // 上传成功回调
      customInsert(res, insertFn) {
        console.log('上传成功', res)
        const { result } = res
        console.log(result)
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

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
  console.log('created', editor)
}
const handleChange = (editor) => {
  // 当内容改变时，触发
  console.log('change:', editor.children)
}
const handleDestroyed = (editor) => {
  // 当编辑器被销毁时，触发
  console.log('destroyed', editor)
}
const handleFocus = (editor) => {
  // 当编辑器获得焦点时，触发
  console.log('focus', editor)
}
const handleBlur = (editor) => {
  // 当编辑器失去焦点时，触发
  console.log('blur', editor)
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

export { content, submit, editorConfig, toolbarConfig, handleCreated, handleChange, handleDestroyed, handleFocus, handleBlur, customAlert, customPaste }