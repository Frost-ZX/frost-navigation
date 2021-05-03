<template>
    <div class="tools-detail">
        <component :is="toolElem" />
    </div>
</template>

<script>
export default {
    name: 'ToolsDetail',
    data() {
        return {
            utils: this.$root.utils,
            routeQuery: {},
            toolElem: null
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            var params = vm.$route.params;
            var query = vm.$route.query;

            console.log('[打开工具] params', params);
            console.log('[打开工具] query', query);

            vm.toolElem = () => {
                // 动态引入组件
                var elem = import(`@/components/tools/${query.component}.vue`);

                return elem;
            };
        });
    }
}
</script>

<style lang="less" scoped>
.tools-detail {
    display: flex;
    align-items: top;
    justify-content: center;

    /deep/ .tool-elem {
        width: 100%;
        max-width: 60rem;

        > div {
            > .title {
                padding: 1rem 0;
                font-size: 1rem;
                font-weight: bold;
            }
        }
    }
}
</style>
