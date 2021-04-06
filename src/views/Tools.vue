<template>
    <el-container class="tools">

        <div class="wrapper">

            <!-- 工具项 -->
            <div v-for="(item, key) in toolList" :key="key" class="tool-item shadow-2" @click="openDetail(key)">
                <div class="item-title">{{ item.title }}</div>
                <div class="item-content limit-line-3">{{ item.desc || '无简介' }}</div>
            </div>

        </div>

        <!-- 弹出 -->
        <el-drawer direction="btt" size="100%" :append-to-body="true" :destroy-on-close="true"
            :title="detail.title" :visible.sync="detail.show" :before-close="closeDetail"
        >
            <div class="tool-content">
                <router-view></router-view>
            </div>
        </el-drawer>

    </el-container>
</template>

<script>
export default {
    name: 'Tools',
    data() {
        return {
            utils: this.$root.utils,
            detail: {
                show: false,
                title: ''
            },
            toolList: {
                'calcDownloadTime': {
                    title: '计算下载用时',
                    desc: '根据设定的文件大小和下载速度简单计算大约下载完成所需的时间'
                },
                'genLinks': {
                    title: '生成批量下载链接',
                    desc: '根据设置，生成有一定规律的用于批量下载的链接'
                },
                'genRandomStr': {
                    title: '生成随机字符串',
                    desc: '生成随机组合的字符串，可用于密码'
                },
                'newWindow': {
                    title: '新窗口（小窗）中打开'
                },
                'runjs': {
                    title: '执行 JavaScript'
                },
                'simpleCalc': {
                    title: '简易计算'
                },
                'timestampConvert': {
                    title: 'Unix 时间戳转换',
                    desc: 'Unix 时间戳转时间 / 时间转 Unix 时间戳'
                },
            }
        };
    },
    methods: {
        // 打开工具
        openDetail(toolName) {
            // 当前工具信息
            var info = this.toolList[toolName];

            // 若不存在
            if (info === undefined) {
                console.log('[打开工具] 不存在该工具：' + toolName);
                return;
            }

            // 更新页面标题
            this.utils.changeTitle(info.title);
            // 更新 drawer 标题
            this.detail.title = info.title;
            // 路由跳转
            this.$router.push({
                name: 'ToolsDetail',
                query: {
                    name: toolName,
                    title: info.title
                }
            });
            // 显示 drawer
            this.detail.show = true;
        },
        // 关闭工具
        closeDetail(done) {
            this.$confirm('是否关闭？').then(() => {
                // 关闭 drawer
                done();
                // 路由跳转
                this.$router.push({
                    name: 'Tools'
                });
                // 更新页面标题
                this.utils.changeTitle('小工具');
            }).catch(() => { });
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            // 判断进入的路由
            if (vm.$route.name == 'ToolsDetail') {
                // 进入：工具内容页面
                vm.openDetail(vm.$route.query.name);
            } else {
                // 进入：工具列表页面
                vm.utils.changeTitle('小工具');
            }
        });
    }
}
</script>

<style lang="less" scoped>
.tools {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    background-color: @colorWhite;

    .wrapper {
        display: flex;
        align-items: top;
        flex-wrap: wrap;
        justify-content: flex-start;
        width: 100%;
        max-width: 60rem;
    }

    .tool-item {
        flex-shrink: 0;
        margin: 0.5rem;
        padding: 1rem;
        width: 16rem;
        border-left: 0.2rem solid @colorPrimary;
        background-color: #FFF;
        font-size: 0.9rem;
        color: #555;
        overflow: hidden;
        transition: all @transitionTime;
        cursor: pointer;

        &:hover {
            border-left-color: @colorSecondary;
            transform: translateY(-0.2rem);
        }

        .item-title {
            font-weight: bold;
            margin-bottom: 0.4rem;
        }

        .item-content {
            color: #999;
        }
    }
}

.tool-content {
    padding: 0 2rem 2rem 2rem;
}
</style>
