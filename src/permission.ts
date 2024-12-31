import { router, addRoutes } from '@/router'
import { getToken } from '@/composables/auth'
import { useUserInfoStore } from '@/store'
import { toast, showFullLoading, hideFullLoading } from '@/composables/utils'
// 路由前置守卫
//  to :要到哪里去
//  from：从哪里来
//  next：如果参数写了next ，必须配置出口，可以带参数path 要跳转的地址
let hasGetInfo = false
router.beforeEach(async (to, from, next) => {
  // 显示loading
  showFullLoading()
  const token = getToken()
  // 如果没有token 并且 要跳转的路由不是登陆页，则强制跳转到登陆页
  if (!token && to.path != '/login') {
    toast('请先登录', 'error')
    next({ path: '/login' })
  }
  // 防止重复登陆
  if (token && to.path == '/login') {
    toast('请勿重复登录', 'error')
    return next({ path: from.path ? from.path : '/' })
  }
  /** 
   如果登陆了，有token，自动获取用户数据，并存储在pinia中
   hasNewRoutes 如果没有获取过用户信息，则获取用户信息 并且获取路由表
   hasNewRoutes 如果获取过用户信息，则直接跳转
   hasNewRoutes 如果获取过用户信息，但是没有路由表，则重新获取路由表
   也防止刷新页面导致路由表丢失
   */

  let hasNewRoutes = false
  if (token && !hasGetInfo) {
    const store = useUserInfoStore()
    await store.getinfo()
    hasGetInfo = true
    // 如果没有路由表，则重新获取路由表
    const userInfo = store.userInfo as { menus: any[] }
    hasNewRoutes = addRoutes(userInfo.menus)
  }
  let title = to.meta.title ? to.meta.title + '-管理后台' : ''
  document.title = title
  // 路由出口（必须有）
  hasNewRoutes ? next(to.fullPath) : next()
})
// 全局后置守卫
router.afterEach((to, from) => {
  // 隐藏loading
  hideFullLoading()
})
