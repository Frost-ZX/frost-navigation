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
          show-trigger="bar"
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
        <n-layout
          class="right-content"
          :native-scrollbar="false"
          :scrollbar-props="{ trigger: 'none' }"
        >
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
            {{ detailDrawer.data._key }}
          </n-descriptions-item>
          <n-descriptions-item label="链接标题">
            {{ detailDrawer.data.title }}
          </n-descriptions-item>
          <n-descriptions-item label="链接地址">
            {{ detailDrawer.data.url }}
          </n-descriptions-item>
          <n-descriptions-item label="更新日期">
            {{ detailDrawer.data.date }}
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
  NButton,
  NDescriptions, NDescriptionsItem,
  NDrawer, NDrawerContent,
  NLayout, NLayoutSider, NMenu, NTree,
  NLi, NUl,
} from 'naive-ui';

import {
  reactive, shallowRef, onBeforeMount,
} from 'vue';

import {
  NAV_MODULE_TITLE,
} from '@/config/modules';

import {
  $dialog, $message,
} from '@/assets/js/naive-ui';

import {
  formatNavLinks,
} from '@/assets/js/nav-links';

/** 链接详情 */
const detailDrawer = reactive({

  /** @type {NavLinkItem | null} */
  data: null,

  /** @type {boolean} */
  show: false,

});

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
 * @description 打开链接
 * @param {string}  url
 * @param {boolean} showOnly
 */
function openURL(url = '', showOnly = false) {
  if (showOnly) {
    $message.warning('请在链接详情中复制后手动打开');
  } else {
    url && window.open(url, '_blank');
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
    isURL && openURL(data.url, data.showOnly);
  };

  let show = () => {
    isURL && toggleDetailDrawer(true, data);
  };

  return <div class="item-wrapper" onContextmenu={show} onClick={open}>
    <div class="item-title">{ data.title }</div>
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

  :deep(.n-tree-node-content) {
    color: var(--color-text-2);
    line-height: 1.5;
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
