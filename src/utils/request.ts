import { useCookies } from '@vueuse/integrations/useCookies'
import axios from 'axios'
import { toast } from '@/composables/utils'

// 确保 Mock.js 在开发环境中加载
// if (import.meta.env.DEV) {
//   console.log('Mock 数据已启用')
//   import('@/mock/loginMock') // 确保路径正确
// }

import { createPinia } from 'pinia'
import App from '@/App.vue'
import { createApp } from 'vue'
import { useUserInfoStore } from '@/store'
const pinia = createPinia()
const app = createApp(App)
app.use(pinia)

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
console.log('apiBaseUrl', apiBaseUrl)
const service = axios.create({
  baseURL: apiBaseUrl,
})
// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    // 往hearder中添加token
    const cookie = useCookies()
    const token = cookie.get('admin-token')
    if (token) {
      config.headers['token'] = token
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    console.log('response', response)
    return (
      response.request.responseType == 'blob' ||
      response.config.responseType == 'text'
        ? response.data
        : response.data.data
    ) as any
  },
  async function (error) {
    console.log('error', error)
    const msg = error.response.data.error

    if (msg != 'ok') {
      toast(msg, 'error')
    }
    if (msg == '非法token，请先登录！' || error.response.status == 401) {
      const store = useUserInfoStore()
      await store.logout().finally(() => location.reload())
    }
    if (error.response.status == 400) {
      // 400错误 码处理
      // 400错误码处理 重新获取验证码
      const store = useUserInfoStore()
      await store.getCaptcha()
    }
    return Promise.reject(error)
  }
)
export default service
