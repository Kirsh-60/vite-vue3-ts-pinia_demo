<template>
  <div class="f-header" :style="{ backgroundColor: isDark ? '#121212' : '#4338ca' }">
    <span class="logo">
      <el-icon class="mr-2">
        <ElemeFilled />
      </el-icon>
      <span>V积分管理后台</span>
    </span>
    <el-icon v-if="isCollapse" class="icon-btn" @click="handleQuery(1)">
      <Fold />
    </el-icon>
    <el-icon v-else class="icon-btn" @click="handleQuery(2)">
      <Expand />
    </el-icon>
    <el-tooltip class="box-item" effect="dark" content="刷新" placement="bottom">
      <el-icon class="icon-btn" @click="handleRefresh">
        <Refresh />
      </el-icon>
    </el-tooltip>
    <div class="ml-auto flex justify-center items-center">
      <el-tooltip
        class="box-item"
        effect="dark"
        :content="isFullscreen ? '取消全屏' : '全屏'"
        placement="bottom"
      >
        <el-icon class="icon-btn" @click="handleToggle">
          <FullScreen v-if="!isFullscreen" />
          <Aim v-else />
        </el-icon>
      </el-tooltip>
      <el-tooltip
        class="box-item"
        effect="dark"
        :content="isDark ? '酷夜' : '明亮'"
        placement="bottom"
      >
        <el-icon class="icon-btn" @click="toggleDark()">
          <Sunny v-if="!isDark" />
          <Moon v-else />
        </el-icon>
      </el-tooltip>
      <el-tooltip
        class="box-item"
        effect="dark"
        :content="lang != 'zh' ? '切换英语' : 'Language chinese'"
        placement="bottom"
      >
        <el-icon class="icon-btn" @click="handleLanguage">
          <SvgIcon name="ch" color="white" width="20px" height="20px"></SvgIcon>
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
  <FormDrawer
    ref="formDrawer"
    :title="title"
    destroyOnClose
    @submit="onSubmit"
    @close="onClose"
  >
    <el-form size="large" ref="formRef" :rules="rules" :model="form" label-width="80px">
      <el-form-item prop="oldpassword" label="旧密码">
        <el-input v-model="form.oldpassword" placeholder="请输入旧密码"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="新密码">
        <el-input
          type="password"
          v-model="form.password"
          placeholder="请输入密码"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item prop="repassword" label="确认密码">
        <el-input
          type="password"
          v-model="form.repassword"
          placeholder="请输入确认密码"
          show-password
        ></el-input>
      </el-form-item>
    </el-form>
  </FormDrawer>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted, useTemplateRef } from "vue";
import { toast } from "@/composables/utils";
import { useFullscreen } from "@vueuse/core";
import { useUserInfoStore } from "@/store";
import { updatepassword } from "@/api/manager";
// @ts-ignore
import FormDrawer from "@/components/FormDrawer.vue";
import { useRepassword } from "@/composables/useManager";
const { form, rules, handleLogout } = useRepassword();
const store = useUserInfoStore();
import { isDark, toggleDark } from "@/composables";
import { useCookies } from "@vueuse/integrations/useCookies";

const cookie = useCookies();
const lang = cookie.get("lang");

// isFullscreen:是否全屏状态 toggle：转态切换
const { isFullscreen, toggle } = useFullscreen();
let title = ref("修改密码");

const formRef = useTemplateRef("formRef");
const formDrawer = ref(null);

const isCollapse = ref(store.isCollapse); // 菜单抽屉状态

// 下拉菜单选项
function handleCommand(c: any) {
  switch (c) {
    case "logout":
      console.log("退出登陆");
      handleLogout();
      break;
    case "rePassword":
      console.log("修改密码");
      formDrawer.value.open();
      break;

    default:
      break;
  }
}

// 刷新
const handleRefresh = () => {
  location.reload();
};
// 切换全屏
const handleToggle = () => {
  toggle();
};
const handleLanguage = () => {
  if (lang === "zh") {
    cookie.set("lang", "en");
  } else {
    cookie.set("lang", "zh");
  }
  location.reload();
};
// 切换菜单抽屉
const handleQuery = (status: number) => {
  console.log("折叠状态", status);
  if (status === 2) {
    store.toggleCollapse(true);
  } else {
    store.toggleCollapse(false);
  }
  isCollapse.value = store.isCollapse;
};
function onClose() {
  formRef.value.resetFields();
}
const loading = ref(false);
function onSubmit() {
  formRef.value.validate((valid: any) => {
    if (!valid) {
      return false;
    }
    loading.value = true;
    updatepassword(form)
      .then(() => {
        toast("修改密码成功！请重新登陆");
        // 清除当前用户状态 vuex
        store.logout();
      })
      .finally(() => {
        loading.value = false;
      });
  });
}

const handleResize = () => {
  // 当窗口宽度小于850，则折叠菜单；大于等于850则展开
  const shouldCollapse = window.innerWidth < 850;
  if (shouldCollapse !== store.isCollapse) {
    store.toggleCollapse(shouldCollapse);
    isCollapse.value = store.isCollapse;
  }
};

onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>
<style scoped>
.f-header {
  @apply flex items-center text-light-50 fixed top-0 left-0 right-0;
  height: 64px;
  z-index: 999;
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
