<template>
  <div>
    <h1>用户列表</h1>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.name }} - {{ user.age }} 岁 - {{ user.email }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'

export default {
  setup() {
    const users = ref([])

    onMounted(async () => {
      try {
        axios.post('/admin/getinfo').then((res) => {
          console.log('获取成功', res)
          this.userInfo = res
          this.menuList = this.userInfo.menus
          resolve(res)
        })
      } catch (error) {
        console.error('获取用户列表失败', error)
      }
    })

    return {
      users,
    }
  },
}
</script>
