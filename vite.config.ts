import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
// 这里使用nodejs的模块，可能会报错，需要安装node的类型声明文件
// *********************************** 路径配置新增 start
import { resolve } from 'path'

const pathResolve = (dir: string): any => {
  return resolve(__dirname, '.', dir)
}

const alias: Record<string, string> = {
  '@': pathResolve('src'),
}
export default defineConfig({
  plugins: [vue(), WindiCSS()],
  resolve: {
    alias, // ****************** 路径配置新增
  },
  server: {
    // 使用代理，实现跨域
    proxy: {
      '/api': {
        target: 'http://ceshi13.dishait.cn',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    host: '0.0.0.0', // 主要是host这个配置 局域网访问
    port: 5174, // 设置服务启动端口号
    open: true, // 设置服务启动时是否自动打开浏览器
    cors: true, // 允许跨域
    hmr: {
      overlay: false, // 禁用服务器错误遮罩层
    },
  },
})
