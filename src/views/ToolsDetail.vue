<template>
    <div class="tools-detail">
        未完成
    </div>
</template>

<script>
export default {
    name: 'ToolsDetail',
    data() {
        return {
            utils: this.$root.utils,
            routeQuery: {}
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            console.log('[打开工具] 参数', vm.$route.query);
        });
    }
}
</script>

<style lang="less" scoped>

</style>
