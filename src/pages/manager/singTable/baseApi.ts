import { ref } from 'vue'
import { ruleForm } from '@/components/BasicForm/formMethods' // 引入表单数据对象
const dialogVisible = ref(false)
const title = ref('')
const icon = ref('')
function editOrder(editOrder: Record<string, any>) {
  console.log('编辑', editOrder)
  // 编辑
  dialogVisible.value = true
  title.value = '编辑'
  icon.value = 'edit'
  // 这里可以添加其他逻辑，比如获取当前选中的数据，填充到表单中

  // 将编辑数据赋值到表单
  Object.keys(editOrder).forEach((key) => {
    ruleForm[key] = editOrder[key]
  })
}
function handleAdd() {
  dialogVisible.value = true
  title.value = '新增'
  icon.value = 'add'
  // 这里可以添加其他逻辑，比如清空表单数据
}
function handleAvidete() {
  // 删除
  console.log('删除')
}
export { dialogVisible, title, icon, handleAdd, editOrder, handleAvidete }
