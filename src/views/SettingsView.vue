<template>
  <el-container class="settings">
    <div class="wrapper shadow-2">

      <el-form label-position="left" label-width="12rem">

        <el-form-item label="字体大小" class="set-font">
          <el-input-number
            v-model="config.fontSize"
            :min="12"
            :max="32"
            controls-position="right"
            label="字体大小"
            size="small"
          ></el-input-number>
        </el-form-item>

        <el-form-item label="显示网站标题">
          <el-switch v-model="config.showSiteTitle"></el-switch>
        </el-form-item>

        <el-form-item label="折叠主页侧边菜单">
          <el-switch v-model="config.sideMenuCollapse"></el-switch>
        </el-form-item>

        <el-form-item label="获取搜索引擎关键词建议">
          <el-switch v-model="config.searchSuggestion"></el-switch>
        </el-form-item>

        <el-form-item label="清除数据">
          <el-button
            type="danger"
            size="medium"
            @click="resetDatas('settings')"
          >清除设置</el-button>
          <el-button
            type="danger"
            size="medium"
            @click="resetDatas('cache')"
          >清除缓存</el-button>
        </el-form-item>

      </el-form>

    </div>
  </el-container>
</template>

<script>
export default {
  name: 'SettingsView',
  data() {
    return {
      config: this.$root.config.storage,
    }
  },
  methods: {

    /**
     * 清除数据
     * 
     * @param {string} type 清除类型（cache、settings）
     */
    resetDatas(type) {
      this.$confirm('确定要清除吗？', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        if (type === 'cache') {
          localStorage.removeItem('navLinksCache');
        } else if (type === 'settings') {
          localStorage.removeItem('navConfig');
        } else {
          return
        }

        this.$message({
          message: '已清除，2s 后自动刷新',
          type: 'success'
        });

        setTimeout(() => {
          location.reload();
        }, 2000);

      }).catch(() => {

        this.$message({
          message: '取消清除',
          type: 'info'
        });

      });
    }

  }
}
</script>

<style lang="less" scoped>
.settings {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: @colorWhite;
  overflow-y: auto;

  .wrapper {
    padding: 1.5rem 2rem;
    width: 100%;
    max-width: 50rem;
    background-color: #FFF;
  }
}

.set-font {
  /deep/ .el-input-number {
    width: 7rem;
  }
}

/deep/ .el-form-item {
  @media screen and (max-width: 520px) {
    .el-form-item__label {
      float: unset !important;
    }
    .el-form-item__content {
      margin-left: 0 !important;
    }
  }
}
</style>
