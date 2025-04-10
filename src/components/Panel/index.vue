<template>
  <div class="flex justify-around">
    <div class="w-7/9">
      <el-card class="box-card" shadow="never">
        <template #header>
          <div class="card-header">
            <span>欢迎回来! admin</span>
          </div>
        </template>
        <div class="flex items-center justify-around">
          <Data />
        </div>
      </el-card>
      <el-card class="box-card" shadow="never">
        <span class="ml-2 pl-3 text-xs">内容数据</span>
        <div class="flex items-center justify-around">
          <Echarts />
        </div>
      </el-card>
      <div class="flex justify-between mt-4">
        <el-card class="box-card3" shadow="never">
          <template #header>
            <div class="card-header">
              <span>线上热门内容</span>
              <el-button class="button" type="text">查看更多</el-button>
            </div>
          </template>
          <div class="flex items-center justify-around">
            <Linedata />
          </div>
        </el-card>
        <el-card class="box-card3" shadow="never">
          <template #header>
            <div class="card-header">
              <span>内容类型占比</span>
            </div>
          </template>
          <div class="flex items-center justify-around">
            <echartscircle />
          </div>
        </el-card>
      </div>
    </div>
    <div class="w-1/5">
      <el-card class="box-card" shadow="never">
        <template #header>
          <div class="card-header">
            <span class="text-xs">快捷操作</span>
            <!-- <el-button type="text" class="button text-xs">管理</el-button> -->
          </div>
        </template>
        <div class="">
          <div class="" v-for="index in 9" :key="index">
            <el-card class="w-10 h-10 float-left m-2">
              <div
                class="bg-purple-light h-10 text-xs text-center text-gray-500"
                style="line-height: 2.5rem"
              >
                <span class="text-xs">操作</span>{{ index }}
              </div>
            </el-card>
          </div>
        </div>
      </el-card>
      <el-card class="box-card mt-2" shadow="never">
        <template #header>
          <div class="card-header">
            <span class="text-xs">最近访问</span>
            <!-- <el-button type="text" class="button text-xs">管理</el-button> -->
          </div>
        </template>
        <div class="">
          <div class="" v-for="index in 5" :key="index">
            <el-card class="w-10 h-10 float-left m-2">
              <div
                class="bg-purple-light h-10 text-xs text-center text-gray-500"
                style="line-height: 2.5rem"
              >
                <span class="text-xs">操作</span>{{ index }}
              </div>
            </el-card>
          </div>
        </div>
      </el-card>
      <el-card class="box-card mt-2" shadow="never">
        <div class="block">
          <el-carousel trigger="click" height="150px">
            <el-carousel-item v-for="item in 3" :key="item">
              <h3 class="small">{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-card>
      <el-card class="box-card mt-2 h-62" shadow="never">
        <template #header>
          <div class="card-header">
            <span class="text-xs">公告</span>
            <!-- <el-button type="text" class="button text-xs">管理</el-button> -->
          </div>
        </template>
        <div class="p-2" style="display: flex; flex-direction: column">
          <div v-for="item in bqList" :key="item.label" class="item">
            <el-tag :type="item.type" size="mini" effect="dark">
              {{ item.label }}
            </el-tag>
            <text class="text-xs">{{ item.text }}</text>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script setup lang="ts">
import Data from './components/countdata.vue'
import Echarts from './components/echarts.vue'
import Linedata from './components/linedata.vue'
import echartscircle from './components/echartscircle.vue'
import { ref } from 'vue'
const bqList = ref([
  {
    label: '公告1',
    type: 'success',
    text: '动态编辑标签可以通过点击标签关闭按钮后触发的 close 事件来实现',
  },
  {
    label: '公告2',
    type: 'info',
    text: '动态编辑标签可以通过点击标签关闭按钮后触发的 close 事件来实现',
  },
  {
    label: '公告3',
    type: 'warning',
    text: '动态编辑标签可以通过点击标签关闭按钮后触发的 close 事件来实现',
  },
  {
    label: '公告4',
    type: 'danger',
    text: '动态编辑标签可以通过点击标签关闭按钮后触发的 close 事件来实现',
  },
  {
    label: '公告5',
    type: 'primary',
    text: '动态编辑标签可以通过点击标签关闭按钮后触发的 close 事件来实现',
  },
])
</script>
<style scoped lang="scss">
image {
  width: 100%;
  height: 100%;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 0;
  font-size: 12px;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 100%;
}
.box-card3 {
  width: 49%;
}
.frosted-container {
  background: rgb(200 200 200 / 20%);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border-radius: 8px;
}
::v-deep .el-card__body {
  padding: 0 !important;
  background-color: transparent;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.row-bg {
  padding: 10px 0;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.item {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
