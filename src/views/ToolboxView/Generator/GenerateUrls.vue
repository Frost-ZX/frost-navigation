<template>
  <div class="tool-detail-page">

    <!-- 链接模板 -->
    <n-card size="small" title="链接模板">
      <n-form
        class="form-no-feedback"
        label-align="right"
        label-placement="left"
        label-width="auto"
      >
        <n-form-item label="链接模板：">
          <n-input
            v-model:value="linkBase"
            placeholder="使用 {n} 表示变量，例如：https://example.com/file_{n}.jpg"
            clearable
          ></n-input>
        </n-form-item>
      </n-form>
    </n-card>

    <!-- 配置参数 -->
    <n-card size="small" title="参数配置">
      <n-radio-group v-model:value="mode">

        <!-- 等差数列 -->
        <div class="mode-item">
          <n-flex vertical>
            <n-radio value="as">等差数列</n-radio>
            <n-form
              class="form-no-feedback"
              label-align="right"
              label-placement="left"
              label-width="auto"
            >
              <n-flex gap="small">
                <n-form-item label="首项：">
                  <n-input-number
                    v-model:value="modes.as.first"
                    :min="0"
                    :step="1"
                  ></n-input-number>
                </n-form-item>
                <n-form-item label="公差：">
                  <n-input-number
                    v-model:value="modes.as.diff"
                    :min="1"
                    :step="1"
                  ></n-input-number>
                </n-form-item>
                <n-form-item label="项数：">
                  <n-input-number
                    v-model:value="modes.as.count"
                    :min="1"
                    :max="1000"
                    :step="1"
                  ></n-input-number>
                </n-form-item>
              </n-flex>
              <n-flex gap="small">
                <n-form-item label="选项：">
                  <n-checkbox
                    v-model:checked="modes.as.zero"
                  >补零</n-checkbox>
                </n-form-item>
                <n-form-item>
                  <n-checkbox
                    v-model:checked="modes.as.reverse"
                  >倒序</n-checkbox>
                </n-form-item>
              </n-flex>
            </n-form>
          </n-flex>
        </div>

        <!-- 等比数列 -->
        <div class="mode-item">
          <n-flex vertical>
            <n-radio value="ps">等比数列</n-radio>
            <n-form
              class="form-no-feedback"
              label-align="right"
              label-placement="left"
              label-width="auto"
            >
              <n-flex gap="small">
                <n-form-item label="首项：">
                  <n-input-number
                    v-model:value="modes.ps.first"
                    :min="1"
                    :step="1"
                  ></n-input-number>
                </n-form-item>
                <n-form-item label="公比：">
                  <n-input-number
                    v-model:value="modes.ps.diff"
                    :min="2"
                    :step="1"
                  ></n-input-number>
                </n-form-item>
                <n-form-item label="项数：">
                  <n-input-number
                    v-model:value="modes.ps.count"
                    :min="1"
                    :max="1000"
                    :step="1"
                  ></n-input-number>
                </n-form-item>
              </n-flex>
              <n-flex gap="small">
                <n-form-item label="选项：">
                  <n-checkbox
                    v-model:checked="modes.ps.zero"
                  >补零</n-checkbox>
                </n-form-item>
                <n-form-item>
                  <n-checkbox
                    v-model:checked="modes.ps.reverse"
                  >倒序</n-checkbox>
                </n-form-item>
              </n-flex>
            </n-form>
          </n-flex>
        </div>

        <!-- 字母变化 -->
        <div class="mode-item">
          <n-flex vertical>
            <n-radio value="lc">字母变化</n-radio>
            <n-form
              class="form-no-feedback"
              label-align="right"
              label-placement="left"
              label-width="auto"
            >
              <n-flex gap="small" align-items="center">
                <n-form-item label="从：">
                  <n-input
                    v-model:value="modes.lc.start"
                    :maxlength="1"
                    placeholder="a"
                  ></n-input>
                </n-form-item>
                <n-form-item label="到：">
                  <n-input
                    v-model:value="modes.lc.end"
                    :maxlength="1"
                    placeholder="z"
                  ></n-input>
                </n-form-item>
                <n-form-item>
                  <n-checkbox
                    v-model:checked="modes.lc.reverse"
                  >倒序</n-checkbox>
                </n-form-item>
              </n-flex>
            </n-form>
          </n-flex>
        </div>

      </n-radio-group>
    </n-card>

    <!-- 操作 -->
    <n-card size="small" title="操作">
      <n-flex gap="small">
        <n-button
          type="primary"
          @click="handleGenerate"
        >生成链接</n-button>
        <n-button
          type="primary"
          :disabled="!linkResult"
          @click="handleCopy"
        >复制结果</n-button>
        <n-button
          @click="handleClear"
        >清空结果</n-button>
      </n-flex>
    </n-card>

    <!-- 生成结果 -->
    <n-card size="small" title="生成结果">
      <n-form
        class="form-no-feedback"
        label-align="right"
        label-placement="left"
        label-width="auto"
      >
        <n-form-item>
          <n-input
            v-model:value="linkResult"
            placeholder="生成的链接将显示在这里"
            type="textarea"
            :readonly="true"
            :rows="10"
          ></n-input>
        </n-form-item>
      </n-form>
    </n-card>

  </div>
</template>

<script setup>
import {
  NButton, NCard, NCheckbox, NFlex,
  NForm, NFormItem, NInput, NInputNumber,
  NRadio, NRadioGroup,
} from 'naive-ui';

import {
  reactive, ref,
} from 'vue';

import {
  $message,
} from '@/assets/js/naive-ui';

import {
  useClipboard,
} from '@vueuse/core';

// 链接模板
const linkBase = ref('');

// 生成结果
const linkResult = ref('');

// 正则，匹配链接变量
const linkRegExp = /\{n\}/g;

// 当前模式
const mode = ref('as');

// 模式配置
const modes = reactive({
  // 等差数列（Arithmetic Sequence）
  as: {
    first: 0,
    diff: 1,
    count: 10,
    zero: false,
    reverse: false,
  },
  // 等比数列（Proportional Sequence）
  ps: {
    first: 1,
    diff: 2,
    count: 10,
    zero: false,
    reverse: false,
  },
  // 字母变化（Letter Change）
  lc: {
    start: 'a',
    end: 'z',
    reverse: false,
  },
});

// 剪贴板功能
const clipboard = useClipboard({
  legacy: true,
  read: false,
});

/** 处理生成链接 */
function handleGenerate() {

  if (!linkBase.value) {
    $message.warning('请输入链接模板');
    return;
  }

  switch (mode.value) {
    case 'as':
      linkResult.value = generateSeq('as');
      break;
    case 'ps':
      linkResult.value = generateSeq('ps');
      break;
    case 'lc':
      linkResult.value = generateLetter();
      break;
    default:
      break;
  }

}

/**
 * @description 生成数列
 * @param {string} type 类型（as - 等差数列，ps - 等比数列）
 */
function generateSeq(type) {

  let linkBaseVal = linkBase.value;

  if (!linkBaseVal) {
    return '';
  }

  let data = modes[type];

  if (!data) {
    return '';
  }

  let nFirst = data.first;
  let nCount = data.count;
  let nDiff = data.diff;

  let nResult = {
    digits: 0,   // 最大位数
    numbers: [], // 生成的数值
  };

  let links = [];

  // 等差数列公式
  let expAS = (i) => {
    return (nFirst + (i - 1) * nDiff);
  };

  // 等比数列公式
  let expPS = (i) => {
    return (nFirst * Math.pow(nDiff, (i - 1)));
  };

  // 实际使用的公式
  let exp = (type === 'as' ? expAS : expPS);

  // 生成数值
  for (let i = 1; i <= nCount; i++) {

    // 等差数列 / 等比数列
    let n = exp(i);
    let digits = Math.abs(n).toString().length;

    (digits > nResult.digits) && (nResult.digits = digits);
    nResult.numbers.push(n);

  }

  // 补零
  if (data.zero) {

    let digits = nResult.digits;
    let base = Math.pow(10, digits);
    let numbers = nResult.numbers;

    for (let i = 0; i < numbers.length; i++) {
      let n = numbers[i];
      if (n >= 0) {
        numbers[i] = (n / base).toFixed(digits).substr(2);
      } else {
        numbers[i] = '-' + (n / base).toFixed(digits).substr(3);
      }
    }

  }

  // 倒序
  if (data.reverse) {
    nResult.numbers.reverse();
  }

  // 生成链接
  nResult.numbers.forEach((n) => {
    links.push(linkBaseVal.replace(linkRegExp, n));
  });

  return links.join('\n');

}

/**
 * @description 生成字母变化链接
 * @returns {string} 生成结果
 */
function generateLetter() {

  let linkBaseVal = linkBase.value;

  if (!linkBaseVal) {
    return '';
  }

  let data = modes.lc;

  // 编码数值
  let cStart = data.start.charCodeAt(0);
  let cEnd = data.end.charCodeAt(0);

  let chars = [];
  let links = [];

  // 生成字母
  if (cStart >= 65 && cStart <= 122 && cEnd >= 65 && cEnd <= 122) {
    if (cStart < cEnd) {
      for (let i = cStart; i <= cEnd; i++) {
        // 跳过符号 [ \ ] ^ _ `
        if (i >= 91 && i <= 96) {
          continue;
        }
        chars.push(String.fromCharCode(i));
      }
    } else if (cStart > cEnd) {
      $message.warning('字母先后顺序有误。注意：大写字母需要在前。');
      return '';
    } else if (cStart === cEnd) {
      $message.warning('仅有 1 条链接，无需生成。');
      return '';
    } else {
      $message.error('未知错误。');
      return '';
    }
  } else {
    $message.warning('输入有误，请检查字母范围。');
    return '';
  }

  // 倒序
  if (data.reverse) {
    chars.reverse();
  }

  // 生成链接
  chars.forEach((c) => {
    links.push(linkBaseVal.replace(linkRegExp, c));
  });

  return links.join('\n');

}

/** 处理复制结果 */
function handleCopy() {
  if (clipboard.isSupported) {
    return clipboard.copy(linkResult.value).then(() => {
      $message.success('复制成功');
    }).catch((error) => {
      console.error('复制失败：');
      console.error(error);
      $message.error('复制失败：异常');
    });
  } else {
    $message.error('复制失败：当前浏览器不支持该操作');
    return Promise.resolve();
  }
}

/** 处理清空结果 */
function handleClear() {
  linkResult.value = '';
}
</script>

<style lang="less" scoped>
.tool-detail-page {
  :deep(.n-input-number) {
    width: 8em;
  }

  :deep(.n-input) {
    max-width: 48em;
  }

  :deep(.n-input--textarea) {
    max-width: 48em;
    font-family: monospace;
  }

  .mode-item {
    padding: 12px 0;
    border-bottom: 1px solid #eee;

    &:last-child {
      border-bottom: none;
    }

    :deep(.n-form) {
      margin-left: 2em;
    }
  }
}
</style>
