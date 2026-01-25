<template>
  <div class="tool-detail-page">

    <!-- 文件选择 -->
    <n-card size="small" title="文件选择">
      <div class="file-description">
        <p>支持格式：PNG、JPEG、GIF、BMP</p>
        <p>建议图片大小：小于 8MB</p>
        <p>建议图片比例：1:1（正方形）</p>
      </div>
      <n-upload
        :max="1"
        :on-before-upload="handleFileSelect"
        :on-error="handleFileError"
        :on-remove="handleFileRemove"
        :show-file-list="false">
        <n-button type="primary">选择文件</n-button>
      </n-upload>
      <div class="file-status">
        <span>已选择文件：</span>
        <span v-if="formInfo.selectedFile">{{ formInfo.selectedFile.name }}</span>
        <span v-else>无</span>
      </div>
    </n-card>

    <!-- 分辨率配置 -->
    <n-card size="small" title="分辨率配置">
      <div class="section-description">
        <p>一个 ICO 文件可以存储多种分辨率的图像。</p>
      </div>
      <div class="selection-items">
        <p class="senection-item">
          <n-checkbox
            v-model:checked="formInfo.sizes[16]"
          >16px</n-checkbox>
        </p>
        <p class="senection-item">
          <n-checkbox
            v-model:checked="formInfo.sizes[32]"
          >32px</n-checkbox>
        </p>
        <p class="senection-item">
          <n-checkbox
            v-model:checked="formInfo.sizes[48]"
          >48px</n-checkbox>
        </p>
        <p class="senection-item">
          <n-checkbox
            v-model:checked="formInfo.sizes[64]"
          >64px</n-checkbox>
        </p>
        <p class="senection-item">
          <n-checkbox
            v-model:checked="formInfo.sizes[128]"
          >128px</n-checkbox>
        </p>
        <p class="senection-item">
          <n-checkbox
            v-model:checked="formInfo.sizes[256]"
          >256px（仅 32 位深度支持）</n-checkbox>
        </p>
      </div>
    </n-card>

    <!-- 位深度配置 -->
    <n-card size="small" title="位深度配置">
      <n-radio-group v-model:value="formInfo.bitDepth">
        <p>
          <n-radio :value="8">8 位（256 色，调色板）</n-radio>
        </p>
        <p>
          <n-radio :value="32">32 位（1670 万色 & 透明度）</n-radio>
        </p>
      </n-radio-group>
    </n-card>

    <!-- 操作 -->
    <n-card size="small" title="操作">
      <n-flex>
        <n-button
          size="large"
          type="primary"
          @click="handleConvert"
        >转换为 ICO 图标</n-button>
      </n-flex>
    </n-card>

  </div>
</template>

<script setup>
import {
  NButton, NCard, NFlex, NForm, NFormItem,
  NCheckbox, NRadio, NRadioGroup, NUpload,
} from 'naive-ui';

import {
  reactive,
} from 'vue';

import {
  $message, $notification,
} from '@/assets/js/naive-ui';

import {
  convertPNGtoICO,
} from '@/assets/js/png-to-ico';

/** 数据 */
const formInfo = reactive({

  /** 选择的文件 */
  selectedFile: null,

  /** 选择的分辨率 */
  sizes: {
    16: true,
    32: true,
    48: true,
    64: false,
    128: false,
    256: false
  },

  /** 选择的位深度 */
  bitDepth: 32,

});

/** 文件上传错误时的处理 */
function handleFileError() {
  $message.error('文件上传失败，请重试');
}

/** 文件选择时的处理 */
function handleFileSelect(uploadData) {
  formInfo.selectedFile = uploadData?.file?.file;
  // 返回 false 阻止自动上传（只需要获取文件对象）
  return false;
}

/** 文件移除时的处理 */
function handleFileRemove() {
  formInfo.selectedFile = null;
}

/** 转换按钮点击处理 */
function handleConvert() {

  if (!formInfo.selectedFile) {
    $message.warning('请先选择文件');
    return;
  }

  // 检查是否选择了至少一个分辨率
  let selectedSizes = Object.keys(formInfo.sizes).filter((size) => {
    return formInfo.sizes[size];
  }).map((value) => {
    return Number(value);
  });

  if (selectedSizes.length === 0) {
    $message.warning('请至少选择一个分辨率');
    return;
  }

  // 检查如果选择了 256 像素，是否位深度为 32 位
  if (formInfo.sizes[256] && formInfo.bitDepth !== 32) {
    $message.warning('256px 分辨率仅支持 32 位深度');
    return;
  }

  convertPNGtoICO(
    formInfo.selectedFile,
    selectedSizes,
    'icon.ico'
  ).then((result) => {

    console.log('转换结果', result);

    if (result.success) {
      $message.success('文件转换成功');
    } else {
      $message.error('文件转换失败');
    }

  });

}
</script>

<style lang="less" scoped>
.file-description {
  margin-bottom: 12px;
  color: #666;
  font-size: 14px;
  line-height: 1.4;
}

.file-status {
  margin-top: 12px;
  font-size: 14px;
  color: #666;
}

.section-description {
  margin-bottom: 16px;
  color: #666;
  font-size: 14px;
  line-height: 1.4;
}

:deep(.n-form-item) {
  margin-bottom: 8px;
}
</style>
