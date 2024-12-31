<template>
  <el-sub-menu v-if="menu.child && menu.child.length" :index="menu.name">
    <template #title>
      <el-icon>
        <component :is="menu.icon" class="menu-icon" />
      </el-icon>
      <span>{{ menu.name }}</span>
    </template>
    <menu-item
      v-for="(item, indexs) in menu.child"
      :key="indexs"
      :menu="item"
    />
  </el-sub-menu>
  <el-menu-item v-else :index="menu.frontpath">
    <el-icon>
      <component :is="menu.icon" class="menu-icon" />
    </el-icon>
    <template #title>{{ menu.name }}</template>
  </el-menu-item>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    menu: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>
.menu-icon {
  font-size: 16px;
  /* 调整图标大小 */
  margin-right: 8px;
  /* 调整图标与文字之间的间距 */
}
</style>
