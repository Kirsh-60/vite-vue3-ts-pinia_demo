<template>
    <svg aria-hidden="true" class="svg-icon" :width="width" :height="height">
        <use :xlink:href="symbolId" :fill="color" />
    </svg>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
const props = defineProps({
    prefix: {
        type: String,
        default: 'icon'
    },
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: '#333'
    },
    width: {
        type: String,
        default: '16px'
    },
    height: {
        type: String,
        default: '16px'
    }
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

export default {
name: 'SvgIcon'
}