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
  <Table :tableData="tableData" :tableOptions="tableOptions" v-model:tLoading="tLoading" :totalCount="totalCount"
    :showOperate="tableOptions.showOperate" @current-change="currenetChange" @size-change="sizeChange">
    <template v-for="(slotContent, idx) in dynamicSlots" :key="idx" v-slot:[slotContent.prop]>
      <slot :name="slotContent.prop" :scope="tableData[idx++]" />
    </template>
    <!-- <template #desc>
      <el-button type="primary" link>编辑</el-button>
    </template> -->
  </Table>
</template>

<script lang="ts" setup>
import { ref, defineProps, onMounted, defineExpose } from 'vue'
import Search from './Search.vue'
import SearchItem from './SearchItem.vue'
import Tabs from '@/components/SearchTable/Tabs.vue'
import Table from '@/components/SearchTable/Table.vue'
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
  disabled: boolean
  background: string
  tableSize: string
  border: boolean
  singTable: any
  searchForm: { [key: string]: any }
  api: Function
  showOperate: boolean
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
const tableOptions = ref(props.tableOptions) // 表格选项

const tableData = ref([]) // 表格数据
const pageSize = ref(10) // 每页显示条数
const currentPage = ref(1) // 当前页
const totalCount = ref(0) // 总条数
const tLoading = ref(true) // 是否显示加载中

const tSearchForm = ref(props.tableOptions.searchForm) // 搜索表单

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

// 收集tableOptions中的singTable数组对象中的 custom: true的对象，将prop和其所在的下标抽出来生成一个对象放进dynamicSlots
const dynamicSlots = ref<{ prop: string; tIndex: number }[]>([])

if (tableOptions.value.singTable && Array.isArray(tableOptions.value.singTable)) {
  tableOptions.value.singTable.forEach((item: any, index: number) => {
    if(item.custom === true){
      dynamicSlots.value.push({ prop: item.prop, tIndex: index })
    }
  })
}
console.log(dynamicSlots.value, 'dynamicSlots')

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

async function getData() {
  // 获取数据
  tLoading.value = true
  searchData.value = { ...tabData.value, ...searchForm.value }
  // 获取数据
  const result = (await tableOptions.value
    .api(currentPage.value, searchData.value)
    .finally(() => {
      setTimeout(() => {
        tLoading.value = false
      }, 200)
    })) as any
  tableData.value = result?.list || []
  totalCount.value = result?.totalCount || 0
}

const resetSearchForm = () => {
  // 重置搜索表单
  for (const key in searchForm.value) {
    searchForm.value[key] = ''
  }
  getData()
}

const sizeChange = (val: number) => {
  // 每页显示条数变化
  pageSize.value = val
  getData()
}

const currenetChange = (val: number) => {
  // 当前页变化
  currentPage.value = val
  getData()
}

const tabChange = (val: string) => {
  // 选项卡变化
  tabData.value.tab = val
  getData()
}
defineExpose({
  getData,
})
onMounted(() => {
  getData()
})
</script>

<style scoped></style>

export default {
name: 'SearchTable'
}
