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
                    @click="detailOpen(categoryKey, toolKey)"
                >
                    <div class="item-title limit-line-1">{{ toolItem.title }}</div>
                    <div class="item-content limit-line-3">{{ toolItem.desc || '无简介' }}</div>
                </div>

            </div>

        </div>

        <!-- 弹出 -->
        <el-drawer custom-class="drawer-full" direction="btt" size="100%"
            :append-to-body="true" :destroy-on-close="true" :title="detail.title"
            :visible.sync="detail.show" :before-close="detailClose"
        >

            <!-- 标题区域 -->
            <div slot="title" class="header">
                <span class="title">{{ detail.title }}</span>
                <el-tooltip content="在新标签页中打开本工具" placement="left">
                    <i class="btn el-icon-copy-document" @click="detailOpenNewTab()"></i>
                </el-tooltip>
            </div>

            <!-- 内容区域 -->
            <router-view></router-view>

        </el-drawer>

    </el-container>
</template>

<script>
import navTools from '@/assets/js/navTools.js';

export default {
    name: 'Tools',
    beforeRouteEnter(to, from, next) {
        next(vm => {
            var route = vm.$route;

            // 判断进入的路由
            if (route.name === 'ToolsDetail') {
                // 进入：工具内容页面
                vm.detailOpen(route.params.category, route.params.name);
            } else {
                // 进入：工具列表页面
                vm.utils.changeTitle('小工具');
            }
        });
    },
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
         * 关闭工具
         */
        detailClose(done) {
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
        },

        /**
         * 打开工具
         * 
         * @param {string} toolCatrgory 工具分类
         * @param {string} toolName 工具名称
         */
        detailOpen(toolCatrgory, toolName) {
            var vm = this;
            // 当前工具信息
            var info = {};
            // 错误提示
            var errMsg = `无法打开该工具（分类：${toolCatrgory} 名称：${toolName}）`;
            
            try {

                info = vm.toolList[toolCatrgory]['list'][toolName];

                if (info === undefined) {
                    throw new Error(errMsg);
                }

            } catch (err) {

                console.warn('[打开工具]', err);
                vm.$message({
                    message: errMsg,
                    type: 'warning'
                });
                return;

            }

            // 禁用
            if (!info.enabled) {
                vm.$message({
                    message: '该工具未启用',
                    type: 'warning'
                });
                return;
            }

            // 更新页面标题
            vm.utils.changeTitle(info.title);
            // 更新 drawer 标题
            vm.detail.title = `${info.title} [${info.version}_${info.update}]`;
            // 路由跳转
            // 注：当前路由相同时也进行跳转，以更新 query
            vm.$router.push({
                name: 'ToolsDetail',
                params: {
                    category: toolCatrgory,
                    name: toolName
                }
            }).catch((err) => {
                console.log('[路由跳转]', err.name);
            });
            // 显示 drawer
            vm.detail.show = true;
        },

        /**
         * 打开工具（新标签页）
         */
        detailOpenNewTab() {
            var url = window.location.href;

            window.open(url, '_blank');
        }

    },
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
            color: @textPrimary;
        }

        .tool-item {
            flex-shrink: 0;
            margin: 0.5rem;
            padding: 1rem;
            width: 16rem;
            border-left: 0.2rem solid @colorPrimary;
            border-radius: 0.25rem;
            background-color: #FFF;
            font-size: 0;
            color: @textPrimary;
            overflow: hidden;
            transition: all @transitionTime;
            cursor: pointer;

            &:hover {
                border-left-color: @colorSecondary;
                transform: translateY(-0.2rem);
            }

            &.disabled {
                border-left-color: @colorGrey;
            }

            .item-title {
                margin-bottom: 0.5rem;
                font-weight: bold;
                font-size: 0.9rem;
            }

            .item-content {
                height: calc(1.5em * 2);
                line-height: 1.5em;
                font-size: 0.75rem;
                color: @textSecondary;
            }
        }
    }
}

.drawer-full {
    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .btn {
            margin: 0 0.5rem;
            font-size: inherit;
            cursor: pointer;
        }
    }
}
</style>
