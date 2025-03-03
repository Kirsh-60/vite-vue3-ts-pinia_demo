<template>
  <div class="mask">
    <div id="box">
      <!-- 输入框和搜索按钮 -->
      <div class="search-box">
        <el-select filterable placeholder="输入地点进行搜索" class="input-box" v-model="searchQuery" remote reserve-keyword
          @change="searchPOI" :remote-method="remoteMethod" :loading="loading">
          <el-option v-for="item in areaList" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-button @click="searchPOI" class="search-button">搜索</el-button>
      </div>
      <div id="container"></div>
      <div class="buttons">
        <el-button type="primary" @click="drawCircle">画圆</el-button>
        <el-button type="primary" @click="drawRectangle">画矩形</el-button>
        <el-button type="primary" @click="drawPolygon">画多边形</el-button>
      </div>
    </div>
    <!-- 按钮组 确认&取消 -->
    <div class="buttons btn">
      <el-button type="primary" @click="handleStart()">初始化</el-button>
      <el-button type="primary" @click="handleEdit()">模拟编辑回显</el-button>
      <el-button type="primary" @click="handleLook()">查看数据</el-button>
      <el-button type="primary" @click="handleSave()">保存</el-button>
    </div>
  </div>
  <BasicMode v-model:dialogVisible="dialogVisible" :dialog-props="dialogProps">
    <pre>{{ JSON.stringify(resultData, null, 2) }}</pre>
  </BasicMode>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";
import { confirm } from '@/utils/confirm'
import { showMessage } from '@/utils/message'
import checkOverlayIntersections from './mapConfig'

declare var AMap: any;

(window as any)._AMapSecurityConfig = {
  securityJsCode: "cc79709dc999dd0b1bd344c75e49cf44",
};

const dialogVisible = ref(false);
const dialogProps = ref({
  title: '数据展示',
  width: '50%',
  dialogVisible: dialogVisible.value,
  fullscreen: false,
  close: () => {
    dialogVisible.value = false;
  },
});
const emits = defineEmits(["back"]);
const map = ref<any>(null);
let mouseTool = ref<any>(null);
let positionArr = ref([120.38773, 36.06353]); // 初始位置

let marker = ref<any>(null); // 标记
let overlays = ref<any[]>([]); // 存储所有绘制的覆盖物
let editingOverlay = ref<any>(null); // 当前正在编辑的覆盖物
let editors = ref<any>({}); // 存储所有覆盖物的编辑器

let placeSearch = ref<any>(null); // POI 搜索
let autoComplete = ref<any>(null); // 输入提示
const searchQuery = ref(""); // 用户输入的搜索内容
const areaList = ref([] as any); // 地区列表
const loading = ref(false);

const resultData = ref<any>(null);

// 初始化地图
onMounted(() => {
  AMapLoader.load({
    key: "fc6f7b1454126430a8f2ac04ccd1f20b",
    securityJsCode: "cc79709dc999dd0b1bd344c75e49cf44",
    version: "2.0",
    plugins: [
      "AMap.PlaceSearch",
      "AMap.AutoComplete",
      "AMap.Marker",
      "AMap.Circle",
      "AMap.Polygon",
      "AMap.Rectangle",
      "AMap.PolyEditor",
      "AMap.CircleEditor",
      "AMap.RectangleEditor",
      "AMap.MouseTool",
    ],
  }).then((AMap: any) => {
    map.value = new AMap.Map("container", {
      viewMode: "2D",
      zoom: 13,
      center: positionArr.value,
    });

    marker.value = new AMap.Marker({
      position: positionArr.value,
      map: map.value,
    });

    mouseTool.value = new AMap.MouseTool(map.value);

    // 在绘制完成后检查多边形是否自相交
    mouseTool.value.on("draw", (event: any) => {
      const shape = event.obj;
      overlays.value.push(shape);
      enableDragging(shape);
      mouseTool.value.close(false); // 保留绘制图形，允许继续绘制

      showMessage('success', '绘制完成！');
      map.value.setDefaultCursor('default'); // 绘制完成后恢复默认鼠标样式
    });
    // 初始化 Autocomplete 输入提示功能
    autoComplete.value = new AMap.AutoComplete({
      input: "search-input", // 输入框的id
    });

    // 初始化 POI 搜索功能
    placeSearch.value = new AMap.PlaceSearch({
      city: "北京", // 设置搜索城市
      map: map.value, // 设置地图
      pageSize: 1, // 每页显示1条结果
      pageIndex: 1, // 显示第一页
    });

  })
    .catch((e: any) => {
      console.error("加载高德地图失败:", e);
    });
});
// 页面卸载是清除地图
onUnmounted(() => {
  map.value.destroy();
  // 重置地图
  map.value = null;
  mouseTool.value = null;
  positionArr.value = [120.38773, 36.06353];
  marker.value = null;
  overlays.value = [];
  editingOverlay.value = null;
  editors.value = {};
  placeSearch.value = null;
  autoComplete.value = null;
});
// 模拟从接口获取数据
const fetchShapesFromAPI = async () => {
  return [
    {
      type: "circle",
      data: {
        center: [120.38773, 36.06353],
        radius: 1000,
      },
    },
    {
      type: "polygon",
      data: [
        [120.401498, 36.077724],
        [120.399953, 36.06815],
        [120.419007, 36.06593],
        [120.42553, 36.081747],
        [120.411111, 36.083135]
      ],
    },
    {
      type: "rectangle",
      data: [
        [120.372487, 36.080221],
        [120.335923, 36.103803]
      ],
    },
  ];
};
const drawShapes = (shapes: any[]) => {
  shapes.forEach((shape) => {
    if (shape.type === "circle") {
      const circle = new AMap.Circle({
        center: shape.data.center, // 圆心位置
        radius: shape.data.radius, // 半径
        strokeColor: "#4338ca", // 线颜色
        strokeOpacity: 1, // 线透明度
        strokeWeight: 2, // 线粗细度
        fillColor: "#4338ca", // 填充颜色
        fillOpacity: 0.2, // 填充透明度
        draggable: true, // 允许拖拽
      });
      circle.setMap(map.value);
      overlays.value.push(circle);
      enableDragging(circle);
    } else if (shape.type === "polygon") {
      const polygon = new AMap.Polygon({
        path: shape.data,
        strokeColor: "#4338ca",
        strokeOpacity: 1,
        strokeWeight: 2,
        fillColor: "#4338ca",
        fillOpacity: 0.2,
        draggable: true,
      });
      polygon.setMap(map.value);
      overlays.value.push(polygon);
      enableDragging(polygon);
    } else if (shape.type === "rectangle") {
      const rectangle = new AMap.Rectangle({
        bounds: new AMap.Bounds(shape.data[0], shape.data[1]),
        strokeColor: "#4338ca",
        strokeOpacity: 1,
        strokeWeight: 2,
        fillColor: "#4338ca",
        fillOpacity: 0.2,
        draggable: true,
      });
      rectangle.setMap(map.value); // 在地图上显示矩形
      overlays.value.push(rectangle); // 存储所有绘制的覆盖物
      enableDragging(rectangle); // 允许拖拽
      map.value.setFitView(); // 自适应显示所有覆盖物
    }
  });
};
// 允许拖拽，并在拖拽后更新位置
const enableDragging = (shape: any) => {
  shape.setOptions({ draggable: true }); // 允许拖拽
  shape.on("dragend", (e: any) => {
    positionArr.value = [e.lnglat.lng, e.lnglat.lat]; // 更新位置
  });
  shape.on("rightclick", (e: any) => {
    showContextMenu(e, shape);
  });
};

// 显示右键菜单
let contextMenu: any = null;

const showContextMenu = (e: any, shape: any) => {
  contextMenu = new AMap.ContextMenu();
  contextMenu.addItem(
    "开始编辑",
    () => {
      startEditing(shape);
      contextMenu.close();
    },
    0
  );
  contextMenu.addItem(
    "结束编辑",
    () => {
      stopEditing(shape);
      contextMenu.close();
    },
    1
  );
  contextMenu.addItem(
    "删除",
    () => {
      deleteShape(shape);
      contextMenu.close();
    },
    2
  );
  contextMenu.open(map.value, e.lnglat);
  mouseTool.value.close(false); // 停止新增图形，但不删除当前绘制的图形
};

// 开始编辑
const startEditing = (shape: any) => {
  if (editingOverlay.value) {
    stopEditing(editingOverlay.value);
  }
  let editor;
  console.log("Shape CLASS_NAME:", shape.CLASS_NAME); // 添加调试信息
  if (shape.CLASS_NAME === "Overlay.Circle") {
    editor = new AMap.CircleEditor(map.value, shape);
  } else if (shape.CLASS_NAME === "Overlay.Polygon") { // 添加多边形编辑器
    editor = new AMap.PolyEditor(map.value, shape);
  } else if (shape.CLASS_NAME === "Overlay.Rectangle") { // 添加矩形编辑器
    editor = new AMap.RectangleEditor(map.value, shape);
  }
  if (editor) {
    console.log("Opening editor for shape:", shape);
    editor.open();
    editors.value[shape.CLASS_NAME] = editor; // 使用 shape.CLASS_NAME 作为键
    editingOverlay.value = shape;
  } else {
    console.log("No editor created for shape:", shape);
  }
  showMessage('success', '开始编辑绘制！')
};

// 结束编辑
const stopEditing = (shape: any) => {
  const editor = editors.value[shape.CLASS_NAME];
  if (editor) {
    console.log("Closing editor for shape:", shape);
    editor.close();
    delete editors.value[shape.CLASS_NAME];
  } else {
    console.log("No editor found for shape:", shape);
  }
  editingOverlay.value = null;
  // 获取多边形的经纬度集合
  showMessage('success', '结束编辑绘制！')
};

// 删除图形
const deleteShape = (shape: any) => {
  // stopEditing(shape);
  map.value.remove(shape);
  overlays.value = overlays.value.filter((overlay) => overlay !== shape);
  showMessage('success', '删除绘制！')
};

// 画圆
const drawCircle = () => {
  map.value.setDefaultCursor('crosshair'); // 设置地图默认鼠标样式为十字
  mouseTool.value.circle({
    strokeColor: "#00A",
    strokeOpacity: 1,
    strokeWeight: 1,
    fillColor: "#00AAFF",
    fillOpacity: 0.2,
    draggable: true, // 启用拖拽
  });
  showMessage('success', '开始绘制！')
};

// 画矩形
const drawRectangle = () => {
  map.value.setDefaultCursor('crosshair'); // 设置地图默认鼠标样式为十字
  mouseTool.value.rectangle({
    strokeColor: "#00A",
    strokeWeight: 1,
    fillColor: "#00AAFF",
    fillOpacity: 0.2,
    draggable: true,
  });
  showMessage('success', '开始绘制！')
};

// 画多边形
const drawPolygon = () => {
  map.value.setDefaultCursor('crosshair'); // 设置地图默认鼠标样式为十字
  mouseTool.value.polygon({
    strokeColor: "#00A",
    strokeWeight: 1,
    fillColor: "#00AAFF",
    fillOpacity: 0.2,
    draggable: true,
  });
  showMessage('success', '开始绘制！')
};

// 搜索区域查询
const remoteMethod = (query: string) => {
  if (query) {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      searchQuery.value = query;
      autoComplete.value.search(query, (status: any, result: any) => {
        if (status === "complete") {
          console.log("Autocomplete results:", result);
          areaList.value = result.tips.map((tip: any) => ({
            label: tip.name,
            value: tip.name,
          }));
        }
      });
      areaList.value = areaList.value.filter((item: any) => {
        let result = item.label.toLowerCase().includes(query.toLowerCase());
        searchQuery.value = result;
        return result;
      });
    }, 200);
  } else {
    areaList.value = [];
  }
};
// POI搜索功能
const searchPOI = () => {
  placeSearch.value.search(searchQuery.value, (status: any, result: any) => {
    if (status === "complete" && result.poiList.pois.length) {
      const firstPoi = result.poiList.pois[0]; // 获取第一个搜索结果
      const lngLat = firstPoi.location;
      map.value.setCenter(lngLat); // 将地图中心定位到搜索结果
      marker.value.setPosition(lngLat); // 更新标记位置
      map.value.zoom = 13;
    } else {
      //   alert('未找到相关地点')
    }
  });
};

// 确认
const handleSave = async () => {
  if (!checkOverlayIntersections(overlays.value)) {
    return;
  }
  /**
   * 将覆盖物形状转换为基于其类名的新数据结构。
   * 
   * - 对于 "Overlay.Circle"，创建一个类型为 "circle" 的对象，数据包含中心点和半径。
   * - 对于 "Overlay.Polygon"，创建一个类型为 "polygon" 的对象，数据包含一个点数组（经度和纬度）。
   * - 对于 "Overlay.Rectangle"，创建一个类型为 "rectangle" 的对象，数据包含一个点数组（经度和纬度）。
   * 
   * 结果数组排除任何 null 值。
   * 
   * @returns {Array} newData - 转换后的覆盖物形状数组。
   */
  const data = overlays.value;
  const newData = data.map((shape: any) => {
    if (shape.CLASS_NAME === "Overlay.Circle") {
      const center = shape.getCenter();
      return {
        type: "circle",
        data: {
          center: [center.lng, center.lat],
          radius: shape.getRadius(),
        },
      };
    } else if (shape.CLASS_NAME === "Overlay.Polygon") {
      return {
        type: "polygon",
        data: shape.getPath().map((point: any) => [point.lng, point.lat]),
      };
    } else if (shape.CLASS_NAME === "Overlay.Rectangle") {
      return {
        type: "rectangle",
        data: shape.getPath().map((point: any) => [point.lng, point.lat]),
      };
    }
    return null;
  }).filter((item: any) => item !== null);

  console.log("newData", newData);
  // 获取用户绘制的图形统计信息，绘制了多少个圆、多边形、矩形
  const sumCount = newData.reduce((acc: any, cur: any) => {
    acc[cur.type] = (acc[cur.type] || 0) + 1;
    return acc;
  }, {});
  console.log("sumCount", sumCount);
  if (!newData.length) {
    showMessage('error', '请先绘制图形')
    return;
  }
  let message = `您绘制了：\n 圆形：${sumCount.circle || 0} 个\n； 多边形：${sumCount.polygon || 0} 个\n； 矩形：${sumCount.rectangle || 0} 个；`
  const isConfirmed = await confirm(message, '信息确认')
  if (isConfirmed) {
    resultData.value = newData;
    showMessage('success', '保存成功')
  } else {
  }
};
// 模拟编辑回显
const handleEdit = () => {
  handleStart();
  // 从接口获取数据并绘制图形
  fetchShapesFromAPI().then((result) => {
    drawShapes(result);
  });
};
// 初始化
const handleStart = () => {
  // 清空地图上的所有覆盖物
  overlays.value.forEach((overlay) => {
    map.value.remove(overlay);
  });
  overlays.value = [];
  showMessage('success', '初始化完成！')
};
// 查看数据
const handleLook = () => {
  dialogVisible.value = true;
}
</script>

<style scoped>
.mask {
  width: 100%;
  height: 88vh;
}

#container {
  border-radius: 10px;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}

.title {
  width: 100%;
  text-align: left;
  margin-bottom: 20px;
}

#box {
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: end;
  justify-content: left;
  width: 100%;
  height: 80%;
  background-color: #ffffff;
}

.buttons {
  margin-top: 10px;
  margin-right: 10px;
  position: absolute;
  border: 2px solid #ffd8d8;
  padding: 10px;
  background: #eee;
  border-radius: 14px;
}

.search-box {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 10;
  border: 2px solid #ffd8d8;
  padding: 10px;
  background: #eee;
  border-radius: 14px;

}

.input-box {
  width: 200px;
  margin-right: 10px;
}

.search-button {
  background-color: #409eff;
  color: white;
}

.btn {
  margin-top: 10px;
  position: absolute;
  right: 24px;
}
</style>
