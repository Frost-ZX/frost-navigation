<template>
  <div class="tools-detail">

    <div class="tools-header">

      <!-- 标题 -->
      <div class="title">
        <span>{{ routeMeta.title }}</span>
        <span
          v-show="Boolean(routeMeta.version)"
        >[{{ routeMeta.version }}]</span>
        <span
          v-show="Boolean(routeMeta.update)"
        >[{{ routeMeta.update }}]</span>
      </div>

      <!-- 在新标签页打开 -->
      <el-tooltip content="在新标签页中打开" placement="left">
        <div
          class="btn el-icon-copy-document"
          @click="openNewTab()"
        ></div>
      </el-tooltip>

      <!-- 关闭 -->
      <el-tooltip content="关闭工具" placement="left">
        <div
          class="btn el-icon-close"
          @click="close()"
        ></div>
      </el-tooltip>

    </div>

    <div class="tools-content">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
export default {
  name: 'ToolsDetail',
  data() {
    return { }
  },
  computed: {

    /** 路由 meta 信息 */
    routeMeta() {
      return (this.$route.meta || {});
    },

  },
  methods: {

    /** 关闭工具 */
    close() {
      this.$confirm('是否关闭？').then(() => {

        // 返回工具页面
        this.$router.push({
          name: 'Tools'
        });

      }).catch(() => { });
    },

    /** 在新标签页打开工具 */
    openNewTab() {
      const url = window.location.href;
      window.open(url, '_blank');
    },

  },
}
</script>

<style lang="less" scoped>
.tools-detail {
  display: flex;
  align-items: center;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  background-color: #FFF;
}

.tools-header {
  display: flex;
  align-items: center;
  position: relative;
  z-index: 20;
  padding: 1rem;
  width: 100%;
  box-shadow: 0 0.5rem 1rem -0.5rem rgba(0, 0, 0, 0.2);
  background-color: @colorPrimary;
  color: #FFF;

  .title {
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    span {
      margin-right: 0.25em;
    }
  }

  .btn {
    flex-shrink: 0;
    margin-left: 0.5em;
    cursor: pointer;
  }
}

.tools-content {
  flex-grow: 1;
  position: relative;
  z-index: 10;
  width: 100%;
  height: 0;
  overflow-y: auto;
}

/deep/ .tool-page {
  margin: 0 auto;
  padding: 1rem 2rem;
  width: 100%;
  height: auto;
  max-width: 60rem;
  background-color: #FFF;

  > div {
    > .title {
      position: relative;
      margin: 1.5rem 0;
      color: @colorPrimary;
      font-size: 1.125rem;
    }

    > .title::before {
      content: "";
      position: absolute;
      top: 50%;
      left: -0.5em;
      width: 0.25em;
      height: calc(100% - 0.25em);
      transform: translateY(-50%);
      background-color: @colorPrimary;
    }

    > .content {
      color: @textPrimary;
      font-size: 1rem;
      line-height: 1.5em;
    }
  }
}
</style>
