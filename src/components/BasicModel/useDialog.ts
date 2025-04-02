import { ref } from 'vue'
import { confirm } from '@/utils/confirm'
import { showMessage } from '@/utils/message'
import { resetForm } from '@/components/BasicForm/formMethods'
export function useDialog(
  props: {
    readonly dialogVisible?: any
    readonly dialogProps?: any
    readonly formOptions?: any
  },
  emit: {
    (event: 'update:dialogVisible' | 'onSave', ...args: any[]): void
    (arg0: string, arg1: boolean | undefined): void
  }
) {
  const fullscreen = ref(false)
  const saveLoading = ref(false)
  const basicFormRef = ref<{ resetForm: () => void } | null>(null)

  // 处理关闭操作
  const handleClose = async () => {
    const isConfirmed = await confirm('确认关闭吗？', '确认')
    if (isConfirmed) {
      closeDialog()
    }
  }

  // 关闭对话框的函数
  function closeDialog(): void {
    // basicFormRef.value?.resetForm()
    resetForm()
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
