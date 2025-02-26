<template>
  <div ref="watermarkContainer" class="watermark-container">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  text: { // 水印文字
    type: String,
    default: 'liuxing',
  },
  imageUrl: { // 水印图片
    type: String,
    default: '',
  },
  color: { // 水印颜色
    type: String,
    default: 'red',
  },
  fontSize: { // 水印字体大小
    type: Number,
    default: 16,
  },
  opacity: { // 水印透明度
    type: Number,
    default: 0.5,
  },
  angle: { // 水印角度
    type: Number,
    default: -20,
  },
})

const watermarkContainer = ref<HTMLElement | null>(null)

const createWatermark = () => {
  if (!watermarkContainer.value) return

  const container = watermarkContainer.value
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) return

  const width = 100
  const height = 100
  canvas.width = width
  canvas.height = height

  ctx.clearRect(0, 0, width, height)
  ctx.globalAlpha = props.opacity
  ctx.font = `${props.fontSize}px Arial`
  ctx.fillStyle = props.color
  ctx.translate(width / 2, height / 2)
  ctx.rotate((props.angle * Math.PI) / 180)
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  if (props.imageUrl) {
    const img = new Image()
    img.src = props.imageUrl
    img.onload = () => {
      ctx.drawImage(img, -img.width / 2, -img.height / 2)
      drawWatermark()
    }
  } else if (props.text) {
    ctx.fillText(props.text, 0, 0)
    drawWatermark()
  }

  function drawWatermark() {
    const pattern = ctx!.createPattern(canvas, 'repeat')
    if (pattern) {
      const watermarkLayer = document.createElement('div')
      watermarkLayer.style.position = 'absolute'
      watermarkLayer.style.top = '0'
      watermarkLayer.style.left = '0'
      watermarkLayer.style.width = '100%'
      watermarkLayer.style.height = '100%'
      watermarkLayer.style.background = `url(${canvas.toDataURL()})`
      container.appendChild(watermarkLayer)
    }
  }
}

onMounted(() => {
  createWatermark()
})

watch(
  [
    () => props.text,
    () => props.imageUrl,
    () => props.color,
    () => props.fontSize,
    () => props.opacity,
    () => props.angle,
  ],
  () => {
    if (watermarkContainer.value) {
      watermarkContainer.value.innerHTML = ''
      createWatermark()
    }
  }
)
</script>

<style scoped>
.watermark-container {
  position: relative;
}
</style>
