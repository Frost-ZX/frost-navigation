<template>
  <div class="toolbox-view flex-col">
    <div class="app-view-header">

      <!-- 返回上一级 -->
      <n-button
        v-show="isToolDetail"
        class="back-button"
        :text="true"
        @click="handleCloseTool"
      >
        <span class="mdi mdi-arrow-left"></span>
      </n-button>

      <!-- 标题 -->
      <span>{{ routeTitle }}</span>

    </div>
    <div class="app-view-content is-transparent">

      <!-- 工具列表 -->
      <div class="tool-list">
        <n-collapse
          :default-expanded-names="toolList.map(item => item.id)"
        >

          <!-- 分类项 -->
          <n-collapse-item
            v-for="categoryItem in toolList"
            v-show="categoryItem.enabled"
            :key="categoryItem.id"
            :name="categoryItem.id"
            :title="categoryItem.title"
          >

            <!-- 工具项 -->
            <div
              v-for="toolItem in categoryItem.items"
              v-show="toolItem.enabled"
              :key="toolItem.id"
              class="tool-item shadow-1"
              @click="handleOpenTool(toolItem)"
            >
              <div class="item-header">
                <n-tooltip placement="top-start" trigger="hover">
                  <template #trigger>
                    <span :class="['item-icon', toolItem.iconClass || 'mdi mdi-package-variant-closed']"></span>
                  </template>
                  <div>
                    <div>创建：{{ toolItem.createdAt }}</div>
                    <div>更新：{{ toolItem.updatedAt }}</div>
                    <div>版本：{{ toolItem.version }}</div>
                  </div>
                </n-tooltip>
              </div>
              <div class="item-body">
                <div class="item-title">{{ toolItem.title }}</div>
                <n-ellipsis
                  class="item-desc"
                  :line-clamp="2"
                  :tooltip="{ placement: 'bottom-start' }"
                >{{ toolItem.desc }}</n-ellipsis>
              </div>
            </div>

          </n-collapse-item>

        </n-collapse>
      </div>

      <!-- 工具页面 -->
      <div
        v-show="isToolDetail"
        class="tool-detail-wrapper"
      >
        <router-view></router-view>
      </div>

    </div>
  </div>
</template>

<script setup>
import {
  NButton, NCollapse, NCollapseItem, NEllipsis, NTooltip,
} from 'naive-ui';

import {
  computed,
} from 'vue';

import {
  useRoute, useRouter,
} from 'vue-router';

import {
  toolList,
} from '@/assets/js/toolbox-data';

/** 是否为工具页面 */
const isToolDetail = computed(() => {
  return route.meta.isToolDetail;
});

/** 路由 */
const route = useRoute();

/** 路由 */
const router = useRouter();

/** 页面标题 */
const routeTitle = computed(() => {
  return route.meta.title;
});

/** 关闭工具 */
function handleCloseTool() {
  return router.push({
    name: 'ToolboxView',
  });
}

/**
 * @description 打开工具
 * @param {ToolboxItem} data
 */
function handleOpenTool(data) {
  return router.push({
    name: `Toolbox/${data.component}`,
  });
}
</script>

<style lang="less" scoped>
.back-button {
  margin-right: 0.5em;
  font-size: 24px;
}
.tool-list {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

.tool-item {
  display: inline-block;
  margin: 16px;
  padding: 16px;
  vertical-align: middle;
  width: 256px;
  height: 132px;
  border-radius: var(--border-radius);
  outline: 2px solid transparent;
  background-color: #FFF;
  font-size: 16px;
  line-height: 1;
  transition: outline 0.25s;
  cursor: pointer;

  &:hover {
    outline-color: var(--color-primary);
  }

  .item-icon {
    font-size: 32px;
    opacity: 0.75;
  }

  .item-title {
    margin: 8px 0;
    font-size: 18px;
  }

  :deep(.item-desc) {
    font-size: 14px;
    line-height: 1.2;
    opacity: 0.75;
  }
}

.tool-detail-wrapper {
  position: absolute;
  left: 0;
  top: 0;
  padding: 20px;
  width: 100%;
  height: 100%;
  background-color: #FFF;

  :deep(.tool-detail-page) {
    width: 100%;
    height: 100%;
    overflow-y: auto;

    > .n-card:not(:first-child) {
      margin-top: 20px;
    }

    .form-no-feedback .n-form-item-feedback-wrapper,
    .form-item-no-feedback .n-form-item-feedback-wrapper {
      min-height: 10px;
    }
  }
}
</style>
