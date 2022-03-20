<template>
  <div id="app">

    <!-- 加载动画 -->
    <div v-show="showLoading" class="loading-bar">
      <div class="bar-content"></div>
    </div>

    <!-- 内容区域 -->
    <el-container>

      <!-- Header -->
      <el-header class="main-header shadow-1">

        <!-- LOGO -->
        <div class="logo"></div>

        <!-- 菜单 -->
        <el-menu class="menu" :default-active="headerDefaultActive" mode="horizontal" router>

          <!-- 标题 -->
          <el-menu-item
            v-show="appConfig.showSiteTitle"
            index="title"
            class="title"
            disabled
          >Frost 网址导航</el-menu-item>

          <!-- 菜单项 -->
          <el-menu-item
            v-for="item in headerMenuItems"
            :key="item.id"
            class="item-normal"
            :index="item.id"
            :route="{ name: item.routeName }"
          >{{ item.label }}</el-menu-item>

          <!-- 切换下拉菜单 -->
          <el-menu-item
            :class="['item-dropdown', { active: showHeaderDropdown }]"
            @click="showHeaderDropdown = !showHeaderDropdown"
          >
            <i class="fa fa-bars"></i>
          </el-menu-item>

        </el-menu>

      </el-header>

      <!-- 下拉菜单 -->
      <el-menu
        :class="['header-dropdown', 'shadow-2', { show: showHeaderDropdown }]"
        :default-active="headerDefaultActive"
        router
      >

        <!-- 菜单项 -->
        <el-menu-item
          v-for="item in headerMenuItems"
          :key="item.id"
          class="item-normal"
          :index="item.id"
          :route="{ name: item.routeName }"
        >{{ item.label }}</el-menu-item>

      </el-menu>

      <!-- Container -->
      <keep-alive>
        <router-view class="main-container" />
      </keep-alive>

    </el-container>

    <!-- 悬浮按钮 -->
    <FloatingBtn />

  </div>
</template>

<script>
import { mapState } from 'vuex';

import FloatingBtn from '@/components/FloatingBtn.vue';

export default {
  name: 'App',
  components: {
    FloatingBtn,
  },
  data() {
    return {

      debounceFontSize: null,

      /** Header 菜单项 */
      headerMenuItems: [
        {
          id: 'home',
          label: '主页',
          routeName: 'Home'
        },
        {
          id: 'tools',
          label: '小工具',
          routeName: 'Tools'
        },
        {
          id: 'settings',
          label: '设置',
          routeName: 'Settings'
        },
        {
          id: 'about',
          label: '关于',
          routeName: 'About'
        }
      ],

      /** 显示下拉菜单 */
      showHeaderDropdown: false,

    }
  },
  computed: {

    ...mapState({
      appConfig: 'config',
      showLoading: 'showLoading',
    }),

    /** Header 默认激活的菜单项 */
    headerDefaultActive() {
      var routeName = this.$route.name;
      var item = '';

      if (routeName) {
        item = routeName.toLowerCase();
      }

      return item;
    },

  },
  watch: {

    // 更新字体大小
    'appConfig.fontSize': {
      handler(value) {
        
        clearTimeout(this.debounceFontSize);
        this.debounceFontSize = setTimeout(() => {
          document.documentElement.style.fontSize = `${value}px`;
        }, 500);

      }
    },

    // 路由名称
    '$route.name': {
      handler() {
        // 切换路由时隐藏下拉菜单
        this.showHeaderDropdown = false;
      }
    },

  },
  created() {
    this.init();
  },
  methods: {
    
    /** 初始化 */
    init() {
      this.$store.commit('readConfig');
    },

  },
}
</script>

<style lang="less">
.loading-bar {
  position: absolute;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 0.2rem;

  .bar-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background-color: @colorPrimary;
    animation: loadingBar 4s ease-in-out infinite;
  }

  @keyframes loadingBar {
    0% {
      left: 0;
      width: 0;
    }
    50% {
      left: 0;
      width: 100%;
    }
    100% {
      left: 100%;
      width: 0;
    }
  }
}

.main-header {
  display: flex;
  align-items: center;
  z-index: 200;
  height: @headerHeight !important;
  background-color: #FFF;

  @media screen and (min-width: 30rem) {
    .menu .item-dropdown {
      display: none;
    }
  }

  @media screen and (max-width: 30rem) {
    .logo {
      display: none;
    }

    .menu {
      .item-normal {
        display: none;
      }

      .item-dropdown {
        position: absolute;
        right: 0;
        margin: 0;
        padding: 0;

        i {
          font-size: 1.75em;
        }
      }
    }
  }

  .logo {
    flex-shrink: 0;
    margin-right: 1rem;
    width: 2rem;
    height: 2rem;
    background-image: url("./assets/icon/favicon.svg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }

  .menu {
    flex-grow: 1;
    height: 2.5rem;
    border: none !important;

    > li {
      padding: 0 1rem;
      height: 100%;
      line-height: 2.5rem;

      &.is-active {
        border-bottom-color: transparent;
        color: @colorPrimary !important;
      }
    }

    .title {
      padding-left: 0;
      font-size: 1.2rem;
      color: @colorPrimary;
      opacity: 1;
      cursor: default;
    }
  }
}

.main-container {
  height: calc(100vh - @headerHeight);
}
</style>

<style lang="less" scoped>
.header-dropdown {
  position: absolute !important;
  z-index: 150;
  top: @headerHeight;
  left: 0;
  width: 100%;
  overflow: hidden;
  transform: translateY(-100%);
  transition: transform @transitionTime;

  &.show {
    transform: translateY(0);
  }
}

.menu .item-dropdown {
  i {
    transition: color @transitionTime;
  }

  &.active i {
    color: @colorPrimary;
  }
}
</style>
