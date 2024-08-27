<template>
  <!-- 侧边栏 -->
  <div class="app-aside">

    <div class="app-icon-wrapper">
      <div class="app-icon"></div>
    </div>

    <div class="app-modules">
      <div
        v-for="item in modules"
        :key="item.name"
        :title="item.title"
        :class="{
          'is-active': (currRouteName === item.name),
          'module-item': true,
        }"
        @click="changePage(item.name)"
      >
        <span :class="item.className"></span>
      </div>
    </div>

  </div>
</template>

<script setup>
import {
  computed, shallowRef, onBeforeMount,
} from 'vue';

import {
  useRoute, useRouter,
} from 'vue-router';

/** 当前路由名称 */
const currRouteName = computed(() => {
  return route.name;
});

/**
 * @desc 模块列表
 * @type {VueRef<{ className: string; name: string; title: string; }[]>}
 */
const modules = shallowRef([]);

/** 路由 */
const route = useRoute();

/** 路由 */
const router = useRouter();

/** 切换页面 */
function changePage(routeName = '') {
  router.replace({ name: routeName });
}

/** 初始化数据 */
function initData() {

  /** @type {typeof modules.value} */
  let list = [];

  // 提取路由信息
  router.getRoutes().forEach((item) => {

    let m = item.meta;

    if (m.showInAside) {
      list.push({
        className: m.iconClass,
        name: item.name,
        title: m.title,
      });
    }

  });

  modules.value = list;

}

onBeforeMount(() => {
  initData();
});
</script>

<style lang="less" scoped>
.app-aside {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.app-icon-wrapper {
  display: flex;
  flex-direction: column;
  margin-top: 24px;
}

.app-icon {
  margin: auto;
  width: 32px;
  height: 32px;
  background-image: url("./favicon.ico");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}

.app-modules {
  display: flex;
  flex-direction: column;
  margin-top: 48px;
}

.module-item {
  display: flex;
  margin: 0 auto;
  width: 1.8em;
  height: 1.8em;
  border-radius: 50%;
  color: #808080;
  font-size: 24px;
  cursor: pointer;

  &:not(:first-child) {
    margin-top: 10px;
  }

  &:hover, &.is-active {
    background-color: #F2F2F2;
    color: var(--color-info);
  }

  span {
    margin: auto;
  }
}
</style>
