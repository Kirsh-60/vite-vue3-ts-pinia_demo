<template>
  <div id="my-canvas">
    <el-button type="primary" size="default" @click="downLoad">下载文件手动</el-button>
    <el-button type="primary" size="default" @click="downLoadText">下载(保存文本)</el-button>
    <el-button type="primary" size="default" @click="downLoadUrl">下载(保存url)</el-button>
    <el-button type="primary" size="default" @click="downLoadCanves">下载(canves)</el-button>
    <el-button type="primary" size="default" @click="downLoadFile">下载Excel</el-button>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import { downloadFile } from '@/utils/downLoad.js'
import { DownLoad } from '@/api/downLoad.js'
import FileSaver from 'file-saver';
const downLoad = () => {
  DownLoad().then(res => {
    console.log(res);
    downloadFile(res, '批量改价')
  })
}
const downLoadText = () => {
  let blob = new Blob(['保存一个文本'], { type: 'text/plain;charset=utf-8' });
  FileSaver.saveAs(blob, 'a.txt');
}
const downLoadUrl = () => {
  FileSaver.saveAs('https://ppt.1ppt.com/uploads/soft/2202/1-2202231A334.zip', 'a.zip');
}
const downLoadCanves = () => {
  var canvas = document.getElementById("my-canvas");
  canvas.toBlob(function (blob) {
    saveAs(blob, "pretty image.png");
  });
}
const downLoadFile = () => {
  DownLoad().then(res => {
    let file = new File([res], 'a.xls', { type: 'text/plain;charset=utf-8' });
    FileSaver.saveAs(file);
  })
}
</script>
<style scoped lang='scss'>
</style>