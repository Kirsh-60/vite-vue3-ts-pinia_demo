<template>
  <div class="f-header">
    <span class="logo">
      <el-icon class="mr-2">
        <ElemeFilled />
      </el-icon>
      <span>V积分管理后台</span>
    </span>
    <el-icon v-if="isCollapse" class="icon-btn" @click="handleQuery">
      <Fold />
    </el-icon>
    <el-icon v-else class="icon-btn" @click="handleQuery">
      <Expand />
    </el-icon>
    <el-tooltip class="box-item" effect="dark" content="刷新" placement="bottom">
      <el-icon class="icon-btn" @click="handleRefresh">
        <Refresh />
      </el-icon>
    </el-tooltip>
    <div class="ml-auto flex justify-center items-center">
      <el-tooltip class="box-item" effect="dark" :content="isFullscreen ? '取消全屏' : '全屏'" placement="bottom">
        <el-icon class="icon-btn" @click="handleToggle">
          <FullScreen v-if="!isFullscreen" />
          <Aim v-else />
        </el-icon>
      </el-tooltip>
      <el-tooltip class="box-item" effect="dark" :content="isDark ? '酷夜' : '明亮'" placement="bottom">
        <el-icon class="icon-btn" @click="toggleDark()">
          <Sunny v-if="!isDark" />
          <Moon v-else />
        </el-icon>
      </el-tooltip>
      <el-dropdown class="dropdown" @command="handleCommand">
        <span class="el-dropdown-link flex items-center text-sl">
          <el-avatar :size="30" :src="store.userInfo.avatar" class="mr-2" />
          {{ store.userInfo.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登陆</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
  <!-- 抽屉弹窗 -->
  <FormDrawer ref="formDrawer" :title="title" destroyOnClose @submit="onSubmit" @close="onClose">
    <el-form size="large" ref="formRef" :rules="rules" :model="form" label-width="80px">
      <el-form-item prop="oldpassword" label="旧密码">
        <el-input v-model="form.oldpassword" placeholder="请输入旧密码"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="新密码">
        <el-input type="password" v-model="form.password" placeholder="请输入密码" show-password></el-input>
      </el-form-item>
      <el-form-item prop="repassword" label="确认密码">
        <el-input type="password" v-model="form.repassword" placeholder="请输入确认密码" show-password></el-input>
      </el-form-item>
    </el-form>
  </FormDrawer>
</template>
<script setup>
import { ref, reactive } from 'vue'
import { logout } from '@/api/login'
import { showModal, toast } from '@/composables/utils'
import { useRouter } from 'vue-router'
import { useFullscreen } from '@vueuse/core'
import { useUserInfoStore } from '@/store'
import { updatepassword } from '@/api/manager'
import FormDrawer from '@/components/FormDrawer.vue'
import { useRepassword } from '@/composables/useManager'
const { form, rules, handleLogout } = useRepassword()
const router = useRouter()
const store = useUserInfoStore()
import { isDark,toggleDark } from '@/composables'
// isFullscreen:是否全屏状态 toggle：转态切换
const { isFullscreen, toggle } = useFullscreen()
let title = ref('修改密码')

const formRef = ref(null)
const formDrawer = ref(null)

const isCollapse = ref(false) // 菜单抽屉状态

// 下拉菜单选项
function handleCommand(c) {
  switch (c) {
    case 'logout':
      console.log('退出登陆')
      handleLogout()
      break
    case 'rePassword':
      console.log('修改密码')
      formDrawer.value.open()
      break

    default:
      break
  }
}

// 刷新
const handleRefresh = () => {
  location.reload()
}
// 切换全屏
const handleToggle = () => {
  toggle()
}
// 切换菜单抽屉
const handleQuery = () => {
  store.toggleCollapse()
  isCollapse.value = store.isCollapse
}
function onClose() {
  formRef.value.resetFields()
}
function onSubmit() {
  formRef.value.validate((valid) => {
    if (!valid) {
      return false
    }
    loading.value = true
    updatepassword(form)
      .then((res) => {
        toast('修改密码成功！请重新登陆')
        // 清除当前用户状态 vuex
        store.dispatch('logout')
        // 跳转到登陆页
        router.push('/login')
      })
      .finally(() => {
        loading.value = false
      })
  })
}
</script>
<style scoped>
.f-header {
  @apply flex items-center bg-indigo-700 text-light-50 fixed top-0 left-0 right-0;
  height: 64px;
  z-index: 2;
}

.logo {
  width: 250px;
  @apply flex justify-center items-center text-2xl font-thin;
}

.icon-btn {
  @apply flex justify-center items-center;
  width: 42px;
  height: 64px;
  cursor: pointer;
}

.icon-btn:hover {
  @apply bg-indigo-600;
}

.dropdown {
  height: 64px;
  cursor: pointer;
  @apply flex justify-center items-center text-light-50 mx-1;
}
</style>
