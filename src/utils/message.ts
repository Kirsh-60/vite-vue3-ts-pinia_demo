import { ElMessage } from 'element-plus'

// 定义消息类型
type MessageType = 'success' | 'error' | 'warning' | 'info'

// 消息提醒的公共方法
export const showMessage = (type: MessageType, message: string): void => {
  ElMessage({
    message: message,
    type: type,
    duration: 3000, // 消息显示时长，单位毫秒
  })
}

