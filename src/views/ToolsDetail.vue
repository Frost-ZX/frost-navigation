<template>
    <div class="tools-detail">
        <component :is="detailElem" />
    </div>
</template>

<script>

export default {
    name: 'ToolsDetail',
    data() {
        return {
            utils: this.$root.utils,
            routeQuery: {},
            detailElem: null
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            var params = vm.$route.params;
            var query = vm.$route.query;

            console.log('[打开工具] params', params);
            console.log('[打开工具] query', query);

            vm.detailElem = () => {
                // 动态引入组件
                var elem = import(`@/components/tools/${query.component}.vue`);

                return elem;
            };
        });
    }
}
</script>

<style lang="less" scoped>

</style>
