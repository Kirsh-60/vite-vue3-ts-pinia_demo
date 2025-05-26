import { ref } from 'vue'
import { deleteGoodsApi } from '@/api/goods'
import { confirm } from '@/utils/confirm'
import { showMessage } from '@/utils/message'
const dialogVisible = ref(false)
function editOrder() {
  // 编辑
  dialogVisible.value = true
}
function handleAdd() {
  // 新增
  dialogVisible.value = true
}
async function handleAvidete(id: string) {
  // 删除
  if (!(await confirm('确认删除吗？', '确认'))) return
  deleteGoodsApi(id)
    .then((res) => {
      console.log(res)
      if (res.data.code === 200) {
        showMessage('success', '保存成功')
        // 这里可以添加刷新表格的逻辑
      } else {
        showMessage('error', '删除失败')
      }
    })
    .catch((error) => {
      console.error('删除请求失败:', error)
    })
}
export { dialogVisible, handleAdd, editOrder, handleAvidete }
