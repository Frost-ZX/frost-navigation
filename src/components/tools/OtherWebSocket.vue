<template>
  <div class="tool-page">

    <!-- 操作 -->
    <div class="ctrl">
      <div class="title">操作</div>
      <!-- 按钮 -->
      <div class="content">
        <el-button
          type="success"
          :disabled="ws !== null"
          size="medium"
          plain
          @click="wsConnect()"
        >连接</el-button>
        <el-button
          type="warning"
          :disabled="ws === null"
          size="medium"
          plain
          @click="wsClose()"
        >断开</el-button>
        <el-button
          type="primary"
          :disabled="ws === null"
          size="medium"
          plain
          @click="wsSend()"
        >发送</el-button>
        <el-button
          type="danger"
          size="medium"
          plain
          @click="clearInputs()"
        >清空输入</el-button>
        <el-button
          type="danger"
          size="medium"
          plain
          @click="clearMessages()"
        >清空消息</el-button>
      </div>
    </div>

    <!-- 输入 -->
    <div class="inputs">
      <div class="title">输入</div>
      <div class="content">
        <div class="input-address">
          <div class="title">连接地址</div>
          <el-input v-model="address.suffix">
            <el-select slot="prepend" v-model="address.prefix">
              <el-option label="ws://" value="ws://"></el-option>
              <el-option label="wss://" value="wss://"></el-option>
            </el-select>
          </el-input>
        </div>
        <div class="input-send">
          <div class="title">发送内容</div>
          <el-input
            v-model="inputs"
            type="textarea"
            placeholder="在此处输入要发送的内容（换行符会被移除）"
            :rows="2"
          ></el-input>
        </div>
      </div>
    </div>

    <!-- 日志 -->
    <div class="logs">
      <div class="title">日志</div>
      <div ref="logsContent" class="content" :style="{ height: (logsHeight + 'rem') }">
        <div class="messages">
          <div v-for="item in messages" :key="item.id" class="item">
            <!-- 时间 -->
            <el-tag
              :type="item.type === 'send' ? 'primary' : 'success'"
              effect="plain"
              size="small"
            >{{ item.time | tsToTime }}</el-tag>
            <!-- 消息内容 -->
            <span v-if="parseType === 'html'" v-html="item.message"></span>
            <span v-else>{{ item.message }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 设置 -->
    <div class="config">
      <div class="title">设置</div>
      <div class="content">

        <!-- 日志高度 -->
        <div class="config-item">
          <div class="title">日志高度</div>
          <el-input-number
            v-model="logsHeight"
            size="medium"
            :min="5"
            :max="50"
            :step="1"
            step-strictly
          ></el-input-number>
        </div>

        <!-- 解析类型 -->
        <div class="config-item">
          <div class="title">解析类型</div>
          <el-radio-group v-model="parseType" size="medium">
            <el-radio-button
              v-for="item in parseTypes"
              :key="item.name"
              :label="item.name"
            >{{ item.label }}</el-radio-button>
          </el-radio-group>
        </div>

        <!-- 自动滚动 -->
        <div class="config-item">
          <div class="title">自动滚动</div>
          <el-radio-group v-model="autoScroll" size="medium">
            <el-radio-button :label="true">开启</el-radio-button>
            <el-radio-button :label="false">关闭</el-radio-button>
          </el-radio-group>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'OtherWebSocket',
  filters: {

    // 时间戳转时间字符串
    tsToTime(ts) {
      const date = new Date(ts);
      const time = {
        h: date.getHours(),
        m: date.getMinutes(),
        s: date.getSeconds(),
      };

      // 补零
      for (let key in time) {
        (time[key] < 10) && (time[key] = `0${time[key]}`);
      }

      return `${time.h}:${time.m}:${time.s}`;
    },

  },
  data() {
    return {
      // 地址
      address: {
        prefix: 'ws://',
        suffix: '',
      },
      // 自动滚动结果
      autoScroll: true,
      // 发生内容
      inputs: '',
      // 日志高度
      logsHeight: 20,
      // 接收内容
      messages: [],
      // 消息ID
      messageID: 0,
      // 消息解析类型
      parseType: 'string',
      parseTypes: [
        { name: 'html', label: 'HTML' },
        { name: 'json', label: 'JSON' },
        { name: 'string', label: '字符串' },
      ],
      // WebSocket 对象
      ws: null,
    }
  },
  mounted() {
    this.init();
  },
  beforeDestroy () {
    this.wsClose();
  },
  methods: {

    /**
     * 初始化
     */
    init() {
      // 检测兼容性
      if (typeof WebSocket === 'undefined') {
        this.notify({
          duration: 0,
          message: '您的浏览器不支持 WebSocket。',
          title: '错误',
          type: 'error',
        });
      }
    },

    /**
     * 清空输入
     */
    clearInputs() {
      const msg = '确定要清空输入内容吗？';
      this.$confirm(msg, '确认', {
        type: 'warning',
      }).then(() => {
        this.inputs = '';
      }).catch(() => { });
    },

    /**
     * 清空消息
     */
    clearMessages() {
      const msg = '确定要清空消息内容吗？';
      this.$confirm(msg, '确认', {
        type: 'warning',
      }).then(() => {
        this.messages = [];
        this.messageID = 0;
      }).catch(() => { });
    },

    /**
     * 提示信息
     * 
     * @param {object} options 配置选项
     */
    notify(options) {
      const defaults = {
        duration: 5000,
        message: '',
        title: '提示',
        type: 'info',
      };
      this.$notify({
        ...defaults,
        ...options,
      });
    },

    /**
     * 处理 WebSocket 关闭
     */
    handleClose() {
      this.notify({
        message: 'WebSocket 已关闭',
        type: 'warning',
      });
      this.ws = null;
    },

    /**
     * 处理 WebSocket 错误
     */
    handleError() {
      this.notify({
        message: 'WebSocket 发生错误',
        type: 'error',
      });
    },

    /**
     * 处理 WebSocket 消息
     */
    handleMessage(ev) {
      const msg = ev.data;
      const el = this.$refs['logsContent'];

      if (!msg) {
        return;
      }

      const parsed = this.wsParse(msg);
      const result = (parsed || msg)

      console.log('%c%s', 'color: #2196F3;', '[接收]', (parsed || result));

      // 记录消息
      this.messageID += 1;
      this.messages.push({
        id: this.messageID,
        message: msg,
        time: (new Date().getTime()),
        type: 'receive',
      });

      // 自动滚动
      this.$nextTick(() => {
        if (el && this.autoScroll) {
          el.scrollTo(0, el.scrollHeight)
        }
      });
    },

    /**
     * 处理 WebSocket 打开
     */
    handleOpen() {
      this.notify({
        message: 'WebSocket 已连接',
        type: 'info',
      });
    },

    /**
     * 断开连接
     */
    wsClose() {
      const ws = this.ws;
      ws && ws.close();
    },

    /**
     * 连接
     */
    wsConnect() {
      const data = this.address;
      const address = (data.prefix + data.suffix);
      
      try {
        const ws = new WebSocket(address);

        // 监听
        ws.addEventListener('close', this.handleClose);
        ws.addEventListener('error', this.handleError);
        ws.addEventListener('message', this.handleMessage);
        ws.addEventListener('open', this.handleOpen);

        // 保存
        this.ws = ws;
      } catch (error) {
        this.notify({
          duration: 10000,
          message: error.toString(),
          title: '错误',
          type: 'error',
        });
      }
    },

    /**
     * 解析消息
     * 
     * @param {string} msg 消息文本
     * @returns {(null|object|string)} 成功则返回解析后的消息，否则返回 null
     */
    wsParse(msg = '') {
      const type = this.parseType;

      if (type === 'json') {

        // JSON
        try {
          const json = JSON.parse(msg);
          return json;
        } catch (error) {
          this.notify({
            message: error.toString(),
            title: 'JSON 格式错误',
            type: 'warning',
          });
          return null;
        }

      } else {

        // 默认不处理
        return msg;

      }
    },

    /**
     * 发送消息
     */
    wsSend() {
      const ws = this.ws;
      const msg = this.inputs.replace(/(\n|\r)/g, '');
      const parsed = this.wsParse(msg);

      if (ws && parsed) {
        console.log('%c%s', 'color: #4CAF50;', '[发送]', parsed);
        ws.send(msg);
        this.messageID += 1;
        this.messages.push({
          id: this.messageID,
          message: msg,
          time: (new Date().getTime()),
          type: 'send',
        });
      }
    },

  },
}
</script>

<style lang="less" scoped>
/deep/ .el-button {
  margin: 0.25rem !important;
}

/deep/ .el-input {
  .el-input-group__prepend {
    background-color: #fff;
  }

  .el-select {
    width: 6rem;
  }
}

.content .title {
  margin: 1rem 0;
}

.logs {
  .content {
    padding: 0.5rem 1rem;
    border: 0.1rem solid #CCC;
    border-radius: 0.25rem;
    background-color: #FFF;
    line-height: 1.6em;
    overflow-y: auto;
    user-select: text;
  }

  .item {
    margin: 0.5rem 0;
    word-break: break-all;
  }

  .el-tag {
    margin-right: 0.5em;
  }
}
</style>
