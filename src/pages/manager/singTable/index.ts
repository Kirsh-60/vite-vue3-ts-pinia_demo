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

export const formOptions = {
  isShowFormBtn: false, // 是否显示表单按钮 默认为true
  compile: [
    {
      label: '菜单类型',
      field: 'level',
      component: 'LSelect',
      required: true,
      placeholder: '请选择菜单类型',
      componentProps: {
        options: [
          { label: '一级菜单', value: 1 },
          { label: '子菜单', value: 2 },
          { label: '按钮/权限', value: 3 },
        ],
      },
    },
    {
      label: '菜单名称',
      field: 'name',
      component: 'LInput',
      required: true,
      placeholder: '请输入菜单名称',
      // slot: 'customForm', // 是否自定义渲染内容，默认为false，如果要自定义渲染内容，设置为true即可
    },
    {
      label: '访问路径',
      field: 'desc',
      component: 'LInput',
      required: true,
      placeholder: '请输入访问路径',
    },
    {
      label: '前端组件',
      field: 'component',
      component: 'LInput',
      required: true,
      placeholder: '请输入前端组件',
    },
    {
      label: '组件名称',
      field: 'condition',
      component: 'LInput',
      required: false,
      placeholder: '请输入组件名称',
    },
    {
      label: '默认跳转地址',
      field: 'frontpath',
      component: 'LInput',
      required: false,
      placeholder: '请输入默认跳转地址',
    },
    {
      label: '菜单图标',
      field: 'icon',
      component: 'LIcons',
      required: false,
      placeholder: '请选择菜单图标',
    },
    {
      label: '排序',
      field: 'order',
      component: 'LInput',
      required: false,
    },
    {
      label: '是否路由菜单',
      field: 'menu',
      component: 'LInput',
      required: false,
    },
    {
      label: '隐藏路由',
      field: 'menu',
      component: 'LRadio',
      required: false,
      componentProps: {
        options: [
          { label: '是', value: 1 },
          { label: '否', value: 2 },
        ],
        defaultValue: 2,
      },
    },
    {
      label: '隐藏Tab',
      field: 'isHideTab',
      component: 'LInput',
      required: false,
    },
  ],
}
