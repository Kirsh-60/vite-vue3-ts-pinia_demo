import { ref } from 'vue'
import { useRoute, onBeforeRouteUpdate, useRouter } from 'vue-router'
import { useCookies } from '@vueuse/integrations/useCookies'

export function useTagList() {
  let route = useRoute()
  const cookie = useCookies()
  const router = useRouter()
  const activeTab = ref(route.path)
  const tablist = ref([
    {
      title: '后台首页',
      path: '/',
    },
  ])

  // 初始化导航标签列表
  function initTabList() {
    let tbs = cookie.get('tablist')
    if (tbs) {
      tablist.value = tbs
    }
  }

  initTabList()

  //添加标签导航
  function addTab(tab: any) {
    //addTab有没有存在在当前的tablist中
    let noTab = tablist.value.findIndex((t) => t.path == tab.path) == -1
    // 如果没有 push到tablist中
    if (noTab) {
      tablist.value.push(tab)
    }
    cookie.set('tablist', tablist.value)
  }

  // 删除标签导航
  const removeTab = (e: any) => {
    let tabs = tablist.value
    let a = activeTab.value
    if (a == e) {
      tabs.forEach((tab, index) => {
        if (tab.path == e) {
          const nextTab = tabs[index + 1] || tabs[index - 1]
          if (nextTab) {
            a = nextTab.path
          }
        }
      })
    }
    activeTab.value = a
    tablist.value = tablist.value.filter((item) => item.path != e)
    cookie.set('tablist', tablist.value)
    router.push(activeTab.value)
  }

  // 路由跳转前，获取到要跳转的路由信息
  onBeforeRouteUpdate((to, from) => {
    // console.log(to,'to<<<<<<<<<');
    activeTab.value = to.path
    addTab({
      title: to.meta.title,
      path: to.path,
    })
  })

  // 切换tab的时候，实现跳转
  const changeTab = (e: any) => {
    activeTab.value = e
    router.push(e)
  }

  // 操作清除
  const handelClose = (c: any) => {
    switch (c) {
      case 'clearOther':
        clearOther()
        break
      case 'clearAll':
        clearAll()
        break
      default:
        break
    }
  }
  // 关闭其他
  const clearOther = () => {
    // 过滤掉首页和当前页
    tablist.value = tablist.value.filter(
      (tab) => tab.path == '/' || tab.path == activeTab.value
    )
    cookie.set('tablist', tablist.value)
  }
  // 关闭全部
  const clearAll = () => {
    activeTab.value = '/'
    tablist.value = [
      {
        title: '后台首页',
        path: '/',
      },
    ]
    cookie.set('tablist', tablist.value)
    router.push(activeTab.value)
  }
  return {
    tablist,
    activeTab,
    removeTab,
    changeTab,
    handelClose,
  }
}
