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

                <el-form-item label="清除数据">
                    <el-button type="danger" size="medium" @click="resetDatas('settings')">清除设置</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button type="danger" size="medium" @click="resetDatas('cache')">清除缓存</el-button>
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
    },
    methods: {
        /**
         * 清除数据
         * 
         * @param {string} type 清除类型（cache、settings）
         */
        resetDatas(type) {
            this.$confirm('确定要清除吗？', '确认', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {

                if (type == 'cache') {
                    localStorage.removeItem('navLinksCache');
                } else if (type == 'settings') {
                    localStorage.removeItem('config');
                } else {
                    return
                }

                this.$notify({
                    type: 'success',
                    message: '已清除，2s 后自动刷新'
                });

                setTimeout(() => {
                    location.reload();
                }, 2000);

            }).catch(() => {

                this.$notify({
                    type: 'info',
                    message: '取消清除'
                });

            });
        }
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
