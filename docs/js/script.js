/* ------------------------------------------- */
/* 查找字符 tChar 在 str 中第 num 次出现的位置 */
/* ------------------------------------------- */

/* 暂不使用
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

/* -------- */
/* 加载列表 */
/* -------- */

// Slinky 插件的 Option //
var SlinkyOption = {
    title: true,
    speed: 200
};
var ListID = "#list_";                                                      // 列表 ID 前缀
var ListCount = 0;
var ListCountMax = 17;                                                      // 列表总数
var FullsSreenText = document.getElementsByClassName("fullscreen-text")[0]; // 全屏文字
function loadList() {
    ListCount = ListCount + 1;
    ListID = "#list_" + ListCount;
    $(ListID).slinky(SlinkyOption);
    FullsSreenText.innerText = "已加载 " + ListCount + " 个分类";           // 全屏文字
    // 加载完毕 //
    if (ListCount == ListCountMax) {
        clearInterval(I_LoadList);                                          // 停止定时执行
        FullsSreenText.innerText = "加载完毕";                              // 全屏文字
        setTarget();                                                        // 设置 target
        displayList();                                                      // 显示列表
    }
}

/* --------------------------------------- */
/* main 中的 A 标签的对象的集合（链接列表）*/
/* --------------------------------------- */

var LinkList = document.getElementsByTagName("main")[0].getElementsByTagName("a");

/* ---------------------- */
/* 设置 target = "_blank" */
/* ---------------------- */

function setTarget() {
    for (var i = 0; i < LinkList.length; i++) {
        if (LinkList[i].href.endsWith("#") == false) {
            LinkList[i].target = "_blank";
            /* 自动加图标（暂不使用）
            var slashPos = findChar(LinkList[i].href, '/', 3);
            getFavicon = "https://www.google.cn/s2/favicons?domain=" + LinkList[i].href.substring(0, slashPos);
            var imgTag = "<img src='" + getFavicon + "' />";
            LinkList[i].insertAdjacentHTML("beforeBegin", imgTag);
            */
        }
    }
}

/* -------- */
/* 显示列表 */
/* -------- */

function displayList() {
    document.getElementsByTagName("main")[0].style.opacity = "1";
    FullsSreenText.style.opacity = "0";
    setTimeout("document.getElementsByClassName('fullscreen-text')[0].style.display = 'none';", 1000);
}

/* ----------------------- */
/* 加载列表，间隔 100 毫秒 */
/* ----------------------- */

var I_LoadList = setInterval("loadList()", 100);

/* -------- */
/* 搜索面板 */
/* -------- */

var SearchMode = 1;
var SearchPanel = document.getElementsByClassName("search-panel")[0];   // 搜索面板
var SearchInput = document.getElementsByClassName("search-input")[0];   // 搜索输入框
var SearchResult = document.getElementsByClassName("search-result")[0]; // 搜索结果
var SearchResultItem = "";
function search() {
    var LinkListCount = LinkList.length;                                // 循环次数
    var SearchWord = SearchInput.value.toLowerCase();                   // 搜索关键词
    if (SearchMode == 1 && SearchWord != "") {
        SearchResult.innerHTML = "";                                    // 清空搜索结果
        for (var i = 0; i < LinkListCount; i++) {
            // 排除 href 是 # 的元素 //
            if (LinkList[i].href.endsWith("#") == false) {
                // 匹配关键词 //
                if (LinkList[i].innerText.toLowerCase().indexOf(SearchWord) != -1 || LinkList[i].href.indexOf(SearchWord) != -1) {
                    // 复制元素 //
                    SearchResultItem = LinkList[i].cloneNode(true);
                    SearchResult.appendChild(SearchResultItem);
                }
            }
        }
    } else if (SearchMode == 1 && SearchWord == "") {
        SearchResult.innerHTML = "请输入关键词";
    } else if (SearchMode == 2) {
        SearchInput.value = "";                       // 清空输入框
        SearchResult.innerHTML = "";                  // 清空搜索结果
        SearchPanel.style.visibility = "hidden";      // 隐藏搜索面板
    } else {
        SearchResult.innerHTML = "异常";
    }
}

/* -------- */
/* 工具面板 */
/* -------- */

var ToolPanel = document.getElementsByClassName("tool-panel")[0];   // 工具面板
