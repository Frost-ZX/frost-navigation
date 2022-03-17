<template>
  <el-container class="about">
    <div class="wrapper shadow-2">

      <div class="text">
        <div class="title">简介</div>
        <div class="content">
          <p>一个多功能的网址导航，绿色无广告。</p>
          <p>右键点击（PC端）或长按（移动端）链接项可查看链接详情。</p>
          <p>当前版本：2.0.0</p>
          <p>链接版本：{{ navLinks.version }}</p>
        </div>
      </div>

      <div class="text">
        <div class="title">开发人员</div>
        <div class="content">
          <p>Frost-ZX</p>
        </div>
      </div>

      <div class="text">
        <div class="title">注意事项</div>
        <div class="content">
          <p>部分链接由于不能及时更新，可能已过期（不存在、指向了错误的网站等），访问时请注意。</p>
          <p>若您在使用时发现相关情况，欢迎进行反馈。</p>
        </div>
      </div>

      <div class="text">
        <div class="title">GitHub</div>
        <div class="content">
          <p>
            <el-link :href="info.github" target="_blank" type="primary">{{ info.github }}</el-link>
          </p>
        </div>
      </div>

    </div>
  </el-container>
</template>

<script>
export default {
  name: 'AboutView',
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.utils.changeTitle('关于');
    });
  },
  data() {
    return {
      navLinks: this.$root.navLinks,
      utils: this.$root.utils,
      info: {
        github: 'https://github.com/Frost-ZX/frost-navigation'
      }
    }
  },
}
</script>

<style lang="less" scoped>
.about {
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

  .text {
    padding: 0.5rem 0;

    .title {
      line-height: 2.5rem;
      font-size: 1rem;
      color: @textPrimary;
    }

    .content {
      line-height: 1.8rem;
      font-size: 0.85rem;
      color: @textSecondary;
    }
  }
}
</style>
