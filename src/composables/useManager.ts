// 修改密码
import { ref, reactive } from 'vue'
import { showModal, toast } from '@/composables/utils'
import { useRouter } from 'vue-router'
import { useRepasswordm } from '@/composables/useManager'
import { useUserInfoStore } from '@/store'
import { logout } from '@/api/login'
export function useRepassword() {
  const router = useRouter()
  const store = useUserInfoStore()
  const form = reactive({
    oldpassword: '',
    password: '',
    repassword: '',
  })
  const rules = {
    oldpassword: [
      {
        required: true,
        message: '旧密码不能为空',
        trigger: 'blur',
      },
    ],
    password: [
      {
        required: true,
        message: '新密码不能为空',
        trigger: 'blur',
      },
    ],
    repassword: [
      {
        required: true,
        message: '确认密码不能为空',
        trigger: 'blur',
      },
    ],
  }
  // 退出登录
  const handleLogout = () => {
    showModal('是否要退出登陆?', '温馨提示')
      .then(() => {
        logout().finally(async () => {
          // 清除当前用户状态 vuex
          await store.logout()
          // 跳转到登陆页
          router.push('/login')
          // 提示用户登陆成功
          toast('退出登陆成功')
        })
      })
      .catch(() => {})
  }
  return { form, rules, handleLogout }
}
