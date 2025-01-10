export const singTable = [
  {
    label: '商品',
    prop: 'title',
    width: 400,
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
