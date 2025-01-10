<template>
  <Tabs v-if="showTabs" :tabSet="tabSet" @tabChange="tabChange" />
  <!-- 搜索 -->
  <Search :model="searchForm" @search="getData" @reset="resetSearchForm">
    <SearchItem v-for="(item, index) in searchForm1" :label="item.label" :key="index">
      <template v-if="item.type == 'input'">
        <el-input v-model="searchForm[item.model]" :placeholder="item.placeholder" clearable></el-input>
      </template>
      <template v-else-if="item.type == 'select'">
        <el-select v-model="searchForm[item.model]" :placeholder="item.placeholder" clearable>
          <el-option v-for="ele in item.options" :key="ele.id" :label="ele.label" :value="ele.id">
          </el-option>
        </el-select>
      </template>
    </SearchItem>
    <template #show>
      <SearchItem v-for="(item, index) in searchForm2" :label="item.label" :key="index">
        <template v-if="item.type == 'input'">
          <el-input v-model="searchForm[item.model]" :placeholder="item.placeholder" clearable></el-input>
        </template>
        <template v-else-if="item.type == 'select'">
          <el-select v-model="searchForm[item.model]" :placeholder="item.placeholder" clearable>
            <el-option v-for="ele in item.options" :key="ele.value" :label="ele.label" :value="ele.value">
            </el-option>
          </el-select>
        </template>
      </SearchItem>
    </template>
  </Search>
  <el-table :data="tableData" :border="tableConfig.border" style="width: 100%" v-loading="tLoading"
    @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="55" />
    <el-table-column v-if="showIndex" fixed type="index" width="60" label="序号" align="center" />
    <el-table-column v-for="(item, index) in tableConfig.singTable" :key="index" :prop="item.prop" :label="item.label"
      :width="item.width" :fixed="item.fixed" :align="item.align" :show-overflow-tooltip="item.ellipsis || true">
      <template v-if="item.custom" #default="scope">
        <slot :name="item.prop" :scope="scope" />
      </template>
    </el-table-column>
  </el-table>
  <el-pagination v-model:current-page="tableOptions.pageSet.currentPage"
    v-model:page-size="tableOptions.pageSet.pageSize" :page-sizes="tableOptions.pageSet.size"
    :size="tableConfig.tableSize" :disabled="tableConfig.disabled" :background="tableConfig.background"
    layout="total, prev, pager, next, jumper" :total="totalCount" @size-change="handleSizeChange"
    @current-change="handleCurrentChange" />
</template>

<script lang="ts" setup>
import { ref, defineProps, onMounted, defineExpose } from 'vue'
import Search from './Search.vue'
import SearchItem from './SearchItem.vue'
import Tabs from './Tabs.vue'

// #region
// 定义表格选项类型
/**
 * 表格选项接口
 * @interface TableOptions
 * @property {boolean} disabled - 是否禁用
 * @property {string} background - 背景颜色
 * @property {string} tableSize - 表格尺寸
 * @property {boolean} border - 是否显示边框
 * @property {any} singTable - 单个表格数据
 * @property {{ [key: string]: any }} searchForm - 搜索表单数据
 * @property {Function} api - API请求函数
 * @property {boolean} showOperate - 是否显示操作列
 * @property {{ key: string, defaultSelect: string, tabbers: { name: string, key: string }[] }} tabSet - 标签设置
 * @property {{ size: number[], currentPage: number, pageSize: number }} pageSet - 分页设置
 */
interface TableOptions {
  tableConfig: {
    singTable: any
    api: Function
    showOperate: boolean
    disabled: boolean
    tableSize: string
    border: boolean
    background: string
    showIndex: boolean
    searchForm: { [key: string]: any }
  }
  tabSet: {
    key: string
    defaultSelect: string
    tabbers: { name: string; key: string }[]
  }
  pageSet: {
    size: number[]
    currentPage: number
    pageSize: number
  }
}

// 定义表格选项
const props = defineProps<{
  tableOptions: TableOptions
}>()
const tableConfig = ref(props.tableOptions.tableConfig) // 表格配置

const tableData = ref([]) // 表格数据
const pageSize = ref(10) // 每页显示条数
const currentPage = ref(1) // 当前页
const totalCount = ref(0) // 总条数
const tLoading = ref(true) // 是否显示加载中

const showIndex = ref(tableConfig.value.showIndex || false) // 是否显示序号

const tSearchForm = ref(tableConfig.value.searchForm) // 搜索表单

// 将searchForm拆分为两部分一个是默认显示的，一个是点击展开显示的 searchForm1是默认显示的，searchForm2是点击展开显示的，searchForm1是searchForm的第一个元素，searchForm2是searchForm的第二个元素开始
const searchData = ref({})
const searchForm1 = ref([tSearchForm.value[0]])
const searchForm2 = ref(tSearchForm.value.slice(1))

// 选项卡设置
const tabSet = ref(props.tableOptions.tabSet) // 选项卡设置
const tabData = ref<{ tab?: string }>({}) // 选项卡数据
const showTabs = ref(false)
if (tabSet.value) {
  showTabs.value = true // 是否展示选项卡
  tabData.value = { // 选项卡数据
    tab: tabSet.value.defaultSelect,
  }
} else {
  tabData.value = {}
}
// 搜索表单
const searchForm = ref(
  tSearchForm.value.reduce(
    (
      acc: { [x: string]: any },
      field: { model: string | number; defaultSelect: string }
    ) => {
      acc[field.model] = field.defaultSelect ?? '' // 如果存在 defaultSelect，则使用；否则初始化为空字符串
      return acc
    },
    {}
  )
)
//#endregion



async function getData() { // 获取数据
  tLoading.value = true
  searchData.value = { ...tabData.value, ...searchForm.value }
  // 获取数据
  const result = (await tableConfig.value
    .api(currentPage.value, searchData.value)
    .finally(() => {
      setTimeout(() => {
        tLoading.value = false
      }, 200)
    })) as any
  tableData.value = result?.list || []
  totalCount.value = result?.totalCount || 0
}

const resetSearchForm = () => { // 重置搜索表单
  for (const key in searchForm.value) {
    searchForm.value[key] = ''
  }
  getData()
}

const handleSizeChange = (val: number) => { // 每页显示条数变化
  pageSize.value = val
  getData()
}

const handleCurrentChange = (val: number) => {// 当前页变化
  currentPage.value = val
  getData()
}

const tabChange = (val: string) => { // 选项卡变化
  tabData.value.tab = val
  getData()
}


const multipleSelection = ref<any[]>([])
const handleSelectionChange = (val: any) => {
  multipleSelection.value = val
}
defineExpose({
  getData,
})
onMounted(() => {
  getData()
})
</script>

<style scoped>
.el-pagination {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
  /* 使用 flex-end 代替 right */
}
</style>

export default {
name: 'SearchTable'
}
