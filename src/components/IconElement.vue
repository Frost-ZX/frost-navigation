<template>
    <i class="icon-element bg-center-contain" :style="iconStyle"></i>
</template>

<script>
export default {
    name: 'IconElement',
    props: {
        // 来源（inner、outer）
        from: {
            type: String,
            default: 'inner'
        },
        // 路径
        // 若为 inner，自动添加 @/assets/icon/
        path: {
            type: String,
            default: 'unknown.svg'
        },
        // 尺寸
        size: {
            type: String,
            default: '1em'
        },
        // 显示图标
        showIcon: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        // 图标样式
        iconStyle() {
            var style = {
                width: this.size,
                height: this.size
            };
            var iconPath = '';

            // 不显示图标内容
            if (!this.showIcon) {
                return style;
            }

            if (this.from === 'inner') {
                // 内部
                iconPath = require(`@/assets/icon/${this.path}`);
            } else if (this.from === 'outer') {
                // 外部
                iconPath = this.path;
            }

            style.backgroundImage = `url('${iconPath}')`;

            return style;
        }
    }
}
</script>

<style lang="less" scoped>
.icon-element {
    display: inline-block;
    vertical-align: middle;
    font-style: normal;
}
</style>
