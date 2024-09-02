// Slinky 插件的设置 //
var SlinkyOption = {
    title: true,
    speed: 400
};

var ListIDPrefix = '#list_'; // 列表 ID 前缀（自定义）
var ListCount = 0;
var ListCountMax = 17;       // 列表总数（自定义）
var FullsSreenText = document.querySelector('.fullscreen-text');

// 链接 //
var Links = {};

// 设置 target = '_blank' //
function setTarget() {
    for (var i = 0; i < LinkList.length; i++) {
        if (LinkList[i].href.endsWith('#') == false) {
            LinkList[i].target = '_blank';
            /* 自动加图标（暂不使用；可使用 LazyLoad）
            var slashPos = findChar(LinkList[i].href, '/', 3);
            getFavicon = 'https://www.google.cn/s2/favicons?domain=' + LinkList[i].href.substring(0, slashPos);
            var imgTag = '<img src="' + getFavicon + '" />';
            LinkList[i].insertAdjacentHTML('beforeBegin', imgTag);
            */
        }
    }
}

// 显示列表 //
function displayList() {
    document.querySelector('main').style.opacity = '1';
    FullsSreenText.style.opacity = '0';
    setTimeout(function () {
        document.querySelector('.fullscreen-text').style.display = 'none';
    }, 1000);
}

// 加载列表 //
function loadList() {
    ListCount = ListCount + 1;
    $(ListIDPrefix + ListCount).slinky(SlinkyOption);
    FullsSreenText.innerHTML = '已加载 ' + ListCount + ' 个分类';
    // 加载完毕 //
    if (ListCount == ListCountMax) {
        clearInterval(iLoadList);
        FullsSreenText.innerHTML = '加载完毕';
        setTarget();
        displayList();
    }
}
var iLoadList = setInterval('loadList()', 100);
