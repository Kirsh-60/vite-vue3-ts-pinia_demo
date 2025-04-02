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
    label: '商品',
    prop: 'title',
    width: 400,
    ellipsis: false,
    custom: true,
  },
  {
    label: '实际销量',
    prop: 'discount',
    width: 400,
  },
  {
    label: '商品状态',
    prop: 'sale_count',
    width: 400,
  },
  {
    label: '总库存',
    prop: 'stock',
    width: 400,
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
  {
    label: '姓名',
    model: 'name',
    type: 'input',
  },
  {
    label: '商品状态',
    model: 'status',
    type: 'select',
    defaultSelect: 1,
    options: [
      {
        label: '上架',
        value: 1,
      },
      {
        label: '下架',
        value: 0,
      },
    ],
  },
]

export const tabbars = [
  {
    key: 'all',
    name: '全部',
  },
  {
    key: 'checking',
    name: '审核中',
  },
  {
    key: 'saling',
    name: '出售中',
  },
  {
    key: 'off',
    name: '已下架',
  },
  {
    key: 'min_stock',
    name: '库存预警',
  },
  {
    key: 'delete',
    name: '回收站',
  },
]

export const formOptions = {
  isShowFormBtn: false, // 是否显示表单按钮 默认为true
  compile: [
    {
      label: '姓名',
      field: 'username',
      component: 'LInput',
      required: true,
      placeholder: '请输入姓名',
      slot: 'customForm', // 是否自定义渲染内容，默认为false，如果要自定义渲染内容，设置为true即可
    },
    {
      label: '性别',
      field: 'sex',
      component: 'LSelect',
      required: true,
      placeholder: '请选择性别',
      componentProps: {
        options: [
          { label: '男', value: 1 },
          { label: '女', value: 2 },
          { label: '未知', value: 3 },
        ],
      },
    },
    {
      label: '日期',
      field: 'date',
      component: 'LDate',
      dateOptions: {
        dateType: 'daterange', // 日期类型，可选值为 date、daterange、datetime、datetimerange
        format: 'yyyy-MM-dd', // 展示的日期格式 默认为 yyyy-MM-dd
        valueFormat: 'yyyy-MM-dd', // 绑定值的日期格式 默认为 yyyy-MM-dd
        rangeSeparator: '至', // 选择范围时的分隔符 默认为 ' - '
        startPlaceholder: '开始日期', // 开始日期的占位内容 仅在daterange、datetimerange下有效
        endPlaceholder: '结束日期', // 结束日期的占位内容 仅在daterange、datetimerange下有效
        clearable: true, // 是否显示清空按钮 仅在非range下有效
        editable: false, // 文本框是否可以输入 仅在非range下有效
        arrowControl: true, // 是否使用箭头进行日期选择 仅在非range下有效
        align: 'left', // 对齐方式，可选值为 left、center、right
      },
      required: true,
      placeholder: '请选择日期',
    },
    {
      label: '爱好',
      field: 'hobby',
      component: 'LCheckBox',
      required: true,
      placeholder: '请选择爱好',
      componentProps: {
        options: [
          { label: '篮球', value: 1, disabled: true },
          { label: '羽毛球', value: 2 },
          { label: '网球', value: 3 },
        ],
      },
    },
    {
      label: '区域',
      field: 'area',
      component: 'LSelectArea',
      required: true,
      placeholder: '请选择城市',
      componentProps: {
        multiple: false, // 是否多选 默认为false,
        clearable: true, // 是否显示清空按钮
        checkStrictly: true, // 是否严格的遵守父子节点不互相关联
        showAllLevels: false, // 是否显示全路径
        props: {
          value: 'id',
          label: 'name',
          children: 'children',
        },
      },
    },
    {
      label: '产品图',
      field: 'img',
      component: 'LUploadImg',
      required: true,
      placeholder: '请上传产品图',
    },
    {
      label: '富文本',
      field: 'edit',
      component: 'LEdit',
      required: true,
      placeholder: '',
    },
  ],
}
