<template>
    <el-container class="tools">

    </el-container>
</template>

<script>
export default {
    name: 'Tools',
    data() {
        return {
            utils: this.$root.utils
        };
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.utils.changeTitle('小工具');
        });
    }
}
</script>

<style lang="less" scoped>

</style>
