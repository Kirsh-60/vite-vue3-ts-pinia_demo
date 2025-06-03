import { createApp } from 'vue'
import App from './App.vue'

// 路由检验
import './permission'

// 引入第三方css库
import 'virtual:windi.css'
import 'virtual:svg-icons-register'
// 引入router
import { router } from './router'

// 引入pinia状态管理工具
import { createPinia } from 'pinia'
const pinia = createPinia()

// 引入nprogress 进度条
import 'nprogress/nprogress.css'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 引入 Element Plus 语言包
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import zhCn from '@element-plus/locale/lang/zh-cn'

// 引入tui-plus 低代码组件库
import TuiPlus from "@wocwin/t-ui-plus"
import "@wocwin/t-ui-plus/lib/style.css"

const app = createApp(App, {})

// 注册 Element Plus 的图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 引入全局样式 svg
import svgIcon from '@/components/SvgIcon/index.vue'
app.component('SvgIcon', svgIcon)

// 表格组件
import SearchTable from '@/components/SearchTable/index.vue'
// 基础模态框
import BasicMode from '@/components/BasicModel/index.vue'

// 如果处于开发环境则启用mock
// if (import.meta.env.DEV) {
//   import('./mock/loginMock.ts')
// }

// 全局注册组件
app.component('SearchTable', SearchTable)
app.component('BasicMode', BasicMode)

// 挂载
app.use(router)
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(pinia)
app.use(TuiPlus)
app.mount('#app')

// 加载完成后移除 loading
const loadingEl = document.getElementById('app-loading')
if (loadingEl) {
  // 添加过渡隐藏动画
  loadingEl.classList.add('hide')
  // 等待 CSS 过渡结束再彻底移除
  setTimeout(() => {
    loadingEl.parentNode?.removeChild(loadingEl)
  }, 500)
}
