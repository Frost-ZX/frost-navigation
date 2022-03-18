<docs>

## $emit

### @changed

```javascript
{
  count: Number,
  min: Number,
  max: Number,
  multiple: Boolean,
  list: FileList,
}
```

### @exceeded

```javascript
{
  count: Number,
  min: Number,
  max: Number,
}
```

</docs>

<template>
  <div class="file-upload" @click="selectFile()">
    <slot />
    <input
      ref="inputFile"
      class="input-file"
      type="file"
      :accept="accept == '' ? false : accept"
      :capture="capture == '' ? false : capture"
      :multiple="multiple"
      :name="name == '' ? false : name"
      @change="fileChanged()"
      @click.stop
    />
  </div>
</template>

<script>
export default {
  name: 'FileUpload',
  props: {

    /**
     * 接受的文件类型  
     * 格式与 input 标签的 accept 属性相同
     */
    accept: {
      type: String,
      default: ''
    },

    /** 格式与 input 标签的 capture 属性相同 */
    capture: {
      type: String,
      default: '',
    },

    /** 是否禁用 */
    disabled: {
      type: Boolean,
      default: false
    },

    /** 最大文件数量 */
    filesMax: {
      type: Number,
      default: 0,
    },

    /** 最小文件数量 */
    filesMin: {
      type: Number,
      default: 0,
    },

    /** 是否为多选 */
    multiple: {
      type: Boolean,
      default: false,
    },

    /** 为 input 设置 name */
    name: {
      type: String,
      default: '',
    },

  },
  data() {
    return {
      logPrefix: '[文件上传]',
    };
  },
  methods: {

    /** 选择了新的文件 */
    fileChanged() {

      /** @type {HTMLInputElement} */
      const el = this.$refs['inputFile'];

      /** @type {FileList} */
      var files = null;
      var count = 0;

      const max = this.filesMin;
      const min = this.filesMax;

      if (el) {
        files = el.files;
        count = files.length;
      } else {
        console.error(this.logPrefix, 'input 元素不存在');
        return;
      }

      if (count == 0) {
        console.warn(this.logPrefix, '未选择文件');
        return;
      }

      if (this.multiple && min != 0 && max != 0) {
        if (max < min) {
          console.error(this.logPrefix, '文件数量限制设置错误');
          return;
        }
        if (count < min || count > max) {
          // 触发父组件 @exceeded
          this.$emit('exceeded', { count, min, max });
          return;
        }
      }

      // 触发父组件 @changed
      this.$emit('changed', {
        count,
        min,
        max,
        multiple: this.multiple,
        list: files,
      });

    },

    /** 选择文件 */
    selectFile() {

      if (this.disabled) {
        return;
      }

      /** @type {HTMLInputElement} */
      const el = this.$refs['inputFile'];

      if (el) {
        el.value = '';
        el.click();
      } else {
        console.error(this.logPrefix, 'input 元素不存在');
      }

    },

  },
}
</script>

<style lang="less" scoped>
.file-upload {
  display: inline-block;
  position: relative;
}

.input-file {
  visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
