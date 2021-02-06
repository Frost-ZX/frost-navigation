<template>
    <div id="app">
        <el-container>

            <!-- Header -->
            <el-header class="main-header shadow-1">
                <!-- LOGO -->
                <el-avatar class="logo" shape="square" size="medium" src="./favicon.ico"></el-avatar>

                <!-- 菜单 -->
                <el-menu class="menu" default-active="home" mode="horizontal">
                    <el-menu-item index="title" class="title" disabled>Frost 网址导航</el-menu-item>
                    <el-menu-item index="home">主页</el-menu-item>
                    <el-menu-item index="tools" disabled>小工具</el-menu-item>
                </el-menu>
            </el-header>

            <!-- Container -->
            <router-view class="main-container" />

        </el-container>
    </div>
</template>

<style lang="less">
.main-header {
    display: flex;
    align-items: center;
    z-index: 200;
    height: @headerHeight !important;
    background-color: #FFF;

    .menu {
        height: 2.5rem;
        border: none !important;

        > li {
            height: 100%;
            line-height: 2.5rem;

            &.is-active {
                color: @colorPrimary !important;
            }
        }

        .title {
            font-size: 1.2rem;
            color: @colorPrimary;
            opacity: 1;
            cursor: default;
        }
    }
}

.main-container {
    height: calc(100vh - @headerHeight);
}
</style>
