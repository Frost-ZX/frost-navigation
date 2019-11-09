/* ---- */
/* 变量 */
/* ---- */

// Slinky 插件的设置 //

var SlinkyOption = {
    title: true,
    speed: 200
};

var ListID = "#list_";                                                         // 列表 ID 前缀
var ListCount = 0;
var ListCountMax = 17;                                                         // 列表总数
var FullsSreenText = document.getElementsByClassName("fullscreen-text")[0];    // 全屏文字

// main 中的 A 标签的对象的集合（链接列表）//

var LinkList = document.getElementsByTagName("main")[0].getElementsByTagName("a");

// 搜索面板 //

var SearchMode = 1;
var SearchPanel = document.getElementsByClassName("search-panel")[0];          // 搜索面板
var SearchInput = document.getElementsByClassName("search-input")[0];          // 搜索输入框
var SearchResultTitle = document.getElementById("search-result-title");        // 搜索结果（标题）
var SearchResultLink = document.getElementById("search-result-link");          // 搜索结果（链接）
var SearchResultItem = "";

// 搜索引擎 //

var SearchEngineBaidu = document.getElementById("search-engine-baidu");        // 百度
var SearchEngineBing = document.getElementById("search-engine-bing");          // Bing
var SearchEngineGoogle = document.getElementById("search-engine-google");      // Google
var SearchEnginebilibili = document.getElementById("search-engine-bilibili");  // bilibili

// 工具面板 //

var ToolPanel = document.getElementsByClassName("tool-panel")[0];   


/* ---- */
/* 函数 */
/* ---- */

// 查找字符 tChar 在 str 中第 num 次出现的位置 //

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

// 设置 target = "_blank" //

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

// 显示列表 //

function displayList() {
    document.getElementsByTagName("main")[0].style.opacity = "1";
    FullsSreenText.style.opacity = "0";
    setTimeout("document.getElementsByClassName('fullscreen-text')[0].style.display = 'none';", 1000);
}

// 加载列表 //

function loadList() {
    ListCount = ListCount + 1;
    ListID = "#list_" + ListCount;
    $(ListID).slinky(SlinkyOption);
    FullsSreenText.innerText = "已加载 " + ListCount + " 个分类";              // 全屏文字
    // 加载完毕 //
    if (ListCount == ListCountMax) {
        clearInterval(I_LoadList);                                             // 停止定时执行
        FullsSreenText.innerText = "加载完毕";                                 // 全屏文字
        setTarget();                                                           // 设置 target
        displayList();                                                         // 显示列表
    }
}
var I_LoadList = setInterval("loadList()", 100);                               // 加载列表，间隔 100 毫秒

// 搜索面板 //

function searchLink() {
    var LinkListCount = LinkList.length;                                       // 循环次数
    var SearchWord = SearchInput.value.toLowerCase();                          // 搜索关键词
    if (SearchMode == 1 && SearchWord != "") {
        SearchResultTitle.innerHTML = "";                                      // 清空搜索结果（标题）
        SearchResultLink.innerHTML = "";                                       // 清空搜索结果（链接）
        for (var i = 0; i < LinkListCount; i++) {
            // 排除 href 是 # 的元素 //
            if (LinkList[i].href.endsWith("#") == false) {
                // 匹配关键词 //
                if (LinkList[i].innerText.toLowerCase().indexOf(SearchWord) != -1) {
                    // 匹配标题 //
                    SearchResultItem = LinkList[i].cloneNode(true);
                    SearchResultTitle.appendChild(SearchResultItem);           // 复制元素
                } else if (LinkList[i].href.indexOf(SearchWord) != -1) {
                    // 匹配链接 //
                    SearchResultItem = LinkList[i].cloneNode(true);
                    SearchResultLink.appendChild(SearchResultItem);            // 复制元素
                }
            }
        }
    } else if (SearchMode == 1 && SearchWord == "") {
        SearchResultTitle.innerHTML = "";
        SearchResultLink.innerHTML = "未输入关键词";
    } else if (SearchMode == 2) {
        SearchInput.value = "";                                                // 清空输入框
        SearchResultTitle.innerHTML = "";                                      // 清空搜索结果（标题）
        SearchResultLink.innerHTML = "";                                       // 清空搜索结果（链接）
        SearchPanel.style.visibility = "hidden";                               // 隐藏搜索面板
    } else {
        SearchResultTitle.innerHTML = "";
        SearchResultLink.innerHTML = "异常";
    }
}

// 搜索引擎 //

function searchWeb() {
    var GetSearchWord = document.getElementById("search-engine-input");        // 关键词输入框
    var SearchWord = GetSearchWord.value;                                      // 关键词
    if (SearchEngineBaidu.checked == true) {
        window.open("https://www.baidu.com/s?ie=UTF-8&wd=" + SearchWord);
    } else if (SearchEngineBing.checked == true) {
        window.open("https://cn.bing.com/search?q=" + SearchWord);
    } else if (SearchEngineGoogle.checked == true) {
        window.open("https://www.google.com/search?q=" + SearchWord);
    } else if (SearchEnginebilibili.checked == true) {
        window.open("https://search.bilibili.com/all" + "?keyword=" + SearchWord);
    } else {
        GetSearchWord.value = "搜索引擎选择有误！"
    }
}
function setSearchEngine(Name) {
    switch (Name)
    {
        case "baidu":
        localStorage.setItem("SearchEngine", "baidu");
        break;
        case "bing":
        localStorage.setItem("SearchEngine", "bing");
        break;
        case "google":
        localStorage.setItem("SearchEngine", "google");
        break;
        case "bilibili":
        localStorage.setItem("SearchEngine", "bilibili");
        break;
    }
}
function getSearchEngine() {
    var SearchEngine = localStorage.getItem("SearchEngine");
    if (SearchEngine == "baidu") {
        SearchEngineBaidu.checked = true;
    } else if (SearchEngine == "bing") {
        SearchEngineBing.checked = true;
    } else if (SearchEngine == "google") {
        SearchEngineGoogle.checked = true;
    } else if (SearchEngine == "bilibili") {
        SearchEnginebilibili.checked = true;
    }
}
getSearchEngine();
