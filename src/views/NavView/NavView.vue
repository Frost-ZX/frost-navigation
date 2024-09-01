<template>
  <div class="nav-view flex-col">

    <div class="app-view-header">
      <div>{{ NAV_MODULE_TITLE }}</div>
      <div class="placeholder"></div>
      <n-button
        type="primary"
        size="small"
        :circle="true"
        :secondary="true"
        @click="showHelp"
      >
        <span class="mdi mdi-help"></span>
      </n-button>
    </div>

    <div class="app-view-content">
      <n-layout
        class="page-layout"
        :has-sider="true"
      >

        <!-- 左 -->
        <n-layout-sider
          class="left-aside"
          collapse-mode="width"
          show-trigger="arrow-circle"
          :bordered="true"
          :collapsed="isCollapsed"
          :collapsed-width="64"
          :native-scrollbar="false"
          :scrollbar-props="{ trigger: 'hover' }"
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

        <!-- 右 -->
        <n-layout class="right-content">
          <div class="right-content-header">
            <n-input-group>
              <n-select
                v-model:value="searchType"
                class="search-type"
                :options="searchTypes"
              />
              <n-input
                v-model:value="searchKeyword"
                class="search-input"
                placeholder="搜索链接项"
                :clearable="true"
              />
            </n-input-group>
          </div>
          <div class="right-content-body">
            <n-scrollbar trigger="none">
              <n-tree
                children-field="children"
                key-field="_key"
                label-field="title"
                :cancelable="false"
                :block-line="true"
                :block-node="true"
                :data="navLinksCurr"
                :filter="treeDataFilter"
                :pattern="searchKeyword"
                :render-label="renderTreeLabel"
                :selectable="true"
                :show-irrelevant-nodes="false"
              />
            </n-scrollbar>
          </div>
        </n-layout>

      </n-layout>
    </div>

    <!-- 链接详情 -->
    <n-drawer
      v-model:show="detailDrawer.show"
      class="nav-url-detail-drawer"
      placement="right"
    >
      <n-drawer-content
        title="链接详情"
        :closable="true"
      >
        <n-descriptions
          label-placement="top"
          :column="1"
        >
          <n-descriptions-item label="ID">
            {{ detailDrawer.data._key || '-' }}
          </n-descriptions-item>
          <n-descriptions-item label="链接标题">
            {{ detailDrawer.data.title || '-' }}
          </n-descriptions-item>
          <n-descriptions-item label="链接简介">
            {{ detailDrawer.data.desc || '-' }}
          </n-descriptions-item>
          <n-descriptions-item label="链接地址">
            {{ detailDrawer.data.url || '-' }}
          </n-descriptions-item>
          <n-descriptions-item label="更新日期">
            {{ detailDrawer.data.date || '-' }}
          </n-descriptions-item>
          <n-descriptions-item label="是否有效">
            {{ detailDrawer.data.isInvalid ? '否' : '是' }}
          </n-descriptions-item>
        </n-descriptions>
      </n-drawer-content>
    </n-drawer>

  </div>
</template>

<script lang="jsx" setup>
import {
  NButton, NDescriptions, NDescriptionsItem,
  NDrawer, NDrawerContent, NInput, NInputGroup,
  NLayout, NLayoutSider, NLi, NMenu,
  NScrollbar, NSelect, NTree, NUl,
} from 'naive-ui';

import {
  reactive, shallowRef, onBeforeMount,
} from 'vue';

import {
  NAV_MODULE_TITLE,
} from '@/config/modules';

import {
  SKEY_NAV_LINK_ASIDE_COLLAPSED,
  SKEY_NAV_LINK_SEARCH_TYPE,
} from '@/config/storage';

import {
  $dialog, $message,
} from '@/assets/js/naive-ui';

import {
  formatNavLinks,
} from '@/assets/js/nav-links';

import {
  useLocalStorage,
} from '@vueuse/core';

/** 链接详情 */
const detailDrawer = reactive({

  /** @type {NavLinkItem | null} */
  data: null,

  /** @type {boolean} */
  show: false,

});

/** 分类列表是否折叠 */
const isCollapsed = useLocalStorage(
  SKEY_NAV_LINK_ASIDE_COLLAPSED,
  false
);

/** 完整的链接列表 */
const navLinksAll = formatNavLinks(true);

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

/** 搜索关键词 */
const searchKeyword = shallowRef('');

/** 搜索类型 */
const searchType = useLocalStorage(
  SKEY_NAV_LINK_SEARCH_TYPE,
  'all'
);

/**
 * @desc 搜索类型列表
 * @type { import('naive-ui').SelectOption[] }
 */
const searchTypes = [
  { label: '全部', value: 'all' },
  { label: '标题', value: 'title' },
  { label: '链接', value: 'url' },
  { label: '简介', value: 'desc' },
];

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
 * @description 打开链接
 * @param {NavLinkItem} data
 */
function openURL(data) {
  if (data.isInvalid) {
    $message.warning('链接已失效，仅支持查看详情');
  } else if (data.showOnly) {
    $message.warning('该链接不支持直接打开，请在链接详情中复制后手动打开');
  } else if (data.url) {
    window.open(data.url, '_blank');
  }
}

/**
 * @description 树形数据节点内容渲染函数
 * @param {object}      info
 * @param {NavLinkItem} info.option
 */
function renderTreeLabel(info) {

  let data = info.option;
  let isURL = !data.children;

  let open = () => {
    isURL && openURL(data);
  };

  let show = () => {
    isURL && toggleDetailDrawer(true, data);
  };

  return <div
    class="item-wrapper"
    onContextmenu={show}
    onClick={open}
  >
    <div class="item-title">
      <span>{ data.title }</span>
      { data.desc ? <span> - { data.desc }</span> : ''}
    </div>
    <div class="item-url">{ data.url }</div>
  </div>;

}

/** 显示说明 */
function showHelp() {
  $dialog.create({
    content: () => {
      return <NUl>
        <NLi>点击目录项左侧按钮以展开目录。</NLi>
        <NLi>PC 端右键或移动端长按链接项以显示详情。</NLi>
      </NUl>
    },
    title: '操作说明',
    type: 'default',
  });
}

/**
 * @description 处理搜索
 * @param {string}      pattern
 * @param {NavLinkItem} node
 */
function treeDataFilter(pattern = '', node = null) {

  if (pattern === '') {
    return true;
  } else {
    pattern = pattern.toLowerCase();
  }

  let type = searchType.value;

  let desc = String(node.desc).toLowerCase();
  let title = String(node.title).toLowerCase();
  let url = String(node.url).toLowerCase();

  switch (type) {
    case 'all':
      return (
        title.includes(pattern) ||
        url.includes(pattern) ||
        desc.includes(pattern)
      );
    case 'desc':
      return desc.includes(pattern);
    case 'title':
      return title.includes(pattern);
    case 'url':
      return url.includes(pattern);
    default:
      return false;
  }

}

/**
 * @description 切换链接详情显示隐藏
 * @param {boolean}     show
 * @param {NavLinkItem} data
 */
function toggleDetailDrawer(show = false, data = null) {
  if (show) {
    detailDrawer.data = data;
  }
  detailDrawer.show = show;
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

  :deep(> div) {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
}

.right-content-header,
.right-content-body {
  width: 100%;
}

.right-content-header {
  // 注：右侧 padding 2px 防止输入框聚焦样式显示不全
  padding: 10px 2px 0 16px;

  .search-type {
    width: 80px;
  }

  .search-input {
    flex-grow: 1;
    width: 0;
  }
}

.right-content-body {
  flex-grow: 1;
  padding: 16px 2px 0 16px;
  height: 0;

  :deep(.n-tree-node) {
    align-items: center;
  }

  :deep(.n-tree-node-content) {
    color: var(--color-text-2);
    line-height: 1.5;
  }

  :deep(.n-tree-node-content__text) {
    border-bottom: none;
  }

  :deep(.n-tree-node-indent > div) {
    width: 16px !important;
  }

  :deep(.n-tree-node--selected) {
    .n-tree-node-content,
    .n-tree-node-switcher__icon {
      color: var(--color-primary);
    }
  }

  :deep(.n-tree-node-switcher__icon) {
    width: 1em;
    height: 1em;
    color: var(--color-text-2);
    font-size: 20px;
  }

  :deep(.item-wrapper) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 48px;
    white-space: nowrap;

    > div {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  :deep(.item-url) {
    opacity: 0.5;
  }
}
</style>

<style lang="less">
.nav-url-detail-drawer {
  width: 100% !important;
  max-width: 320px;

  .n-descriptions-table-content {
    user-select: text;
  }
}
</style>
