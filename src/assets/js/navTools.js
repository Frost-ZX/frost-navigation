// 工具信息列表
let navTools = {
    // 分类
    calculation: {
        // 分类标题
        title: '计算',
        // 分类列表
        list: {
            // 工具
            'download-time': {
                // 工具标题
                title: '计算下载用时',
                // 工具简介
                desc: '根据设定的文件大小和下载速度简单计算大约下载完成所需的时间',
                // 组件名称
                component: 'CalcDownloadTime',
                // 更新时间
                update: '',
                // 启用状态
                enabled: false
            },
            'ratio': {
                title: '计算比例',
                component: 'CalcRatio'
            },
            'simple': {
                title: '简易计算器',
                component: 'CalcSimple',
                enabled: false
            },
        }
    },
    generator: {
        title: '生成',
        list: {
            'links': {
                title: '生成批量下载链接',
                desc: '根据设置，生成有一定规律的用于批量下载的链接',
                component: 'GenLinks',
                enabled: false
            },
            'random-str': {
                title: '生成随机字符串',
                desc: '生成随机组合的字符串，可用于密码',
                component: 'GenRandomStr',
                update: '20210504',
                version: '1',
                enabled: true
            },
        }
    },
    conversion: {
        title: '转换',
        list: {
            'text-structure': {
                title: '文本结构转换',
                desc: '横排、竖排、倒序等',
                component: 'ConvertTextStructure',
                enabled: false
            },
            'uri': {
                title: 'URI 编码转换',
                desc: 'URI 编码、解码',
                component: 'ConvertURI',
                enabled: false
            },
            'timestamp': {
                title: 'Unix 时间戳转换',
                desc: 'Unix 时间戳转时间 / 时间转 Unix 时间戳',
                component: 'ConvertTimestamp',
                enabled: false
            },
        }
    },
    minecraft: {
        title: 'Minecraft',
        list: {
            'chunk-location-calc': {
                title: '区块位置计算',
                component: 'MinecraftChunkLocationCalc',
                enabled: false
            },
            'dynmap-renderdata-gen': {
                title: 'Dynmap renderdata 生成',
                desc: '生成用于 Minecraft Dynmap 插件 / 模组的 renderdata 数据',
                component: 'MinecraftDynmapRenderdataGen',
                enabled: false
            },
            'uuidConverter': {
                title: 'UUID 转换',
                desc: 'UUID 与 UUID Least、UUID Most 相互转换',
                component: 'MinecraftUUIDConverter',
                enabled: false
            },
        }
    },
    other: {
        title: '其他',
        list: {
            'new-window': {
                title: '新窗口（小窗）中打开',
                component: 'OtherNewWindow',
                update: '20210503',
                version: '1',
                enabled: true
            },
            'run-js': {
                title: '执行 JavaScript',
                component: 'OtherRunJS',
                update: '20210614',
                version: '2',
                enabled: true
            },
            'websocket': {
                title: 'WebSocket',
                desc: 'WebSocket 测试工具',
                component: 'OtherWebSocket',
                update: '20211108',
                version: '2',
                enabled: true
            },
        }
    }
};

export default navTools;
