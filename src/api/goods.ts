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
  return axios.get(`/goodsList/goodsApi/${page}${r}`)
}
// 新增商品
export function addGoodsApi(data: GoodsList) {
  return axios.post('/goodsList/addGoods', data)
}

interface updatepassword {
  oldpassword: string
  password: string
  repassword: string
}
interface GoodsList {
  goods_name: string
  img: object
}
