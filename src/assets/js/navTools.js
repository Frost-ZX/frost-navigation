/**
 * @typedef {object} ToolItem
 * @property {string}  name      工具名称
 * @property {string}  title     工具标题
 * @property {string}  [desc]    工具简介
 * @property {string}  component 组件名称
 * @property {string}  [update]  更新日期
 * @property {string}  [version] 版本号
 * @property {boolean} enabled   启用状态
 */

/**
 * @typedef {object} ToolCategory
 * @property {string} title 分类标题
 * @property {ToolItem[]} list 工具列表
 */

/** @type {Object.<string, ToolCategory>} */
const navTools = {
    calculation: {
        title: '计算',
        list: [
            {
                name: 'calc-download-time',
                component: 'CalcDownloadTime',
                title: '下载用时计算',
                desc: '根据设定的文件大小和下载速度简单计算大约下载完成所需的时间。',
                update: '2021-12-06',
                version: '1',
                enabled: true
            },
            {
                name: 'calc-ratio',
                component: 'CalcRatio',
                title: '比例计算',
                desc: '按设定的比例计算给出的数值所对应的数值。',
                update: '2021-11-16',
                version: '2',
                enabled: true
            },
        ]
    },
    generator: {
        title: '生成',
        list: [
            {
                name: 'gen-links',
                component: 'GenLinks',
                title: '生成批量下载链接',
                desc: '根据设置，生成有一定规律的用于批量下载的链接。',
                update: '2021-11-14',
                version: '1',
                enabled: true
            },
            {
                name: 'gen-random-str',
                component: 'GenRandomStr',
                title: '生成随机字符串',
                desc: '生成随机组合的字符串，可用于密码。',
                update: '2021-05-04',
                version: '1',
                enabled: true
            },
        ]
    },
    conversion: {
        title: '转换',
        list: [
            {
                name: 'convert-encode-decode',
                component: 'ConvertEncodeDecode',
                title: '编码转换',
                desc: 'HTML / URI 编码、解码',
                update: '2021-11-10',
                version: '1',
                enabled: true
            },
            {
                name: 'convert-text-structure',
                component: 'ConvertTextStructure',
                title: '文本结构转换',
                desc: '倒序、横竖互换等',
                update: '2021-12-06',
                version: '1',
                enabled: true,
            },
            {
                name: 'convert-timestamp',
                component: 'ConvertTimestamp',
                title: 'Unix 时间戳转换',
                desc: '时间戳转时间 / 时间转时间戳',
                update: '2021-11-14',
                version: '1',
                enabled: true
            },
        ]
    },
    minecraft: {
        title: 'Minecraft',
        list: [
            {
                name: 'minecraft-chunk-location-calc',
                component: 'MinecraftChunkLocationCalc',
                title: 'Minecraft 区块位置计算',
                enabled: false
            },
            {
                name: 'minecraft-dynmap-renderdata-gen',
                component: 'MinecraftDynmapRenderdataGen',
                title: 'Dynmap renderdata 生成',
                desc: '生成用于 Minecraft Dynmap 插件或模组的 renderdata 数据。',
                update: '2021-12-06',
                version: '1',
                enabled: true,
            },
            {
                name: 'minecraft-uuid-converter',
                component: 'MinecraftUUIDConverter',
                title: 'Minecraft UUID 转换',
                desc: '随机生成或转换 Minecraft 的 UUID。',
                update: '2021-12-06',
                version: '1',
                enabled: true
            },
        ]
    },
    other: {
        title: '其他',
        list: [
            {
                name: 'other-edit-csv',
                component: 'OtherEditCSV',
                title: 'CSV 编辑工具',
                desc: '查看或编辑 CSV 文件',
                update: '2022-03-17',
                version: '2',
                enabled: true,
            },
            {
                name: 'other-new-window',
                component: 'OtherNewWindow',
                title: '新窗口（小窗）中打开',
                desc: '从新的小窗口中打开指定的链接（仅支持 PC 端浏览器）',
                update: '2021-05-03',
                version: '1',
                enabled: true
            },
            {
                name: 'other-run-js',
                component: 'OtherRunJS',
                title: '执行 JavaScript',
                desc: '执行简单的 JavaScript 代码片段',
                update: '2021-06-14',
                version: '2',
                enabled: true
            },
            {
                name: 'other-websocket',
                component: 'OtherWebSocket',
                title: 'WebSocket',
                desc: 'WebSocket 测试工具',
                update: '2021-11-19',
                version: '4',
                enabled: true
            },
        ]
    }
};

export default navTools;
