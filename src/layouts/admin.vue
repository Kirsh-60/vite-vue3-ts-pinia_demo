<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <FHeader />
      </el-header>
      <el-container>
        <el-aside :width="store.asideWidth">
          <FMenu />
        </el-aside>
        <el-main style="padding: 15px">
          <FTagList />
          <div class="main-content">
            <router-view v-slot="{ Component }">
              <transition name="fade">
                <!-- 缓存 缓存最大页数 10 页 可配置 max -->
                <keep-alive :max="10">
                  <component :is="Component"></component>
                </keep-alive>
              </transition>
            </router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import { defineComponent, ref, onMounted } from 'vue'
import FHeader from './components/FHeader.vue'
import FMenu from './components/FMenu.vue'
import FTagList from './components/FTagList.vue'
import { useUserInfoStore } from '@/store'
const store = useUserInfoStore()

const browserHeight = ref(0)

const updateBrowserHeight = () => {
  browserHeight.value = window.innerHeight - 150
}
onMounted(() => {
  updateBrowserHeight()
  window.addEventListener('resize', updateBrowserHeight)
})
</script>
<style scoped>
.main-content {
  padding: 20px;
  /* background-color: #fff; */
  border-radius: 6px;
  height: auto;
}
</style>
