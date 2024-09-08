<template>
  <div class="tool-detail-page">

    <!-- 配置选项 -->
    <n-card size="small" title="配置选项">
      <n-form
        class="form-no-feedback"
        label-align="right"
        label-placement="left"
        label-width="auto"
      >

        <n-form-item label="字符串长度：">
          <n-input-number
            v-model:value="info.strLength"
            :min="1"
            :max="1024"
            :step="1"
          ></n-input-number>
        </n-form-item>

        <n-form-item label="字符串格式：">
          <n-flex>
            <n-checkbox
              v-model:checked="info.option.hasNum"
            >数字</n-checkbox>
            <n-checkbox
              v-model:checked="info.option.hasChar"
            >字母</n-checkbox>
            <n-checkbox
              v-model:checked="info.option.hasSymbol"
            >其他符号</n-checkbox>
            <n-checkbox
              v-model:checked="info.option.caseSensitive"
            >大小写</n-checkbox>
            <n-checkbox
              v-model:checked="info.option.lowerCase"
            >全小写（需关闭“大小写”）</n-checkbox>
          </n-flex>
        </n-form-item>

      </n-form>
    </n-card>

    <!-- 结果 -->
    <n-card size="small" title="结果">
      <n-form
        class="form-no-feedback"
        label-align="right"
        label-placement="left"
        label-width="auto"
      >

        <n-form-item>
          <n-input
            v-model:value="info.result"
            placeholder=""
            type="textarea"
            :readonly="true"
            :rows="3"
          ></n-input>
        </n-form-item>

      </n-form>
    </n-card>

    <!-- 操作 -->
    <n-card size="small" title="操作">
      <n-flex>
        <n-button
          type="primary"
          @click="handleGenerate"
        >生成字符串</n-button>
        <n-button
          type="primary"
          :disabled="!info.result"
          @click="handleCopy"
        >复制结果</n-button>
      </n-flex>
    </n-card>

    <!-- 算法参考 -->
    <n-card size="small" title="算法参考">
      <n-ul>
        <n-li>
          <n-a
            href="https://www.cnblogs.com/hankuksui/p/9892729.html"
            target="_blank"
          >博客园 - hankuksui</n-a>
        </n-li>
      </n-ul>
    </n-card>

  </div>
</template>

<script setup>
import {
  NA, NButton, NCard, NCheckbox,
  NFlex, NForm, NFormItem,
  NInput, NInputNumber, NLi, NUl,
} from 'naive-ui';

import {
  reactive,
} from 'vue';

import {
  $message,
} from '@/assets/js/naive-ui';

import {
  useClipboard,
} from '@vueuse/core';

const clipboard = useClipboard({
  legacy: true,
  read: false,
});

const info = reactive({
  strLength: 8,
  option: {
    caseSensitive: true,
    hasNum: true,
    hasChar: true,
    hasSymbol: false,
    lowerCase: false
  },
  result: ''
});

/**
 * @description 生成随机字符串
 * @param {number} strLength 长度
 * @param {boolean} hasNum 是否包含数字
 * @param {boolean} hasChar 是否包含字母
 * @param {boolean} hasSymbol 是否包含其他符号
 * @param {boolean} caseSensitive 是否包含大小写
 * @param {boolean} lowerCase 是否全小写
 * - 当 caseSensitive 为 false 时起作用
 * @returns {string} 生成的字符串
 */
function genRandomStr(strLength, hasNum, hasChar, hasSymbol, caseSensitive, lowerCase) {

  let result = '';

  if (
    hasNum === false &&
    hasChar === false &&
    hasSymbol === false
  ) {
    return '请选中数字、字母或其他符号的其中一项！';
  }

  for (let i = strLength; i > 0; i--) {

    let num = Math.floor((Math.random() * 94) + 33);
    let flag = ((
      (hasNum === false) && ((num >= 48) && (num <= 57))
    ) || (
      (hasChar === false) && ((
        (num >= 65) && (num <= 90)
      ) || (
        (num >= 97) && (num <= 122)
      ))
    ) || (
      (hasSymbol === false) && ((
        (num >= 33) && (num <= 47)
      ) || (
        (num >= 58) && (num <= 64)
      ) || (
        (num >= 91) && (num <= 96)
      ) || (
        (num >= 123) && (num <= 127)
      )
    )));

    if (flag) {
      i++;
      continue;
    }

    /**
     * | CharCode   | 符号   |
     * | :--------- | :----- |
     * | 033 -> 047 | ! -> / |
     * | 048 -> 057 | 0 -> 9 |
     * | 058 -> 064 | : -> @ |
     * | 065 -> 090 | A -> Z |
     * | 091 -> 096 | [ -> ` |
     * | 097 -> 122 | a -> z |
     * | 123 -> 127 | { ->   |
     */

    result += String.fromCharCode(num);

  }

  if (caseSensitive === false) {
    result = (lowerCase ? result.toLocaleLowerCase() : result.toUpperCase());
  }

  return result;

}

/** 处理复制操作 */
function handleCopy() {
  if (clipboard.isSupported) {
    return clipboard.copy(info.result).then(() => {
      $message.success('复制成功');
    }).catch((error) => {
      console.error('复制失败：');
      console.error(error);
      $message.error('复制失败：异常');
    });
  } else {
    $message.error('复制失败：当前浏览器不支持该操作');
    return Promise.resolve(false);
  }
}

/** 处理生成操作 */
function handleGenerate() {

  let length = info.strLength;
  let opt = info.option;
  let result = genRandomStr(length, opt.hasNum, opt.hasChar, opt.hasSymbol, opt.caseSensitive, opt.lowerCase);

  info.result = result;

}
</script>

<style lang="less" scoped>
.tool-detail-page {
  :deep(.n-input-number) {
    width: 8em;
  }

  :deep(.n-input--textarea) {
    max-width: 48em;
  }
}
</style>
