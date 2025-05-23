import { ref } from 'vue'
import { getGoodsList } from '@/api/goods'
import { addGoodsApi } from '@/api/goods'
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
      showSelect: false, // 是否显示选择框
      stripe: true, // 是否斑马线
      api: getGoodsList, // 请求接口
    },
    tabSet: {
      // 选项卡设置
      key: 'tab',
      defaultSelect: 'all',
      tabbers: tabbars,
    },
    pageSet: {
      // 分页设置
      size: [10, 20, 30, 40], // 每页显示条数选项
      currentPage: 1, // 当前页
      pageSize: 10, // 每页显示条数
    },
  })
  return tableOptions
}
const dialogProps = ref({
  title: '新增',
  width: '50%',
  icon: 'add',
  api: addGoodsApi,
  beforeSave: (ruleForm: any) => ({
    ...ruleForm,
    tab: searchTableRef.value?.tabData.tab, // ← 低代码地在这里调整入参
  }),
})

export { tableData, tableModel, dialogProps, searchTableRef }
