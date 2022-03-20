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
          v-for="toolItem in categoryItem.list"
          :key="toolItem.name"
          :class="['tool-item', 'shadow-2', { disabled: !toolItem.enabled }]"
          @click="openTool(`Tool${toolItem.component || 'Unknown'}`, toolItem.enabled)"
        >
          <div class="item-title limit-line-1">{{ toolItem.title }}</div>
          <div class="item-content limit-line-3">{{ toolItem.desc || '无简介' }}</div>
        </div>

      </div>

    </div>
  </el-container>
</template>

<script>
import navTools from '@/assets/js/navTools.js';

export default {
  name: 'ToolsView',
  data() {
    return {
      toolList: navTools,
    }
  },
  methods: {

    /** 
     * @description 打开工具
     * @param {string} routeName 路由名称
     * @param {boolean} isEnabled 是否已启用
     */
    openTool(routeName, isEnabled = false) {
      
      if (isEnabled) {
        this.$router.push({ name: routeName });
      } else {
        this.$message({
          duration: 3000,
          message: '该工具正在开发中，暂时无法使用。',
          type: 'warning',
        });
      }

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
</style>
