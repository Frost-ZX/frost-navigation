<template>
  <div class="toolbox-view flex-col">
    <div class="app-view-header">

      <!-- 返回上一级 -->
      <n-button
        v-show="isToolDetail"
        class="header-button"
        :text="true"
        @click="handleCloseTool"
      >
        <span class="mdi mdi-arrow-left"></span>
      </n-button>

      <!-- 标题 -->
      <span>{{ routeTitle }}</span>

      <!-- 占位 -->
      <div class="placeholder"></div>

      <!-- 查看信息 -->
      <n-button
        v-show="isToolDetail"
        class="header-button"
        :text="true"
        @click="showToolItemInfo"
      >
        <span class="mdi mdi-information-slab-circle-outline"></span>
      </n-button>

      <!-- 新窗口打开 -->
      <n-button
        v-show="isToolDetail"
        class="header-button"
        :text="true"
        @click="handleOpenNewWindow"
      >
        <span class="mdi mdi-open-in-new"></span>
      </n-button>

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

      <!-- 工具信息 -->
      <n-modal
        v-model:show="toolInfo.show"
        content-class="n-dialog-content--with-max-height"
        preset="dialog"
        title="工具信息"
        :show-icon="false"
      >
        <template v-if="true">
          <n-h4>版本信息</n-h4>
          <n-ul>
            <n-li>创建日期：{{ toolInfo.dateCreated }}</n-li>
            <n-li>更新日期：{{ toolInfo.dateUpdated }}</n-li>
            <n-li>当前版本：{{ toolInfo.currVersion }}</n-li>
          </n-ul>
        </template>
        <template v-if="toolInfo.changelogs.length > 0">
          <n-h4>更新日志</n-h4>
          <n-ul>
            <n-li
              v-for="(text, index) in toolInfo.changelogs"
              :key="index"
              class="changelogs-row"
            >{{ text }}</n-li>
          </n-ul>
        </template>
      </n-modal>

    </div>
  </div>
</template>

<script setup>
import {
  NButton, NCollapse, NCollapseItem,
  NEllipsis, NModal, NTooltip,
  NH4, NUl, NLi,
} from 'naive-ui';

import {
  computed, reactive,
} from 'vue';

import {
  useRoute, useRouter,
} from 'vue-router';

import {
  toolList,
} from '@/assets/js/toolbox-data';

/** 是否为工具页面 */
const isToolDetail = computed(() => {
  return Boolean(route.meta.isToolDetail);
});

/** 路由 */
const route = useRoute();

/** 路由 */
const router = useRouter();

/** 页面标题 */
const routeTitle = computed(() => {
  return route.meta.title;
});

/** 工具信息 */
const toolInfo = reactive({
  changelogs: [],
  currVersion: '',
  dateCreated: '',
  dateUpdated: '',
  show: false,
});

/** 关闭工具 */
function handleCloseTool() {
  return router.push({
    name: 'ToolboxView',
  });
}

/** 在新窗口中打开当前工具 */
function handleOpenNewWindow() {

  let width = window.innerWidth ?? 400;
  let height = window.innerHeight ?? 300;
  let url = location.href;
  let features = `height=${height}, width=${width}, toolbar=no, menubar=no, scrollbars=yes, resizable=yes, location=yes, status=yes`;

  window.open(url, '_blank', features);

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

/** 查看当前工具信息 */
function showToolItemInfo() {
  
  let routePath = route.path;
  let toolIdMatch = routePath.match(/\/([^/]*)$/);
  let toolIdStr = toolIdMatch ? toolIdMatch[1] : null;
  let toolItem = null;

  if (toolIdStr) {
    for (let i = 0; i < toolList.length; i++) {
      
      let category = toolList[i];
      let list = category.items;

      if (!category.enabled || !list) {
        continue;
      }

      for (let j = 0; j < list.length; j++) {
        let item = list[j];
        if (item.id === toolIdStr) {
          toolItem = item;
          break;
        }
      }

      if (toolItem) {
        break;
      }

    }
  }

  if (toolItem) {
    toolInfo.changelogs = toolItem.changelogs || [];
    toolInfo.currVersion = toolItem.version || '';
    toolInfo.dateCreated = toolItem.createdAt || '';
    toolInfo.dateUpdated = toolItem.updatedAt || '';
    toolInfo.show = true;
  }

}
</script>

<style lang="less" scoped>
.header-button {
  margin-right: 0.5em;
  font-size: 24px;
}

.new-window-button {
  font-size: 24px;
  cursor: pointer;
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

    &.has-radius {
      border-radius: 8px;
    }

    > .n-card {
      &:not(:first-child) {
        margin-top: 20px;
      }

      > .n-card__content {
        height: 0;
      }
    }

    .form-no-feedback .n-form-item-feedback-wrapper,
    .form-item-no-feedback .n-form-item-feedback-wrapper {
      min-height: 10px;
    }
  }
}

.changelogs-row {
  white-space: pre-wrap;
}
</style>
