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
            }
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
                enabled: true
            }
        }
    },
    conversion: {
        title: '转换',
        list: {
            'timestamp': {
                title: 'Unix 时间戳转换',
                desc: 'Unix 时间戳转时间 / 时间转 Unix 时间戳',
                component: 'ConvertTimestamp',
                enabled: false
            }
        }
    },
    minecraft: {
        title: 'Minecraft',
        list: {
            'calc-chunk-location': {
                title: 'Minecraft 区块位置计算',
                component: 'MinecraftCalcChunkLocation',
                enabled: false
            },
            'gen-dynmap-renderdata': {
                title: 'Minecraft Dynmap renderdata',
                desc: '生成用于 Minecraft Dynmap 插件 / 模组的 renderdata',
                component: 'MinecraftGenDynmapRenderdata',
                enabled: false
            },
            'convert-uuid': {
                title: 'Minecraft UUID 转换',
                desc: 'UUIDLeast + UUIDMost -> UUID',
                component: 'MinecraftConvertUUID',
                enabled: false
            }
        }
    },
    other: {
        title: '其他',
        list: {
            'new-window': {
                title: '新窗口（小窗）中打开',
                component: 'OtherNewWindow',
                update: '2021-05-03',
                enabled: true
            },
            'run-js': {
                title: '执行 JavaScript',
                component: 'OtherRunJS',
                update: '2021-05-03',
                enabled: true
            }
        }
    }
};

export default navTools;
