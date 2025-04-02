import { ref, computed } from 'vue'
import { getInfo } from '@/api/login'
import { title, icon } from './baseApi.ts' // 引入 title

const searchTableRef = ref(null)
const tableData = ref([])
const tableModel = (singTable: any[], searchForm: any[], tabbars: any[]) => {
  const tableOptions = ref({
    tableConfig: {
      tableName: '可选择表格', // 表格名称
      background: '', // 表格样式
      tableSize: '', // 表格尺寸
      border: true, // 是否显示纵向边框
      singTable: singTable, // 表格配置
      searchForm: searchForm, // 搜索表单配置
      showOperate: true, // 是否显示操作列
      disabled: false, // 是否禁用
      showIndex: false, // 是否显示序号
      showSelect: true, // 是否显示选择框
      stripe: true, // 是否斑马线
      api: getInfo, // 请求接口
    },
  })
  return tableOptions
}
const dialogProps = ref({
  title: computed(() => title.value), // 动态绑定 title
  width: '50%',
  icon: computed(() => icon.value),
})

export { tableData, tableModel, dialogProps, searchTableRef }
