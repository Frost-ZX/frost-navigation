<template>
    <el-container class="settings">
        <div class="wrapper shadow-2">

            <el-form label-position="left" label-width="7rem">

                <el-form-item label="字体大小">
                    <el-input-number v-model="config.fontSize"
                        :min="12" :max="32" label="字体大小" size="small"
                    ></el-input-number>
                </el-form-item>

                <el-form-item label="显示网站标题">
                    <el-switch v-model="config.showSiteTitle"></el-switch>
                </el-form-item>

                <el-form-item label="折叠侧边菜单">
                    <el-switch v-model="config.sideMenuCollapse"></el-switch>
                </el-form-item>

            </el-form>

        </div>
    </el-container>
</template>

<script>
export default {
    name: 'Settings',
    data() {
        return {
            config: this.$root.config.storage,
            utils: this.$root.utils
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.utils.changeTitle('设置');
        });
    }
}
</script>

<style lang="less" scoped>
.settings {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    background-color: @colorWhite;

    .wrapper {
        padding: 1.5rem 2rem;
        width: 100%;
        max-width: 50rem;
        background-color: #FFF;
    }

    /deep/ .el-form-item {
        .el-form-item__label {
            font-weight: bold;
        }
    }
}
</style>
