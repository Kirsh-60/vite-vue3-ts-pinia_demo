<template>
  <div class="f-menu" :style="{ width: store.asideWidth }">
    <el-menu
      unique-opened
      router
      :collapse="store.isCollapse"
      :default-active="activeMenu"
      :collapse-transition="false"
      @select="handlerSelect"
    >
      <template v-for="(menu, index) in menus" :key="index">
        <menu-item :menu="menu" />
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Location, Document, Setting } from '@element-plus/icons-vue'
import MenuItem from './MenuItem.vue'
import { useUserInfoStore } from '@/store'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const store = useUserInfoStore()
const menus = store.menuList

const activeMenu = ref(route.path)

watch(route, (newRoute) => {
  activeMenu.value = newRoute.path
})

const handlerSelect = (e) => {
  router.push({ path: e })
}
</script>

<style scoped>
.menu-icon {
  font-size: 16px;
  /* 调整图标大小 */
  margin-right: 8px;
  /* 调整图标与文字之间的间距 */
}

.f-menu {
  transition: all 0.2s;
  width: 250px;
  top: 64px;
  bottom: 0;
  left: 0;
  overflow-y: auto;
  overflow-x: hidden;
  @apply shadow-md fixed ;
  border-right: solid 1px var(--el-menu-border-color);
}

.f-menu::-webkit-scrollbar {
  width: 0px;
}

::v-deep .el-menu {
  border-right: none;
}
</style>
