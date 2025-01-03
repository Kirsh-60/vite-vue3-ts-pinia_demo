import axios from '@/utils/request'
import { queryParams } from '@/composables/utils'
/**
 * 获取商品列表
 * @param {*} data
 * @returns
 */
export function updatepassword(data: updatepassword) {
  return axios.post('/admin/updatepassword', data)
}
export function getGoodsList(page: number, query = {}) {
  let r = queryParams(query)
  return axios.get(`/admin/goods/${page}${r}`)
}

interface updatepassword {
  oldpassword: string
  password: string
  repassword: string
}
