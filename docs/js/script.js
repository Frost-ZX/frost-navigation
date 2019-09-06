// 查找字符 tChar 在 str 中第 num 次出现的位置
/* 暂时用不到
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
*/

// 加载列表
var SlinkyOption = {title: true, speed: 200}; // Slinky 插件的 Option
var ListID = "#list_"
var ListCount = 0;
var ListCountMax = 17; // 列表总数
function loadList() {
    ListCount = ListCount + 1;
    if (ListCount == ListCountMax) {
      clearInterval(I_LoadList);
      setTimeout("setTarget();displayList();console.log('列表加载完毕');", 200); // 调用
    }
    ListID = "#list_" + ListCount;
    $(ListID).slinky(SlinkyOption);
    // console.log("已加载 " + ListCount + " 个列表");
}

// 设置 target = "_blank"
function setTarget() {
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

// 调用（加载列表，间隔 100 毫秒）
var I_LoadList = setInterval("loadList()", 100);
