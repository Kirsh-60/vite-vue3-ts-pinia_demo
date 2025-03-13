import { ref } from 'vue'
const dialogVisible = ref(false)
function editOrder() {
  // 编辑
  dialogVisible.value = true
}
function handleAdd() {
  // 新增
  dialogVisible.value = true
}
function handleAvidete() {
  // 删除
  console.log('删除')
}
export { dialogVisible, handleAdd, editOrder, handleAvidete }
