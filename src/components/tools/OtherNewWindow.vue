<template>
    <div class="tool-elem">

        <div class="info">
            <div class="title">信息</div>
            <div class="content">
                <div class="link">
                    <span class="label">目标链接：</span>
                    <el-input v-model="info.link" type="text" placeholder="需要包含协议（例如 https://）" />
                </div>
                <div class="size">
                    <span class="label">窗口大小：</span>
                    <el-input v-model="info.size.width" type="number" min="1" placeholder="宽度（默认 400）" />
                    <el-input v-model="info.size.height" type="number" min="1" placeholder="高度（默认 300）" />
                </div>
            </div>
        </div>

        <div class="action">
            <div class="title">操作</div>
            <div class="content">
                <el-button type="primary" @click="btnOpen()">打开</el-button>
                <el-button type="danger" @click="btnClear()">清空</el-button>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'OtherNewWindow',
    data() {
        return {
            info: {
                link: '',
                size: {
                    width: '',
                    height: ''
                }
            }
        }
    },
    methods: {

        // 打开
        btnOpen() {
            var link = this.info.link || 'https://github.com/Frost-ZX';
            var width = this.info.size.width || '400';
            var height = this.info.size.height || '300';
            var features = `height=${height}, width=${width}, toolbar=no, menubar=no, scrollbars=yes, resizable=yes, location=yes, status=yes`;

            window.open(link, '_blank', features);
        },

        // 清空
        btnClear() {
            // 重置 info
            this.info = {
                link: '',
                size: {
                    width: '',
                    height: ''
                }
            };
        }

    },
}
</script>

<style lang="less" scoped>
.content {
    max-width: 40rem;

    > div {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin: 0.5rem 0;
    }

    .label {
        display: inline-block;
        flex-shrink: 0;
        width: 5rem;
    }

    .el-input {
        margin: 0 0.5rem;
    }
}
</style>
