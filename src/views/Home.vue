<template>
    <el-container class="home">

        <!-- 侧边栏 -->
        <el-aside class="home-aside">
            <el-menu class="side-nav" default-active="search"
                :collapse="config.sideMenuCollapse" @select="changeCategory"
            >

                <!-- 搜索引擎 -->
                <el-menu-item index="search">
                    <i class="el-icon-search"></i>
                    <span slot="title">搜索</span>
                </el-menu-item>

                <!-- 全部链接 -->
                <el-menu-item index="all">
                    <i class="el-icon-menu"></i>
                    <span slot="title">全部链接</span>
                </el-menu-item>

                <!-- 分类 -->
                <el-menu-item v-for="(item, itemIndex) in navLinks.list"
                    :key="'list-' + itemIndex" :index="itemIndex.toString()"
                >
                    <i :class="item.icon || 'el-icon-link'"></i>
                    <span slot="title">{{ item.title }}</span>
                </el-menu-item>

            </el-menu>
        </el-aside>

        <!-- 内容 -->
        <el-main class="home-content">
            <div class="wrapper">

                <!-- 搜索引擎 -->
                <div v-show="show.searchEngine" class="search-engine">

                    <!-- 搜索栏 -->
                    <div class="search-bar shadow-3">

                        <!-- 输入 -->
                        <input v-model="searchEngine.keyword" class="input" type="text"
                            @blur="searchEngine.isFocus = false" @focus="searchEngine.isFocus = true"
                            @keydown.enter.exact="searchEngineSubmit()"
                        />

                        <!-- 清除 -->
                        <div v-show="searchEngine.keyword.length > 0" class="btn btn-clear"
                            @click="searchEngine.keyword = ''"
                        >
                            <i class="el-icon-close"></i>
                        </div>

                        <!-- 搜索 -->
                        <div class="btn btn-search" @click="searchEngineSubmit()">
                            <i class="el-icon-search"></i>
                        </div>

                    </div>

                    <!-- 选择搜索引擎 -->
                    <el-radio-group v-model="config.searchEngine" size="small"
                        :class="['search-type', { fade: searchEngine.isFocus }]"
                    >

                        <!-- 自动生成 -->
                        <el-radio v-for="item in searchEngine.types" :key="item.name"
                            :label="item.name" class="shadow-2"
                        >
                            <Icon :path="item.icon || 'website/default.svg'" size="1.2em" />
                            <i class="name">{{ item.name }}</i>
                            <i class="desc">{{ item.desc }}</i>
                        </el-radio>

                        <!-- 占位 -->
                        <el-radio label="0"></el-radio>

                    </el-radio-group>

                </div>

                <!-- 链接搜索框 -->
                <el-input v-show="show.linkSearch" v-model="linkSearch.keyword"
                    class="link-search shadow-2" placeholder="搜索链接" clearable
                >
                    <el-select slot="prepend" v-model="linkSearch.type" placeholder="类型">
                        <el-option label="全部" value="all"></el-option>
                        <el-option label="标题" value="title"></el-option>
                        <el-option label="链接" value="link"></el-option>
                    </el-select>
                </el-input>

                <!-- 链接列表树 -->
                <el-tree v-show="show.linkTree" ref="linkTree" class="link-tree shadow-2"
                    :data="currentLinks" node-key="id" empty-text=""
                    :props="{ label: 'title', children: 'sub' }" :filter-node-method="searchLink"
                    :default-expand-all="false" :expand-on-click-node="true"
                >
                    <div slot-scope="{ node, data }" class="link-item" :title="data.update"
                        @click="openLink(data.link, data.showOnly)"
                    >
                        <span class="title">{{ node.label }}</span>
                        <span class="link">{{ data.link }}</span>
                    </div>
                </el-tree>

            </div>
        </el-main>

    </el-container>
</template>

<script>
import Icon from '@/components/Icon.vue';

export default {
    name: 'Home',
    components: {
        Icon
    },
    data() {
        return {
            config: this.$root.config.storage,
            utils: this.$root.utils,
            // 显示的内容
            show: {
                searchEngine: true,
                linkSearch: false,
                linkTree: false,
            },
            // 搜索引擎
            searchEngine: {
                isFocus: false,
                keyword: '',
                types: this.$root.config.searchEngines
            },
            // 导航链接
            navLinks: this.$root.navLinks,
            // 当前显示的链接
            currentLinks: [],
            // 搜索链接
            linkSearch: {
                debounce: null,
                keyword: '',
                type: 'all'
            }
        };
    },
    watch: {
        'linkSearch.keyword': {
            handler(value) {
                clearTimeout(this.linkSearch.debounce);

                this.linkSearch.debounce = setTimeout(() => {
                    this.$refs.linkTree.filter(value);
                }, 500);
            }
        },
        'linkSearch.type': {
            handler() {
                // 更改搜索类型时自动重新搜索
                this.$refs.linkTree.filter(this.linkSearch.keyword);
            }
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.utils.changeTitle();
        });
    },
    methods: {

        /** 
         * 更改当前显示的分类
        */
        changeCategory(index) {
            if (index == 'search') {
                this.currentLinks = [];
                this.show.searchEngine = true;
                this.show.linkSearch = false;
                this.show.linkTree = false;
            } else if (index == 'all') {
                this.currentLinks = this.navLinks.list;
                this.show.searchEngine = false;
                this.show.linkSearch = true;
                this.show.linkTree = true;
            } else {
                this.currentLinks = this.navLinks.list[Number(index)].sub;
                this.show.searchEngine = false;
                this.show.linkSearch = true;
                this.show.linkTree = true;
            }

            this.linkSearch.keyword = '';
        },

        /**
         * 打开链接
         * 
         * @param {string} link 需要打开的链接
         * @param {boolean} showOnly 是否仅显示链接
         */
        openLink(link, showOnly) {
            if (link === undefined) {
                return false;
            }

            if (showOnly) {
                window.prompt('请复制后手动在新标签页中打开', link);
            } else {
                window.open(link, '_blank');
            }
        },

        /**
         * 搜索引擎
         */
        searchEngineSubmit() {
            var vm = this;
            var search = this.searchEngine;
            var keyword = search.keyword;
            var types = search.types;
            var url = '';

            if (keyword == '') {
                return false;
            } else {
                // 编码
                keyword = window.encodeURIComponent(keyword);
            }

            for (let index in types) {
                if (types[index].name == vm.config.searchEngine) {
                    url = types[index].url.replace(/%keyword%/, keyword);
                    vm.openLink(url);
                    break;
                }
            }
        },

        /**
         * 搜索链接
         */
        searchLink(value, data) {
            // 关键词为空，显示全部

            if (value == '') {
                return true
            }

            // 过滤后

            var searchType = this.linkSearch.type;
            var result = false;

            if (searchType == 'all') {
                // 全部
                result = (data.title.toLowerCase().indexOf(value) !== -1) || (data.link && (data.link.indexOf(value) !== -1));
            } else if (searchType == 'title') {
                // 标题
                result = (data.title.toLowerCase().indexOf(value) !== -1);
            } else if (searchType == 'link') {
                // 链接
                result = (data.link && (data.link.indexOf(value) !== -1));
            }

            return result;
        },

    },
}
</script>

<style lang="less" scoped>
.home-aside {
    // width: 18rem !important;
    width: auto !important;
    overflow-x: hidden;

    .side-nav {
        min-height: 100%;
    }
}

.home-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    padding: 1rem;
    background-color: @colorWhite;
    overflow-y: scroll;

    .wrapper {
        width: 100%;
        min-width: 16rem;
        max-width: 60rem;
    }

    /deep/ .search-engine {
        display: flex;
        align-items: center;
        flex-direction: column;

        .search-bar {
            display: flex;
            align-items: center;
            position: sticky;
            top: .5rem;
            z-index: 100;
            width: 100%;
            max-width: 40rem;
            height: 2.8rem;
            border-radius: .25rem;
            background-color: #FFF;
            overflow: hidden;

            .input {
                flex-grow: 1;
                padding-left: 1rem;
                width: 0;
                height: 100%;
                outline: none;
            }

            .btn {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
                width: 2.8rem;
                height: 2.8rem;
                background-color: transparent;
                font-size: 1.2rem;    
                cursor: pointer;
            }

            .btn-clear {
                width: 2rem;
                opacity: .5;
                transition: opacity @transitionTime;

                &:hover {
                    opacity: 1;
                }
            }

            .btn-search {
                color: @colorPrimary;
                transition: background @transitionTime, color @transitionTime;

                &:hover {
                    background-color: @colorPrimary;
                    color: #FFF;
                }
            }
        }

        .search-type {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            justify-content: center;
            margin: 2rem 0;
            font-size: 1rem;
            transition: opacity calc(@transitionTime * 4);

            &.fade {
                opacity: 0.5;
            }

            > label {
                margin: 1em .5em;
                margin-top: 0;
                padding: 1em;
                width: 45%;
                min-width: 18em;
                border-bottom: solid .15rem transparent;
                border-radius: .25em;
                background-color: #FFF;
                text-align: left;
                font-weight: normal;
                transition: border @transitionTime;

                // 隐藏占位元素
                &:last-child {
                    visibility: hidden;
                }

                // 若占位元素为第奇数个，不显示
                &:last-child:nth-child(odd) {
                    display: none;
                }

                &.is-checked {
                    border-bottom-color: @colorPrimary;
                }
            }

            .el-radio__input {
                display: none;
            }

            .el-radio__label {
                padding: 0;
                transition: color @transitionTime;

                i {
                    vertical-align: middle;
                    font-style: normal;
                }

                .fn-icon {
                    margin-right: .4em;
                }

                .desc {
                    margin-left: .5em;
                    font-size: .8em;
                    color: #CCC;
                }
            }
        }
    }

    /deep/ .link-search {
        @height: 2.8rem;

        position: sticky;
        z-index: 100;
        top: 0;
        margin-bottom: 1rem;
        border-radius: .25rem;
        line-height: @height;
        overflow: hidden;

        > div, > input {
            border: none;
        }

        .el-input-group__prepend {
            background-color: #FFF;

            .el-select .el-input {
                width: 4.5rem;

                input {
                    padding: 0 .75rem;
                }
            }
        }

        .el-input__inner {
            height: @height;
            line-height: @height;
        }
    }

    .link-tree {
        padding: .5rem;
        border-radius: .25rem;
        font-size: 14px;

        /deep/ .el-tree-node__content {
            height: 3.6em;
        }

        .link-item {
            > span {
                display: -webkit-box;
            }

            .title {
                font-weight: bold;
            }

            .link {
                margin-top: .2rem;
                opacity: .5;
            }
        }
    }
}
</style>
