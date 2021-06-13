<template>
    <div class="floating-btn">
        <div class="btns-inner">
            <div class="btn" title="折叠侧边菜单" @click="toggleSideCollapse()">
                <i class="el-icon-menu" aria-hidden="true"></i>
            </div>
            <div class="btn" title="刷新" @click="refreshPage()">
                <i class="el-icon-refresh-right" aria-hidden="true"></i>
            </div>
            <div class="btn" title="返回主页" @click="backToHome()">
                <i class="el-icon-s-home" aria-hidden="true"></i>
            </div>
        </div>
        <div class="btns-outer">
            <div class="btn" title="悬浮菜单">
                <i class="fa fa-bars" aria-hidden="true"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FloatingBtn',
    data() {
        return {
            config: this.$root.config.storage
        }
    },
    methods: {

        /**
         * 返回主页
         */
        backToHome() {
            var routeName = 'Home';

            if (this.$route.name != routeName) {
                this.$router.push({
                    name: routeName
                }).then(() => {
                    window.location.reload();
                });
            } else {
                this.$message({
                    duration: 2000,
                    message: '已经在主页啦~',
                    type: 'warning'
                });
            }
        },

        /**
         * 刷新
         */
        refreshPage() {
            window.location.reload();
        },

        /**
         * 切换侧边菜单折叠状态
         */
        toggleSideCollapse() {
            var cfg = this.config;

            cfg.sideMenuCollapse = !cfg.sideMenuCollapse;
        },

    },
}
</script>

<style lang="less" scoped>
.floating-btn {
    position: fixed;
    z-index: 5000;
    right: 2rem;
    bottom: 2rem;
    text-align: center;

    &:hover {
        .btns-inner .btn {
            width: 2.5rem;
            height: 2.5rem;
            font-size: 0.9rem;
        }
    }
}

.btns-inner {
    display: inline-block;

    .btn {
        width: 0;
        height: 0;
        background-color: @colorSecondary;
        font-size: 0;
        transition: all calc(@transitionTime * 1.2);

        &:not(:first-child) {
            margin-top: 0.75rem;
        }
    }
}

.btns-outer {
    display: block;

    .btn {
        margin-top: 1rem;
        width: 3rem;
        height: 3rem; 
        background-color: @colorPrimary;
    }
}

.btn {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    right: 0;
    bottom: 0;
    box-shadow: 0 0.15rem 0.15rem 0 rgba(0, 0, 0, 0.14),
        0 0.2rem 0.1rem -0.15rem rgba(0, 0, 0, 0.12),
        0 0.1rem 0.3rem 0 rgba(0, 0, 0, 0.20);
    border-radius: 50%;
    font-size: 1rem;
    color: #FFF;
    overflow: hidden;
    cursor: pointer;

    &::after {
        content: "";
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #FFF;
        opacity: 0;
        transition: opacity @transitionTime
    }

    &:hover::after {
        opacity: 0.2;
    }
}
</style>
