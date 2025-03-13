// 商品销量排行表头配置项
// singTable 的 每一项注释：
// label: 表头显示的文字
// prop: 对应的数据字段名称
// width: 列宽
// showOverflowTooltip: 是否超出宽度隐藏显示tooltip提示框 默认为true
// custom: 是否自定义渲染内容，默认为false，如果要自定义渲染内容，设置为true即可

// fixed: 是否固定列，可选值为left、right，默认为空（不固定）
export const singTable = [
  {
    label: '菜单名称',
    prop: 'name',
    width: 200,
    ellipsis: false,
  },
  {
    label: '菜单类型',
    prop: 'type',
    width: 200,
    align: 'center',
    custom: true,
  },
  {
    label: '图标',
    prop: 'icon',
    width: 100,
    align: 'center',
    custom: true,
  },
  {
    label: '组件',
    prop: 'desc',
    width: 400,
    align: 'center',
  },
  {
    label: '路径',
    prop: 'frontpath',
    align: 'center',
  },
  {
    label: '排序',
    prop: 'order',
    align: 'center',
  },
  {
    label: '更改时间',
    prop: 'update_time',
    align: 'center',
    width: 200,
  },
  {
    label: '操作',
    prop: 'desc',
    width: 200,
    fixed: 'right',
    align: 'center',
    custom: true,
  },
]

export const searchForm = [
  {
    label: '商品名称',
    model: 'title',
    type: 'input',
  },
]
