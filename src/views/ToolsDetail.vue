<template>
  <div class="tools-detail">
    <component :is="toolPage" />
  </div>
</template>

<script>
import navTools from '@/assets/js/navTools.js';

export default {
  name: 'ToolsDetail',
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const { params, query } = vm.$route;
      const { category: cCategory, name: cName } = params;
      const componentName = vm.toolList[cCategory]['list'][cName].component;

      var loading = null;

      console.log('[打开工具]', { params, query });

      // 异步，防止找不到 target
      setTimeout(() => {
        // 开启 Loading
        loading = vm.$loading({
          background: '#FFF',
          lock: true,
          // Loading 需要覆盖的 DOM 节点
          target: '.drawer-full .el-drawer__body'
        });
      }, 0);

      vm.toolPage = (() => {
        // 动态引入组件
        const component = import(`@/components/Tools/${componentName}.vue`);

        Promise.all([component]).then(() => {
          setTimeout(() => {
            // 关闭 Loading
            loading.close();
          }, 200);
        });

        return component;
      });
    });
  },
  data() {
    return {
      utils: this.$root.utils,
      toolList: navTools,
      toolPage: null,
    }
  },
}
</script>

<style lang="less" scoped>
.tools-detail {
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

/deep/ .tool-page {
  width: 100%;
  max-width: 60rem;

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
