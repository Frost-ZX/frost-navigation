<template>
  <div class="toolbox-view flex-col">
    <div class="app-view-header">
      <span>{{ TOOLBOX_MODULE_TITLE }}</span>
    </div>
    <div class="app-view-content is-transparent">
      <div class="tool-list">
        <n-collapse
          :default-expanded-names="toolList.map(item => item.id)"
        >

          <!-- 分类项 -->
          <n-collapse-item
            v-for="categoryItem in toolList"
            :key="categoryItem.id"
            :name="categoryItem.id"
            :title="categoryItem.title"
          >

            <!-- 工具项 -->
            <div
              v-for="toolItem in categoryItem.items"
              :key="toolItem.id"
              class="tool-item shadow-1"
            >
              <div class="item-header">
                <span :class="['item-icon', toolItem.iconClass || 'mdi mdi-package-variant-closed']"></span>
              </div>
              <div class="item-body">
                <div class="item-title">{{ toolItem.title }}</div>
                <n-ellipsis
                  class="item-desc"
                  :line-clamp="2"
                  :tooltip="true"
                >{{ toolItem.desc }}</n-ellipsis>
              </div>
            </div>

          </n-collapse-item>

        </n-collapse>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  NCollapse, NCollapseItem, NEllipsis,
} from 'naive-ui';

import {
  toolList,
} from '@/assets/js/toolbox-data';

import {
  TOOLBOX_MODULE_TITLE,
} from '@/config/modules';
</script>

<style lang="less" scoped>
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
</style>
