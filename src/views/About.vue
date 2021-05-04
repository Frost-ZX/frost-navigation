<template>
    <el-container class="about">
        <div class="wrapper shadow-2">

            <div class="text">
                <div class="title">简介</div>
                <div class="content">
                    <p>一个多功能的网址导航，绿色无广告。</p>
                    <p>当前版本：2.0.0</p>
                </div>
            </div>

            <div class="text">
                <div class="title">开发人员</div>
                <div class="content">
                    <p>Frost-ZX</p>
                </div>
            </div>

            <div class="text">
                <div class="title">注意事项</div>
                <div class="content">
                    <p>部分链接由于不能及时更新，可能已过期（不存在、指向了错误的网站等），访问时请注意。</p>
                    <p>若您在使用时发现相关情况，欢迎进行反馈。</p>
                </div>
            </div>

            <div class="text">
                <div class="title">GitHub</div>
                <div class="content">
                    <p>
                        <el-link :href="info.github" target="_blank" type="primary">{{ info.github }}</el-link>
                    </p>
                </div>
            </div>

        </div>
    </el-container>
</template>

<script>
export default {
    name: 'About',
    data() {
        return {
            utils: this.$root.utils,
            info: {
                github: 'https://github.com/Frost-ZX/frost-navigation'
            }
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.utils.changeTitle('关于');
        });
    }
}
</script>

<style lang="less" scoped>
.about {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    background-color: @colorWhite;
    overflow-y: auto;

    .wrapper {
        padding: 1.5rem 2rem;
        width: 100%;
        max-width: 50rem;
        background-color: #FFF;
    }

    .text {
        padding: 0.5rem 0;

        .title {
            line-height: 2.5rem;
            font-size: 1rem;
        }

        .content {
            line-height: 1.8rem;
            font-size: 0.85rem;
            color: #888;
        }
    }
}
</style>
