<template>
  <el-container class="tools">

    <div class="wrapper">

      <!-- 工具分类 -->
      <div
        v-for="(categoryItem, categoryKey) in toolList"
        :key="categoryKey"
        class="category"
      >

        <!-- 标题 -->
        <div class="title">{{ categoryItem.title }}</div>

        <!-- 工具项 -->
        <div
          v-for="(toolItem, toolKey) in categoryItem.list"
          :key="toolKey"
          :class="['tool-item', 'shadow-2', { disabled: !toolItem.enabled }]"
          @click="detailOpen(categoryKey, toolKey)"
        >
          <div class="item-title limit-line-1">{{ toolItem.title }}</div>
          <div class="item-content limit-line-3">{{ toolItem.desc || '无简介' }}</div>
        </div>

      </div>

    </div>

    <!-- 弹出层 -->
    <el-drawer
      custom-class="drawer-full"
      direction="btt"
      size="100%"
      :append-to-body="true"
      :destroy-on-close="true"
      :title="detail.title"
      :visible.sync="detail.show"
      :before-close="detailClose"
    >

      <!-- 标题区域 -->
      <div slot="title" class="header">
        <span class="title">{{ detail.title }}</span>
        <el-tooltip content="在新标签页中打开本工具" placement="left">
          <i class="btn el-icon-copy-document" @click="detailOpenNewTab()"></i>
        </el-tooltip>
      </div>

      <!-- 内容区域 -->
      <router-view></router-view>

    </el-drawer>

  </el-container>
</template>

<script>
import navTools from '@/assets/js/navTools.js';

export default {
  name: 'ToolsView',
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const { name: rName, params: rParams } = vm.$route;

      // 判断进入的路由
      if (rName === 'ToolsDetail') {
        // [工具内容页面]
        vm.detailOpen(rParams.category, rParams.name);
      } else {
        // [工具列表页面]
        vm.utils.changeTitle('小工具');
      }
    });
  },
  data() {
    return {
      utils: this.$root.utils,
      toolList: navTools,
      detail: {
        show: false,
        title: ''
      },
    }
  },
  methods: {

    /**
     * 关闭工具
     */
    detailClose(done) {
      this.$confirm('是否关闭？').then(() => {
        // 关闭 drawer
        done();
        // 返回工具页面
        this.$router.push({
          name: 'Tools'
        }).then(() => {
          // 更新标题
          this.utils.changeTitle('小工具');
        });
      }).catch(() => { });
    },

    /**
     * 打开工具
     * 
     * @param {string} toolCatrgory 工具分类
     * @param {string} toolName 工具名称
     */
    detailOpen(toolCatrgory, toolName) {
      const errMsg = `无法打开该工具（分类：${toolCatrgory} 名称：${toolName}）`;

      try {

        var info = this.toolList[toolCatrgory]['list'][toolName];
        if (info === undefined) {
          throw new Error(errMsg);
        }

      } catch (err) {

        console.warn('[打开工具]', err);
        this.$message({
          message: errMsg,
          type: 'error'
        });
        return;

      }

      // 禁用
      if (!info.enabled) {
        this.$message({
          message: '该工具未启用',
          type: 'warning'
        });
        return;
      }

      const {
        title: iTitle,
        version: iVersion,
        update: iUpdate,
      } = info;

      // 路由跳转
      // 注：当前路由相同时也进行跳转
      this.$router.push({
        name: 'ToolsDetail',
        params: {
          category: toolCatrgory,
          name: toolName
        }
      }).catch((err) => {
        console.log('[打开工具]', err.name);
      }).finally(() => {
        // 更新标题
        this.utils.changeTitle(iTitle);
        this.detail.title = `${iTitle} [${iVersion || '未知'}][${iUpdate || '未知'}]`;
        // 显示 drawer
        this.detail.show = true;
      });
    },

    /**
     * 打开工具（新标签页）
     */
    detailOpenNewTab() {
      const url = window.location.href;
      window.open(url, '_blank');
    },

  },
}
</script>

<style lang="less" scoped>
.tools {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: @colorWhite;
  overflow-y: auto;
}

.wrapper {
  width: 100%;
}

.category {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: flex-start;
  position: relative;
  padding-top: 3rem;
  width: 100%;

  .title {
    position: absolute;
    top: 1rem;
    left: 0;
    font-weight: bold;
    color: @textPrimary;
  }

  .tool-item {
    flex-shrink: 0;
    margin: 0.5rem;
    padding: 1rem;
    width: 16rem;
    border-left: 0.2rem solid @colorPrimary;
    border-radius: 0.25rem;
    background-color: #FFF;
    font-size: 0;
    color: @textPrimary;
    overflow: hidden;
    transition: all @transitionTime;
    cursor: pointer;

    &:hover {
      border-left-color: @colorSecondary;
      transform: translateY(-0.2rem);
    }

    &.disabled {
      border-left-color: @colorGrey;
    }

    .item-title {
      margin-bottom: 0.5rem;
      font-weight: bold;
      font-size: 0.9rem;
    }

    .item-content {
      height: calc(1.5em * 2);
      line-height: 1.5em;
      font-size: 0.75rem;
      color: @textSecondary;
    }
  }
}

.drawer-full {
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .btn {
      margin: 0 0.5rem;
      font-size: inherit;
      cursor: pointer;
    }
  }
}
</style>
