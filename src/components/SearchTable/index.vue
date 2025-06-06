<template>
  <div>
    <el-config-provider :locale="locale">
      <Tabs v-if="showTabs" :tabSet="tabSet" @tabChange="tabChange" />
      <!-- 搜索 -->
      <Search :model="searchForm" @search="getData" @reset="resetSearchForm">
        <SearchItem v-for="(item, index) in searchForm1" :label="item.label" :key="index">
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
        <template #show v-show="searchForm2.length > 0">
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
      <div class="flex self-center justify-between h-8">
        <!-- <div>{{ tableConfig.tableName }}</div> -->
        <div>
          <slot name="handleOptions" />
        </div>
        <div class="flex self-center">
          <el-tooltip class="box-item" effect="dark" content="刷新表格" placement="top">
            <el-button link @click="refreshTable()">
              <el-icon>
                <Refresh />
              </el-icon>
            </el-button>
          </el-tooltip>
          <i class="px-2"></i>
          <el-tooltip class="px-6 box-item" effect="dark" content="调整间距" placement="top">
            <el-dropdown placement="bottom-start" @command="operationTable">
              <el-button link>
                <el-icon>
                  <Operation />
                </el-icon>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="zc">紧凑</el-dropdown-item>
                  <el-dropdown-item command="mr">默认</el-dropdown-item>
                  <el-dropdown-item command="ks">宽松</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-tooltip>
          <i class="px-2"></i>
          <el-tooltip class="box-item" effect="dark" content="自定义列" placement="top">
            <el-dropdown placement="bottom-start" @command="operationTable">
              <el-button link @click="diyTable()">
                <el-icon>
                  <Setting />
                </el-icon>
              </el-button>
              <template #dropdown>
                <draggable v-model="tableConfig.singTable" item-key="prop" tag="ul" @end="onDragEnd">
                  <template #item="{ element, index }">
                    <li>
                      <el-dropdown-item :key="element.prop">
                        <div style="
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            min-width: 240px;
                            padding: 4px 0;
                          ">
                          <SvgIcon name="tabChange" style="font-size: 14px; flex: 0.1" />
                          <div style="font-weight: bold; flex: 0.8">
                            {{ element.label }}
                          </div>
                          <el-checkbox @click.native.stop :checked="!element.hidden"
                            :disabled="element.checkBoxDisabled" @change="(checked) => checkChanged(checked, index)"
                            style="flex: 0.1" />
                        </div>
                      </el-dropdown-item>
                    </li>
                  </template>
                </draggable>
              </template>
            </el-dropdown>
          </el-tooltip>
        </div>
      </div>
      <div v-if="tableConfig.showSelect" :class="isDark ? 'select-bar-dark' : 'select-bar'">
        <el-icon style="color: #409eff" class="ml-1">
          <WarningFilled />
        </el-icon>
        <text class="px-2 text-sm">已选中&nbsp;{{ selectList }}&nbsp;条记录(可跨页)</text>
        <el-button type="primary" link @click="toggleSelection()">清空</el-button>
      </div>
      <el-table ref="multipleTableRef" :data="tableData" :border="tableConfig.border" v-loading="tLoading" row-key="id"
        style="width: 100%; table-layout: fixed;" :size="tableConfig.tableSize" :stripe="tableConfig.stripe"
        @selection-change="handleSelectionChange" :tree-props="treeProps" default-expand-all>
        <el-table-column v-if="tableConfig.showSelect" type="selection" :reserve-selection="true" width="55" />
        <el-table-column v-if="showIndex" fixed type="index" :index="indexMethod" width="60" label="序号"
          align="center" />
        <el-table-column v-for="(item, index) in computedColumns" :key="index" :prop="item.prop" :label="item.label"
          :width="item.width + '%'" :fixed="item.fixed" :align="item.align"
          :show-overflow-tooltip="item.ellipsis || true">
          <template v-if="item.type == 'img'" #default="scope">
            <el-image v-if="scope.row[item.prop]" :src="scope.row[item.prop]"
              style="width: auto; height: 50px" fit="scale-down" :preview-src-list="[scope.row[item.prop]]" />
          </template>
          <template v-if="item.custom" #default="scope">
            <slot :name="item.prop" :scope="scope" />
          </template>
        </el-table-column>
        <template #empty>
          <el-empty description="暂时查不到记录" />
        </template>
      </el-table>
      <el-pagination v-if="tableOptions.pageSet" v-model:current-page="tableOptions.pageSet.currentPage"
        v-model:page-size="tableOptions.pageSet.pageSize" :page-sizes="tableOptions.pageSet.size"
        :size="tableConfig.tableSize" :disabled="tableConfig.disabled" :background="tableConfig.background"
        layout="total, prev, pager, next, jumper" :total="totalCount" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </el-config-provider>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, onMounted, defineExpose, computed, nextTick } from 'vue'
import Search from './Search.vue'
import SearchItem from './SearchItem.vue'
import Tabs from './Tabs.vue'
import type { TableInstance } from 'element-plus'
import { isDark } from '@/composables'
import { useCookies } from '@vueuse/integrations/useCookies'
import zhCn from '@element-plus/locale/lang/zh-cn'
import en from 'element-plus/dist/locale/en.mjs'
import draggable from 'vuedraggable'

const cookie = useCookies()
const lang = cookie.get('lang')
const language = ref(lang)
const locale = computed(() => (language.value !== 'zh' ? zhCn : en))
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
    tableName: string
    singTable: any
    api: Function
    showOperate: boolean
    disabled: boolean
    tableSize: string
    border: boolean
    background: string
    showIndex: boolean
    showSelect: boolean
    stripe: boolean
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
// 新增计算属性，过滤掉隐藏的列
const computedColumns = computed(() => {
  return tableConfig.value.singTable.filter((item: any) => !item.hidden)
})
const tableData = ref([]) // 表格数据
const pageSize = ref(10) // 每页显示条数
const currentPage = ref(1) // 当前页
const totalCount = ref(0) // 总条数
const tLoading = ref(true) // 是否显示加载中

const multipleTableRef = ref<TableInstance>()
const multipleSelection = ref<any[]>([]) // 选中项列表
const selectList = ref(0) // 选中项列数

const showIndex = ref(tableConfig.value.showIndex || false) // 是否显示序号

const tSearchForm = ref(tableConfig.value.searchForm) // 搜索表单

// 将searchForm拆分为两部分一个是默认显示的，一个是点击展开显示的 
// searchForm1是默认显示的，searchForm2是点击展开显示的，searchForm1是searchForm的前三个个元素，
// searchForm2是searchForm的第四个元素开始
const searchData = ref({})
const searchForm1 = ref(tSearchForm.value.slice(0, 3)) // 默认显示的前三个元素
const searchForm2 = ref(tSearchForm.value.slice(3)) // 点击展开显示的从第四个元素开始
// 选项卡设置
const tabSet = ref(props.tableOptions.tabSet) // 选项卡设置
const tabData = ref<{ tab?: string }>({}) // 选项卡数据
const showTabs = ref(false)
if (tabSet.value) {
  showTabs.value = true // 是否展示选项卡
  tabData.value = {
    // 选项卡数据
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
const indexMethod = (index: number) => {
  // 序号
  return index + 1 + (currentPage.value - 1) * pageSize.value
}
//#endregion

async function getData() {
  // 获取数据
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
  tableData.value = result?.list || result?.menus || []
  tableData.value = addLevel(tableData.value)
  console.log('result', result)
  totalCount.value = result?.total || 0
}
// 递归设置 level
const addLevel = (data: any, level = 1) => {
  return data.map((item: any) => {
    const newItem = { ...item, level }
    if (item.child && item.child.length) {
      newItem.child = addLevel(item.child, level + 1)
    }
    return newItem
  })
}
// 自定义树结构字段
const treeProps = ref({
  children: 'child', // 默认是 "children"，这里改为 "subList"
  label: 'label',
})
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

const refreshTable = () => {
  // 刷新表格
  getData()
}

const diyTable = () => {
  // 自定义表格
}

const operationTable = (c: any) => {
  // 操作表格调整表格size
  switch (c) {
    case 'zc':
      tableConfig.value.tableSize = 'small'
      break
    case 'mr':
      tableConfig.value.tableSize = 'default'
      break
    case 'ks':
      tableConfig.value.tableSize = 'large'
      break
    default:
      break
  }
}

const tabChange = (val: string) => {
  // 选项卡变化
  tabData.value.tab = val
  getData()
}

const handleSelectionChange = (val: any) => {
  // 这里可以根据需要处理选中项的变化
  selectList.value = val.length
  multipleSelection.value = val
}
const toggleSelection = (rows?: any[], ignoreSelectable?: boolean) => {
  if (rows) {
    rows.forEach((row) => {
      multipleTableRef.value!.toggleRowSelection(
        row,
        undefined,
        ignoreSelectable
      )
    })
  } else {
    multipleTableRef.value!.clearSelection()
  }
}
// 处理表格数据变化
const checkChanged = async (checked: boolean, index: number) => {
  tableConfig.value.singTable[index].hidden = !checked
  // 等待 DOM 更新完成后刷新表格布局
  await nextTick()
  multipleTableRef.value?.doLayout()
  console.log(computedColumns.value)
}
// 新增拖拽结束的事件
const onDragEnd = async () => {
  // 拖拽完成后调用表格布局刷新
  await nextTick()
  multipleTableRef.value?.doLayout()
}
defineExpose({
  getData,
  refreshTable,
  tabData,
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

.select-bar {
  width: 100%;
  height: 34px;
  background-color: #e6f7ff;
  margin: 8px 0;
  display: flex;
  align-items: center;
}

.select-bar-dark {
  width: 100%;
  height: 34px;
  background-color: #121212;
  margin: 8px 0;
  display: flex;
  align-items: center;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>

export default { name: 'SearchTable' }
