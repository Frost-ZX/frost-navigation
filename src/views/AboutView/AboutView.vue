<template>
  <div class="about-view flex-col">
    <div class="app-view-header">
      <span>关于</span>
    </div>
    <div class="app-view-content with-margin">

      <n-h4>简介</n-h4>

      <n-p>一个多功能的网址导航，绿色无广告。</n-p>
      <n-p>当前版本：V{{ version }}</n-p>

      <n-h4>开发人员</n-h4>

      <n-ul>
        <n-li>Frost-ZX</n-li>
      </n-ul>

      <n-h4>项目地址</n-h4>

      <n-ul>
        <n-li>
          <span>GitHub：</span>
          <n-a :href="URL_GITHUB" target="_blank">{{ URL_GITHUB }}</n-a>
        </n-li>
        <n-li>
          <span>Gitee：</span>
          <n-a :href="URL_GITEE" target="_blank">{{ URL_GITEE }}</n-a>
        </n-li>
      </n-ul>

    </div>
  </div>
</template>

<script setup>
import { version } from '@package-json';
import { NA, NH4, NLi, NP, NUl } from 'naive-ui';

/** Gitee 地址 */
const URL_GITEE = 'https://gitee.com/frost-craft/frost-navigation';

/** GitHub 地址 */
const URL_GITHUB = 'https://github.com/Frost-ZX/frost-navigation';
</script>

<style lang="less" scoped>
</style>
