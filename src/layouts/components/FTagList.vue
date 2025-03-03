<template>
  <!-- tag标签 -->
  <div class="f-tag-list" :style="{ left: store.asideWidth, backgroundColor: isDark ? '' : '#f3f4f6' }">
    <el-tabs v-model="activeTab" type="card" class="demo-tabs" @tab-remove="removeTab" @tab-change="changeTab"
      style="min-width: 200px">
      <el-tab-pane v-for="item in tablist" :key="item.path" :closable="item.path != '/'" :label="item.title"
        :name="item.path">
      </el-tab-pane>
    </el-tabs>
    <span :class="isDark?'tag-btn-dark':'tag-btn'">
      <el-dropdown @command="handelClose">
        <span class="el-dropdown-link">
          <el-icon>
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="clearOther">关闭其他</el-dropdown-item>
            <el-dropdown-item command="clearAll">关闭全部</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </span>
  </div>
  <div style="height: 45px"></div>
</template>
<script setup>
import { isDark } from '@/composables';
import { useTagList } from '@/composables/useTagList.ts'
import { useUserInfoStore } from '@/store'

const store = useUserInfoStore()
const { tablist, activeTab, removeTab, changeTab, handelClose } = useTagList()

</script>
<style scoped>
.f-tag-list {
  @apply fixed flex items-center px-2;
  top: 64px;
  right: 0;
  height: 44px;
  z-index: 100;
  background: #121212;
}

.tag-btn {
  @apply bg-white rounded ml-auto flex items-center justify-center px-2;
  height: 32px;
}

.tag-btn-dark {
  @apply bg-blue-gray-800 rounded ml-auto flex items-center justify-center px-2;
  height: 32px;
}

::v-deep(.el-tabs__header) {
  margin-bottom: 0;
  line-height: 38px;
  border: 0 !important;
}

::v-deep(.el-tabs--card > .el-tabs__header .el-tabs__nav) {
  border: 0 !important;
}

::v-deep(.el-tabs__item) {
  border: 0 !important;
  height: 32px;
  line-height: 32px;
  @apply bg-white ml-1 rounded-lg;
}

/* ::v-deep(.el-tabs__item) {
  border: 0 !important;
  height: 32px;
  line-height: 32px;
  @apply bg-white ml-1 rounded-lg;
}

::v-deep(.is-disabled) {
  cursor: not-allowed;
  @apply text-gray-300;
} */

</style>
