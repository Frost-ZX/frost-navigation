<docs>

- [DataGridXL](https://www.datagridxl.com/)
- [@datagridxl/datagridxl2](https://www.npmjs.com/package/@datagridxl/datagridxl2)
- [Papa Parse](https://www.papaparse.com/)
- [papaparse](https://www.npmjs.com/package/papaparse)
- [@types/papaparse](https://www.npmjs.com/package/@types/papaparse)

</docs>

<template>
  <div class="tool-page">

    <div class="actions">
      <div class="title">打开 / 保存</div>
      <div class="content">

        <file-upload accept=".csv" @changed="importCSV">
          <el-button
            type="success"
            size="small"
            plain
          >打开 CSV</el-button>
        </file-upload>

        <el-button
          type="success"
          size="small"
          plain
          @click="exportCSV()"
        >保存 CSV</el-button>

        <el-button
          type="primary"
          size="small"
          plain
          @click="initExample()"
        >示例数据</el-button>

        <el-button
          type="danger"
          size="small"
          plain
          @click="reset(false)"
        >初始化</el-button>

        <el-button
          type="danger"
          size="small"
          plain
          @click="reset(true)"
        >清空数据</el-button>

      </div>
    </div>

    <div class="actions">
      <div class="title">操作</div>
      <div class="content">

        <el-button
          type="success"
          size="small"
          plain
          @click="actionUndo()"
        >撤销</el-button>
        <el-button
          type="success"
          size="small"
          plain
          @click="actionRedo()"
        >还原</el-button>

        <el-button
          type="success"
          size="small"
          plain
          @click="insertEmptyRows()"
        >插入新行</el-button>
        <el-button
          type="success"
          size="small"
          plain
          @click="insertEmptyCols()"
        >插入新列</el-button>

      </div>
    </div>

    <div class="editor">
      <div class="title">编辑区</div>
      <div class="content">
        <div
          ref="dgxl"
          class="grid"
          :style="{ height: `${editorHeight}rem` }"
        ></div>
      </div>
    </div>

    <div class="config">
      <div class="title">设置</div>
      <div class="content">

        <div class="config-item">
          <div class="title">编辑区高度</div>
          <el-input-number
            v-model="editorHeight"
            size="medium"
            :min="15"
            :max="50"
            :step="1"
            step-strictly
          ></el-input-number>
        </div>

      </div>
    </div>

    <div class="credits">
      <div class="title">Credits</div>
      <div class="content">
        <div class="link-item">
          <el-link
            type="success"
            target="_blank"
            href="https://www.datagridxl.com/"
          >DataGridXL - 数据表格</el-link>
        </div>
        <div class="link-item">
          <el-link
            type="success"
            target="_blank"
            href="https://www.papaparse.com/"
          >Papa Parse - CSV 数据解析库</el-link>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import DataGridXL from '@datagridxl/datagridxl2';
import Papa from 'papaparse';

import FileUpload from '@/components/FileUpload.vue';

// https://www.datagridxl.com/docs/localization
const gridLocale = {

    'Copy'                      : '复制',
    'Cut'                       : '剪切',
    'Paste'                     : '粘贴',

    'Delete Row(s)'             : '删除行',
    'Hide Row'                  : '隐藏行',
    'Hide $n Rows'              : '隐藏 $n 列',
    'Insert Row (up)'           : '插入行（上方）',
    'Insert Row (down)'         : '插入行（下方）',
    'Insert $n Rows (up)'       : '插入 $n 行（上方）',
    'Insert $n Rows (down)'     : '插入 $n 行（下方）',

    'Delete Column(s)'          : '删除列',
    'Hide Column'               : '隐藏列',
    'Hide $n Columns'           : '隐藏 $n 列',
    'Insert Column (left)'      : '插入列（左侧）',
    'Insert Column (right)'     : '插入列（右侧）',
    'Insert $n Columns (left)'  : '插入 $n 列（左侧）',
    'Insert $n Columns (right)' : '插入 $n 列（右侧）',

    'Deselect'                  : '取消选择',
    'Search'                    : '搜索',
    'Sort A to Z'               : '从 A 到 Z 排序',
    'Sort Z to A'               : '从 Z 到 A 排序',
    '$n from $total'            : '总数 $total 中的 $n',

    'Paste not available.': '粘贴不可用。',
    'Cannot delete all columns.': '部分列无法删除。',
    'Cannot delete all rows.': '部分行无法删除。',
    'Cannot hide all columns.': '部分列无法隐藏。',
    'Cannot hide all rows.': '部分行无法隐藏。',
    'Cannot delete all non-frozen columns.': '无法删除冻结的列。',
    'Cannot delete all non-frozen rows.': '无法删除冻结的行',
    'Cannot move columns in or out of the frozen section. Try turning off frozen columns first.': '无法将列移入或移出冻结的区域。',
    'Cannot move rows in or out of the frozen section. Try turning off frozen rows first.': '无法将行移入或移出冻结的区域。',

};

// https://www.datagridxl.com/docs/themes
const gridTheme = {

  // Header
  'header'                    : '#F8F9FA',
  'header|text'               : '#000000',
  'header:highlight'          : '#E8EAED',
  'header:selected'           : '#2196F3',
  'header:selected|text'      : '#FFFFFF',
  'header-icon'               : '#000000',

};

export default {
  name: 'EditCSV',
  components: {
    FileUpload,
  },
  data() {
    return {

      editorHeight: 25,
      gridInstance: null,

    }
  },
  mounted () {
    this.initGrid();
  },
  methods: {

    /**
     * @description 初始化表格
     * @param {object} [config] 配置选项
     * @param {number[][]|string[][]} [config.datas] 初始数据
     * @param {number} [config.rows] 初始行数
     * @param {number} [config.cols] 初始列数
     */
    initGrid(config = {}) {

      const el = this.$refs['dgxl'];

      if (!el) {
        console.error('初始化失败，元素不存在！');
        return;
      }

      const {
        datas = null,
        rows = 5,
        cols = 5,
      } = config;

      // https://www.datagridxl.com/docs/passing-data
      const data = (datas || DataGridXL.createEmptyData(rows, cols));

      const options = {
        data,
        fontFamily: 'sans-serif',
        fontSize: 14,
        locale: gridLocale,
        theme: gridTheme,
      };

      const instance = new DataGridXL(el, options);

      this.gridInstance = instance;

    },

    /** 初始化示例数据 */
    initExample() {

      const csvStr = 'a,b,c,d,e\n1,2,3,4,5\n10,20,30,40,50\n"","","","",""';
      const parsed = Papa.parse(csvStr);
      const msg = '是否载入示例数据？';

      this.$confirm(msg).then(() => {
        this.initGrid({
          datas: parsed.data,
        });
      }).catch(() => {});

    },

    /**
     * @description 调用 DataGridXL 实例的方法
     * @param {string} methodName 方法名称
     * @param {array} params 调用时传递的参数
     * @returns {boolean} 成功时返回 true，失败时返回 false
     */
    callGrid(methodName = '', params = []) {
      const { gridInstance: instance } = this;

      if (instance && instance[methodName]) {
        instance[methodName](...params);
      } else {
        console.error('DataGridXL 实例不存在。');
        return false;
      }
    },

    /** 还原 */
    actionRedo() {
      this.callGrid('redo');
    },

    /** 撤销 */
    actionUndo() {
      this.callGrid('undo');
    },

    /** 清空数据 */
    clearCellValues() {

      const { gridInstance: instance } = this;

      if (instance) {
        const data = instance.getData();
        const start = {
          x: 0,
          y: 0,
        };
        const end = {
          x: (data[0].length -1), // 列
          y: (data.length - 1),   // 行
        };

        instance.clearCellValues([start, end]);
      }

    },

    /** 保存 CSV */
    exportCSV() {
      this.callGrid('downloadDataAsCSV');
    },

    /** 打开 CSV */
    importCSV(datas) {

      const files = datas.list;

      if (!(files && files.constructor === FileList)) {
        return;
      }

      if (files.length > 0) {
        Papa.parse(files[0], {
          complete: (results) => {

            this.$message({
              duration: 3000,
              message: '文件解析成功。',
              type: 'success',
            });
            this.initGrid({ datas: results.data });

          },
          error: (error) => {

            this.$message({
              duration: 3000,
              message: '文件解析失败！',
              type: 'error',
            });
            console.error('[文件解析失败]', error);

          },
        });
      }

    },

    insertEmptyCols() {
      this.callGrid('insertEmptyCols');
    },

    insertEmptyRows() {
      this.callGrid('insertEmptyRows');
    },

    /**
     * @description 重置数据
     * @param {boolean} isClean 是否为清除，否则为初始化
     */
    reset(isClean = false) {

      const msg = (
        isClean ? '是否清空表格数据？' : '是否重置为初始状态？'
      );

      this.$confirm(msg).then(() => {
        if (isClean) {
          this.clearCellValues();
        } else {
          this.initGrid();
        }
      }).catch(() => {});

    },

  },
}
</script>

<style lang="less" scoped>
.actions .content > * {
  margin: 0 0.25em;
}

.editor {
  width: 100%;
  height: auto;

  ::-webkit-scrollbar-track {
    background-color: #FFF;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 0;
  }

  .grid {
    width: 100%;
    height: 25rem;
    border: 0.125rem solid #2196f3;
    border-radius: 0.375rem;
  }

  /deep/ button {
    border: none !important;
    background-color: @colorPrimary !important;
    background-image: none !important;

    svg {
      fill: #FFF !important;
    }
  }

  /deep/ .dgxl-inputInfo {
    padding: 0.25em;
    z-index: 10;
    background-color: #FFF;
    line-height: 1;
  }

  /deep/ .dgxl-inputWrapper {
    border-color: #CCC !important;

    &.dgxl-hasFocus {
      box-shadow: none !important;
      border-color: @colorPrimary !important;

      .dgxl-inputInfo {
        display: none !important;
      }
    }
  }

  /deep/ .dgxl-part-credits {
    display: none !important;
  }
}

.config .config-item {
  > div {
    display: inline-block;
  }

  .title {
    margin-right: 0.5em;
  }
}
</style>
