<template>
    <el-container class="home">

        <!-- 侧边栏 -->
        <el-aside class="home-aside">
            <el-menu
                class="side-nav"
                default-active="search"
                :collapse="config.sideMenuCollapse"
                @select="changeCategory"
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
                <el-menu-item
                    v-for="(item, itemIndex) in navLinks.list"
                    :key="'list-' + itemIndex"
                    :index="itemIndex.toString()"
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
                        <input
                            v-model="searchEngine.keyword"
                            class="input" type="text"
                            @blur="searchEngine.isFocus = false"
                            @focus="searchEngine.isFocus = true"
                            @keydown.enter.exact="searchEngineSubmit()"
                        />

                        <!-- 清除 -->
                        <div
                            v-show="searchEngine.keyword.length > 0"
                            class="btn btn-clear"
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
                    <el-radio-group
                        v-model="config.searchEngine"
                        size="small"
                        :class="['search-type', { fade: searchEngine.isFocus }]"
                    >
                        <!-- 分类 -->
                        <div v-for="(category, cIndex) in searchEngine.list" :key="cIndex" class="category">

                            <!-- 标题 -->
                            <div class="title">{{ category.title }}</div>

                            <!-- 项 -->
                            <el-radio
                                v-for="item in category.list" :key="item.name"
                                :label="item.name" class="shadow-2"
                            >
                                <Icon :path="item.icon || 'website/default.svg'" size="1.2em" />
                                <i class="name">{{ item.name }}</i>
                                <i class="desc limit-line-1">{{ item.desc }}</i>
                            </el-radio>

                        </div>
                    </el-radio-group>

                </div>

                <!-- 链接搜索框 -->
                <el-input
                    v-show="show.searchLink" v-model="searchLink.keyword"
                    class="link-search shadow-2" placeholder="搜索链接" clearable
                >
                    <el-select slot="prepend" v-model="searchLink.type" placeholder="类型">
                        <el-option label="全部" value="all"></el-option>
                        <el-option label="标题" value="title"></el-option>
                        <el-option label="链接" value="link"></el-option>
                    </el-select>
                </el-input>

                <!-- 链接列表树 -->
                <el-tree
                    v-show="show.linkTree" ref="linkTree" class="link-tree shadow-2"
                    :data="currentLinks" node-key="id" empty-text=""
                    :props="{ label: 'title', children: 'sub' }" :filter-node-method="searchLinkSubmit"
                    :default-expand-all="false" :expand-on-click-node="true"
                >
                    <div
                        slot-scope="{ node, data }" class="link-item" :title="data.update"
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
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.utils.changeTitle();
        });
    },
    data() {
        return {
            config: this.$root.config.storage,
            utils: this.$root.utils,
            // 显示的内容
            show: {
                searchEngine: true,
                searchLink: false,
                linkTree: false,
            },
            // 搜索引擎
            searchEngine: {
                isFocus: false,
                keyword: '',
                url: '',
                list: this.$root.config.searchEngines
            },
            // 导航链接
            navLinks: this.$root.navLinks,
            // 当前显示的链接
            currentLinks: [],
            // 搜索链接
            searchLink: {
                debounce: null,
                keyword: '',
                type: 'all'
            }
        };
    },
    watch: {
        'searchLink.keyword': {
            handler(value) {
                clearTimeout(this.searchLink.debounce);

                this.searchLink.debounce = setTimeout(() => {
                    this.$refs.linkTree.filter(value);
                }, 500);
            }
        },
        'searchLink.type': {
            handler() {
                // 更改搜索类型时自动重新搜索
                this.$refs.linkTree.filter(this.searchLink.keyword);
            }
        }
    },
    methods: {

        /** 
         * 更改当前显示的分类
        */
        changeCategory(index) {
            if (index == 'search') {
                this.currentLinks = [];
                this.show.searchEngine = true;
                this.show.searchLink = false;
                this.show.linkTree = false;
            } else if (index == 'all') {
                this.currentLinks = this.navLinks.list;
                this.show.searchEngine = false;
                this.show.searchLink = true;
                this.show.linkTree = true;
            } else {
                this.currentLinks = this.navLinks.list[Number(index)].sub;
                this.show.searchEngine = false;
                this.show.searchLink = true;
                this.show.linkTree = true;
            }

            this.searchLink.keyword = '';
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
            var selected = this.config.searchEngine;
            var keyword = search.keyword;
            var url = '';

            if (keyword == '') {
                return false;
            } else {
                keyword = window.encodeURIComponent(keyword);
            }

            for (let category in search.list) {
                let list = search.list[category].list;

                for (let index in list) {
                    if (list[index].name == selected) {
                        url = list[index].url.replace(/%keyword%/, keyword);
                        break;
                    }
                }
            }

            vm.openLink(url);
        },

        /**
         * 搜索链接
         */
        searchLinkSubmit(value, data) {
            // 关键词为空，显示全部

            if (value === '') {
                return true;
            }

            // 小写
            value = value.toLowerCase();

            // 过滤后

            var searchType = this.searchLink.type;
            var title = data.title.toLowerCase();
            var link = (data.link || '');
            var result = false;

            if (searchType == 'all') {
                // 全部
                result = ((title.indexOf(value) !== -1) || (link.indexOf(value) !== -1));
            } else if (searchType == 'title') {
                // 标题
                result = (title.indexOf(value) !== -1);
            } else if (searchType == 'link') {
                // 链接
                result = (link.indexOf(value) !== -1);
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
    padding: 1rem 2rem;
    background-color: @colorWhite;
    overflow-y: scroll;

    .wrapper {
        width: 100%;
        min-width: 16rem;
        max-width: 64rem;
    }
}

.search-engine {
    display: flex;
    align-items: center;
    flex-direction: column;

    .search-bar {
        display: flex;
        align-items: center;
        position: sticky;
        top: 3rem;
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
        display: block;
        margin: 4.5rem 0;
        font-size: 1rem;
        transition: opacity calc(@transitionTime * 4);

        &.fade {
            opacity: .5;
        }

        /deep/ .category {
            padding: .5rem 0;

            .title {
                margin: .5rem 0;
            }

            .el-radio {
                margin: .5rem;
                padding: .8rem 1rem;
                width: 15rem;
                border-radius: .25rem;
                border-left: solid .2rem transparent;
                background-color: #FFF;
                text-align: left;
                font-weight: normal;
                transition: border @transitionTime;

                &:hover {
                    border-left-color: @colorSecondary;
                    color: @colorSecondary;
                }

                &.is-checked {
                    border-left-color: @colorPrimary;
                    color: @colorPrimary;
                }
            }

            .el-radio__input {
                display: none;
            }

            .el-radio__label {
                display: flex;
                align-items: center;
                padding: 0;
                transition: color @transitionTime;

                i {
                    display: inline-block;
                    padding: .125rem 0;
                    font-style: normal;
                }

                .fn-icon {
                    flex-shrink: 0;
                    margin-right: .4rem;
                }

                .name {
                    flex-shrink: 0;
                }

                .desc {
                    flex-grow: 1;
                    margin-left: .5rem;
                    font-size: .8rem;
                    color: #CCC;
                }
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
        flex-grow: 1;
        width: 0;

        > span {
            display: block;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .title {
            opacity: 1;
        }

        .link {
            margin-top: .2rem;
            opacity: .5;
        }
    }
}
</style>
