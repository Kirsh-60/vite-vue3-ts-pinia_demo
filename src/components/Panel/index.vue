<template>
  <div class="flex">
    <div class="w-4/5">
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
        <span class="ml-2 pl-3">内容数据</span>
        <div class="flex items-center justify-around">
          <Echarts />
        </div>
      </el-card>
      <div class="flex justify-between mt-4">
        <el-card class="box-card3" shadow="never">
          <template #header>
            <div class="card-header">
              <span>线上热门内容</span>
              <el-button class="button" text>查看更多</el-button>
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
    <div class="w-1/5"></div>
  </div>
</template>
<script setup lang="ts">
import Data from "./components/countdata.vue";
import Echarts from "./components/echarts.vue";
import Linedata from "./components/linedata.vue";
import echartscircle from "./components/echartscircle.vue";
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
</style>
