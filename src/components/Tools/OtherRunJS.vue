<template>
  <div class="tool-page">

    <!-- 输入 -->
    <div class="input">
      <div class="title">代码</div>
      <div class="text">
        <textarea ref="jsInput" placeholder="代码"></textarea>
      </div>
    </div>

    <!-- 操作 -->
    <div class="action">
      <div class="title">操作</div>
      <div class="btns">
        <el-button type="primary" @click="btnRun()">执行</el-button>
        <el-button type="danger" @click="btnClear()">清空</el-button>
      </div>
    </div>

    <!-- 输出 -->
    <div class="output">
      <div class="title">输出</div>
      <div class="text">
        <p
          v-for="line in output.lines"
          :key="line.id"
          :class="['line', line.type]"
        >{{ line.message }}</p>
      </div>
    </div>

  </div>
</template>

<script>
import CodeMirror from 'codemirror/lib/codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';

export default {
  name: 'OtherRunJS',
  data() {
    return {
      input: {
        editor: null,
        value: ''
      },
      output: {
        id: 0,
        lines: []
      }
    }
  },
  mounted () {
    this.init();
  },
  methods: {

    // 初始化
    init() {
      var jsInput = this.$refs['jsInput'];
      var datas = this.input;

      datas.editor = CodeMirror.fromTextArea(jsInput, {
        indentWithTabs: false,
        indentUnit: 4,
        lineNumbers: true,
        mode: 'javascript',
        theme: 'default'
      });

      datas.editor.setOption('extraKeys', {
        // Tab 转空格
        Tab: function(cm) {
          var spaces = Array(cm.getOption('indentUnit') + 1).join(' ');
          cm.replaceSelection(spaces);
        }
      });

      datas.editor.on('change', function (instance) {
        // 同步 value
        datas.value = instance.doc.getValue();
      });
    },

    // 运行
    btnRun() {
      var output = this.output;

      output.lines = [];

      try {

        window.eval(this.input.value);

      } catch (err) {

        let time = new Date();

        output.id += 1;
        output.lines.push({
          id: output.id + '_' + time.getTime(),
          message: err.message,
          stack: err.stack,
          type: 'error'
        });

      }
    },

    // 清空
    btnClear() {
      this.$confirm('确定要清空输入和输出的内容吗？', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        this.input.editor.doc.setValue('');
        this.output.lines = [];
        this.$message({
          message: '已清除',
          type: 'success'
        });

      }).catch(() => {

        this.$message({
          message: '取消清除',
          type: 'info'
        });

      });
    }

  },
}
</script>

<style lang="less" scoped>
.tool-page {
  @lineHeight: 1.25rem;

  padding-bottom: 5rem;

  > div {
    .text {
      line-height: @lineHeight;
      font-family: monospace;
      font-size: 0.8rem;
    }
  }

  .input {
    /deep/ .CodeMirror {
      width: 100%;
      height: calc(@lineHeight * 20 + 0.5rem);
      box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.1);
      line-height: @lineHeight;
    }
  }

  .output {
    .text {
      padding: 1rem;
      height: calc(@lineHeight * 10);
      border: 0.1rem solid #EEE;
      border-radius: 0.32rem;
      overflow: auto;
      user-select: text;
      resize: vertical;
    }

    .line {
      &.error {
        color: @colorRed;
      }
    }
  }
}
</style>
