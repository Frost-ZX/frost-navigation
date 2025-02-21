<template>
  <div class="tool-detail-page">

    <!-- 解析二维码 -->
    <n-card size="small" title="解析二维码">
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
    <n-card v-if="false" size="small" title="生成二维码">
      <n-form
        class="form-no-feedback"
        label-align="right"
        label-placement="top"
        label-width="auto"
      ></n-form>
    </n-card>

  </div>
</template>

<script setup>
import {
  NCard, NFlex, NForm, NFormItem,
  NImage, NLi, NOl,
  NUpload, NUploadDragger,
} from 'naive-ui';

import {
  reactive,
} from 'vue';

import {
  $message,
} from '@/assets/js/naive-ui';

import {
  readQrCodeImage,
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

// /** 二维码生成相关数据 */
// const writerData = reactive({
// });

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
</style>
