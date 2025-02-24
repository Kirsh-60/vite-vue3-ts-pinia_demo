import { ElMessageBox } from 'element-plus'
import { MessageBoxData } from 'element-plus/es/components/message-box/src/message-box.type'

export const confirm = (
  message: string,
  title: string = '提示',
  options: Partial<MessageBoxData> = {}
): Promise<boolean> => {
  return ElMessageBox.confirm(message, title, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    ...options,
  })
    .then(() => true)
    .catch(() => false)
}
