import { ElNotification, ElMessageBox, ElMessage } from 'element-plus'
import nprogress from 'nprogress'
export function toast(
  message: any,
  type = 'success',
  dangerouslyUseHTMLString = true
) {
  ElNotification({
    message,
    type,
    dangerouslyUseHTMLString,
    duration: 3000,
  })
}
export function showModal(message: any, title: any, type = 'warning') {
  return new Promise<void>((resolve, reject) => {
    ElMessageBox.confirm(message, title, {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type,
    })
      .then(() => {
        resolve()
      })
      .catch(() => {
        reject()
      })
  })
}
// 显示全屏loading
export function showFullLoading() {
  nprogress.start()
}

// 隐藏全屏loading
export function hideFullLoading() {
  nprogress.done()
}

// 将query对象转成url参数
export function queryParams(query: { [x: string]: string | number | boolean }) {
  let q = []
  for (const key in query) {
    if (query[key]) {
      q.push(`${key}=${encodeURIComponent(query[key])}`)
    }
  }
  let r = q.join('&')
  r = r ? '?' + r : ''
  return r
}
