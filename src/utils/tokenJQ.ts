import { jwtDecode } from 'jwt-decode'
import { showModal } from '@/composables/utils'
import { useUserInfoStore } from '@/store'
// 从 cookie 中读取 token
function getCookie(name: string): string | null {
  // 打印所有 cookie，帮助确认 token 是否存在或名称是否不同
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? match[2] : null
}

// 显示登录超时弹窗
async function showTimeoutModal() {
  showModal('登录已超时，请重新登录', '温馨提示')
    .then(async () => {
      const store = useUserInfoStore()
      await store.logout().finally(() => location.reload())
    })
    .catch(() => {})
}

// 调度一个定时器，在 token 到期时触发弹窗
function scheduleTokenExpiryAlert() {
  const token = getCookie('token') || getCookie('admin-token')
  if (!token) return

  let payload
  try {
    payload = jwtDecode(token)
  } catch (e) {
    console.error('JWT 解析失败：', e)
    return
  }
  
  // exp 单位是秒
  const expiresAtMs = payload.exp * 1000
  const nowMs = Date.now()

  const delay = expiresAtMs - nowMs

  if (delay <= 0) {
    // 已经过期
    showTimeoutModal()
    return true
  } else {
    setTimeout(showTimeoutModal, delay)
    return false
  }
}

// 登录成功后或页面刷新时都要调用一次
export default scheduleTokenExpiryAlert
