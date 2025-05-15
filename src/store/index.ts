import { defineStore } from 'pinia'
import { login, getInfo, createyzm } from '@/api/login.ts'
import { setToken, removeToken } from '@/composables/auth'
// 你可以对 `defineStore()` 的返回值进行任意命名，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。(比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
interface RuleForm {
  // 定义接口类型
  username: string
  password: string
}
export const useUserInfoStore = defineStore('userInfo', {
  // 其他配置...
  state: () => ({
    userInfo: {} as any,
    isCollapse: false,
    menuList: [] as any, // 菜单列表
    asideWidth: '200px',
    svg: '', // 验证码
  }),
  getters: {
    // double: (state) => state.count * 2,
  },
  actions: {
    // 生成验证码
    async getCaptcha() {
      return await new Promise((resolve: any, reject: any) => {
        createyzm()
          .then((res: any) => {
            this.svg = res.replace(
              /<svg /,
              '<svg style="width: 100%; height: 100%;" '
            )
            resolve(this.svg)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    // 登录
    async login(commit: RuleForm) {
      return await new Promise((resolve: any, reject: any) => {
        login(commit)
          .then((res: any) => {
            // 存储token和用户相关信息
            setToken(res.token)
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    // 获取用户信息+路由表
    async getinfo() {
      return await new Promise((resolve: any, reject: any) => {
        getInfo()
          .then((res) => {
            this.userInfo = res
            this.menuList = this.userInfo.menus
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    // 退出登录
    async logout() {
      // 移除cookies中的token
      removeToken()
      // 清除当前用户状态
      this.userInfo = {}
    },
    // 切换菜单展示状态（传入true折叠，false展开）
    toggleCollapse(status: boolean) {
      this.isCollapse = status
      this.asideWidth = status ? '64px' : '200px'
    },
  },
})
