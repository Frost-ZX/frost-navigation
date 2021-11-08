<template>
    <div class="tools-detail">
        <component :is="toolElem" />
    </div>
</template>

<script>
import navTools from '@/assets/js/navTools.js';

export default {
    name: 'ToolsDetail',
    data() {
        return {
            utils: this.$root.utils,
            toolList: navTools,
            toolElem: null,
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            var params = vm.$route.params;
            var toolComponent = vm.toolList[params.category]['list'][params.name].component;
            var loading = null;

            console.log('[打开工具] params', params);

            // 异步，防止找不到 target
            setTimeout(() => {
                // 开启 Loading
                loading = vm.$loading({
                    background: '#FFF',
                    lock: true,
                    // Loading 需要覆盖的 DOM 节点
                    target: '.drawer-full .el-drawer__body'
                });
            }, 0);

            vm.toolElem = (() => {
                // 动态引入组件
                var elem = import(`@/components/tools/${toolComponent}.vue`);

                Promise.all([elem]).then(() => {
                    setTimeout(() => {
                        // 关闭 Loading
                        loading.close();
                    }, 200);
                });

                return elem;
            });
        });
    },
}
</script>

<style lang="less" scoped>
.tools-detail {
    display: flex;
    align-items: flex-start;
    justify-content: center;

    /deep/ .tool-elem {
        width: 100%;
        max-width: 60rem;

        > div {
            > .title {
                position: relative;
                margin: 1.5rem 0;
                font-size: 1rem;
                color: @textPrimary;
            }

            > .title::before {
                content: "";
                position: absolute;
                top: 0;
                left: -0.5rem;
                width: 0.2rem;
                height: 100%;
                background-color: @colorPrimary;
            }

            > .content {
                font-size: 0.9rem;
            }
        }
    }
}
</style>
