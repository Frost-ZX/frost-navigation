<template>
  <div class="tool-page">

    <div class="notice">
      <div class="title">说明</div>
      <div class="content">
        <p>目前仅支持普通方块。</p>
        <p>已测试游戏版本：Minecraft 1.12.2</p>
      </div>
    </div>

    <div class="inputs">
      <div class="title">参数</div>
      <div class="content">

          <div class="content-row">
            <span class="row-label">Mod ID</span>
            <el-input
              v-model="inputs.modID"
              type="text"
              size="small"
              clearable
              required
            ></el-input>
          </div>
          <div class="content-row">
            <span class="row-label">注释</span>
            <el-input
              v-model="inputs.comment"
              type="text"
              size="small"
              clearable
            ></el-input>
          </div>
          <div class="content-row">
            <span class="row-label">方块 ID</span>
            <el-input
              v-model="inputs.blockID"
              type="text"
              size="small"
              placeholder="例：stone（不带命名空间）"
              clearable
              required
            ></el-input>
          </div>
          <div class="content-row">
            <span class="row-label">子方块</span>
            <el-input
              v-model="inputs.blockSubset"
              type="text"
              size="small"
              placeholder="范围：0 ~ 15，默认：0，可以使用 *"
              :minlength="0"
              :maxlength="1"
              clearable
            ></el-input>
          </div>
          <div class="content-row">
            <span class="row-label">透明方块</span>
            <el-checkbox v-model="inputs.isTransparent"></el-checkbox>
          </div>
          <div class="content-row">
            <span class="row-label">纹理 ID</span>
            <el-input
              v-model="inputs.textureID"
              type="text"
              size="small"
              placeholder="默认：与方块 ID 相同"
              clearable
            ></el-input>
          </div>
          <div class="content-row">
            <span class="row-label">纹理文件路径</span>
            <el-input
              v-model="inputs.textureFilePath"
              type="text"
              size="small"
              placeholder="例：assets/minecraft/textures/blocks/stone.png"
              clearable
              required
            ></el-input>
          </div>

      </div>
    </div>

    <div class="actions">
      <div class="title">操作</div>
      <div class="content">

        <div class="content-row">
          <el-button
            type="success"
            size="small"
            plain
            @click="addBlock()"
          >添加方块</el-button>
          <el-button
            type="warning"
            size="small"
            plain
            @click="historyCtrl('undo')"
          >撤销操作</el-button>
          <el-button
            type="warning"
            size="small"
            plain
            @click="historyCtrl('redo')"
          >还原操作</el-button>
        </div>
        <div class="content-row">
          <el-button
            type="danger"
            size="small"
            plain
            @click="clearResult()"
          >清除结果</el-button>
          <el-button
            type="primary"
            size="small"
            plain
            @click="mergeResult()"
          >合并结果</el-button>
          <el-button
            type="danger"
            size="small"
            plain
            @click="clearMerged()"
          >清除合并</el-button>
        </div>
        <div class="content-row">
          <el-button
            type="success"
            size="small"
            plain
            @click="saveResult()"
          >记录结果</el-button>
          <el-button
            type="primary"
            size="small"
            plain
            @click="loadSaves()"
          >载入记录</el-button>
          <el-button
            type="danger"
            size="small"
            plain
            @click="clearSaves()"
          >清除记录</el-button>
        </div>

      </div>
    </div>

    <div class="outputs">
      <div class="title">生成结果</div>
      <div class="content">

        <div class="content-row">
          <div class="row-title">
            <span>{{ inputs.modID || '*' }}-models.txt, </span>
            <span>{{ inputs.modID || '*' }}-texture.txt</span>
            <span> - modname</span>
          </div>
          <el-input
            v-model="outputs.modID"
            type="text"
            size="small"
            readonly
          ></el-input>
        </div>
        <div class="content-row">
          <div class="row-title">
            <span>{{ inputs.modID || '*' }}-models.txt - patch</span>
          </div>
          <el-input
            v-model="outputs.modelsPatch"
            type="textarea"
            :rows="10"
            readonly
          ></el-input>
        </div>

        <div class="content-row">
          <div class="row-title">
            <span>{{ inputs.modID || '*' }}-models.txt - patchblock</span>
          </div>
          <el-input
            v-model="outputs.modelsPatchBlock"
            class="part"
            type="textarea"
            :rows="10"
          ></el-input>
        </div>
        <div class="content-row">
          <div class="row-title">
            <span>{{ inputs.modID || '*' }}-texture.txt - texture</span>
          </div>
          <el-input
            v-model="outputs.textureTexture"
            class="part"
            type="textarea"
            :rows="10"
          ></el-input>
        </div>
        <div class="content-row">
          <div class="row-title">
            <span>{{ inputs.modID || '*' }}-texture.txt - block</span>
          </div>
          <el-input
            v-model="outputs.textureBlock"
            class="part"
            type="textarea"
            :rows="10"
          ></el-input>
        </div>

        <div class="content-row">
          <div class="row-title">
            <span>合并：{{ inputs.modID || '*' }}-models.txt</span>
          </div>
          <el-input
            v-model="outputs.mergedModels"
            class="merged"
            type="textarea"
            :rows="10"
            readonly=""
          ></el-input>
        </div>
        <div class="content-row">
          <div class="row-title">
            <span>合并：{{ inputs.modID || '*' }}-texture.txt</span>
          </div>
          <el-input
            v-model="outputs.mergedTexture"
            class="merged"
            type="textarea"
            :rows="10"
            readonly=""
          ></el-input>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'MinecraftDynmapRenderdataGen',
  data() {
    return {
      // 数据
      datas: {
        modelsPatch1: '',
        modelsPatch2: '',
      },
      // 输入
      inputs: {
        blockID: '',
        blockSubset: '',
        comment: '',
        isTransparent: false,
        modID: '',
        textureFilePath: '',
        textureID: '',
      },
      // 输出
      outputs: {
        modID: '',
        modelsPatch: '',
        modelsPatchBlock: '',
        textureTexture: '',
        textureBlock: '',
        mergedModels: '',
        mergedTexture: '',
      },
      // 结果历史记录
      historyIndex: 0,
      historyMax: 20,
      historyList: [],
    }
  },
  created() {
    this.initDatas();
  },
  methods: {

    /**
     * 初始化数据
     */
    initDatas() {
      const datas = this.datas;
      const outputs = this.outputs;

      // 正方体 6 个面的 patch
      datas.modelsPatch1 = 'patch:id=patch0,Ox=0.0,Oy=0.0,Oz=0.0,Ux=1.0,Uy=0.0,Uz=0.0,Vx=0.0,Vy=0.0,Vz=1.0,Umin=0.0,Umax=1.0,Vmin=0.0,Vmax=1.0,VmaxAtUMax=1.0,VminAtUMax=0.0,visibility=top\npatch:id=patch1,Ox=0.0,Oy=1.0,Oz=1.0,Ux=1.0,Uy=1.0,Uz=1.0,Vx=0.0,Vy=1.0,Vz=0.0,Umin=0.0,Umax=1.0,Vmin=0.0,Vmax=1.0,VmaxAtUMax=1.0,VminAtUMax=0.0,visibility=top\npatch:id=patch2,Ox=1.0,Oy=0.0,Oz=0.0,Ux=0.0,Uy=0.0,Uz=0.0,Vx=1.0,Vy=1.0,Vz=0.0,Umin=0.0,Umax=1.0,Vmin=0.0,Vmax=1.0,VmaxAtUMax=1.0,VminAtUMax=0.0,visibility=top\npatch:id=patch3,Ox=0.0,Oy=0.0,Oz=1.0,Ux=1.0,Uy=0.0,Uz=1.0,Vx=0.0,Vy=1.0,Vz=1.0,Umin=0.0,Umax=1.0,Vmin=0.0,Vmax=1.0,VmaxAtUMax=1.0,VminAtUMax=0.0,visibility=top\npatch:id=patch4,Ox=0.0,Oy=0.0,Oz=0.0,Ux=0.0,Uy=0.0,Uz=1.0,Vx=0.0,Vy=1.0,Vz=0.0,Umin=0.0,Umax=1.0,Vmin=0.0,Vmax=1.0,VmaxAtUMax=1.0,VminAtUMax=0.0,visibility=top\npatch:id=patch5,Ox=1.0,Oy=0.0,Oz=1.0,Ux=1.0,Uy=0.0,Uz=0.0,Vx=1.0,Vy=1.0,Vz=1.0,Umin=0.0,Umax=1.0,Vmin=0.0,Vmax=1.0,VmaxAtUMax=1.0,VminAtUMax=0.0,visibility=top';
      datas.modelsPatch2 = ',patch0=patch0,patch1=patch1,patch2=patch2,patch3=patch3,patch4=patch4,patch5=patch5';

      outputs.modelsPatch = datas.modelsPatch1;
    },

    /**
     * 确认对话框
     * 
     * @param {string} [msg] 提示内容
     * @param {Function} [fnConfirm] 确认后进行的操作1
     * @param {Function} [fnCancel] 取消后进行的操作
     */
    confirmDialog(msg = '', fnConfirm = null, fnCancel = null) {
      msg = (msg || '确定要进行此操作？');

      this.$confirm(msg, '确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        fnConfirm && fnConfirm();
      }).catch(() => {
        fnCancel && fnCancel();
      });
    },

    /**
     * 历史记录操作
     * 
     * @param {string} type 类型（record、redo、undo）
     */
    historyCtrl(type) {

      const {
        outputs,
        historyIndex: hIndex,
        historyMax: hMax,
        historyList: hList,
      } = this;

      const sum = hList.length;

      if (type === 'record') {

        // 下标不在末尾，先删除后方内容
        if (hIndex < sum - 1) {
          hList.splice(hIndex + 1, sum - (hIndex + 1))
        }

        // 数量超出限制，先删除
        if (sum >= hMax) {
          hList.splice(0, (sum - hMax + 1));
        }

        // 添加记录
        hList.push(JSON.parse(JSON.stringify(outputs)));

        // 更新下标
        this.historyIndex = hList.length - 1;

      } else if (type === 'redo') {

        const hItem = hList[hIndex + 1];

        if (hItem) {
          this.outputs = JSON.parse(JSON.stringify(hItem));
          this.historyIndex += 1;
        } else {
          this.$message({
            duration: 3000,
            message: '没有可以还原的内容',
            type: 'warning',
          });
        }

      } else if (type === 'undo') {

        const hItem = hList[hIndex - 1];

        if (hItem) {
          this.outputs = JSON.parse(JSON.stringify(hItem));
          this.historyIndex -= 1;
        } else {
          this.$message({
            duration: 3000,
            message: '没有可以撤销的内容',
            type: 'warning',
          });
        }

      }

    },

    /**
     * 同步 Mod ID
     */
    syncModID() {
      const { inputs, outputs } = this;
      const modID = inputs.modID.toLowerCase();

      inputs.modID = modID;
      outputs.modID = (modID ? `modname:${modID}` : '');
    },

    /**
     * 添加
     */
    addBlock() {

      /** @param {string} content 原内容，用于判断换行 */
      const getComment = (content) => {
        const { comment } = this.inputs;

        // 前缀（\n）
        const prefix = (content ? `\n` : '');

        if (comment) {
          return `${prefix}# ${comment}\n`;
        } else {
          return prefix;
        }
      };

      const getBlockSubset = () => {
        const subset = this.inputs.blockSubset;
        return (subset || '0');
      };

      const getTextureID = () => {
        const { inputs } = this;
        const id = (inputs.textureID || inputs.modID);

        return id;
      };

      const { datas, inputs, outputs } = this;

      const requiredKeys = [ 'blockID', 'modID', 'textureFilePath'];

      for (let i = 0; i < requiredKeys.length; i++) {
        if (!inputs[requiredKeys[i]]) {
          this.$message({
            duration: 3000,
            message: '内容未填写完整',
            type: 'warning',
          });
          return;
        }
      }

      this.syncModID();

      let str = null;

      // 处理：models.txt - patchblock
      str = outputs.modelsPatchBlock;
      str += getComment(str);
      str += 'patchblock:id=%';
      str += inputs.blockID;
      str += ',data=';
      str += getBlockSubset(str);
      str += datas.modelsPatch2;
      outputs.modelsPatchBlock = str;

      // 处理：texture.txt - texture
      str = outputs.textureTexture;
      str += getComment(str);
      str += 'texture:id=';
      str += getTextureID(str);
      str += ',filename=';
      str += inputs.textureFilePath;
      str += ',xcount=1,ycount=1';
      outputs.textureTexture = str;

      // 处理：texture.txt - block
      str = outputs.textureBlock;
      str += getComment(str);
      str += 'block:id=%';
      str += inputs.blockID;
      str += ',data=';
      str += getBlockSubset(str);
      str += ',allfaces=0:';
      str += getTextureID(str);
      str += ',stdrot=true';
      if (inputs.isTransparent) {
          str += ',transparency=TRANSPARENT';
      }
      outputs.textureBlock = str;

      // 记录
      this.historyCtrl('record');

    },

    /**
     * 清除结果
     */
    clearResult() {
      const { outputs } = this;
      const msg = '是否清除生成结果？';

      this.confirmDialog(msg, () => {

        for (let key in outputs) {
          outputs[key] = '';
        }

        this.initDatas();
        this.$message({
          duration: 3000,
          message: '已清除',
          type: 'success',
        });
        this.historyCtrl('record');

      });
    },

    /**
     * 合并结果
     */
    mergeResult() {
      const { outputs } = this;

      const modelsKeys = ['modID', 'modelsPatch', 'modelsPatchBlock'];
      const textureKeys = ['modID', 'textureTexture', 'textureBlock'];

      this.clearMerged();
      this.syncModID();

      if (!outputs.modID) {
        this.$message({
          duration: 3000,
          message: 'Mod ID 为空',
          type: 'warning',
        });
        return;
      }

      modelsKeys.forEach((key, index) => {
        const prefix = (index === 0 ? '' : '\n\n');
        outputs.mergedModels += (prefix + outputs[key]);
      });
      textureKeys.forEach((key, index) => {
        const prefix = (index === 0 ? '' : '\n\n');
        outputs.mergedTexture += (prefix + outputs[key]);
      });
    },

    clearMerged() {
      const { outputs } = this;

      outputs.mergedModels = '';
      outputs.mergedTexture = '';
    },

    /**
     * 记录结果
     */
    saveResult() {
      const { outputs } = this;
      const msg = '是否记录生成结果到 localStorage？';

      this.confirmDialog(msg, () => {

        for (let key in outputs) {
          localStorage.setItem(('tool_gdr_' + key), outputs[key]);
        }

        this.$message({
          duration: 3000,
          message: '已记录',
          type: 'success',
        });

      });
    },

    /**
     * 加载结果
     */
    loadSaves() {
      const { outputs } = this;
      const records = {};
      const msg = '是否加载记录？';

      this.confirmDialog(msg, () => {

        for (let key in outputs) {
          const record = localStorage.getItem('tool_gdr_' + key);
          record && (records[key] = record);
        }

        if (Object.keys(records).length > 0) {
          this.outputs = records;
          this.historyCtrl('record');
          this.$message({
            duration: 3000,
            message: '已加载',
            type: 'success',
          });
        } else {
          this.$message({
            duration: 3000,
            message: '没有记录',
            type: 'warning',
          });
        }

      });
    },

    /**
     * 清除记录的结果
     */
    clearSaves() {
      const { outputs } = this;
      const msg = '是否清除记录？';

      this.confirmDialog(msg, () => {

        for (let key in outputs) {
          localStorage.removeItem('tool_gdr_' + key);
        }

        this.$message({
          duration: 3000,
          message: '已清除',
          type: 'success',
        });

      });
    },

  },
}
</script>

<style lang="less" scoped>
@rowPadding: 0.25rem;

/deep/ .el-input__inner {
  padding: 0.25rem 0.5rem;
}

/deep/ .el-textarea__inner {
  padding: 0.5rem;
  font-size: 0.8rem;
  line-height: 1.8em;
}

.inputs {
  .content-row {
    display: flex;
    align-items: center;
    padding: @rowPadding 0;
  }

  .row-label {
    display: inline-block;
    flex-shrink: 0;
    margin-right: 0.5em;
    width: 6.5em;
    text-align: right;
  }
}

.actions {
  .content-row {
    padding: @rowPadding 0;
  }
}

.outputs {
  /deep/ .part .el-textarea__inner {
    border-color: #FF5722;
  }

  /deep/ .merged .el-textarea__inner {
    border-color: #4CAF50;
  }

  .content-row {
    padding: @rowPadding 0;
  }

  .row-title {
    margin: 0.25rem 0;
    font-size: 1rem;
    font-weight: normal;
  }
}
</style>
