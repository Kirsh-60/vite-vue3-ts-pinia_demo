import axios from '@/utils/request'

export function login(data: { username: string; password: string }) {
  return axios.post('/users/login', data, {
    withCredentials: true,
  })
}

export function getInfo() {
  return axios.get('/users/getInfo')
}

export function logout() {
  return axios.post('/users/logout')
}

export function createyzm() {
  // 生成验证
  return axios.get('/users/captcha', {
    withCredentials: true, // 允许跨域携带cookie
    responseType: 'text', // 设置响应类型为文本
  })
}
