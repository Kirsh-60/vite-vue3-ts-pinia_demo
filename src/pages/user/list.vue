<!-- App.vue 或任意组件 -->
<template>
  <draggable v-model="list" item-key="id" tag="ul">
    <template #item="{ element }">
      <li>{{ element.name }}</li>
    </template>
  </draggable>
</template>

<script setup>
import { ref } from 'vue'
import draggable from 'vuedraggable'

const list = ref([
  { id: 1, name: '苹果' },
  { id: 2, name: '香蕉' },
  { id: 3, name: '橘子' }
])
</script>
