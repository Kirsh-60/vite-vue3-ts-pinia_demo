// 1. 定义路由组件.
// 也可以从其他文件导入

import { createRouter, createWebHashHistory } from 'vue-router'
import Admin from '@/layouts/admin.vue'
import Index from '@/pages/index.vue'
import Login from '@/pages/Login/index.vue'
import About from '@/pages/about.vue'
import NotFound from '@/pages/404.vue'
import GoodList from '@/pages/goods/list.vue'
import CategoryList from '@/pages/category/list.vue'
import SkusList from '@/pages/skus/list.vue'
import UserList from '@/pages/user/list.vue'
import OrderList from '@/pages/order/list.vue'
import CommentList from '@/pages/comment/list.vue'
import ImageList from '@/pages/image/list.vue'
import NoticeList from '@/pages/notice/list.vue'
import SettingBase from '@/pages/setting/base.vue'
import CouponList from '@/pages/coupon/list.vue'
// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单

// 默认路由  谁都可以访问
const routes = [
  {
    path: '/',
    name: 'admin',
    component: Admin,
    // 子路由
  },
  {
    path: '/login',
    component: Login,
    meta: { title: '登录' },
  },
  {
    path: '/about',
    component: About,
    meta: { title: '关于' },
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]
// 动态路由，用于匹配菜单动态添加路由
const asyncRoutes = [
  {
    path: '/',
    name: '/',
    component: Index,
    meta: {
      title: '后台首页',
    },
  },
  {
    path: '/goods/list',
    name: '/goods/list',
    component: GoodList,
    meta: {
      title: '商品管理',
    },
  },
  {
    path: '/category/list',
    name: '/category/list',
    component: CategoryList,
    meta: {
      title: '分类列表',
    },
  },
  {
    path: '/skus/list',
    name: '/skus/list',
    component: SkusList,
    meta: {
      title: '规格管理',
    },
  },
  {
    path: '/user/list',
    name: '/user/list',
    component: UserList,
    meta: {
      title: '用户列表',
    },
  },
  {
    path: '/order/list',
    name: '/order/list',
    component: OrderList,
    meta: {
      title: '订单列表',
    },
  },
  {
    path: '/comment/list',
    name: '/comment/list',
    component: CommentList,
    meta: {
      title: '评价列表',
    },
  },
  {
    path: '/image/list',
    name: '/image/list',
    component: ImageList,
    meta: {
      title: '图库列表',
    },
  },
  {
    path: '/notice/list',
    name: '/notice/list',
    component: NoticeList,
    meta: {
      title: '公告列表',
    },
  },
  {
    path: '/setting/base',
    name: '/setting/base',
    component: SettingBase,
    meta: {
      title: '配置',
    },
  },
  {
    path: '/coupon/list',
    name: '/coupon/list',
    component: CouponList,
    meta: {
      title: '优惠券列表',
    },
  },
]

// 动态路由 用于匹配动态菜单

export const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})

// 动态添加路由 , 接收后端窜过来的菜单
export function addRoutes(menus:any) {
  // 是否有新的路由
  let hasNewRoutes = false
  const findAndAddRoutesByMenus = (arr:any) => {
    arr.forEach((e:any) => {
      // e.frontpath
      let item = asyncRoutes.find((o) => o.path == e.frontpath)
      // router.hasRoute()检查路由是否存在,如果存在item，并且路由中不存在，往路由表中添加
      if (item && !router.hasRoute(item.path)) {
        // 从vuerouter4.0开始就没有批量添加路由
        router.addRoute('admin', item)
        hasNewRoutes = true
      }
      if (e.child && e.child.length > 0) {
        findAndAddRoutesByMenus(e.child)
      }
    })
  }
  findAndAddRoutesByMenus(menus)
  return hasNewRoutes
}

//5、 导出
// export default router
