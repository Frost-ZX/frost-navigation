<template>
    <div id="app">
        <el-container>

            <!-- Header -->
            <el-header class="main-header shadow-1">

                <!-- LOGO -->
                <el-avatar class="logo" shape="square" size="small" src="./favicon.ico"></el-avatar>

                <!-- 菜单 -->
                <el-menu class="menu" :default-active="headerDefaultActive" mode="horizontal" router>

                    <!-- 标题 -->
                    <el-menu-item v-show="config.storage.showSiteTitle"
                        index="title" class="title" disabled
                    >Frost 网址导航</el-menu-item>

                    <!-- 菜单项 -->
                    <el-menu-item v-for="item in headerMenuItems" :key="item.id"
                        class="item-normal" :index="item.id" :route="{ name: item.routeName }"
                    >{{ item.label }}</el-menu-item>

                    <!-- 切换下拉菜单 -->
                    <el-menu-item :class="['item-dropdown', { active: showHeaderDropdown }]"
                        @click="showHeaderDropdown = !showHeaderDropdown"
                    >
                        <i class="el-icon-menu"></i>
                    </el-menu-item>

                </el-menu>

            </el-header>

            <!-- 下拉菜单 -->
            <el-menu :class="['header-dropdown', 'shadow-2', { show: showHeaderDropdown }]"
                :default-active="headerDefaultActive" router
            >

                <!-- 菜单项 -->
                <el-menu-item v-for="item in headerMenuItems" :key="item.id"
                    class="item-normal" :index="item.id" :route="{ name: item.routeName }"
                >{{ item.label }}</el-menu-item>

            </el-menu>

            <!-- Container -->
            <keep-alive>
                <router-view class="main-container" />
            </keep-alive>

        </el-container>
    </div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            config: this.$root.config,
            debounce: {
                saveConfig: null,
                updateConfig: null
            },
            // Header 菜单项
            headerMenuItems: [
                {
                    id: 'home',
                    label: '主页',
                    routeName: 'Home'
                },
                {
                    id: 'tools',
                    label: '小工具',
                    routeName: 'Tools'
                },
                {
                    id: 'settings',
                    label: '设置',
                    routeName: 'Settings'
                },
                {
                    id: 'about',
                    label: '关于',
                    routeName: 'About'
                }
            ],
            // 显示下拉菜单
            showHeaderDropdown: false
        }
    },
    computed: {
        // Header 默认激活的菜单项
        headerDefaultActive() {
            var routeName = this.$route.name;
            var item = '';

            if (routeName) {
                item = routeName.toLowerCase();
            }

            return item;
        }
    },
    watch: {
        // 路由名称
        '$route.name': {
            handler() {
                // 切换路由时隐藏下拉菜单
                this.showHeaderDropdown = false;
            }
        },
        // 更新储存的设置
        'config.storage': {
            handler(obj) {
                clearTimeout(this.debounce.saveConfig);

                this.debounce.saveConfig = setTimeout(() => {
                    localStorage.setItem('navConfig', JSON.stringify(obj));
                }, 2000);
            },
            deep: true
        },
        // 改变字体大小
        'config.storage.fontSize': {
            handler(value) {
                clearTimeout(this.debounce.updateConfig);

                this.debounce.updateConfig = setTimeout(() => {
                    // 改变字体大小
                    document.documentElement.style.fontSize = value + 'px';
                }, 1000);
            }
        }
    },
    mounted() {
        var configStr = localStorage.getItem('navConfig');
        var configObj = {};

        if (configStr != null) {
            configObj = JSON.parse(configStr);
            Object.assign(this.config.storage, configObj);
        }
    }
}
</script>

<style lang="less">
.main-header {
    display: flex;
    align-items: center;
    z-index: 200;
    height: @headerHeight !important;
    background-color: #FFF;

    @media screen and (min-width: 30rem) {
        .menu .item-dropdown {
            display: none;
        }
    }

    @media screen and (max-width: 30rem) {
        .logo {
            display: none;
        }

        .menu {
            .item-normal {
                display: none;
            }

            .item-dropdown {
                position: absolute;
                right: 0;
                margin: 0;
                padding: 0;
                line-height: 2.2rem;

                i {
                    font-size: 2em;
                }
            }
        }
    }

    .logo {
        flex-shrink: 0;
        margin-right: 1rem;
    }

    .menu {
        flex-grow: 1;
        height: 2.5rem;
        border: none !important;

        > li {
            padding: 0 1rem;
            height: 100%;
            line-height: 2.5rem;

            &.is-active {
                border-bottom-color: transparent;
                color: @colorPrimary !important;
            }
        }

        .title {
            padding-left: 0;
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

<style lang="less" scoped>
.header-dropdown {
    position: absolute !important;
    z-index: 150;
    top: @headerHeight;
    left: 0;
    width: 100%;
    overflow: hidden;
    transform: translateY(-100%);
    transition: transform @transitionTime;

    &.show {
        transform: translateY(0);
    }
}

.menu .item-dropdown {
    i {
        transition: color @transitionTime;
    }

    &.active i {
        color: @colorPrimary;
    }
}
</style>
