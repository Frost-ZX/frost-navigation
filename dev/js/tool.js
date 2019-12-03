/* --------------- */
/* Unix 时间戳转换 */
/* --------------- */

// 函数：将传入的时间转换为时间戳 //
function toolUnixTimeToUnix(GetTime, isMillisecond) {
    var Time = new Date();                      // 创建 Date 对象
    // 根据 GetTime 设置时间 //
    Time.setFullYear(GetTime.substring(0, 4));  // GetTime 的子串：年
    Time.setMonth(GetTime.substring(5, 7) - 1); // GetTime 的子串：月
    Time.setDate(GetTime.substring(8, 10));     // GetTime 的子串：日
    Time.setHours(GetTime.substring(11, 13));   // GetTime 的子串：时
    Time.setMinutes(GetTime.substring(14, 16)); // GetTime 的子串：分
    Time.setSeconds(GetTime.substring(17, 19)); // GetTime 的子串：秒
    // 调试 //
    // console.log("时间：" + Time);
    // 根据 isMillisecond 确认输出的单位
    if (isMillisecond == false) {
        // 模式：秒 //
        var TextLength = Time.getTime().toString().length;                     // 获取字符串长度
        return Time.getTime().toString().substring(0, TextLength - 3);         // 返回时间戳
    } else if (isMillisecond == true) {
        // 模式：毫秒 //
        var TextLength = Time.getTime().toString().length;                     // 获取字符串长度
        return Time.getTime().toString().substring(0, TextLength - 3) + "000"; // 返回时间戳
    } else {
        return "模式有误！";
    }
}

// 函数：将传入的时间戳转换为时间 //
function toolUnixTimeToTime(GetUnix, isMillisecond) {
    var Time = new Date();               // 创建 Date 对象
    // 根据 isMillisecond 确认输入的单位
    if (isMillisecond == false) {
        // 模式：秒 //
        GetUnix = GetUnix + "000";       // 补零变为毫秒
        Time.setTime(GetUnix);           // 根据 GetUnix 设置时间
    } else if (isMillisecond == true) {
        // 模式：毫秒 //
        Time.setTime(GetUnix);           // 根据 GetUnix 设置时间
    } else {
        Time.setTime("0");               // 把时间设置为 0
    }
    var TimeYear = Time.getFullYear();   // 年
    var TimeMonth = Time.getMonth() + 1; // 月
    // 补零 //
    if (TimeMonth.toString().length == 1) {
        TimeMonth = "0" + TimeMonth;
    }
    var TimeDate = Time.getDate();       // 日
    // 补零 //
    if (TimeDate.toString().length == 1) {
        TimeDate = "0" + TimeDate;
    }
    var TimeHour = Time.getHours();      // 时
    // 补零 //
    if (TimeHour.toString().length == 1) {
        TimeHour = "0" + TimeHour;
    }
    var TimeMinute = Time.getMinutes();  // 分
    // 补零 //
    if (TimeMinute.toString().length == 1) {
        TimeMinute = "0" + TimeMinute;
    }
    var TimeSecond = Time.getSeconds();  // 秒
    // 补零 //
    if (TimeSecond.toString().length == 1) {
        TimeSecond = "0" + TimeSecond;
    }
    // 返回：年-月-日 时:分:秒 //
    return TimeYear + "-" + TimeMonth + "-" + TimeDate + " " + TimeHour + ":" + TimeMinute + ":" + TimeSecond;
}

// 按钮：当前 //
function toolUnixTimeNow() {
    var GetInputA = document.getElementById("tool-unixtime-input-a").getElementsByTagName("input")[0];   // 输入框 A
    var GetInputB = document.getElementById("tool-unixtime-input-b").getElementsByTagName("input")[0];   // 输入框 B
    var GetSettingAA = document.getElementById("unixtime-setting-aa").checked;                           // A 模式：秒
    var GetSettingAB = document.getElementById("unixtime-setting-ab").checked;                           // A 模式：毫秒
    var GetSettingBA = document.getElementById("unixtime-setting-ba").checked;                           // B 模式：秒
    var GetSettingBB = document.getElementById("unixtime-setting-bb").checked;                           // B 模式：毫秒
    // 调用函数，获取时间 //
    if (GetSettingAA == true) {
        var Time = new Date();                                                    // 创建 Date 对象
        var TextLength = Time.getTime().toString().length;                        // 获取字符串长度
        GetInputA.value = Time.getTime().toString().substring(0, TextLength - 3); // 时间戳（秒）
    } else if (GetSettingAB == true) {
        GetInputA.value = new Date().getTime();                                   // 时间戳（毫秒）
    }
    GetInputB.value = toolUnixTimeToTime(new Date().getTime(), true);             // 时间
}

// 按钮：转换 //
function toolUnixTimeSubmit() {
    var GetInputA = document.getElementById("tool-unixtime-input-a").getElementsByTagName("input")[0];   // 输入框 A
    var GetInputB = document.getElementById("tool-unixtime-input-b").getElementsByTagName("input")[0];   // 输入框 B
    var GetOutputA = document.getElementById("tool-unixtime-output-a").getElementsByTagName("input")[0]; // 输出框 A
    var GetOutputB = document.getElementById("tool-unixtime-output-b").getElementsByTagName("input")[0]; // 输出框 B
    var GetSettingAA = document.getElementById("unixtime-setting-aa").checked;                     // A 模式：秒
    var GetSettingAB = document.getElementById("unixtime-setting-ab").checked;                     // A 模式：毫秒
    var GetSettingBA = document.getElementById("unixtime-setting-ba").checked;                     // B 模式：秒
    var GetSettingBB = document.getElementById("unixtime-setting-bb").checked;                     // B 模式：毫秒
    // 调用函数，转换时间 //
    if (GetSettingAA == true) {
        // 秒 //
        GetOutputA.value = toolUnixTimeToTime(GetInputA.value, false);                             // 转换为时间
    } else if (GetSettingAB == true) {
        // 毫秒 //
        GetOutputA.value = toolUnixTimeToTime(GetInputA.value, GetSettingAB);                      // 转换为时间
    }
    GetOutputB.value = toolUnixTimeToUnix(GetInputB.value, GetSettingBB);                          // 转换为时间戳
}

// 按钮：重置 //
function toolUnixTimeClear() {
    document.querySelector("#tool-unixtime-input-a input").value = '';                             // 清空输入框 A
    document.querySelector("#tool-unixtime-input-b input").value = '';                             // 清空输入框 B
    document.querySelector("#tool-unixtime-output-a input").value = '';                             // 清空输出框 A
    document.querySelector("#tool-unixtime-output-b input").value = '';                             // 清空输出框 B
}

/* ---- */
/* 计算 */
/* ---- */

function toolCalculateSubmit() {
    GetInput = document.getElementById("tool-calculate-input");     // 算式输入框
    GetToFixed = document.getElementById("tool-calculate-tofixed"); // 保留小数点后的位数
    GetResult = document.getElementById("tool-calculate-result").getElementsByTagName("span")[0]; // 结果
    GetCal = GetInput.value;                                        // 获取输入的算式
    GetCal = GetCal.replace(/π/g, "Math.PI");                      // 替换（圆周率，Math.PI）
    GetCal = GetCal.replace(/幂/g, "Math.pow");                     // 替换（乘方运算，Math.pow）
    GetCal = GetCal.replace(/平方根/g, "Math.sqrt");                // 替换（乘方运算，Math.pow）
    // 运行 //
    if (GetToFixed.value >= 0 && GetToFixed.value <= 16) {
        GetResult.innerText = eval(GetCal).toFixed(GetToFixed.value);
    } else {
        GetResult.innerText = "保留位数有误（0 ~ 16 之间）";
    }
}

function toolCalculateClear() {
    GetInput = document.getElementById("tool-calculate-input");     // 算式输入框
    GetInput.value = '';                                            // 清空“输入框”和“结果”
    GetResult.innerText = '';                                       // 清空“结果”
}

/* ---------------- */
/* 生成批量下载链接 */
/* ---------------- */

function toolGenLinkSubmit() {
    var VarText = "(*)"; // 变量表示
    var BaseLink = document.getElementById("tool-genlink-link").getElementsByTagName("input")[0].value; // 网址
    var GetSettingType = document.getElementsByName("genlink-settings");                                // 批量变化类型
    // 设定 //
    var GetSettingA = document.getElementById("tool-genlink-settings-a").getElementsByTagName("input"); // 等差数列
    var GetSettingB = document.getElementById("tool-genlink-settings-b").getElementsByTagName("input"); // 等比数列
    var GetSettingC = document.getElementById("tool-genlink-settings-c").getElementsByTagName("input"); // 字母变化
    // 结果 //
    var GetResult = document.getElementById("tool-genlink-result");
    var LinkReplace = '';
    var LinkResult = '';
    // 自动补零 //
    function AddZero() {
        if (NumLength < NumLastLength) {
            var ZeroMax = NumLastLength - NumLength;       // 自动补零的个数
            // 自动补 0 //
            for (let i = 1; i <= ZeroMax; i++) {
                Num = "0" + Num;
            }
        }
    }
    // 替换变量；替换变量；判断是否开启倒序；拼接结果；拼接结果 //
    function CheckReverse() {
        LinkReplace = BaseLink.replace(VarText, Num);      // 替换链接中的变量为当前值（VarText 替换为 Num）
        if (GetReverse == false) {
            // console.log("非倒序");
            LinkResult = LinkResult + LinkReplace + "\n";  // 拼接结果
        } else if (GetReverse == true) {
            // console.log("倒序");
            LinkResult = LinkReplace + "\n" + LinkResult;  // 拼接结果
        }
    }
    // 运行 //
    if (GetSettingType[0].checked == true) {
        // 等差数列 //
        // console.log("等差数列");
        var GetFirst = parseInt(GetSettingA[1].value);     // 首项
        var GetLength = parseInt(GetSettingA[2].value);    // 项数
        var GetDiff = parseInt(GetSettingA[3].value);      // 公差
        var GetZero = GetSettingA[4].checked;              // 补零
        var GetReverse = GetSettingA[5].checked;           // 倒序
        // 判断是否开启补零 //
        if (GetZero == true) {
            // 等差数列 补零 //
            // console.log("等差数列 补零");
            var Num;                                                // 当前项的值
            var NumLength;                                          // 当前项的值的位数
            var NumLast = GetFirst + (GetLength - 1) * GetDiff;     // 根据等差数列通项公式计算末项的值
            var NumLastLength = NumLast.toString().length;          // 末项的值的位数
            // console.log("末项的值：" + NumLast);
            for (var i = 1; i <= GetLength; i++) {
                Num = GetFirst + (i - 1) * GetDiff;                 // 根据等差数列通项公式计算当前项的值
                NumLength = Num.toString().length;                  // 当前项的值的位数
                AddZero();                                          // 若位数不足，自动补零
                CheckReverse();                                     // 替换变量；判断是否开启倒序；拼接结果
            }
        } else if (GetZero == false) {
            // 等差数列 不补零 //
            // console.log("等差数列 不补零");
            var Num;                                                // 当前项的值
            for (var i = 1; i <= GetLength; i++) {
                Num = GetFirst + (i - 1) * GetDiff;                 // 根据等差数列通项公式计算当前项的值
                CheckReverse();                                     // 替换变量；判断是否开启倒序；拼接结果
            }
        }
    } else if (GetSettingType[1].checked == true) {
        // 等比数列 //
        var GetFirst = parseInt(GetSettingB[1].value);              // 首项
        var GetLength = parseInt(GetSettingB[2].value);             // 项数
        var GetDiff = parseInt(GetSettingB[3].value);               // 公比
        var GetZero = GetSettingB[4].checked;                       // 补零
        var GetReverse = GetSettingB[5].checked;                    // 倒序
        // 判断是否开启补零 //
        if (GetZero == true) {
            // 等比数列 补零 //
            // console.log("等比数列 补零");
            var Num;                                                     // 当前项的值
            var NumLength;                                               // 当前项的值的位数
            var NumLast = GetFirst * Math.pow(GetDiff, (GetLength - 1)); // 根据等比数列通项公式计算末项的值
            var NumLastLength = NumLast.toString().length;               // 末项的值的位数
            // console.log("末项的值：" + NumLast);
            for (var i = 1; i <= GetLength; i++) {
                Num = GetFirst * Math.pow(GetDiff, (i - 1));             // 根据等比数列通项公式计算当前项的值
                NumLength = Num.toString().length;                       // 当前项的值的位数
                AddZero();                                               // 若位数不足，自动补零
                CheckReverse();                                          // 替换变量；判断是否开启倒序；拼接结果
            }
        } else if (GetZero == false) {
            // 等比数列 不补零 //
            // console.log("等比数列 不补零");
            var Num;                                                // 当前项的值
            for (var i = 1; i <= GetLength; i++) {
                Num = GetFirst * Math.pow(GetDiff, (i - 1));        // 根据等比数列通项公式计算当前项的值
                CheckReverse();                                     // 替换变量；判断是否开启倒序；拼接结果
            }
        }
    } else if (GetSettingType[2].checked == true) {
        // 字母变化 //
        var GetFirst = GetSettingC[1].value.charCodeAt(0);          // 从（获取对应字母的 Unicode 编码）
        var GetLast = GetSettingC[2].value.charCodeAt(0);           // 到（获取对应字母的 Unicode 编码）
        var GetReverse = GetSettingC[3].checked;                    // 倒序
        // console.log("从：" + GetFirst);
        // console.log("到：" + GetLast);
        // console.log("倒序：" + GetReverse);
        if (GetFirst >= 65 && GetFirst <= 122 && GetLast >= 65 && GetLast <= 122) {
            if (GetFirst < GetLast) {
                for (var i = GetFirst; i <= GetLast; i++) {
                    if (i >= 91 && i <= 96) {
                        continue;                                   // 若为 [ \ ] ^ _ ` 则跳出循环
                    }
                    Num = String.fromCharCode(i);                   // 获取对应 Unicode 编码的字母
                    CheckReverse();                                 // 替换变量；判断是否开启倒序；拼接结果
                }
            } else if (GetFirst > GetLast) {
                GetResult.placeholder = "字母先后顺序有误。\n请按此顺序填写：\nA - Z a - z\n例如：\n从 a 到 d\n从 A 到 D\n从 X 到 g";
            } else if (GetFirst == GetLast) {
                GetResult.placeholder = "仅有 1 条链接，无需生成。";
            } else {
                GetResult.placeholder = "异常。";
            }
        } else {
            GetResult.placeholder = "超出范围。";
        }
    } else {
        // 异常 //
        GetResult.placeholder = "类型选择有误";
    }
    GetResult.value = LinkResult;                           // 输出批量结果
}

function toolGenLinkClear() {
    var GetResult = document.getElementById("tool-genlink-result");
    GetResult.value = '';                                   // 清空结果
    GetResult.placeholder = "结果";
}

/* -------------------- */
/* 新窗口（小窗）中打开 */
/* -------------------- */

function toolNewWindowSubmit() {
    var link = document.querySelector("#tool-newwindow-link input").value;               // 网址
    var width = document.querySelectorAll("#tool-newwindow-meta input")[0].value;        // 宽度
    var height = document.querySelectorAll("#tool-newwindow-meta input")[1].value;       // 高度
    if (width == "") {
        width = 400;
    }
    if (height == "") {
        height = 300;
    }
    window.open(link, "_blank", "height=" + height + ", width=" + width + ", toolbar=no, menubar=no, scrollbars=yes, resizable=yes, location=yes, status=yes");
}

function toolNewWindowClear() {
    document.querySelector("#tool-newwindow-link input").value = "";                     // 网址
    document.querySelectorAll("#tool-newwindow-meta input")[0].value = "";               // 宽度
    document.querySelectorAll("#tool-newwindow-meta input")[1].value = "";               // 高度
}

/* --------------- */
/* 运行 JavaScript */
/* --------------- */

function toolRunJSSubmit() {
    var GetCode = document.querySelector("#tool-runjs-input");  // 代码输入框
    eval(GetCode.value);                                        // 运行
}

function toolRunJSClear() {
    var GetCode = document.querySelector("#tool-runjs-input");  // 代码输入框
    GetCode.value = '';                                         // 清空
}
