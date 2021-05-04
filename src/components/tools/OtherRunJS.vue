<template>
    <div class="tool-elem">

        <!-- 输入 -->
        <div class="input">
            <div class="title">代码</div>
            <el-input v-model="input.value" type="textarea" class="text"
                :placeholder="input.placeholder" rows="10"
            ></el-input>
        </div>

        <!-- 操作 -->
        <div class="action">
            <div class="title">操作</div>
            <div class="btns">
                <el-button type="primary" @click="btnRun()">运行</el-button>
                <el-button type="danger" @click="btnClear()">清空</el-button>
            </div>
        </div>

        <!-- 输出 -->
        <div class="output">
            <div class="title">输出</div>
            <div class="text">
                <p v-for="line in output.lines" :key="line.id"
                    :class="['line', line.type]"
                >{{ line.message }}</p>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'OtherRunJS',
    data() {
        return {
            input: {
                value: '',
                placeholder: '请在此处输入 JavaScript 代码'
            },
            output: {
                id: 0,
                lines: []
            }
        }
    },
    methods: {

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

                this.input.value = '';
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
.tool-elem {
    @lineHeight: 1.2rem;

    > div {
        .text {
            line-height: @lineHeight;
            font-family: monospace;
            font-size: 0.8rem;
        }
    }

    .input {
        /deep/ .text textarea {
            padding: 0.75rem;
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
