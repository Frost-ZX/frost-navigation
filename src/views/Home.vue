<template>
    <el-container class="home">

        <!-- 侧边栏 -->
        <el-aside class="home-aside">
            <el-menu class="side-nav" default-active="0" @select="changeCategory">

                <!-- 全部 -->
                <el-menu-item index="all">
                    <i class="el-icon-menu"></i>
                    <span slot="title">全部</span>
                </el-menu-item>

                <!-- 分类 -->
                <el-menu-item v-for="(item, itemIndex) in navLinks" :key="'list-' + itemIndex" :index="itemIndex.toString()">
                    <i class="el-icon-menu"></i>
                    <span slot="title">{{ item.title }}</span>
                </el-menu-item>

            </el-menu>
        </el-aside>

        <!-- 内容 -->
        <el-main class="home-content">

            <!-- 链接搜索框 -->
            <el-input v-model="linkSearch.keyword" class="link-search" placeholder="输入关键词以搜索链接"
                prefix-icon="el-icon-search" clearable
            >
                <el-select slot="prepend" v-model="linkSearch.type" placeholder="类型">
                    <el-option label="全部" value="all"></el-option>
                    <el-option label="标题" value="title"></el-option>
                    <el-option label="链接" value="link"></el-option>
                </el-select>
            </el-input>
            
            <!-- 链接列表树 -->
            <el-tree ref="linkTree" class="link-tree" :data="currentLinks" :props="{ label: 'title', children: 'sub' }"
                node-key="id" :default-expand-all="false" :expand-on-click-node="false" :filter-node-method="searchLink"
            >
                <div slot-scope="{ node, data }" class="link-item" @click="openLink(data.link)">
                    <span class="title">{{ node.label }}</span>
                    <span class="link">{{ data.link }}</span>
                </div>
            </el-tree>

        </el-main>

    </el-container>
</template>

<script>
export default {
    name: 'Home',
    data() {
        return {
            // 所有链接
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
    methods: {
        log(...datas) {
            console.log(datas);
        },
        /** 
         * 更改当前显示的分类
        */
        changeCategory(index) {
            if (index == 'all') {
                this.currentLinks = this.navLinks;
            } else {
                this.currentLinks = this.navLinks[Number(index)].sub;
            }
        },
        /**
         * 打开链接
         * 
         * @param {string} link 需要打开的链接
         */
        openLink(link) {
            if (link != undefined) {
                window.open(link, '_blank');
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
        }
    },
    beforeRouteEnter(from, to, next) {
        next(vm => {
            setTimeout(() => {
                vm.changeCategory(0);
            }, 1000);
        });
    }
}
</script>

<style lang="less" scoped>
.home-aside {
    width: 18rem !important;
    overflow-x: hidden;

    .side-nav {
        min-height: 100%;
    }
}

.home-content {
    position: relative;

    .link-search {
        position: sticky;
        z-index: 100;
        top: 0;
        margin-bottom: 1rem;

        /deep/ .el-input-group__prepend {
            background-color: #FFF;

            .el-select .el-input {
                width: 4.5rem;

                input {
                    padding: 0 0.75rem;
                }
            }
        }
    }

    .link-tree {
        font-size: 14px;

        /deep/ .el-tree-node__content {
            height: 3.6em;
        }

        .link-item {
            > span {
                display: block;
            }

            .title {
                font-weight: bold;
            }

            .link {
                margin-top: 0.2rem;
                opacity: 0.5;
            }
        }
    }
}
</style>
