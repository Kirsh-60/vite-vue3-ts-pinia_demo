import { ref } from 'vue'
import { confirm } from '@/utils/confirm'
import { showMessage } from '@/utils/message'

export function useDialog(props, emit) {
  const fullscreen = ref(false)
  const saveLoading = ref(false)
  const basicFormRef = ref(null)

  // 处理关闭操作
  const handleClose = async () => {
    const isConfirmed = await confirm('确认关闭吗？', '确认')
    if (isConfirmed) {
      closeDialog()
    }
  }

  // 关闭对话框的函数
  function closeDialog(): void {
    basicFormRef.value?.resetForm()
    emit('update:dialogVisible', false)
  }

  // 处理保存操作
  async function handleSave() {
    if (!props.formOptions) {
      closeDialog()
    } else {
      basicFormRef.value
        ?.validateForm()
        .then(async () => {
          const isConfirmed = await confirm('确认保存吗？', '确认')
          await emit('onSave')

          if (isConfirmed) {
            saveLoading.value = true
            setTimeout(() => {
              closeDialog()
              showMessage('success', '保存成功')
              saveLoading.value = false
            }, 2000)
          }
        })
        .catch(() => {
          saveLoading.value = false
        })
    }
  }

  return {
    fullscreen,
    saveLoading,
    basicFormRef,
    handleClose,
    closeDialog,
    handleSave,
  }
}
