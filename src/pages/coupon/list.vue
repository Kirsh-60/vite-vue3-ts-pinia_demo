<template>
  <el-form :model="form">
    <el-form-item label="菜单图标">
      <el-input
        v-model="form.icon"
        style="max-width: 600px"
        placeholder="点击选择图标"
        @click="dialogVisible = true"
      >
        <template #append>
          <el-button :icon="selectedIcon" />
        </template>
      </el-input>
    </el-form-item>
  </el-form>

  <!-- 弹窗 -->
  <el-dialog v-model="dialogVisible" title="选择图标" width="50%">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="基础图标" name="base">
        <div class="icon-grid">
          <div
            v-for="icon in iconCategories.base"
            :key="icon.name"
            class="icon-item"
            :class="{ selected: form.icon === icon.name }"
            @click="selectIcon(icon.name)"
          >
            <component :is="icon.component" class="icon-preview" />
            <!-- <span class="icon-name">{{ icon.name }}</span> -->
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="操作图标" name="action">
        <div class="icon-grid">
          <div
            v-for="icon in iconCategories.action"
            :key="icon.name"
            class="icon-item"
            :class="{ selected: form.icon === icon.name }"
            @click="selectIcon(icon.name)"
          >
            <component :is="icon.component" class="icon-preview" />
            <!-- <span class="icon-name">{{ icon.name }}</span> -->
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="方向图标" name="direction">
        <div class="icon-grid">
          <div
            v-for="icon in iconCategories.direction"
            :key="icon.name"
            class="icon-item"
            :class="{ selected: form.icon === icon.name }"
            @click="selectIcon(icon.name)"
          >
            <component :is="icon.component" class="icon-preview" />
            <!-- <span class="icon-name">{{ icon.name }}</span> -->
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

    <template #footer>
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="confirmSelection">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, computed } from 'vue'
import * as Icons from '@element-plus/icons-vue'

const dialogVisible = ref(false)
const activeTab = ref('base')

const form = ref({
  icon: '',
})

// 根据名称分类
const iconCategories = {
  base: Object.keys(Icons)
    .filter((name) => name.includes('Circle') || name.includes('Filled'))
    .map((name) => ({ name, component: Icons[name] })),
  action: Object.keys(Icons)
    .filter((name) => name.includes('Check') || name.includes('Close'))
    .map((name) => ({ name, component: Icons[name] })),
  direction: Object.keys(Icons)
    .filter((name) => name.includes('Arrow') || name.includes('Caret'))
    .map((name) => ({ name, component: Icons[name] })),
}

const selectedIcon = computed(() => {
  return form.value.icon ? Icons[form.value.icon] : null
})

const selectIcon = (iconName) => {
  form.value.icon = iconName
  selectedIcon.value = Icons[iconName]
}

const confirmSelection = () => {
  dialogVisible.value = false
}
</script>

<style scoped>
/* 让图标区域自适应宽度 */
.icon-grid {
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(65px, 1fr)
  ); /* 每列最小40px，自适应列数 */
  gap: 30px;
  padding: 10px;
}

/* 单个图标样式 */
.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  transition: all 0.2s;
}

/* 鼠标悬停时的高亮效果 */
.icon-item:hover {
  background: #f0faff;
}

/* 选中状态 */
.icon-item.selected {
  border: 2px solid #409eff;
  background: #e6f7ff;
  border-radius: 6px;
}

/* 图标大小 14px */
.icon-preview {
  font-size: 24px;
  width: 24px;
  height: 24px;
}

/* 选中的图标样式 */
.icon-preview-selected {
  font-size: 24px;
  color: #409eff;
}

/* 图标名称 */
.icon-name {
  font-size: 12px;
  text-align: center;
  white-space: nowrap;
}
</style>
