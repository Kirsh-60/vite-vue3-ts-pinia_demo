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

const app = createApp(App, {})

// 注册 Element Plus 的图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 引入全局样式 svg
import svgIcon from '@/components/SvgIcon/index.vue'
app.component('SvgIcon', svgIcon)

// 挂载
app.use(router)
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(pinia)
app.mount('#app')
