/* ---- */
/* 变量 */
/* ---- */

// main 中的 A 标签的对象的集合（链接列表）//
var LinkList = document.querySelectorAll("main a");

// 查找面板 //
var SearchMode = 1;
var SearchPanel = document.querySelector(".search-panel");                     // 查找面板
var SearchInput = document.querySelector(".search-input");                     // 查找输入框
var SearchResultTitle = document.querySelector("#search-result-title");        // 查找结果（标题）
var SearchResultLink = document.querySelector("#search-result-link");          // 查找结果（链接）
var SearchResultItem = "";

// 搜索引擎 //
var SearchEngineBaidu = document.querySelector("#search-engine-baidu");        // 百度
var SearchEngineBing = document.querySelector("#search-engine-bing");          // Bing
var SearchEngineGoogle = document.querySelector("#search-engine-google");      // Google
var SearchEnginebilibili = document.querySelector("#search-engine-bilibili");  // bilibili

// 工具面板 //
var ToolPanel = document.querySelector(".tool-panel");   


/* ---- */
/* 函数 */
/* ---- */

/* 链接查找 */

function searchLink() {
    var LinkListCount = LinkList.length;                                       // 循环次数
    var SearchWord = SearchInput.value.toLowerCase();                          // 查找关键词
    if (SearchMode == 1 && SearchWord != "") {
        SearchResultTitle.innerHTML = "";                                      // 清空查找结果（标题）
        SearchResultLink.innerHTML = "";                                       // 清空查找结果（链接）
        for (var i = 0; i < LinkListCount; i++) {
            // 排除 href 是 # 的元素 //
            if (LinkList[i].href.endsWith("#") == false) {
                // 匹配关键词 //
                if (LinkList[i].innerHTML.toLowerCase().indexOf(SearchWord) != -1) {
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
        SearchResultTitle.innerHTML = "";                                      // 清空查找结果（标题）
        SearchResultLink.innerHTML = "";                                       // 清空查找结果（链接）
        SearchPanel.style.visibility = "hidden";                               // 隐藏查找面板
    } else {
        SearchResultTitle.innerHTML = "";
        SearchResultLink.innerHTML = "异常";
    }
}

/* 搜索引擎 */

// 搜索 //
function searchWeb() {
    var GetSearchWord = document.querySelector("#search-engine-input");        // 关键词输入框
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

// 储存当前搜索引擎 //
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
        default:
            break;
    }
}

// 设置当前搜索引擎 //
function getSearchEngine() {
    var SearchEngine = localStorage.getItem("SearchEngine");
    switch (SearchEngine){
        case "baidu":
            SearchEngineBaidu.checked = true;
            break;
        case "bing":
            SearchEngineBing.checked = true;
            break;
        case "google":
            SearchEngineGoogle.checked = true;
            break;
        case "bilibili":
            SearchEnginebilibili.checked = true;
            break;
        default:
            break;
    }
}
getSearchEngine();

/* 工具面板 */

// 显示 //
function showToolPanel() {
    ToolPanel.style.display = "block";
}

// 关闭 //
function closeToolPanel() {
    ToolPanel.style.bottom = "-110%";
    ToolPanel.style.opacity = "0";
    setTimeout(function () {
        ToolPanel.style.display = "none";
        ToolPanel.style.bottom = "0";
        ToolPanel.style.opacity = "1";
    }, 500);
}
