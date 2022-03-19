/**
 * @typedef {object} ToolItem
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
 * @property {Object.<string, ToolItem>} list 工具列表
 */

/** @type {Object.<string, ToolCategory>} */
const navTools = {
    calculation: {
        title: '计算',
        list: {
            'download-time': {
                title: '下载用时计算',
                desc: '根据设定的文件大小和下载速度简单计算大约下载完成所需的时间。',
                component: 'CalcDownloadTime',
                update: '2021-12-06',
                version: '1',
                enabled: true
            },
            'ratio': {
                title: '比例计算',
                desc: '按设定的比例计算给出的数值所对应的数值。',
                component: 'CalcRatio',
                update: '2021-11-16',
                version: '2',
                enabled: true
            },
        }
    },
    generator: {
        title: '生成',
        list: {
            'links': {
                title: '生成批量下载链接',
                desc: '根据设置，生成有一定规律的用于批量下载的链接。',
                component: 'GenLinks',
                update: '2021-11-14',
                version: '1',
                enabled: true
            },
            'random-str': {
                title: '生成随机字符串',
                desc: '生成随机组合的字符串，可用于密码。',
                component: 'GenRandomStr',
                update: '2021-05-04',
                version: '1',
                enabled: true
            },
        }
    },
    conversion: {
        title: '转换',
        list: {
            'encode-decode': {
                title: '编码转换',
                desc: 'HTML / URI 编码、解码',
                component: 'ConvertEncodeDecode',
                update: '2021-11-10',
                version: '1',
                enabled: true
            },
            'text-structure': {
                title: '文本结构转换',
                desc: '倒序、横竖互换等',
                component: 'ConvertTextStructure',
                update: '2021-12-06',
                version: '1',
                enabled: true,
            },
            'timestamp': {
                title: 'Unix 时间戳转换',
                desc: '时间戳转时间 / 时间转时间戳',
                component: 'ConvertTimestamp',
                update: '2021-11-14',
                version: '1',
                enabled: true
            },
        }
    },
    minecraft: {
        title: 'Minecraft',
        list: {
            'chunk-location-calc': {
                title: 'Minecraft 区块位置计算',
                component: 'MinecraftChunkLocationCalc',
                enabled: false
            },
            'dynmap-renderdata-gen': {
                title: 'Dynmap renderdata 生成',
                desc: '生成用于 Minecraft Dynmap 插件或模组的 renderdata 数据。',
                component: 'MinecraftDynmapRenderdataGen',
                update: '2021-12-06',
                version: '1',
                enabled: true,
            },
            'uuid-converter': {
                title: 'Minecraft UUID 转换',
                desc: '随机生成或转换 Minecraft 的 UUID。',
                component: 'MinecraftUUIDConverter',
                update: '2021-12-06',
                version: '1',
                enabled: true
            },
        }
    },
    other: {
        title: '其他',
        list: {
            'edit-csv': {
                title: 'CSV 编辑工具',
                desc: '查看或编辑 CSV 文件',
                component: 'OtherEditCSV',
                update: '2022-03-17',
                version: '2',
                enabled: true,
            },
            'new-window': {
                title: '新窗口（小窗）中打开',
                desc: '从新的小窗口中打开指定的链接（仅支持 PC 端浏览器）',
                component: 'OtherNewWindow',
                update: '2021-05-03',
                version: '1',
                enabled: true
            },
            'run-js': {
                title: '执行 JavaScript',
                desc: '执行简单的 JavaScript 代码片段',
                component: 'OtherRunJS',
                update: '2021-06-14',
                version: '2',
                enabled: true
            },
            'websocket': {
                title: 'WebSocket',
                desc: 'WebSocket 测试工具',
                component: 'OtherWebSocket',
                update: '2021-11-19',
                version: '4',
                enabled: true
            },
        }
    }
};

export default navTools;
