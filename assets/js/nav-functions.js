// 查找字符 tChar 在 str 中第 num 次出现的位置

function findChar(str, tChar, num) {
    var charPos = str.indexOf(tChar);
    num = num - 1;
    if (num > 0) {
        for (var i = 0; i < num; i++) {
            charPos = str.indexOf(tChar, charPos + 1);
        }
    }
    return charPos;
}

// 返回顶部

function toTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
