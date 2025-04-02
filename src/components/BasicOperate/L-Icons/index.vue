<template>
    <el-input v-model="modelValue" style="max-width: 300px" :placeholder="placeholder" @click="dialogVisible = true">
        <template #append>
            <el-button :icon="selectedIcon" />
        </template>
    </el-input>

    <!-- 弹窗 -->
    <el-dialog v-model="dialogVisible" title="选择图标" width="50%">
        <el-tabs v-model="activeTab">
            <el-tab-pane label="基础图标" name="base">
                <div class="icon-grid">
                    <div v-for="icon in iconCategories.base" :key="icon.name" class="icon-item"
                        :class="{ selected: tempIcon === icon.name }" @click="selectIcon(icon.name)">
                        <component :is="icon.component" class="icon-preview" />
                    </div>
                </div>
            </el-tab-pane>

            <el-tab-pane label="操作图标" name="action">
                <div class="icon-grid">
                    <div v-for="icon in iconCategories.action" :key="icon.name" class="icon-item"
                        :class="{ selected: tempIcon === icon.name }" @click="selectIcon(icon.name)">
                        <component :is="icon.component" class="icon-preview" />
                    </div>
                </div>
            </el-tab-pane>

            <el-tab-pane label="方向图标" name="direction">
                <div class="icon-grid">
                    <div v-for="icon in iconCategories.direction" :key="icon.name" class="icon-item"
                        :class="{ selected: tempIcon === icon.name }" @click="selectIcon(icon.name)">
                        <component :is="icon.component" class="icon-preview" />
                    </div>
                </div>
            </el-tab-pane>

            <el-tab-pane label="其他图标" name="other">
                <div class="icon-grid">
                    <div v-for="icon in iconCategories.other" :key="icon.name" class="icon-item"
                        :class="{ selected: tempIcon === icon.name }" @click="selectIcon(icon.name)">
                        <component :is="icon.component" class="icon-preview" />
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>

        <template #footer>
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="confirmSelection">确定</el-button>
        </template>
    </el-dialog>
</template>
<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import * as Icons from '@element-plus/icons-vue'
import { defineProps, defineEmits } from 'vue'
const modelValue = defineModel<string>()
interface Config {
    label: string
    field: string
    placeholder: string
}
// modelValue的首字符如果是小写，转化成大写·
if (modelValue.value) {
    modelValue.value = modelValue.value.charAt(0).toUpperCase() + modelValue.value.slice(1)
}
const props = defineProps<{
    config: Config
}>()
const { placeholder } = props.config
const emits = defineEmits(['update:modelValue'])

// const updateValue = (value: any) => {
//     emits('update:modelValue', value)
// }
const dialogVisible = ref(false)
const activeTab = ref('base')


// 临时存储选择的图标
const tempIcon = ref('')

// 根据名称分类
const iconCategories = {
    base: Object.keys(Icons as any)
        .filter((name) => name.includes('Circle') || name.includes('Filled'))
        .map((name) => ({ name, component: Icons[name as keyof typeof Icons] })),
    action: Object.keys(Icons)
        .filter((name) => name.includes('Check') || name.includes('Close'))
        .map((name) => ({ name, component: Icons[name as keyof typeof Icons] })),
    direction: Object.keys(Icons)
        .filter((name) => name.includes('Arrow') || name.includes('Caret'))
        .map((name) => ({ name, component: Icons[name as keyof typeof Icons] })),
    // 其他
    other: Object.keys(Icons)
        .filter((name) => !name.includes('Circle') && !name.includes('Filled') && !name.includes('Check') && !name.includes('Close') && !name.includes('Arrow') && !name.includes('Caret'))
        .map((name) => ({ name, component: Icons[name as keyof typeof Icons] })),
}

const selectedIcon = computed(() => {
    return modelValue.value ? Icons[modelValue.value as keyof typeof Icons] : null
})

const selectIcon = (iconName: string) => {
    console.log(iconName, 'iconName');

    tempIcon.value = iconName // 更新临时选择的图标
}

const confirmSelection = () => {
    dialogVisible.value = false
    emits('update:modelValue', tempIcon.value) // 更新父组件的值
}
// 监听弹窗打开状态
watch(dialogVisible, (newVal) => {
    if (newVal) {
        tempIcon.value = modelValue.value || '' // 初始化临时图标为当前输入框的值，默认值为空字符串
    }
})
</script>

<style scoped>
/* 让图标区域自适应宽度 */
.icon-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill,
            minmax(65px, 1fr));
    /* 每列最小40px，自适应列数 */
    gap: 30px;
    padding: 10px;
}

/* 单个图标样式 */
.icon-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 6px;
    border-radius: 6px;
    transition: all 0.2s;
}

/* 鼠标悬停时的高亮效果 */
.icon-item:hover {
    background: #f0faff;
}

/* 选中状态 */
.icon-item.selected {
    border: 2px solid #409eff;
    background: #e6f7ff;
    border-radius: 6px;
}

/* 图标大小 14px */
.icon-preview {
    font-size: 24px;
    width: 24px;
    height: 24px;
}

/* 选中的图标样式 */
.icon-preview-selected {
    font-size: 24px;
    color: #409eff;
}

/* 图标名称 */
.icon-name {
    font-size: 12px;
    text-align: center;
    white-space: nowrap;
}
</style>