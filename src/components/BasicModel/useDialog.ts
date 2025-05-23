import { ref } from 'vue'
import { confirm } from '@/utils/confirm'
import { resetForm } from '@/components/BasicForm/formMethods'
import { showMessage } from '@/utils/message'

export function useDialog(
  props: {
    readonly dialogVisible?: any
    readonly dialogProps?: {
      api?: (data: any) => Promise<any>
      beforeSave?: (data: any) => any // ← 新增钩子
      width?: string
      icon?: string
      title?: string
    }
    readonly formOptions?: any
  },
  emit: {
    (event: 'update:dialogVisible' | 'onSave', ...args: any[]): void
    (arg0: string, arg1: boolean | undefined): void
  }
) {
  const fullscreen = ref(false)
  const saveLoading = ref(false)
  const basicFormRef = ref<{
    validateForm(): Promise<void>
    resetForm(): void
    ruleForm: any
  } | null>(null)

  const handleClose = async () => {
    if (await confirm('确认关闭吗？', '确认')) {
      resetForm()
      emit('update:dialogVisible', false)
    }
  }

  async function handleSave(customData?: any): Promise<void> {
    try {
      // 校验
      await basicFormRef.value!.validateForm()
      // 二次确认
      if (!(await confirm('确认保存吗？', '确认'))) return

      // 拿到原始数据
      let dataToSave = customData ?? basicFormRef.value!.ruleForm
      if (!dataToSave) {
        showMessage('error', '表单数据不能为空')
        return
      }

      // 低代码钩子：父组件可以透过 dialogProps.beforeSave 修改数据
      if (props.dialogProps?.beforeSave) {
        dataToSave = props.dialogProps.beforeSave(dataToSave)
      }

      console.log('最终保存数据：', dataToSave)
      // 通知父组件（如果需要在父组件额外处理）
      emit('onSave', dataToSave)

      // 如果配置了 api，就交给组件内部去跑
      if (props.dialogProps?.api) {
        saveLoading.value = true
        try {
          const res = await props.dialogProps.api(dataToSave)
          if (res.data?.code === 200) {
            showMessage('success', '保存成功')
            resetForm()
            emit('update:dialogVisible', false)
            // 刷新table表格
          } else {
            showMessage('error', res.data?.msg || '保存失败')
          }
        } catch {
          showMessage('error', '保存失败')
        } finally {
          saveLoading.value = false
        }
      }
    } catch {
      saveLoading.value = false
    }
  }

  return {
    fullscreen,
    saveLoading,
    basicFormRef,
    handleClose,
    closeDialog: () => {
      resetForm()
      emit('update:dialogVisible', false)
    },
    handleSave,
  }
}
