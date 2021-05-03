<template>
    <el-container class="tools">

        <div class="wrapper">

            <!-- 工具分类 -->
            <div v-for="(categoryItem, categoryKey) in toolList" :key="categoryKey" class="category">

                <!-- 标题 -->
                <div class="title">{{ categoryItem.title }}</div>

                <!-- 工具项 -->
                <div v-for="(toolItem, toolKey) in categoryItem.list" :key="toolKey"
                    :class="['tool-item', 'shadow-2', { disabled: !toolItem.enabled }]"
                    @click="openDetail(categoryKey, toolKey)"
                >
                    <div class="item-title limit-line-1">{{ toolItem.title }}</div>
                    <div class="item-content limit-line-3">{{ toolItem.desc || '无简介' }}</div>
                </div>

            </div>

        </div>

        <!-- 弹出 -->
        <el-drawer custom-class="drawer-full" direction="btt" size="100%"
            :append-to-body="true" :destroy-on-close="true" :title="detail.title"
            :visible.sync="detail.show" :before-close="closeDetail"
        >
            <!-- 内容 -->
            <router-view></router-view>
        </el-drawer>

    </el-container>
</template>

<script>
import navTools from '@/assets/js/navTools.js';

export default {
    name: 'Tools',
    data() {
        return {
            utils: this.$root.utils,
            toolList: navTools,
            detail: {
                show: false,
                title: ''
            }
        };
    },
    methods: {

        /**
         * 打开工具
         */
        openDetail(toolCatrgory, toolName) {
            // 当前工具信息
            var info = {};
            
            try {

                info = this.toolList[toolCatrgory]['list'][toolName];

                if (info === undefined) {
                    throw new Error('该分类中不存在工具 ' + toolName);
                }

            } catch (err) {
                
                console.warn(`[打开工具] 无法打开该工具（分类：${toolCatrgory} 名称：${toolName}）`);
                console.warn('[打开工具]', err);
                return;

            }

            // 禁用
            if (!info.enabled) {
                this.$message({
                    message: '该工具未启用',
                    type: 'warning'
                });
                return;
            }

            // 更新页面标题
            this.utils.changeTitle(info.title);
            // 更新 drawer 标题
            this.detail.title = info.title;
            // 路由跳转
            this.$router.push({
                name: 'ToolsDetail',
                params: {
                    category: toolCatrgory,
                    name: toolName
                },
                query: {
                    component: info.component
                }
            }).catch((err) => {
                console.log('[路由跳转]', err.name);
            });
            // 显示 drawer
            this.detail.show = true;
        },

        /**
         * 关闭工具
         */
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
            var route = vm.$route;

            // 判断进入的路由
            if (route.name == 'ToolsDetail') {
                // 进入：工具内容页面
                vm.openDetail(route.params.category, route.params.name);
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
    overflow-y: auto;

    .wrapper {
        width: 100%;
    }

    .category {
        display: flex;
        align-items: top;
        flex-wrap: wrap;
        justify-content: flex-start;
        position: relative;
        padding-top: 3rem;
        width: 100%;

        .title {
            position: absolute;
            top: 1rem;
            left: 0;
            font-weight: bold;
            color: #555;
        }

        .tool-item {
            flex-shrink: 0;
            margin: .5rem;
            padding: 1rem;
            width: 18rem;
            border-left: .2rem solid @colorPrimary;
            border-radius: .25rem;
            background-color: #FFF;
            font-size: 0;
            color: #555;
            overflow: hidden;
            transition: all @transitionTime;
            cursor: pointer;

            &:hover {
                border-left-color: @colorSecondary;
                transform: translateY(-.2rem);
            }

            &.disabled {
                border-left-color: @colorGrey;
            }

            .item-title {
                margin-bottom: .5rem;
                font-weight: bold;
                font-size: .9rem;
            }

            .item-content {
                height: calc(1.5em * 3);
                line-height: 1.5em;
                font-size: .75rem;
                color: #999;
            }
        }
    }
}
</style>
