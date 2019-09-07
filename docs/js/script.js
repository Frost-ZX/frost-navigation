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
    ListID = "#list_" + ListCount;
    $(ListID).slinky(SlinkyOption);
    document.title = "已加载 " + ListCount + " 个列表";
    // 加载完毕
    if (ListCount == ListCountMax) {
      clearInterval(I_LoadList);
      setTarget();
      displayList();
      document.title = 'Frost 网址导航';
    }
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

// 搜索框
var SearchMode = 1;
var SearchPanel = document.getElementsByClassName("search-panel")[0]; // 搜索面板
var SearchInput = document.getElementsByClassName("search-input")[0]; // 输入框
var SearchList = document.getElementsByTagName("main")[0].getElementsByTagName("a"); // 搜索源
var SearchText = document.getElementsByClassName("search-input")[0]; // 关键词
var SearchResult = document.getElementsByClassName("search-result")[0]; // 搜索结果
var SearchResultItem = "";
function search() {
    var SearchListCount = SearchList.length; // 循环次数
    var SearchWord = SearchText.value.toLowerCase();
    if (SearchMode == 1 && SearchWord != "") {
        SearchResult.innerHTML = ""; // 清空搜索结果
        for (var i = 0; i < SearchListCount; i++) {
            if (SearchList[i].innerText.toLowerCase().indexOf(SearchWord) != -1 && SearchList[i].href.endsWith("#") == false) {
                SearchResultItem = SearchList[i].cloneNode(true);
                SearchResult.appendChild(SearchResultItem);
            }
        }
    } else if (SearchMode == 1 && SearchWord == "") {
        SearchResult.innerHTML = "请输入关键词";
    } else if (SearchMode == 2) {
        SearchInput.value = ""; // 清空输入框
        SearchResult.innerHTML = ""; // 清空搜索结果
        SearchPanel.style.visibility = "hidden"; // 隐藏搜索面板
    }
}
