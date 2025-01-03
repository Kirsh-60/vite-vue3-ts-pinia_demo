<template>
  <!-- 搜索 -->
  <Search :model="searchForm" @search="getData" @reset="resetSearchForm">
    <SearchItem
      v-for="(item, index) in searchForm1"
      :label="item.label"
      :key="index"
    >
      <template v-if="item.type == 'input'">
        <el-input
          v-model="searchForm[item.model]"
          :placeholder="item.placeholder"
          clearable
        ></el-input>
      </template>
      <template v-else-if="item.type == 'select'">
        <el-select
          v-model="searchForm[item.model]"
          :placeholder="item.placeholder"
          clearable
        >
          <el-option
            v-for="ele in item.options"
            :key="ele.id"
            :label="ele.label"
            :value="ele.id"
          >
          </el-option>
        </el-select>
      </template>
    </SearchItem>
    <template #show>
      <SearchItem
        v-for="(item, index) in searchForm2"
        :label="item.label"
        :key="index"
      >
        <template v-if="item.type == 'input'">
          <el-input
            v-model="searchForm[item.model]"
            :placeholder="item.placeholder"
            clearable
          ></el-input>
        </template>
        <template v-else-if="item.type == 'select'">
          <el-select
            v-model="searchForm[item.model]"
            :placeholder="item.placeholder"
            clearable
          >
            <el-option
              v-for="ele in item.options"
              :key="ele.value"
              :label="ele.label"
              :value="ele.value"
            >
            </el-option>
          </el-select>
        </template>
      </SearchItem>
    </template>
  </Search>
  <el-table
    :data="tableData"
    :border="tableOptions.border"
    style="width: 100%"
    v-loading="tLoading"
  >
    <el-table-column
      v-for="(item, index) in tableOptions.singTable"
      :key="index"
      :prop="item.prop"
      :label="item.label"
      :width="item.width"
    />
  </el-table>
  <el-pagination
    v-model:current-page="tableOptions.pageSet.currentPage"
    v-model:page-size="tableOptions.pageSet.pageSize"
    :page-sizes="tableOptions.pageSet.size"
    :size="tableOptions.tableSize"
    :disabled="tableOptions.disabled"
    :background="tableOptions.background"
    layout="total, sizes, prev, pager, next, jumper"
    :total="totalCount"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script lang="ts" setup>
import { ref, reactive, defineProps, onMounted } from 'vue'
import Search from '@/components/Search.vue'
import SearchItem from '@/components/SearchItem.vue'
// 定义表格选项类型
interface TableOptions {
  disabled: boolean
  background: string
  tableSize: string
  border: boolean
  singTable: { [key: string]: any }
  searchForm: { [key: string]: any }
  api: Function
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
const totalCount = ref(0) // 总条数
const tLoading = ref(true) // 是否显示加载中
const pageSize = ref(props.tableOptions.pageSet.pageSize) // 每页显示条数
const currentPage = ref(props.tableOptions.pageSet.currentPage) // 当前页
const tSearchForm = ref(props.tableOptions.searchForm) // 搜索表单
// 将searchForm拆分为两部分一个是默认显示的，一个是点击展开显示的 searchForm1是默认显示的，searchForm2是点击展开显示的，searchForm1是searchForm的第一个元素，searchForm2是searchForm的第二个元素开始
const searchForm1 = ref([tSearchForm.value[0]])
const searchForm2 = ref(tSearchForm.value.slice(1))

const searchForm = ref<{ [key: string]: any }>({})
for (const key in tSearchForm.value) {
  searchForm.value[key] = tSearchForm.value[key]
}

async function getData() {
  // 获取数据
  tLoading.value = true
  // 获取数据
  const result = (await tableOptions.value
    .api(currentPage.value, pageSize.value)
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

const handleSizeChange = (val: number) => {
  // 每页显示条数变化
  pageSize.value = val
  getData()
}

const handleCurrentChange = (val: number) => {
  // 当前页变化
  currentPage.value = val
  getData()
}

onMounted(() => {
  getData()
})
</script>

<style scoped>
.el-pagination {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end !important; /* 使用 flex-end 代替 right */
}
</style>
