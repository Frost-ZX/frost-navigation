<template>
  <el-container class="settings">
    <div class="wrapper shadow-2">

      <el-form label-position="left" label-width="12rem">

        <el-form-item label="字体大小" class="set-font">
          <el-input-number
            v-model="configFontSize"
            :min="12"
            :max="32"
            controls-position="right"
            label="字体大小"
            size="small"
          ></el-input-number>
        </el-form-item>

        <el-form-item label="显示网站标题">
          <el-switch v-model="configShowSiteTitle"></el-switch>
        </el-form-item>

        <el-form-item label="折叠主页侧边菜单">
          <el-switch v-model="configSideMenuCollapse"></el-switch>
        </el-form-item>

        <el-form-item label="获取搜索引擎关键词建议">
          <el-switch v-model="configSearchSuggestion"></el-switch>
        </el-form-item>

        <el-form-item label="清除数据">
          <el-button
            type="danger"
            size="medium"
            @click="resetDatas()"
          >清除设置</el-button>
        </el-form-item>

      </el-form>

    </div>
  </el-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'SettingsView',
  data() {
    return { }
  },
  computed: {

    ...mapState({
      appConfig: 'config',
    }),

    configFontSize: {
      /** @this */
      get() {
        return this.appConfig.fontSize;
      },
      set(value) {
        this.$store.commit('setConfig', {
          key: 'fontSize',
          value,
        });
      },
    },

    configShowSiteTitle: {
      /** @this */
      get() {
        return this.appConfig.showSiteTitle;
      },
      set(value) {
        this.$store.commit('setConfig', {
          key: 'showSiteTitle',
          value,
        });
      },
    },

    configSideMenuCollapse: {
      /** @this */
      get() {
        return this.appConfig.sideMenuCollapse;
      },
      set(value) {
        this.$store.commit('setConfig', {
          key: 'sideMenuCollapse',
          value,
        });
      },
    },

    configSearchSuggestion: {
      /** @this */
      get() {
        return this.appConfig.searchSuggestion;
      },
      set(value) {
        this.$store.commit('setConfig', {
          key: 'searchSuggestion',
          value,
        });
      },
    },

  },
  methods: {

    /** 清除数据 */
    resetDatas() {
      this.$confirm('确定要清除吗？', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        this.$store.commit('resetConfig');

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
