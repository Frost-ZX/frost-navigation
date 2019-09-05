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

/* 一个模块
 * #list_ID 对应 DIV 标签中的 id="list_ID"
 * window.slinky = $('#list_ID').slinky();
 */
function loadList() {
    window.slinky = $('#list_knowledge').slinky(); // 百科 / 科普
    window.slinky = $('#list_community').slinky(); // 博客 / 论坛 / 社区
    window.slinky = $('#list_create').slinky(); // 创作 / 制作
    window.slinky = $('#list_media').slinky(); // 多媒体
    window.slinky = $('#list_tool').slinky(); // 工具
    window.slinky = $('#list_shopping').slinky(); // 购物
    window.slinky = $('#list_design').slinky(); // 设计
    window.slinky = $('#list_life').slinky(); // 生活
    window.slinky = $('#list_debug').slinky(); // 调试
    window.slinky = $('#list_network').slinky(); // 网络
    window.slinky = $('#list_system').slinky(); // 系统
    window.slinky = $('#list_writing').slinky(); // 写作
    window.slinky = $('#list_study').slinky(); // 学习
    window.slinky = $('#list_bank').slinky(); // 银行
    window.slinky = $('#list_game').slinky(); // 游戏
    window.slinky = $('#list_news').slinky(); // 资讯
    window.slinky = $('#list_resource').slinky(); // 资源
    var aList = document.getElementsByTagName("a");
    for (var i = 0; i < aList.length; i++) {
        if (aList[i].href.endsWith("#") == false) {
            /* 自动加图标（失败）
            var slashPos = findChar(aList[i].href, '/', 3);
            getFavicon = aList[i].href.substring(0, slashPos) + "/favicon.ico";
            var imgTag = "<img src='" + getFavicon + "' />";
            aList[i].insertAdjacentHTML("beforeBegin", imgTag);
            */
            aList[i].target = "_blank";
        }
    }
}

// 显示列表
function displayList() {
    document.getElementsByTagName("main")[0].style.opacity = "1";
    document.getElementsByClassName("fullscreen-text")[0].style.opacity = "0";
    setTimeout("document.getElementsByClassName('fullscreen-text')[0].style.display = 'none';", 1000);
}

setTimeout("loadList();displayList()", 1000);
