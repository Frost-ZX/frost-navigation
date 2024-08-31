<template>
  <div class="nav-view flex-col">
    <div class="app-view-header">
      <span>{{ NAV_MODULE_TITLE }}</span>
    </div>
    <div class="app-view-content">
      <n-layout class="page-layout" :has-sider="true">
        <n-layout-sider
          class="left-aside"
          collapse-mode="width"
          show-trigger="bar"
          :bordered="true"
          :collapsed="isCollapsed"
          :collapsed-width="64"
          :native-scrollbar="false"
          :width="240"
          @collapse="isCollapsed = true"
          @expand="isCollapsed = false"
        >
          <n-menu
            v-model:value="navLinksTitle"
            mode="vertical"
            :collapsed="isCollapsed"
            :collapsed-icon-size="24"
            :collapsed-width="64"
            :icon-size="24"
            :indent="24"
            :options="navLinksCategory"
            :on-update:value="handleSelectCategory"
          />
        </n-layout-sider>
        <n-layout class="right-content">
          <div class="tree-data">
            <n-tree
              children-field="children"
              key-field="_key"
              label-field="title"
              :block-line="true"
              :data="navLinksCurr"
              :render-label="renderTreeLabel"
            />
          </div>
        </n-layout>
      </n-layout>
    </div>
  </div>
</template>

<script lang="jsx" setup>
import {
  NLayout, NLayoutSider, NMenu, NTree,
} from 'naive-ui';

import {
  shallowRef, onBeforeMount,
} from 'vue';

import {
  NAV_MODULE_TITLE,
} from '@/config/modules';

import {
  formatNavLinks,
} from '@/assets/js/nav-links';

/** 分类列表是否折叠 */
const isCollapsed = shallowRef(false);

/** 完整的链接列表 */
const navLinksAll = formatNavLinks();

/**
 * @desc 链接分类列表
 * @type { import('naive-ui').MenuOption[] }
 */
const navLinksCategory = navLinksAll.map((item) => {
  return {
    icon: () => <span class={item.icon}></span>,
    key: item.title,
    label: item.title,
    _data: item,
  };
});

/**
 * @desc 当前显示的链接列表
 * @type {VueRef<NavLinkItem[]>}
 */
const navLinksCurr = shallowRef([]);

/** 当前显示的链接分类标题 */
const navLinksTitle = shallowRef('');

/**
 * @description 切换链接列表
 * @param {NavLinkItem} [data] 链接分类信息
 */
function changeList(data = null) {

  let useData = data || navLinksAll[0] || null;

  navLinksCurr.value = useData ? useData.children : [];
  navLinksTitle.value = useData ? useData.title : '';

}

/**
 * @description 处理选择链接分类
 * @param {string}      key
 * @param {NavLinkItem} item
 */
function handleSelectCategory(key, item) {
  changeList(item._data);
}

/**
 * @description 树形数据节点内容渲染函数
 * @param {object}      info
 * @param {NavLinkItem} info.option
 */
function renderTreeLabel(info) {
  return info.option.title;
}

onBeforeMount(() => {
  changeList(null);
});
</script>

<style lang="less" scoped>
.page-layout {
  width: 100%;
  height: 100%;
}

.left-aside {
  :deep(.n-menu-item-content__icon) {
    color: var(--color-text-2);
  }

  :deep(.n-menu-item-content-header) {
    color: var(--color-text-2);
  }
}

.right-content {
  width: 0;
  height: 100%;

  > div {
    width: 100%;
    height: 100%;
  }
}

.tree-data {
  padding: 16px;
  width: 100%;
  height: 100%;

  :deep(.n-tree-node) {
    align-items: center;
  }

  :deep(.n-tree-node-content__text) {
    display: flex;
    align-items: center;
    height: 32px;
  }
}
</style>
