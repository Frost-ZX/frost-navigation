<template>
  <div class="tool-detail-page">

    <!-- 解析二维码 -->
    <n-card size="small" title="解析二维码">
      <template #header-extra>
        <n-button
          type="error"
          :disabled="!readerData.dataURL"
          :text="true"
          @click="handleClearReader"
        >清空</n-button>
      </template>
      <n-form
        class="form-no-feedback"
        label-align="left"
        label-placement="top"
        label-width="auto"
      >

        <n-form-item label="选择图片">
          <n-upload
            accept="image/jpeg,image/png"
            :default-upload="false"
            :file-list="readerData.fileList"
            :show-file-list="false"
            @change="handleSelectQrImage"
          >
            <n-upload-dragger>
              <span>点击选择图片 / 拖拽图片到此区域</span>
            </n-upload-dragger>
          </n-upload>
        </n-form-item>

        <n-form-item label="解析结果">
          <n-flex
            class="reader-result"
            :wrap="true"
          >
            <div class="reader-result__image-preview">
              <n-image
                v-show="readerData.dataURL"
                object-fit="contain"
                width="100%"
                height="100%"
                :preview-disabled="true"
                :src="readerData.dataURL"
              />
            </div>
            <n-flex
              class="reader-result__text-list"
              :vertical="true"
            >
              <n-ol v-if="readerData.results.length > 0">
                <n-li
                  v-for="(value, index) in readerData.results"
                  :key="index"
                >{{ value }}</n-li>
              </n-ol>
              <span v-else>请选择二维码图片以进行解析</span>
            </n-flex>
          </n-flex>
        </n-form-item>

      </n-form>
    </n-card>

    <!-- 生成二维码 -->
    <n-card size="small" title="生成二维码">
      <template #header-extra>
        <n-flex>
          <n-button
            type="primary"
            :disabled="!writerData.content"
            :text="true"
            @click="handleGenerateQrCode"
          >生成</n-button>
          <n-button
            type="primary"
            :disabled="!writerData.dataURL"
            :text="true"
            @click="handleDownloadQrCode"
          >下载</n-button>
          <n-button
            type="error"
            :disabled="!writerData.dataURL"
            :text="true"
            @click="handleClearWriter"
          >清空</n-button>
        </n-flex>
      </template>
      <n-form
        class="form-no-feedback writer-config"
        label-align="left"
        label-placement="top"
        label-width="auto"
      >

        <n-form-item label="文本内容">
          <n-input
            v-model:value="writerData.content"
            placeholder="请输入需要生成的二维码文本内容"
            type="textarea"
            :rows="4"
          ></n-input>
        </n-form-item>

        <n-form-item label="分辨率">
          <n-flex align="center">
            <n-input-number
              v-model:value="writerData.resolution"
              :min="64"
              :max="8192"
              :step="1"
            ></n-input-number>
            <span>px</span>
          </n-flex>
        </n-form-item>

        <n-form-item label="颜色">
          <n-flex align="center">
            <span>前景颜色：</span>
            <n-color-picker
              v-model:value="writerData.colorForeground"
              :modes="['hex']"
              :show-alpha="true"
              :show-preview="true"
              :swatches="['#00000000', '#000000FF', '#FFFFFFFF']"
            />
            <span>背景颜色：</span>
            <n-color-picker
              v-model:value="writerData.colorBackground"
              :modes="['hex']"
              :show-alpha="true"
              :show-preview="true"
              :swatches="['#00000000', '#000000FF', '#FFFFFFFF']"
            />
          </n-flex>
        </n-form-item>

        <n-form-item label="二维码预览">
          <div class="writer-preview">
            <div class="writer-preview__wrapper">
              <n-image
                v-show="writerData.dataURL"
                object-fit="contain"
                width="100%"
                height="100%"
                :preview-disabled="true"
                :src="writerData.dataURL"
              />
            </div>
          </div>
        </n-form-item>

      </n-form>
    </n-card>

  </div>
</template>

<script setup>
import {
  NButton, NCard, NColorPicker, NFlex,
  NForm, NFormItem, NInput, NInputNumber,
  NImage, NLi, NOl, NUpload, NUploadDragger,
} from 'naive-ui';

import {
  reactive,
} from 'vue';

import {
  $message,
} from '@/assets/js/naive-ui';

import {
  readQrCodeImage, writeQrCodeImage,
} from '@/assets/js/qr-code';

/** 二维码解析相关数据 */
const readerData = reactive({

  /** 图片 DataURL */
  dataURL: '',

  /** 选择文件列表 */
  fileList: [],

  /** 解析结果 */
  results: [],

});

/** 二维码生成相关数据 */
const writerData = reactive({

  /** 背景颜色 */
  colorBackground: '#FFFFFF',

  /** 前景颜色 */
  colorForeground: '#000000',

  /** 文本内容 */
  content: '',

  /** 图片 DataURL */
  dataURL: '',

  /** 分辨率 */
  resolution: 256,

});

/** 清空信息 */
function handleClearReader() {
  readerData.dataURL = '';
  readerData.results = [];
}

/** 清空信息 */
function handleClearWriter() {
  writerData.content = '';
  writerData.dataURL = '';
  writerData.resolution = 256;
}

/** 处理下载二维码 */
function handleDownloadQrCode() {

  let url = writerData.dataURL;
  let element = document.createElement('a');

  if (url) {
    element.download = '二维码.png';
    element.href = url;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

}

/** 处理生成二维码 */
function handleGenerateQrCode() {
  return writeQrCodeImage({
    content: writerData.content,
    background: writerData.colorBackground,
    foreground: writerData.colorForeground,
    width: writerData.resolution,
    height: writerData.resolution,
  }).then((dataURL) => {

    if (dataURL) {
      $message.success('生成二维码成功');
    } else {
      $message.error('生成二维码失败');
    }

    writerData.dataURL = dataURL;

  });
}

/**
 * @description 处理选择图片
 * @type { import('naive-ui').UploadOnChange }
 */
function handleSelectQrImage(options) {

  let file = options.file.file;

  return readQrCodeImage(file).then((result) => {

    let { error, image, textList } = result;

    if (error) {
      $message.error(error);
      readerData.dataURL = '';
      readerData.results = [];
    } else {
      if (textList.length === 0) {
        $message.warning('未识别到有效的二维码');
      } else {
        $message.success('识别成功');
      }
      readerData.dataURL = image;
      readerData.results = textList;
    }

  });

}
</script>

<style lang="less" scoped>
.reader-result {
  width: 100%;

  .reader-result__image-preview {
    display: flex;
    padding: 16px;
    width: 256px;
    height: 256px;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);

    .n-image {
      margin: auto;
    }
  }

  .reader-result__text-list {
    flex-grow: 1;
    min-width: 256px;
    width: 0;
    user-select: text;
  }
}

.writer-config {
  .n-color-picker {
    width: 128px;
  }
}

.writer-preview {
  width: 100%;

  .writer-preview__wrapper {
    display: flex;
    width: 256px;
    height: 256px;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);

    .n-image {
      margin: auto;
      image-rendering: pixelated;
    }
  }
}
</style>
