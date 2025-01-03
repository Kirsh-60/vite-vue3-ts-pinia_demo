export const singTable = [
  {
    label: '商品',
    prop: 'title',
    width: 400,
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
  },
]
export const searchForm = [
  {
    label: '商品名称',
    model: 'goodsName',
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
