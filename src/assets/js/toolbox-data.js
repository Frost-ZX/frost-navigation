// 工具箱

const MODULES = import.meta.glob('../../views/ToolboxView/**/*.vue');

/**
 * @desc 工具列表
 * @type {ToolboxCategory[]}
 */
export const toolList = [
  {
    id: 'calculation-tools',
    title: '计算',
    enabled: true,
    items: [
      {
        id: 'calc-download-time',
        component: 'Calculation/CalcDownloadTime',
        title: '下载用时计算',
        iconClass: 'mdi mdi-calculator-variant-outline',
        desc: '根据设定的文件大小和下载速度简单计算大约下载完成所需的时间。',
        createdAt: '2024-09-08',
        updatedAt: '2024-09-08',
        version: '1',
        enabled: true,
      },
      {
        id: 'calc-ratio',
        component: 'Calculation/CalcRatio',
        title: '比例计算',
        iconClass: 'mdi mdi-calculator-variant-outline',
        desc: '按设定的比例计算给出的数值所对应的数值。',
        createdAt: '2024-09-08',
        updatedAt: '2024-09-08',
        version: '1',
        enabled: true,
      },
    ]
  },
  {
    id: 'conversion-tools',
    title: '转换',
    enabled: false,
    items: [
      {
        id: 'convert-html-entities',
        component: 'Conversion/ConvertHtmlEntities',
        title: '转换 HTML 实体',
        iconClass: 'mdi mdi-swap-horizontal',
        desc: '',
        createdAt: '',
        updatedAt: '',
        version: '0',
        enabled: false,
      },
      {
        id: 'url-encode-decode',
        component: 'Conversion/UrlEncodeDecode',
        title: 'URL 编码 / 解码',
        iconClass: 'mdi mdi-swap-horizontal',
        desc: '',
        createdAt: '',
        updatedAt: '',
        version: '0',
        enabled: false,
      },
      {
        id: 'convert-text-structure',
        component: 'Conversion/ConvertTextStructure',
        title: '文本结构转换',
        iconClass: 'mdi mdi-swap-horizontal',
        desc: '倒序、横竖互换等',
        createdAt: '',
        updatedAt: '',
        version: '0',
        enabled: false,
      },
      {
        id: 'convert-timestamp',
        component: 'Conversion/ConvertTimestamp',
        title: 'Unix 时间戳转换',
        iconClass: 'mdi mdi-swap-horizontal',
        desc: '时间戳转时间 / 时间转时间戳',
        createdAt: '',
        updatedAt: '',
        version: '0',
        enabled: false,
      },
    ]
  },
  {
    id: 'edit-tools',
    title: '编辑',
    enabled: false,
    items: [
      {
        id: 'csv-editor',
        component: 'Edit/CsvEditor',
        title: 'CSV 编辑工具',
        iconClass: 'mdi mdi-table-edit',
        desc: '查看或编辑 CSV 文件',
        createdAt: '',
        updatedAt: '',
        version: '0',
        enabled: false,
      },
    ],
  },
  {
    id: 'generator-tools',
    title: '生成',
    enabled: true,
    items: [
      {
        id: 'frp-config-generator',
        component: 'Generator/FrpConfigGenerator',
        title: 'frp 配置文件生成',
        iconClass: 'mdi mdi-file-cog-outline',
        desc: '生成用于 frpc、frps 的配置文件。',
        createdAt: '',
        updatedAt: '',
        version: '0',
        enabled: false,
      },
      {
        id: 'generate-urls',
        component: 'Generator/GenerateUrls',
        title: '生成批量下载链接',
        iconClass: 'mdi mdi-link-variant',
        desc: '根据设置，生成有一定规律的用于批量下载的链接。',
        createdAt: '',
        updatedAt: '',
        version: '0',
        enabled: false,
      },
      {
        id: 'generate-random-string',
        component: 'Generator/GenerateRandomString',
        title: '生成随机字符串',
        iconClass: 'mdi mdi-format-text',
        desc: '生成随机组合的字符串，可用于密码。',
        createdAt: '2024-09-08',
        updatedAt: '2024-09-08',
        version: '1',
        enabled: true,
      },
    ]
  },
  {
    id: 'minecraft-tools',
    title: 'Minecraft',
    enabled: false,
    items: [
      {
        id: 'calc-minecraft-chunk-location',
        component: 'Minecraft/CalcChunkLocation',
        title: 'Minecraft 区块位置计算',
        iconClass: 'mdi mdi-calculator-variant-outline',
        desc: '',
        createdAt: '',
        updatedAt: '',
        version: '0',
        enabled: false,
      },
      {
        id: 'generate-minecraft-dynmap-renderdata',
        component: 'Minecraft/GenerateDynmapRenderdata',
        title: '生成 Dynmap renderdata',
        iconClass: 'mdi mdi-file-outline',
        desc: '生成用于 Minecraft Dynmap 插件或模组的 renderdata 数据。',
        createdAt: '',
        updatedAt: '',
        version: '0',
        enabled: false,
      },
      {
        id: 'minecraft-chat-history-reader',
        component: 'Minecraft/ChatHistoryReader',
        title: 'Minecraft 聊天记录查看',
        iconClass: 'mdi mdi-format-list-text',
        desc: '读取并解析 latest.log 文件，显示聊天记录。',
        createdAt: '',
        updatedAt: '',
        version: '0',
        enabled: false,
      },
      {
        id: 'minecraft-uuid-converter',
        component: 'Minecraft/UuidConverter',
        title: 'Minecraft UUID 转换',
        iconClass: 'mdi mdi-identifier',
        desc: '随机生成或转换 Minecraft 的 UUID。',
        createdAt: '',
        updatedAt: '',
        version: '0',
        enabled: false,
      },
    ]
  },
  {
    id: 'network-tools',
    title: '网络',
    enabled: true,
    items: [
      {
        id: 'websocket-test-tool',
        component: 'Network/WebSocketTestTool',
        title: 'WebSocket 测试',
        iconClass: 'mdi mdi-connection',
        desc: '连接 WebSocket 服务端，发送和接收消息。',
        createdAt: '2024-12-01',
        updatedAt: '2024-12-01',
        version: '1',
        enabled: true,
      },
    ],
  },
  {
    id: 'other-tools',
    title: '其他',
    enabled: true,
    items: [
      {
        id: 'genshin-impact-clock',
        component: 'Other/GenshinImpactClock/GenshinImpactClock',
        title: '《原神》时钟',
        iconClass: 'mdi mdi-clock-outline',
        desc: '在网页上实现的《原神》时钟效果',
        createdAt: '2024-10-13',
        updatedAt: '2024-10-13',
        version: '1',
        enabled: true,
      },
      {
        id: 'keep-screen-on',
        component: 'Other/KeepScreenOn',
        title: '保持亮屏',
        iconClass: 'mdi mdi-monitor',
        desc: '保持屏幕开启，不息屏，不休眠',
        createdAt: '2024-10-11',
        updatedAt: '2024-10-13',
        version: '2',
        enabled: true,
      },
      {
        id: 'open-new-window',
        component: 'Other/OpenNewWindow',
        title: '新窗口（小窗）中打开',
        iconClass: 'mdi mdi-window-maximize',
        desc: '从新的小窗口中打开指定的链接（仅支持 PC 端浏览器）',
        createdAt: '',
        updatedAt: '',
        version: '0',
        enabled: false,
      },
      {
        id: 'run-javascript',
        component: 'Other/RunJavaScript',
        title: '执行 JavaScript',
        iconClass: 'mdi mdi-code-braces',
        desc: '执行简单的 JavaScript 代码片段',
        createdAt: '',
        updatedAt: '',
        version: '0',
        enabled: false,
      },
    ],
  },
];

/**
 * @description 获取动态组件
 * @param {string} path 工具页面相对路径
 */
function getDynamicComponent(path) {

  let key = `../../views/ToolboxView/${path}.vue`;
  let component = MODULES[key];

  return component;

}

/** 生成工具箱页面路由 */
export function getToolboxRoutes() {

  /** @type {VueRouteRecordRaw[]} */
  let routes = [];

  toolList.forEach((categoryItem) => {
    categoryItem.items.forEach((toolItem) => {

      // // 跳过未启用的工具
      // if (!toolItem.enabled) {
      //   return;
      // }

      routes.push({
        path: `/toolbox-view/${toolItem.id}`,
        name: `Toolbox/${toolItem.component}`,
        component: getDynamicComponent(toolItem.component),
        meta: {
          isToolDetail: true,
          title: toolItem.title,
        },
      });

    });
  });

  return routes;

}
