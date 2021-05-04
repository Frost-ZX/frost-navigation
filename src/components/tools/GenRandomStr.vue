<template>
    <div class="tool-elem">

        <div class="info">
            <div class="title">配置选项 &amp; 结果</div>
            <div class="content">
                <el-form label-width="6rem">
                    <!-- 字符串长度 -->
                    <el-form-item label="字符串长度">
                        <el-input v-model.number="info.strLength" type="number" min="1" max="1024"></el-input>
                    </el-form-item>
                    <!-- 字符串格式 -->
                    <el-form-item label="字符串格式">
                        <el-checkbox v-model="info.option.hasNum"
                            name="option" label="hasNum"
                        >数字</el-checkbox>
                        <el-checkbox v-model="info.option.hasChar"
                            name="option" label="hasChar"
                        >字母</el-checkbox>
                        <el-checkbox v-model="info.option.hasSymbol"
                            name="option" label="hasSymbol"
                        >其他符号</el-checkbox>
                        <el-checkbox v-model="info.option.caseSensitive"
                            name="option" label="caseSensitive"
                        >大小写</el-checkbox>
                        <el-checkbox v-model="info.option.lowerCase"
                            name="option" label="lowerCase"
                        >全小写（需要选择“字母”且不选择“大小写”）</el-checkbox>
                    </el-form-item>
                    <!-- 生成结果 -->
                    <el-form-item label="生成结果">
                        <el-input v-model="info.result" type="text" readonly></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </div>

        <div class="action">
            <div class="title">操作</div>
            <div class="content">
                <el-button type="primary" @click="btnGenerate()">生成</el-button>
            </div>
        </div>

        <div class="reference">
            <div class="title">参考资料</div>
            <div class="content">
                <el-link href="https://www.cnblogs.com/hankuksui/p/9892729.html" target="_blank" type="primary">博客园 - hankuksui</el-link>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'GenRandomStr',
    data() {
        return {
            info: {
                strLength: 8,
                option: {
                    caseSensitive: false,
                    hasNum: false,
                    hasChar: false,
                    hasSymbol: false,
                    lowerCase: false
                },
                result: ''
            }
        }
    },
    methods: {

        /**
         * 生成
         */
        btnGenerate() {
            var len = this.info.strLength;
            var op = this.info.option;
            var r = this.genRandomStr(len, op.hasNum, op.hasChar, op.hasSymbol, op.caseSensitive, op.lowerCase);

            this.info.result = r;
        },

        /**
         * 生成随机字符串
         * 
         * @param {number} strLength 长度
         * @param {boolean} hasNum 是否包含数字
         * @param {boolean} hasChar 是否包含字母
         * @param {boolean} hasSymbol 是否包含其他符号
         * @param {boolean} caseSensitive 是否包含大小写
         * @param {boolean} lowerCase 是否全小写（当 caseSensitive 为 false 时起作用）
         * 
         * @returns {string} 生成的字符串
         */
        genRandomStr(strLength, hasNum, hasChar, hasSymbol, caseSensitive, lowerCase) {
            var result = '请选中数字、字母或其他符号的其中一项！';

            if (hasNum == false && hasChar == false && hasSymbol == false) {
                return result;
            }

            result = '';

            for (var i = strLength; i > 0; i--) {
                let num = Math.floor((Math.random() * 94) + 33);
                let flag = ((
                    (hasNum == false) && ((num >= 48) && (num <= 57))
                ) || (
                    (hasChar == false) && ((
                        (num >= 65) && (num <= 90)
                    ) || (
                        (num >= 97) && (num <= 122)
                    ))
                ) || (
                    (hasSymbol == false) && ((
                        (num >= 33) && (num <= 47)
                    ) || (
                        (num >= 58) && (num <= 64)
                    ) || (
                        (num >= 91) && (num <= 96)
                    ) || (
                        (num >= 123) && (num <= 127)
                    )
                )));

                if (flag) {
                    i++;
                    continue;
                }

                /**
                 * | CharCode   | 符号   |
                 * | :--------- | :----- |
                 * | 033 -> 047 | ! -> / |
                 * | 048 -> 057 | 0 -> 9 |
                 * | 058 -> 064 | : -> @ |
                 * | 065 -> 090 | A -> Z |
                 * | 091 -> 096 | [ -> ` |
                 * | 097 -> 122 | a -> z |
                 * | 123 -> 127 | { ->   |
                 */

                result += String.fromCharCode(num);
            }

            if (caseSensitive == false) {
                result = (lowerCase ? result.toLocaleLowerCase() : result.toUpperCase());
            }

            return result;
        }

    },
}
</script>

<style lang="less" scoped>
.tool-elem {
    .content {
        max-width: 30rem;
    }
}
</style>
