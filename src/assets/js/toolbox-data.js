// 工具箱

// import {
//   defineAsyncComponent,
// } from 'vue';

/**
 * @desc 工具列表
 * @type {ToolboxCategory[]}
 */
export const toolList = [
  {
    id: 'calculation-tools',
    title: '计算',
    items: [
      {
        id: 'calc-download-time',
        component: 'Calculation/CalcDownloadTime',
        title: '下载用时计算',
        iconClass: 'mdi mdi-calculator-variant-outline',
        desc: '根据设定的文件大小和下载速度简单计算大约下载完成所需的时间。',
        createdAt: '',
        updatedAt: '',
        version: '0',
        enabled: false,
      },
      {
        id: 'calc-ratio',
        component: 'Calculation/CalcRatio',
        title: '比例计算',
        iconClass: 'mdi mdi-calculator-variant-outline',
        desc: '按设定的比例计算给出的数值所对应的数值。',
        createdAt: '',
        updatedAt: '',
        version: '0',
        enabled: false,
      },
    ]
  },
  {
    id: 'conversion-tools',
    title: '转换',
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
    items: [
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
        createdAt: '',
        updatedAt: '',
        version: '0',
        enabled: false,
      },
    ]
  },
  {
    id: 'minecraft-tools',
    title: 'Minecraft',
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
    items: [
      {
        id: 'websocket-test-tool',
        component: 'Network/WebSocketTestTool',
        title: 'WebSocket',
        iconClass: 'mdi mdi-connection',
        desc: 'WebSocket 测试工具',
        createdAt: '',
        updatedAt: '',
        version: '0',
        enabled: false,
      },
    ],
  },
  {
    id: 'other-tools',
    title: '其他',
    items: [
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
