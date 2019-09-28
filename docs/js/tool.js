/* --------------- */
/* Unix 时间戳转换 */
/* --------------- */

// 函数：获取时间戳 //
function toolUnixTimeGetNowA(TimeSet, SettingBA, SettingBB) {
    var Time = new Date();               // 创建 Date 对象
    // 若已设定参数 TimeSet，则根据 TimeSet 设置时间 //
    if (TimeSet != '') {
        Time.setFullYear(TimeSet.substring(0, 4));  // TimeSet 的子串：年
        Time.setMonth(TimeSet.substring(5, 7) - 1); // TimeSet 的子串：月
        Time.setDate(TimeSet.substring(8, 10));     // TimeSet 的子串：日
        Time.setHours(TimeSet.substring(11, 13));   // TimeSet 的子串：时
        Time.setMinutes(TimeSet.substring(14, 16)); // TimeSet 的子串：分
        Time.setSeconds(TimeSet.substring(17, 19)); // TimeSet 的子串：秒
        // console.log(Time)
    }
    if (TimeSet != '' && SettingBA == true && SettingBB == false) {
        // 模式：秒 //
        var TextLength = Time.getTime().toString().length;
        return Time.getTime().toString().substring(0, TextLength - 3);         // 返回时间戳
    } else if (TimeSet != '' && SettingBA == false && SettingBB == true) {
        // 模式：毫秒 //
        var TextLength = Time.getTime().toString().length;
        return Time.getTime().toString().substring(0, TextLength - 3) + "000"; // 返回时间戳
    } else {
        return Time.getTime(); // 返回时间戳
    }
}

// 函数：获取时间 //
function toolUnixTimeGetNowB(TimeSet) {
    var Time = new Date();               // 创建 Date 对象
    // 若已设定参数 TimeSet，则根据 TimeSet 设置时间 //
    if (TimeSet != '') {
        Time.setTime(TimeSet);
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
    GetInputA.value = toolUnixTimeGetNowA('', GetSettingAA, GetSettingAB); // 时间戳
    GetInputB.value = toolUnixTimeGetNowB('', GetSettingBA, GetSettingBB); // 时间
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
    GetOutputA.value = toolUnixTimeGetNowB(GetInputA.value, GetSettingAA, GetSettingAB);           // 转换为时间
    GetOutputB.value = toolUnixTimeGetNowA(GetInputB.value, GetSettingBA, GetSettingBB);           // 转换为时间戳
}

// 按钮：重置 //
function toolUnixTimeClear() {
    document.getElementById("tool-unixtime-input-a").getElementsByTagName("input")[0].value = '';  // 清空输入框 A
    document.getElementById("tool-unixtime-input-b").getElementsByTagName("input")[0].value = '';  // 清空输入框 B
    document.getElementById("tool-unixtime-output-a").getElementsByTagName("input")[0].value = ''; // 清空输出框 A
    document.getElementById("tool-unixtime-output-b").getElementsByTagName("input")[0].value = ''; // 清空输出框 B
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

/* --------------- */
/* 运行 JavaScript */
/* --------------- */

function toolRunJSSubmit() {
    GetCode = document.getElementById("tool-runjs-input");  // 代码输入框
    eval(GetCode.value);                                    // 运行
}

function toolRunJSClear() {
    GetCode = document.getElementById("tool-runjs-input");  // 代码输入框
    GetCode.value = '';                                     // 清空
}
