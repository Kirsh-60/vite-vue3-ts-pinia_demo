import { ref, unref } from 'vue'
import { useRouter } from 'vue-router'
import { setTableData } from "@/composables/transferToTableV2"
 
/**
 * loading状态
 * @param {*} request url请求
 * @param {*} form 不同页面传入的表单
 * @returns 
 */
export function useDataGrid({ request, form, tableConfig }) {
    const router = useRouter();
 
    //分页
    const pageNum = ref(Number.parseInt(router.currentRoute.value.query.pageNum) || 1);
    const total = ref(0); //总页数
    const pageSize = ref(16); //每页多少条
    const pages = ref(0);
 
    // 加载状态
    const loading = ref(true);
 
    //表格数据（el-table-v2）
    const columns = ref([]);
    const data = ref([]);
    const selectedId = ref([]);
    const tableData = ref([]); //列表数据
 
    const code = ref(500);
 
    //所有下拉框
    const allType = ref({});
 
    // 添加资源更新记录Form打开标识
    const dialogVisible = ref(false);
 
    // 获取列表数据
    const getDataGrid = async(params) => {
        loading.value = true;
        await request(params).then(res => {
            code.value = res.data.code;
            if (res.data && res.data.code === 200) {
                total.value = res.data.data.total;
                pageNum.value = res.data.data.pageNum;
                pageSize.value = res.data.data.pageSize;
                pages.value = res.data.data.pages;
                tableData.value = res.data.data.list ? res.data.data.list : res.data.data;
 
            } else if (res.data.code === 400 && res.data.errorMsg === "暂无记录！") {
                total.value = 0; //没有数据时分页页数置为1
            } else {
                ElMessage.error("内部服务器错误：" + res.data.errorMsg);
            }
 
            // 监听到data.value值改变后需要重新设置
            function setTableStyleAndData() {
                const { columnsVal, dataVal } = setTableData({
                    code: code.value,
                    cnColumnNameArr: tableConfig.cnColumnNameArr,
                    hiddenIndex: tableConfig.hiddenIndex,
                    columnWidth: tableConfig.columnWidth,
                    selectedId: selectedId.value,
                    cellRenderer: tableConfig.cellRenderer,
                    tableData: tableData.value
                });
                columns.value = unref(columnsVal);
                data.value = unref(dataVal);
            }
 
            setTableStyleAndData();
 
            // 数据设置完后再设置loading为false
            loading.value = false;
 
        }).catch(error => {
            console.log(error);
            loading.value = false;
            ElMessage.error("列表数据显示失败");
        });
    }
    getDataGrid(form);
 
    function loadDataGrid() {
        if (form) form.pageNum = pageNum.value;
        getDataGrid(form);
        router.push({ path: router.currentRoute.value.path, query: { pageNum: pageNum.value } });
    }
 
    // 获取下拉框
    async function getSelectOptions(request) {
        let result = await request();
        if (result.data.code === 200) {
            loading.value = false;
            allType.value = result.data.data;
        } else {
            ElMessage.error("获取下拉框数据类型失败:服务器内部错误");
        }
    }
 
    const deleteOneById = (id, action, request) => {
        ElMessageBox.confirm('请确认是否删除?', '警告!', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }).then(() => {
            async function deleteOne(param) {
                let result = await request(param);
                if (result.data.code === 200) {
                    ElMessage.success(action + "成功");
                    loadDataGrid();
                    selectedId.value = [];
                } else {
                    ElMessage.error(action + "失败：" + result.data.errorMsg);
                }
            }
            if (typeof id === 'number') {
                deleteOne(id);
            } else {
                id.forEach(item => {
                    deleteOne(item);
                });
            }
        }).catch(() => {});
    }
 
    /**
     * 删除一条:可以以数组形式删除
     * @param {*} id 
     */
    const deleteById = (id, request) => {
        let ids = [];
        ids.push(id);
        batchDelByIds(ids, request);
    }
 
    /**
     * 批量删除 参数：ids List集合类型   RquestParam
     * @param {*} ids 
     */
    const batchDelByIds = (ids, request) => {
        // 判断ids没有值，不能删除
        if (ids.length === 0) {
            ElMessage.warning("请选择要删除的数据");
            return;
        }
        ElMessageBox.confirm('请确认是否删除?', '警告!', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }).then(async() => {
            // 区分单个删除和批量删除
            await request({ ids: ids.join(",") }).then((res) => {
                if (res.data && res.data.code === 200) {
                    ElMessage.success("删除成功");
                    // 删除成功后，重新显示当前页面，且清空ids
                    loadDataGrid();
                    selectedId.value = [];
                } else {
                    ElMessage.error("删除失败");
                }
            }).catch(error => {
                ElMessage.error("服务器内部错误");
            });
        }).catch(() => {});
    }
 
    /**
     * 根据id更新记录
     * @param {*} id 
     * @param {*} action 
     * @param {*} request 请求api方法
     */
    const updateById = async(id, action, request) => {
        let result = await request({ id });
        if (result.data.code === 200) {
            ElMessage.success(action + "成功");
            loadDataGrid();
        } else {
            ElMessage.error(action + "失败：" + result.data.errorMsg);
        }
    }
 
    /**
     * 批量更新
     * @param {*} ids 
     * @param {*} action 操作类型
     * @param {*} request 请求api方法
     */
    const batchUpdateById = async(ids, action, request) => {
        let result = await request({ ids: ids.join(",") });
        if (result.data.code === 200) {
            ElMessage.success(action + "成功");
            // 删除成功后，重新显示当前页面，且清空ids
            loadDataGrid();
            selectedId.value = [];
        } else {
            ElMessage.error(action + "失败：" + result.data.errorMsg);
        }
    }
 
    const dialogAddOrEdit = async(visible, action, param, request) => {
        dialogVisible.value = visible;
        let result = await request(param);
        if (result.data.code === 200) {
            ElMessage.success(action + "成功");
            loadDataGrid();
        } else {
            ElMessage.error(action + "失败：" + result.data.errorMsg);
        }
    }
 
    return {
        pageNum,
        total,
        pageSize,
        pages,
        loading,
        tableData,
        selectedId,
        columns,
        data,
        allType,
        dialogVisible,
        loadDataGrid,
        getSelectOptions, //下拉框
        deleteOneById, //普通删除一条
        deleteById, //删除一条，可以ids 数组形式删除
        batchDelByIds, //批量删除 ids数组形式删除
        updateById, //更新一条
        batchUpdateById, //批量更新
        dialogAddOrEdit, //弹框（添加或编辑）
    }
}