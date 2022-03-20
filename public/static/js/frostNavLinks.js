/**
 * @typedef  {object}     LinkItem
 * @property {string}     [icon]     链接分类图标
 * @property {string}     title      链接分类标题 / 链接项标题
 * @property {string}     [desc]     链接项简介
 * @property {string}     [link]     链接项 URL
 * @property {string}     [update]   链接项更新日期
 * @property {boolean}    [showOnly] 是否只显示详情，不跳转
 * @property {LinkItem[]} [items]    子链接列表
 */

/**
 * @typedef  {object}     LinkDatas
 * @property {string}     version 链接数据版本
 * @property {LinkItem[]} list    链接列表
 */

/** @type {LinkDatas} */
var frostNavLinks = {
  version: '2022-03-20',
  list: [
    {
      title: '百科 / 教程 / 科普 / 资料',
      icon: 'el-icon-document',
      items: [
        {
          title: '百科',
          items: [
            {
              title: 'Unicode® 字符百科',
              items: [
                {
                  title: 'Unicode® 字符百科',
                  link: 'https://unicode-table.com/cn/',
                  update: '2021-02-07'
                },
                {
                  title: '编码器',
                  link: 'https://unicode-table.com/cn/tools/encoder/',
                },
                {
                  title: '解码器',
                  link: 'https://unicode-table.com/cn/tools/decoder/',
                },
                {
                  title: '翻转',
                  link: 'https://unicode-table.com/cn/tools/flip/',
                },
                {
                  title: 'Unicode 字符表生成',
                  link: 'https://unicode-table.com/cn/tools/generator/',
                }
              ]
            },
            {
              title: '百度百科',
              desc: '',
              link: 'https://baike.baidu.com/',
              update: '2021-02-07'
            },
            {
              title: '萌娘百科',
              link: 'https://zh.moegirl.org.cn/',
              update: '2021-06-20'
            },
            {
              title: '维基百科',
              link: 'https://zh.wikipedia.org/',
              update: '2021-02-07'
            },
          ]
        },
        {
          title: '教程',
          items: [
            {
              title: 'w3school 在线教程',
              link: 'http://www.w3school.com.cn/',
              update: '2021-02-07'
            },
            {
              title: '菜鸟教程',
              link: 'https://www.runoob.com/',
              update: '2021-02-07'
            }
          ]
        },
        {
          title: '资料',
          items: [
            {
              title: '广州市非物质文化遗产保护中心',
              link: 'http://www.ichgz.com/',
              update: '2021-02-08'
            },
            {
              title: '全历史',
              link: 'https://www.allhistory.com/',
              update: '2021-06-04'
            },
            {
              title: '中国非物质文化遗产网',
              link: 'http://www.ihchina.cn/',
              update: '2021-02-08'
            },
            {
              title: '中国哲学书电子化计划',
              link: 'https://ctext.org/zhs',
              update: '2021-02-08'
            }
          ]
        },
        {
          title: '其他',
          items: [
            {
              title: 'EmojiAll',
              desc: 'Emoji 大全 / Emoji 表情符号词典',
              link: 'https://www.emojiall.com/',
              update: '2021-10-27'
            },
            {
              title: 'Topbook',
              desc: '高效生活视频书',
              link: 'https://topbook.cc/',
              update: '2021-04-16'
            },
            {
              title: 'wikiHow',
              desc: '互联网上最值得信赖的指南网站',
              link: 'https://zh.wikihow.com/',
              update: '2022-03-05'
            },
            {
              title: '小鸡词典',
              desc: '查网络流行语',
              link: 'https://jikipedia.com/',
              update: '2022-02-03'
            },
            {
              title: '语言文字标记（language subtag registry）',
              link: 'http://www.iana.org/assignments/language-subtag-registry',
              update: '2021-12-29'
            },
          ]
        },
      ]
    },
    {
      title: '博客 / 社区 / 社交 / 通讯',
      icon: 'el-icon-chat-line-round',
      items: [
        {
          title: '博客',
          items: [
            {
              title: '4SSH',
              link: 'https://4ssh.cn/',
              update: '2021-02-07'
            },
            {
              title: 'Frost-ZX',
              desc: '一个分享技术、资源，记录学习与生活的博客。',
              link: 'https://blog.frost-zx.top/',
              update: '2021-02-07'
            },
            {
              title: 'haojunmei',
              link: 'https://www.haojunmei.top/',
              update: '2021-02-07'
            },
            {
              title: 'Kenvix\'s Blog',
              link: 'https://kenvix.com/',
            },
            {
              title: 'Luminous\' Home',
              link: 'https://luotianyi.vc/',
              update: '2021-02-07'
            },
            {
              title: 'UNKNOW date',
              link: 'https://n-a.date/',
              update: '2021-02-07'
            },
            {
              title: 'zgcwkj',
              link: 'https://blog.zgcwkj.cn/',
              update: '2021-02-07'
            },
            {
              title: '安和 Blog',
              link: 'https://lolicorn.com/',
              update: '2021-02-07'
            },
            {
              title: '枫叶博客',
              link: 'https://www.myitmx.com/',
              update: '2021-02-07'
            },
            {
              title: '老D博客',
              link: 'https://laod.cn/',
              update: '2021-02-07'
            },
            {
              title: '阮一峰的网络日志',
              link: 'http://www.ruanyifeng.com/blog/',
              update: '2021-06-20'
            },
            {
              title: '樱花庄的白猫',
              link: 'https://2heng.xin/',
              update: '2021-02-07'
            },
            {
              title: '云梦',
              link: 'https://www.htcp.net/',
              update: '2021-02-07'
            },
          ]
        },
        {
          title: '论坛 / 社区',
          items: [
            {
              title: 'PC426',
              link: 'https://www.pc426.com/',
            },
            {
              title: 'SegmentFault 思否',
              link: 'https://segmentfault.com/',
              update: '2021-02-07'
            },
            {
              title: 'Stack Overflow',
              link: 'https://stackoverflow.com/',
              update: '2021-06-20'
            },
            {
              title: 'V2EX',
              link: 'https://www.v2ex.com/',
              update: '2021-02-08'
            },
            {
              title: '百度贴吧',
              link: 'https://tieba.baidu.com/',
              update: '2021-02-07'
            },
            {
              title: '地铁族',
              link: 'http://www.ditiezu.com/',
              update: '2021-02-07'
            },
            {
              title: '豆瓣',
              link: 'https://www.douban.com/',
              update: '2021-02-07'
            },
            {
              title: '捷径社区',
              desc: '发现和分享 Siri 捷径、快捷指令',
              link: 'https://sharecuts.cn/',
              update: '2021-06-04'
            },
            {
              title: '开源中国',
              link: 'https://www.oschina.net/',
              update: '2021-02-07'
            },
            {
              title: '蓝点网',
              desc: '给你感兴趣的内容',
              link: 'https://www.landian.vip/',
              update: '2021-11-07'
            },
            {
              title: '码云社',
              desc: '用代码改变世界',
              link: 'https://www.codeseeding.com/',
              update: '2021-02-07'
            },
            {
              title: '天空之城',
              desc: '全球航拍爱好者和专业摄影师的作品社区',
              link: 'https://www.skypixel.com/',
              update: '2021-06-05'
            },
            {
              title: '天涯社区（天涯论坛）',
              link: 'https://bbs.tianya.cn/',
              update: '2021-05-28'
            },
            {
              title: '知乎',
              link: 'https://www.zhihu.com/',
              update: '2021-02-07'
            },
          ]
        },
        {
          title: '社交',
          items: [
            {
              title: 'Instagram',
              link: 'https://www.instagram.com/',
              update: '2021-02-07'
            },
            {
              title: 'QQ空间',
              link: 'https://qzone.qq.com/',
              update: '2021-02-07'
            },
            {
              title: 'Twitter',
              link: 'https://twitter.com/',
              update: '2021-02-07'
            },
            {
              title: '新浪微博',
              link: 'https://weibo.com/',
              update: '2021-02-07'
            },
          ]
        },
        {
          title: '通讯',
          items: [
            {
              title: 'Discord',
              link: 'https://discordapp.com/',
              update: '2021-02-07'
            },
            {
              title: '开黑啦',
              link: 'https://www.kaiheila.cn/',
              update: '2021-04-07'
            },
            {
              title: '云短信',
              desc: '在线短信接收',
              link: 'https://www.materialtools.com/',
              update: '2021-02-07'
            },
          ]
        },
        {
          title: '邮箱',
          items: [
            {
              title: '126邮箱',
              link: 'http://mail.126.com/',
              update: '2021-02-07'
            },
            {
              title: 'Outlook',
              link: 'https://outlook.live.com/',
              update: '2021-02-07'
            },
            {
              title: 'QQ邮箱',
              link: 'https://mail.qq.com/',
              update: '2021-02-07'
            },
            {
              title: '网易邮箱',
              link: 'https://mail.163.com/',
              update: '2021-02-07'
            },
            {
              title: '新浪邮箱',
              link: 'https://mail.sina.com.cn/',
              update: '2021-02-07'
            },
          ]
        },
      ]
    },
    {
      title: '出行 / 服务 / 生活',
      icon: 'el-icon-bicycle',
      items: [
        {
          title: '出行',
          items: [
            {
              title: '轨道交通',
              items: [
                {
                  title: '北京地铁',
                  link: 'https://www.bjsubway.com/',
                  update: '2021-02-08'
                },
                {
                  title: '成都地铁',
                  link: 'http://www.chengdurail.com/',
                  update: '2021-02-08'
                },
                {
                  title: '广州地铁',
                  link: 'http://www.gzmtr.com/',
                  update: '2021-02-08'
                },
                {
                  title: '杭州地铁',
                  link: 'http://www.hzmetro.com/',
                  update: '2021-02-08'
                },
                {
                  title: '南京地铁',
                  link: 'http://www.njmetro.com.cn/',
                  update: '2021-02-08'
                },
                {
                  title: '南宁地铁',
                  link: 'http://www.nngdjt.com/',
                  update: '2021-02-08'
                },
                {
                  title: '青岛地铁',
                  link: 'http://www.qd-metro.com/',
                  update: '2021-02-08'
                },
                {
                  title: '上海地铁',
                  link: 'http://www.shmetro.com/',
                  update: '2021-02-08'
                },
                {
                  title: '沈阳地铁',
                  link: 'http://www.symtc.com/',
                  update: '2021-02-08'
                },
                {
                  title: '深圳地铁',
                  link: 'http://www.szmc.net/',
                  update: '2021-02-08'
                },
              ]
            },
            {
              title: '地铁通（MetroMan）',
              link: 'http://www.metroman.cn/',
              update: '2021-04-16'
            },
            {
              title: '中国铁路 12306',
              link: 'https://www.12306.cn/',
              update: '2021-02-08'
            },
          ]
        },
        {
          title: '服务',
          items: [
            {
              title: '公安部“互联网+政务服务”平台',
              link: 'https://zwfw.mps.gov.cn/',
              update: '2021-06-04'
            },
          ]
        },
        {
          title: '旅游',
          items: [
            {
              title: '飞猪旅行',
              link: 'https://www.alitrip.com/',
              update: '2021-02-08'
            },
            {
              title: '途牛',
              link: 'http://www.tuniu.com/',
              update: '2021-02-08'
            },
            {
              title: '携程旅行网',
              link: 'https://www.ctrip.com/',
              update: '2021-02-08'
            },
          ]
        },
        {
          title: '生活',
          items: [
            {
              title: '绿色呼吸',
              link: 'http://www.pm25.com/',
              update: '2021-02-08'
            },
          ]
        },
      ]
    },
    {
      title: '创作 / 开发 / 制作',
      icon: 'el-icon-edit',
      items: [
        {
          title: '版本控制',
          items: [
            {
              title: 'CODE CHINA',
              link: 'https://codechina.csdn.net/',
              update: '2021-04-16'
            },
            {
              title: 'CODE CHINA',
              desc: 'GitHub 加速计划',
              link: 'https://codechina.csdn.net/mirrors',
              update: '2021-04-16'
            },
            {
              title: 'Git',
              link: 'https://git-scm.com/',
              update: '2021-05-22'
            },
            {
              title: 'Gitee（码云）',
              link: 'https://gitee.com/',
              update: '2021-02-08'
            },
            {
              title: 'GitLab',
              link: 'https://gitlab.com/',
              update: '2021-06-20'
            },
            {
              title: 'GitHub',
              link: 'https://github.com/',
              update: '2021-02-08'
            },
          ]
        },
        {
          title: '开发',
          items: [
            {
              title: '前端',
              items: [
                {
                  title: '工具',
                  items: [
                    {
                      title: 'Animista',
                      desc: 'CSS 动画生成工具',
                      link: 'https://animista.net/',
                      update: '2021-06-20'
                    },
                    {
                      title: 'Can I use...',
                      desc: '查询 HTML5、CSS3 等在不同浏览器上的支持情况',
                      link: 'https://caniuse.com/',
                      update: '2021-08-03'
                    },
                    {
                      title: 'Clippy',
                      desc: 'CSS clip-path 生成工具',
                      link: 'https://bennettfeely.com/clippy/',
                      update: '2021-06-01'
                    },
                    {
                      title: 'CSS Gradient',
                      desc: 'CSS 渐变生成工具',
                      link: 'https://cssgradient.io/',
                      update: '2021-06-20'
                    },
                    {
                      title: 'cubic-bezier',
                      desc: 'CSS cubic-bezier() 生成工具',
                      link: 'https://cubic-bezier.com/',
                      update: '2021-06-20'
                    },
                    {
                      title: 'Sprite Cow',
                      desc: '精灵图样式生成工具',
                      link: 'http://www.spritecow.com/',
                      update: '2021-06-01'
                    },
                  ]
                },
                {
                  title: '框架 / 库',
                  items: [
                    {
                      title: 'Bootstrap 中文网',
                      link: 'https://www.bootcss.com/',
                      update: '2021-02-08'
                    },
                    {
                      title: 'highlight.js',
                      link: 'https://highlightjs.org/',
                      update: '2021-02-08'
                    },
                    {
                      title: 'jQuery',
                      link: 'https://jquery.com/',
                      update: '2021-02-08'
                    },
                    {
                      title: 'Layui',
                      desc: '经典开源模块化前端 UI 框架',
                      link: 'https://www.layui.com/',
                      update: '2021-06-20'
                    },
                    {
                      title: 'Leaflet',
                      desc: '可交互的地图',
                      link: 'https://leafletjs.com/',
                      update: '2021-02-08'
                    },
                    {
                      title: 'three.js – JavaScript 3D library',
                      link: 'http://threejs.org/',
                      update: '2021-02-08'
                    },
                  ]
                },
                {
                  title: '资源',
                  items: [
                    {
                      title: 'HTML5 UP',
                      desc: '响应式的 HTML5 和 CSS3 网站模板',
                      link: 'https://html5up.net/',
                      update: '2021-11-14'
                    },
                    {
                      title: 'jQuery 插件库',
                      link: 'http://www.jq22.com/',
                      update: '2021-02-08'
                    },
                    {
                      title: 'jQuery 之家',
                      link: 'http://www.htmleaf.com/',
                      update: '2021-02-08'
                    },
                  ]
                },
              ]
            },
            {
              title: '软件',
              items: [
                {
                  title: 'Android Studio',
                  link: 'https://developer.android.google.cn/studio/',
                  update: '2021-02-07'
                },
                {
                  title: 'Code::Blocks',
                  link: 'http://www.codeblocks.org/',
                  update: '2021-02-07'
                },
                {
                  title: 'Eclipse',
                  link: 'http://www.eclipse.org/',
                  update: '2021-02-07'
                },
                {
                  title: 'Google Blockly',
                  link: 'https://developers.google.cn/blockly/',
                  update: '2021-02-07'
                },
                {
                  title: 'Python',
                  link: 'https://www.python.org/',
                  update: '2021-02-07'
                },
                {
                  title: 'Visual Studio Code (VSCode)',
                  link: 'https://code.visualstudio.com/',
                  update: '2021-02-07'
                },
              ]
            },
            {
              title: 'Electron',
              items: [
                {
                  title: 'Electron',
                  desc: '使用 JavaScript，HTML 和 CSS 构建跨平台的桌面应用程序',
                  link: 'https://www.electronjs.org/',
                  update: '2021-06-01'
                },
                {
                  title: 'Electron Builder',
                  link: 'https://www.electron.build/',
                  update: '2021-06-01'
                },
              ]
            },
            {
              title: 'Node.js',
              link: 'https://nodejs.org/',
              update: '2021-05-22'
            },
            {
              title: 'Vue.js',
              link: 'https://vuejs.org/',
              update: '2021-05-22'
            },
            {
              title: 'Vue Loader',
              link: 'https://vue-loader.vuejs.org/',
              update: '2022-03-05'
            },
          ]
        },
        {
          title: '建模',
          items: [
            {
              title: 'Blender',
              items: [
                {
                  title: 'Blender',
                  link: 'https://www.blender.org/'
                },
                {
                  title: 'Blender Reference Manual',
                  link: 'https://docs.blender.org/manual/'
                },
                {
                  title: 'Blender 中国社区',
                  link: 'http://www.blendercn.org/'
                },
              ]
            },
            {
              title: 'Tinkercad',
              link: 'https://www.tinkercad.com/',
              update: '2021-03-03'
            },
          ]
        },
        {
          title: '网页',
          items: [
            {
              title: 'PlayCanvas',
              link: 'https://playcanvas.com/',
              update: '2021-02-08'
            },
            {
              title: '百度 H5',
              link: 'https://h5.bce.baidu.com/',
              update: '2021-02-08'
            },
          ]
        },
        {
          title: '写作',
          items: [
            {
              title: 'LOFTER',
              link: 'http://www.lofter.com/',
              update: '2021-02-08'
            },
            {
              title: '简书',
              link: 'https://www.jianshu.com/',
              update: '2021-02-08'
            },
            {
              title: '秘塔写作猫',
              link: 'https://xiezuocat.com/',
              update: '2021-02-08'
            },
            {
              title: '幕布',
              desc: '极简大纲笔记',
              link: 'https://mubu.com/',
              update: '2021-06-20'
            },
          ]
        },
        {
          title: '音乐',
          items: [
            {
              title: '合成音乐',
              items: [
                {
                  title: 'VOCALOID',
                  items: [
                    {
                      title: '官方',
                      items: [
                        {
                          title: 'VOCALOID ( ボーカロイド・ボカロ ) 公式サイト',
                          link: 'https://www.vocaloid.com/',
                          update: '2021-02-08'
                        },
                        {
                          title: '上海禾念（淘宝网）',
                          link: 'https://shop69979973.taobao.com/',
                          update: '2021-02-08'
                        },
                        {
                          title: '天矢禾念娱乐集团',
                          link: 'http://www.zenith-grp.com/',
                          update: '2021-02-08'
                        },
                      ]
                    },
                    {
                      title: '论坛',
                      items: [
                        {
                          title: 'iVocaloid论坛',
                          link: 'http://bbs.ivocaloid.com/',
                          update: '2021-02-08'
                        },
                        {
                          title: '洛天依中文网',
                          link: 'http://www.luotianyi.org/forum.php',
                          update: '2021-02-08'
                        },
                      ]
                    },
                    {
                      title: '资源',
                      items: [
                        {
                          title: 'VOCAKEY',
                          link: 'http://vocakey.info/'
                        },
                      ]
                    },
                  ]
                },
                {
                  title: 'Synthesizer V',
                  link: 'https://synthesizerv.com/'
                },
              ]
            },
            {
              title: 'Amped Studio',
              desc: '在线音乐创作，编辑，制作平台',
              link: 'https://web-amped.music.163.com/',
              update: '2021-06-04'
            },
          ]
        },
        {
          title: '支持',
          items: [
            {
              title: 'Patreon',
              link: 'https://www.patreon.com/',
              update: '2021-06-04'
            },
            {
              title: '爱发电',
              link: 'https://afdian.net/',
              update: '2021-02-08'
            },
            {
              title: '面包多',
              desc: '为创作者创收',
              link: 'https://mianbaoduo.com/',
              update: '2021-06-04'
            },
          ]
        },
        {
          title: '其他',
          items: [
            {
              title: 'ProcessOn',
              desc: '免费在线作图，思维导图，流程图，实时协作',
              link: 'https://www.processon.com/',
              update: '2021-06-20'
            },
            {
              title: 'Smartmockups',
              desc: '产品模板生成工具',
              link: 'https://smartmockups.com/',
              update: '2021-02-08'
            },
            {
              title: 'X Studio · 主播',
              link: 'https://cfm.xiaoice.com/',
              update: '2021-03-02'
            },
          ]
        },
      ]
    },
    {
      title: '动漫 / 二次元',
      icon: 'el-icon-star-off',
      items: [
        {
          title: 'CLAMP',
          items: [
            {
              title: 'CLAMP-FANS',
              link: 'https://clamp-fans.com/',
              update: '2021-05-01'
            },
            {
              title: 'CLAMP-NET',
              link: 'https://clamp-net.com/',
              update: '2021-05-01'
            },
            {
              title: 'カードキャプターさくら公式サイト（魔卡少女樱官网）',
              link: 'http://ccsakura-official.com/',
              update: '2021-04-01'
            },
          ]
        },
        {
          title: 'God is Madoka',
          desc: 'kaname madoka かなめ まどか 鹿目圆香 魔法少女まどか☆マギカ',
          link: 'https://kami.im/',
          update: '2021-09-20'
        },
        {
          title: 'ISML (International Saimoe League)',
          desc: '国际最萌大会',
          link: 'https://www.internationalsaimoe.com/',
          update: '2022-03-05'
        },
        {
          title: '二次元秘店',
          desc: '动漫游戏同人综合论坛',
          link: 'http://www.ecymd.net/bbs/',
          update: '2021-06-02'
        },
      ]
    },
    {
      title: '多媒体',
      icon: 'el-icon-film',
      items: [
        {
          title: '视频',
          items: [
            {
              title: '网站',
              items: [
                {
                  title: 'bilibili',
                  items: [
                    {
                      title: 'bilibili（主站）',
                      link: 'https://www.bilibili.com/',
                      update: '2021-02-08'
                    },
                    {
                      title: 'bilibili（漫画）',
                      link: 'https://manga.bilibili.com/',
                      update: '2021-05-16'
                    },
                    {
                      title: 'bilibili（直播）',
                      link: 'https://live.bilibili.com/',
                      update: '2021-02-08'
                    },
                    {
                      title: 'bilibili（搜索）',
                      link: 'https://search.bilibili.com/',
                      update: '2021-02-08'
                    },
                  ]
                },
                {
                  title: '8KRAW',
                  desc: '正版视频素材库',
                  link: 'https://www.8kraw.com/',
                  update: '2021-05-09'
                },
                {
                  title: 'AcFun',
                  link: 'http://www.acfun.cn/',
                  update: '2021-02-08'
                },
                {
                  title: 'TokyoStreetView',
                  link: 'https://www.tokyostreetview.com/',
                  update: '2021-02-08'
                },
                {
                  title: 'UtoVR',
                  desc: '带您进入VR世界',
                  link: 'https://www.utovr.com/',
                  update: '2021-02-08'
                },
                {
                  title: '爱奇艺',
                  link: 'http://www.iqiyi.com/',
                  update: '2021-02-08'
                },
                {
                  title: '百度视频',
                  link: 'http://v.baidu.com/',
                  update: '2021-02-08'
                },
                {
                  title: '场库',
                  desc: '高品质短片分享平台',
                  link: 'https://www.vmovier.com/',
                  update: '2021-02-08'
                },
                {
                  title: '广视网',
                  link: 'https://www.gztv.com/',
                  update: '2021-06-05'
                },
                {
                  title: '乐视视频',
                  link: 'http://www.le.com/',
                  update: '2021-02-08'
                },
                {
                  title: '好看视频',
                  link: 'https://haokan.baidu.com/',
                  update: '2021-02-08'
                },
                {
                  title: '芒果TV',
                  link: 'http://www.mgtv.com/',
                  update: '2021-02-08'
                },
                {
                  title: '腾讯视频',
                  link: 'http://v.qq.com/',
                  update: '2021-02-08'
                },
                {
                  title: '新片场',
                  link: 'https://www.xinpianchang.com/',
                  update: '2021-02-08'
                },
                {
                  title: '优酷',
                  link: 'http://www.youku.com/',
                  update: '2021-02-08'
                },
              ],
            },
            {
              title: '工具',
              items: [
                {
                  title: 'BiliOB233',
                  desc: 'B站历史数据统计分析',
                  link: 'https://www.biliob233.com/',
                  update: '2021-02-08'
                },
                {
                  title: 'BiliPlus',
                  link: 'https://www.biliplus.com/',
                  update: '2021-02-08'
                },
                {
                  title: '哔哩哔哩唧唧',
                  link: 'https://www.jijidown.com/',
                  update: '2021-02-08'
                },
              ]
            },
            {
              title: '直播',
              items: [
                {
                  title: 'earthTV',
                  link: 'https://www.earthtv.com/',
                  update: '2021-02-08'
                },
                {
                  title: 'SkylineWebcams',
                  link: 'http://www.skylinewebcams.com/',
                  update: '2021-02-08'
                },
                {
                  title: 'Twitch',
                  link: 'https://www.twitch.tv/',
                  update: '2021-02-08'
                },
                {
                  title: '斗鱼',
                  link: 'https://www.douyu.com/',
                  update: '2021-02-08'
                },
                {
                  title: '虎牙直播',
                  link: 'https://www.huya.com/',
                  update: '2021-02-08'
                },
                {
                  title: '网易直播',
                  link: 'http://v.163.com/',
                  update: '2021-02-08'
                },
                {
                  title: '直播中国',
                  link: 'https://livechina.cctv.com/',
                  update: '2021-08-21'
                },
              ]
            },
            {
              title: '资源',
              items: [
                {
                  title: 'Big Buck Bunny',
                  link: 'https://peach.blender.org/download/'
                },
                {
                  title: 'Big Buck Bunny 3D',
                  link: 'http://bbb3d.renderfarming.net/download.html'
                },
              ]
            },
          ]
        },
        {
          title: '图片',
          items: [
            {
              title: '网站',
              items: [
                {
                  title: 'Imgur',
                  link: 'https://imgur.com/',
                  update: '2021-02-08'
                },
                {
                  title: 'HTTP Cats',
                  link: 'https://http.cat/',
                  update: '2021-02-08'
                },
                {
                  title: 'Pixilart',
                  desc: '像素画社区和绘画工具',
                  link: 'https://www.pixilart.com/',
                  update: '2021-11-14'
                },
                {
                  title: 'Unsplash',
                  link: 'https://unsplash.com/',
                  update: '2021-02-08'
                },
                {
                  title: '百度图片',
                  link: 'https://image.baidu.com/',
                  update: '2021-02-08'
                },
                {
                  title: '闪萌',
                  desc: '全球最大的中文GIF搜索引擎',
                  link: 'https://www.weshineapp.com/',
                  update: '2021-12-29'
                },
              ]
            },
            {
              title: '工具',
              items: [
                {
                  title: 'Bigjpg',
                  desc: 'AI人工智能图片无损放大',
                  link: 'https://bigjpg.com/',
                  update: '2021-06-20'
                },
                {
                  title: 'Fotor',
                  link: 'https://www.fotor.com/'
                },
                {
                  title: 'Multi-service image search',
                  link: 'http://www.iqdb.org/'
                },
                {
                  title: 'Photopea',
                  desc: '在线多功能图片编辑工具',
                  link: 'https://www.photopea.com/',
                  update: '2022-03-05'
                },
                {
                  title: 'SauceNAO Image Search',
                  link: 'http://saucenao.com/'
                },
                {
                  title: 'TinEye',
                  link: 'http://tineye.com/'
                },
                {
                  title: 'waifu2x',
                  desc: '使用卷积神经网络对图片进行放大操作',
                  link: 'http://waifu2x.udp.jp/',
                  update: '2021-06-20'
                },
                {
                  title: '泼辣修图',
                  link: 'https://www.polaxiong.com/'
                },
              ]
            },
          ]
        },
        {
          title: '音乐',
          items: [
            {
              title: '网站',
              items: [
                {
                  title: '5nd 音乐网',
                  link: 'http://www.5nd.com/',
                  update: '2021-02-08'
                },
                {
                  title: '5SING',
                  desc: '中国原创音乐基地',
                  link: 'http://5sing.kugou.com/',
                  update: '2021-02-08'
                },
                {
                  title: 'QQ音乐',
                  link: 'https://y.qq.com/',
                  update: '2021-02-08'
                },
                {
                  title: 'TingFM',
                  desc: '收音机在线收听，广播电台网络直播',
                  link: 'https://tingfm.com/',
                  update: '2021-06-04'
                },
                {
                  title: '酷狗音乐',
                  link: 'https://www.kugou.com/',
                  update: '2021-02-08'
                },
                {
                  title: '酷我音乐',
                  link: 'https://www.kuwo.cn/',
                  update: '2021-02-08'
                },
                {
                  title: '千千音乐',
                  link: 'https://music.taihe.com/',
                  update: '2021-02-08'
                },
                {
                  title: '听蛙纯音乐网',
                  link: 'https://www.itingwa.com/',
                  update: '2021-06-04'
                },
                {
                  title: '网易云音乐',
                  link: 'https://music.163.com/',
                  update: '2021-02-08'
                },
              ]
            },
            {
              title: '工具',
              items: [
                {
                  title: 'Noisli',
                  link: 'https://www.noisli.com/'
                },
                {
                  title: 'Rainy Mood',
                  link: 'http://rainymood.com/'
                },
                {
                  title: '陶笛简谱网',
                  link: 'https://happi123.com/',
                  update: '2021-06-05'
                },
                {
                  title: '在线多人钢琴',
                  link: 'http://www.multiplayerpiano.com/'
                },
                {
                  title: '自由钢琴 AutoPiano',
                  link: 'https://www.autopiano.cn/'
                },
              ]
            },
          ]
        },
      ]
    },
    {
      title: '工具',
      icon: 'el-icon-setting',
      items: [
        {
          title: '编辑',
          items: [
            {
              title: 'Editor.md',
              desc: '开源在线 Markdown 编辑器',
              link: 'https://pandao.github.io/editor.md/',
              update: '2021-02-08'
            },
            {
              title: 'SimpleMDE',
              desc: '一个使用 JavaScript 开发的 Markdown 编辑器',
              link: 'https://simplemde.com/',
              update: '2021-02-08'
            },
          ]
        },
        {
          title: '测试',
          items: [
            {
              title: 'ICC Version 4 检测',
              link: 'http://www.color.org/version4html.xalter'
            },
            {
              link: 'https://www.speedtest.net/',
              title: 'Speedtest by Ookla',
              update: '2021-06-05'
            },
            {
              title: 'UFO Test',
              desc: '显示器 / 屏幕刷新率测试',
              link: 'https://www.testufo.com/',
              update: '2021-06-06'
            },
            {
              title: '测速网',
              link: 'https://www.speedtest.cn/',
              update: '2021-06-05'
            },
            {
              title: '浏览器信息',
              link: 'http://mybrowse.osfipin.com/'
            },
            {
              title: '网易 DNS 检测',
              link: 'http://nstool.netease.com/'
            },
            {
              title: '在线屏幕检测',
              link: 'https://screen.bmcx.com/'
            },
          ]
        },
        {
          title: '查询',
          items: [
            {
              title: '地图',
              items: [
                {
                  title: 'Bing 地图',
                  link: 'https://cn.bing.com/maps',
                  update: '2021-02-25'
                },
                {
                  title: 'OSGeo中国中心',
                  desc: '地理空间数据共享',
                  link: 'https://www.osgeo.cn/',
                  update: '2021-02-25'
                },
                {
                  title: '百度地图',
                  link: 'https://map.baidu.com/',
                  update: '2021-02-25'
                },
                {
                  title: '高德地图',
                  link: 'https://www.amap.com/',
                  update: '2021-02-25'
                },
                {
                  title: '卡巴斯基网络威胁实时地图',
                  link: 'https://cybermap.kaspersky.com/cn/',
                  update: '2021-02-25'
                },
                {
                  title: '腾讯地图',
                  link: 'https://map.qq.com/',
                  update: '2021-02-25'
                },
              ]
            },
            {
              title: '搜索引擎',
              items: [
                {
                  title: 'Bing 搜索',
                  link: 'https://cn.bing.com/',
                  update: '2021-02-25'
                },
                {
                  title: 'Google 搜索',
                  link: 'https://www.google.com/',
                  update: '2021-02-25'
                },
                {
                  title: '百度搜索',
                  link: 'https://www.baidu.com/',
                  update: '2021-02-25'
                },
                {
                  title: '鸠摩搜索',
                  desc: '文档搜索引擎',
                  link: 'https://www.jiumodiary.com/',
                  update: '2021-02-25'
                },
                {
                  title: '搜狗搜索',
                  link: 'https://www.sogou.com/',
                  update: '2021-02-25'
                },
                {
                  title: '无追搜索',
                  link: 'https://www.wuzhuiso.com/',
                  update: '2021-12-29'
                },
              ]
            },
            {
              title: '网址导航',
              items: [
                {
                  title: 'MCNav',
                  desc: 'Minecraft 网址导航站',
                  link: 'https://www.mcnav.net/',
                  update: '2021-11-14'
                },
                {
                  title: '龙喵网',
                  link: 'http://ailongmiao.com/',
                  update: '2021-02-07'
                },
                {
                  title: '万花筒',
                  link: 'https://wht.im/',
                  update: '2021-02-07'
                },
              ]
            },
            {
              title: '360查字体',
              link: 'https://fonts.safe.360.cn/',
              update: '2021-02-25'
            },
            {
              title: 'BIOS Master Password Generator',
              link: 'https://bios-pw.org/',
              update: '2021-02-25'
            },
            {
              title: 'CodeTime',
              desc: '编程时长统计与分析',
              link: 'https://codetime.datreks.com/',
              update: '2021-06-08'
            },
            {
              title: 'Firefox Monitor',
              desc: '查看您的账号、密码数据是否已被泄露',
              link: 'https://monitor.firefox.com/',
              update: '2021-06-04'
            },
            {
              title: 'Have I Been Pwned',
              desc: '查看您的账号、密码数据是否已被泄露',
              link: 'https://haveibeenpwned.com/',
              update: '2021-06-04'
            },
            {
              title: 'IPIP.NET',
              desc: '专业的 IP 地址库',
              link: 'https://www.ipip.net/',
              update: '2021-05-22'
            },
            {
              title: 'Microsoft Math Solver（数学求解器）',
              link: 'https://mathsolver.microsoft.com/',
              update: '2021-06-01'
            },
            {
              title: 'WakaTime',
              desc: '编程时长统计与分析',
              link: 'https://wakatime.com/',
              update: '2021-07-05'
            },
            {
              title: '任何时区的精确时间',
              link: 'https://time.is/',
              update: '2021-02-25'
            },
            {
              title: '台风路径',
              link: 'http://typhoon.zjwater.gov.cn/',
              update: '2021-08-21'
            },
            {
              title: '天眼查',
              link: 'https://www.tianyancha.com/',
              update: '2021-02-25'
            },
            {
              title: '通用机场信息平台',
              link: 'https://ga.aopa.org.cn/',
              update: '2021-09-20'
            },
            {
              title: '中国天气网',
              link: 'http://www.weather.com.cn/',
              update: '2021-02-25'
            },
            {
              title: '中央气象台',
              link: 'http://www.nmc.cn/',
              update: '2021-02-25'
            },
            {
              title: '中央气象台台风网',
              link: 'http://typhoon.nmc.cn/',
              update: '2021-08-21'
            },
          ]
        },
        {
          title: '翻译',
          items: [
            {
              title: 'DeepL',
              link: 'https://www.deepl.com/translator',
              update: '2021-05-23'
            },
            {
              title: 'Transifex',
              desc: '本地化平台',
              link: 'https://www.transifex.com/',
              update: '2021-06-04'
            },
            {
              title: 'Weblate',
              desc: '基于网页的在线本地化平台',
              link: 'https://weblate.org/',
              update: '2021-06-04'
            },
            {
              title: '百度翻译',
              link: 'https://fanyi.baidu.com/',
              update: '2021-05-23'
            },
            {
              title: '必应翻译',
              link: 'https://cn.bing.com/translator/',
              update: '2021-05-23'
            },
            {
              title: '谷歌翻译',
              link: 'https://translate.google.cn/',
              update: '2021-05-23'
            },
            {
              title: '谷歌翻译',
              link: 'https://translate.google.com/',
              update: '2021-05-23'
            },
            {
              title: '金山词霸',
              link: 'https://www.iciba.com/',
              update: '2021-05-23'
            },
            {
              title: '有道翻译',
              link: 'https://fanyi.youdao.com/',
              update: '2021-05-23'
            },
          ]
        },
        {
          title: '工具箱',
          items: [
            {
              title: 'Be JSON',
              link: 'http://www.bejson.com/',
              update: '2021-02-08'
            },
            {
              title: 'MikuTools',
              desc: '一个轻量的工具集合',
              link: 'https://tools.miku.ac/',
              update: '2021-02-08'
            },
            {
              title: '爱资料在线工具',
              link: 'https://www.toolnb.com/',
              update: '2021-02-08'
            },
            {
              title: '孟坤工具箱',
              link: 'http://tool.mkblog.cn/',
              update: '2021-02-08'
            },
            {
              title: '万能命令',
              desc: '快捷寻找和直达你想要的各类工具',
              link: 'https://wanneng.run/',
              update: '2021-02-08'
            },
            {
              title: '在线工具',
              desc: '程序员的工具箱',
              link: 'https://tool.lu/',
              update: '2021-02-08'
            },
          ]
        },
        {
          title: '举报',
          items: [
            {
              title: '12321 网络不良与垃圾信息举报受理中心',
              link: 'https://www.12321.cn/',
              update: '2021-02-08'
            },
            {
              title: '国家网信办举报中心',
              link: 'http://www.12377.cn/',
              update: '2021-02-08'
            },
            {
              title: '网络违法犯罪举报网站',
              link: 'http://www.cyberpolice.cn/',
              update: '2021-06-04'
            },
          ]
        },
        {
          title: '模拟',
          items: [
            {
              title: 'Habitica',
              link: 'https://habitica.com/',
              update: '2021-02-08'
            },
            {
              title: 'PCjs Machines',
              link: 'https://www.pcjs.org/',
              update: '2021-02-08'
            },
          ]
        },
        {
          title: '全景',
          items: [
            {
              title: '720云全景虚拟现实社区',
              link: 'http://720yun.com/',
              update: '2021-02-08'
            },
            {
              title: '千亿像素看中国',
              link: 'http://www.bigpixel.cn/',
              update: '2021-02-08'
            },
          ]
        },
        {
          title: '生成器',
          items: [
            {
              title: 'CRT 生成器',
              link: 'https://crt.dl444.net/',
              update: '2021-04-16'
            },
            {
              title: 'Sigene 駅名標ジェネレーター',
              link: 'https://tr246.github.io/Sigene/index.html',
              update: '2021-04-16'
            },
            {
              title: '電光掲示板 Generator',
              link: 'https://landhere.jp/services/ledsb/',
              update: '2021-04-16'
            },
            {
              title: '铁路线路图生成器',
              link: 'https://wongchito.github.io/RailMapGenerator/',
              update: '2021-04-16'
            },
            {
              title: '站名牌產生器',
              link: 'http://data.but.tw/eki/',
              update: '2021-04-16'
            },
          ]
        },
        {
          title: '网盘 / 云盘',
          items: [
            {
              title: 'MEGA',
              link: 'https://mega.nz/',
              update: '2021-02-08'
            },
            {
              title: 'OneDrive',
              link: 'https://onedrive.live.com/',
              update: '2021-02-08'
            },
            {
              title: '阿里云盘',
              link: 'https://www.aliyundrive.com/',
              update: '2021-02-08'
            },
            {
              title: '百度网盘',
              link: 'https://pan.baidu.com/',
              update: '2021-02-08'
            },
            {
              title: '天翼云盘',
              link: 'https://cloud.189.cn/',
              update: '2021-05-22'
            },
            {
              title: '文叔叔',
              desc: '传文件，找文叔叔',
              link: 'https://www.wenshushu.cn/',
              update: '2021-04-16'
            },
          ]
        },
        {
          title: '网络 / 网站',
          items: [
            {
              link: 'https://www.17ce.com/',
              desc: '网站测速',
              title: '17CE.COM',
              update: '2021-06-04'
            },
            {
              title: 'Censys',
              link: 'https://censys.io/',
              update: '2021-02-08'
            },
            {
              title: 'FOFA Pro',
              desc: '网络空间安全搜索引擎',
              link: 'https://fofa.so/',
              update: '2021-02-08'
            },
            {
              title: 'IT狗',
              desc: '在线 ping、网站测速、路由追踪',
              link: 'https://www.itdog.cn/',
              update: '2021-12-29'
            },
            {
              title: 'OHTTPS',
              desc: '免费 HTTPS 证书、自动更新、自动部署',
              link: 'https://ohttps.com/',
              update: '2021-06-04'
            },
            {
              title: 'Qualys SSL Labs',
              link: 'https://www.ssllabs.com/',
              update: '2021-02-08'
            },
            {
              title: 'UptimeRobot',
              desc: '免费的网站状态监测工具',
              link: 'https://uptimerobot.com/',
              update: '2021-06-02'
            },
            {
              title: 'Wayback Machine',
              link: 'https://web.archive.org/',
              update: '2021-02-08'
            },
            {
              title: 'ZoomEye',
              desc: 'Cyberspace Search Engine',
              link: 'https://www.zoomeye.org/',
              update: '2021-04-17'
            },
          ]
        },
        {
          title: '卫星',
          items: [
            {
              title: '向日葵-8號',
              link: 'https://himawari8.nict.go.jp/',
              update: '2021-02-08'
            },
          ]
        },
        {
          title: '文档',
          items: [
            {
              title: '石墨文档',
              desc: '企业在线协同办公系统平台',
              link: 'https://shimo.im/',
              update: '2021-06-20'
            },
            {
              title: '腾讯文档',
              link: 'https://docs.qq.com/',
              update: '2021-05-22'
            },
            {
              title: '语雀',
              link: 'http://yuque.com/',
              update: '2021-05-22'
            },
          ]
        },
        {
          title: '问卷',
          items: [
            {
              title: '金数据',
              desc: '人人可用的在线表单工具',
              link: 'https://jinshuju.net/',
              update: '2021-06-04'
            },
            {
              title: '腾讯问卷',
              link: 'https://wj.qq.com/',
              update: '2021-02-08'
            },
            {
              title: '网易问卷',
              link: 'https://survey.163.com/',
              update: '2021-05-22'
            },
            {
              title: '问卷星',
              link: 'https://www.wjx.cn/',
              update: '2021-05-22'
            },
          ]
        },
        {
          title: '娱乐',
          items: [
            {
              title: 'Mikutap',
              link: 'https://aidn.jp/mikutap/',
              update: '2021-06-20'
            },
            {
              title: 'The Useless Web',
              link: 'https://theuselessweb.com/',
              update: '2021-02-08'
            },
          ]
        },
        {
          title: '转换',
          items: [
            {
              title: 'Carbon',
              desc: '代码转图片',
              link: 'https://carbon.now.sh/',
              update: '2021-06-05'
            },
            {
              title: 'Convertio',
              desc: '在线文件转换器',
              link: 'https://convertio.co/',
              update: '2021-10-27'
            },
            {
              title: 'Smallpdf',
              desc: '您所有 PDF 问题的免费解决方案',
              link: 'https://smallpdf.com/',
              update: '2021-02-08'
            },
            {
              title: '草料二维码',
              link: 'http://cli.im/',
              update: '2021-02-08'
            },
            {
              title: '档铺网',
              desc: '在线文档免费处理',
              link: 'http://www.docpe.com/',
              update: '2021-02-08'
            },
            {
              title: '网易见外',
              link: 'https://jianwai.youdao.com/',
              update: '2021-06-05'
            },
          ]
        },
        {
          title: '其他',
          items: [
            {
              title: 'net2ftp',
              link: 'http://www.net2ftp.com/',
              update: '2021-02-08'
            },
            {
              title: '腾讯兔小巢',
              desc: '免费便捷的用户意见反馈服务平台',
              link: 'https://txc.qq.com/',
              update: '2021-06-05'
            },
          ]
        }
      ]
    },
    {
      title: '购物',
      icon: 'el-icon-shopping-bag-2',
      items: [
        {
          title: '网站',
          items: [
            {
              title: 'APSGO 软购',
              link: 'https://apsgo.com/',
              update: '2021-02-08'
            },
            {
              title: '当当网',
              link: 'https://www.dangdang.com/',
              update: '2021-02-08'
            },
            {
              title: '京东',
              link: 'https://www.jd.com/',
              update: '2021-02-08'
            },
            {
              title: '考拉海购',
              link: 'https://www.kaola.com/',
              update: '2021-02-08'
            },
            {
              title: '蘑菇街',
              link: 'https://www.mogujie.com/',
              update: '2021-02-08'
            },
            {
              title: '苏宁易购',
              link: 'https://www.suning.com/',
              update: '2021-02-08'
            },
            {
              title: '淘宝',
              link: 'https://www.taobao.com/',
              update: '2021-02-08'
            },
            {
              title: '天猫',
              link: 'https://www.tmall.com/',
              update: '2021-02-08'
            },
            {
              title: '小米商城',
              link: 'https://www.mi.com/',
              update: '2021-02-08'
            },
            {
              title: '亚马逊',
              link: 'https://www.amazon.cn/',
              update: '2021-02-08'
            },
          ]
        },
        {
          title: '饮食',
          items: [
            {
              title: '必胜客',
              link: 'http://www.pizzahut.com.cn/',
              update: '2021-02-08'
            },
            {
              title: '必胜客宅急送',
              link: 'https://www.4008123123.com/',
              update: '2021-02-08'
            },
            {
              title: '饿了么',
              link: 'https://www.ele.me/',
              update: '2021-02-08'
            },
            {
              title: '肯德基',
              link: 'http://www.kfc.com.cn/',
              update: '2021-02-08'
            },
            {
              title: '肯德基宅急送',
              link: 'https://www.4008823823.com.cn/',
              update: '2021-02-08'
            },
            {
              title: '美团外卖',
              link: 'https://h5.waimai.meituan.com/',
              update: '2021-02-08'
            },
          ]
        },
      ]
    },
    {
      title: '金融',
      icon: 'el-icon-wallet',
      items: [
        {
          title: '银行',
          items: [
            {
              title: '交通银行',
              link: 'http://www.bankcomm.com/',
              update: '2021-02-08'
            },
            {
              title: '招商银行',
              link: 'http://www.cmbchina.com/',
              update: '2021-02-08'
            },
            {
              title: '中国工商银行',
              link: 'https://www.icbc.com.cn/',
              update: '2021-02-08'
            },
            {
              title: '中国建设银行',
              link: 'http://www.ccb.com/',
              update: '2021-02-08'
            },
            {
              title: '中国农业银行',
              link: 'http://www.abchina.com/',
              update: '2021-02-08'
            },
            {
              title: '中国人民银行',
              link: 'http://www.pbc.gov.cn/',
              update: '2021-02-08'
            },
            {
              title: '中国银行',
              link: 'https://www.boc.cn/',
              update: '2021-02-08'
            },
          ]
        },
        {
          title: '支付宝',
          link: 'https://www.alipay.com/',
          update: '2021-02-08'
        },
      ]
    },
    {
      title: '设计',
      icon: 'el-icon-magic-stick',
      items: [
        {
          title: 'UI中国',
          link: 'https://www.ui.cn/',
          update: '2021-02-08'
        },
        {
          title: '花瓣网',
          link: 'https://huaban.com/',
          update: '2021-02-08'
        },
        {
          title: '优阁网（UIGREAT）',
          link: 'https://www.uigreat.com/',
          update: '2021-02-08'
        },
        {
          title: '优设网（UISDC）',
          link: 'http://www.uisdc.com/',
          update: '2021-02-08'
        },
        {
          title: '云瑞设计',
          link: 'https://www.yrucd.com/',
          update: '2021-02-08'
        },
        {
          title: '站酷（ZCOOL）',
          link: 'https://www.zcool.com.cn/',
          update: '2021-02-08'
        },
      ]
    },
    {
      title: '调试',
      icon: 'el-icon-set-up',
      items: [
        {
          title: 'Chrome',
          items: [
            {
              title: 'Chrome URLs',
              link: 'chrome://about/',
              showOnly: true
            },
            {
              title: 'Dino',
              link: 'chrome://dino/',
              showOnly: true
            },
            {
              title: 'Favicon',
              link: 'chrome://favicon/size/32@1x/协议://链接/',
              showOnly: true
            },
            {
              title: 'HTML5 本地储存',
              link: 'chrome://indexeddb-internals/',
              showOnly: true
            },
            {
              title: 'Net Internals',
              link: 'chrome://net-internals/',
              showOnly: true
            },
            {
              title: 'Translate Internals',
              link: 'chrome://translate-internals/',
              showOnly: true
            },
            {
              title: '操作记录',
              link: 'chrome://user-actions/',
              showOnly: true
            },
            {
              title: '关于版本',
              link: 'chrome://version/',
              showOnly: true
            },
            {
              title: '检查',
              link: 'chrome://inspect/#devices',
              showOnly: true
            },
            {
              title: '扩展程序',
              link: 'chrome://extensions/',
              showOnly: true
            },
            {
              title: '历史记录',
              link: 'chrome://history/',
              showOnly: true
            },
            {
              title: '媒体内部数据',
              link: 'chrome://media-internals/',
              showOnly: true
            },
            {
              title: '模块',
              link: 'chrome://conflicts/',
              showOnly: true
            },
            {
              title: '实验性功能',
              link: 'chrome://flags/',
              showOnly: true
            },
            {
              title: '书签管理器',
              link: 'chrome://bookmarks/',
              showOnly: true
            },
            {
              title: '下载内容',
              link: 'chrome://downloads/',
              showOnly: true
            },
            {
              title: '应用',
              link: 'chrome://apps/',
              showOnly: true
            },
            {
              title: '应用缓存',
              link: 'chrome://appcache-internals/',
              showOnly: true
            },
            {
              title: '政策',
              link: 'chrome://policy/',
              showOnly: true
            },
            {
              title: '组件',
              link: 'chrome://components/',
              showOnly: true
            },
            {
              title: '最近浏览网页缩略图',
              link: 'chrome://thumbnails/',
              showOnly: true
            },
          ]
        },
        {
          title: '查看源代码',
          link: 'view-source:页面的链接',
          showOnly: true
        },
      ]
    },
    {
      title: '网络',
      icon: 'fa fa-globe',
      items: [
        {
          title: '管理',
          items: [
            {
              title: '局域网（192.168.0.1）',
              link: 'http://192.168.0.1/'
            },
            {
              title: '局域网（192.168.0.1:8080）',
              link: 'http://192.168.0.1:8080/'
            },
            {
              title: '局域网（192.168.1.1）',
              link: 'http://192.168.1.1/'
            },
            {
              title: '局域网（192.168.1.1:8080）',
              link: 'http://192.168.1.1:8080/'
            },
            {
              title: '局域网（192.168.5.1）',
              link: 'http://192.168.5.1/'
            },
            {
              title: '局域网（192.168.31.1）',
              link: 'http://192.168.31.1/'
            },
            {
              title: '路由器（TP-LINK）',
              link: 'http://tplogin.cn/'
            },
            {
              title: '路由器（Xiaomi / Redmi）',
              link: 'http://miwifi.com/'
            },
          ]
        },
        {
          title: '内网穿透（内网映射）',
          items: [
            {
              title: 'cpolar',
              desc: '安全的内网穿透工具',
              link: 'https://www.cpolar.com/',
              update: '2021-06-20'
            },
            {
              title: 'NATAPP',
              link: 'https://natapp.cn/',
              update: '2021-02-08'
            },
            {
              title: 'ngrok',
              link: 'https://ngrok.com/',
              desc: 'secure introspectable tunnels to localhost',
              update: '2021-06-20'
            },
            {
              title: 'Sakura Frp',
              link: 'https://www.natfrp.com/',
              update: '2021-03-31'
            },
            {
              title: '浮居内网穿透',
              link: 'https://frp.cool/',
              update: '2021-03-31'
            },
          ]
        },
        {
          title: '云服务',
          items: [
            {
              title: 'Cloudflare',
              link: 'https://www.cloudflare.com/',
              update: '2021-04-16'
            },
            {
              title: 'mmTrix',
              desc: '云应用性能管理',
              link: 'http://www.mmtrix.com/',
              update: '2021-04-16'
            },
            {
              title: 'Nodecache',
              link: 'https://www.nodecache.com/',
              update: '2021-04-16'
            },
            {
              title: 'Vercel',
              link: 'https://vercel.com/',
              update: '2021-06-01'
            },
            {
              title: 'Vultr',
              link: 'https://vultr.com/',
              update: '2021-04-16'
            },
            {
              title: '阿里云',
              link: 'https://www.aliyun.com/',
              update: '2021-04-16'
            },
            {
              title: '百度智能云',
              link: 'https://cloud.baidu.com/',
              update: '2021-04-16'
            },
            {
              title: '悍铭数据中心',
              link: 'https://www.hanming.com/',
              update: '2021-04-16'
            },
            {
              title: '腾讯云',
              link: 'https://cloud.tencent.com/',
              update: '2021-04-16'
            },
            {
              title: '又拍云',
              link: 'https://www.upyun.com/',
              update: '2021-04-16'
            },
            {
              title: '雨云',
              link: 'https://www.rainyun.com/',
              update: '2021-04-16'
            },
          ]
        },
        {
          title: 'DNS',
          items: [
            {
              title: '114DNS',
              link: 'http://www.114dns.com/',
              update: '2021-02-08'
            },
            {
              title: 'DNS派',
              link: 'http://www.dnspai.com/',
              update: '2021-02-08'
            },
            {
              title: 'Public DNS+',
              link: 'https://www.dnspod.cn/Products/Public.DNS',
              update: '2021-02-08'
            },
            {
              title: '阿里DNS',
              link: 'http://www.alidns.com/',
              update: '2021-02-08'
            },
          ]
        },
      ]
    },
    {
      title: '系统',
      icon: 'el-icon-cpu',
      items: [
        {
          title: 'Android',
          items: [
            {
              title: '软件',
              items: [
                {
                  title: '网站',
                  items: [
                    {
                      title: 'APK Mirror',
                      link: 'https://www.apkmirror.com/',
                      update: '2021-02-08'
                    },
                    {
                      title: 'APK Pure',
                      link: 'https://apkpure.com/',
                      update: '2021-02-08'
                    },
                    {
                      title: 'F-Droid',
                      desc: '一个 Android 平台上的 FOSS（Free and Open Source Software，自由开源软件）目录，并提供下载安装支持。',
                      link: 'https://f-droid.org/',
                      update: '2021-08-03'
                    },
                    {
                      title: 'Google Play',
                      link: 'https://play.google.com/',
                      update: '2021-02-08'
                    },
                    {
                      title: '酷安网',
                      link: 'https://coolapk.com/',
                      update: '2021-02-08'
                    },
                  ]
                },
                {
                  title: 'ADB Shell',
                  link: 'http://adbshell.com/',
                  update: '2021-02-25'
                },
                {
                  title: 'Limbo PC Emulator',
                  link: 'https://limboemulator.weebly.com/',
                  update: '2021-02-25'
                },
              ]
            },
            {
              title: '系统',
              items: [
                {
                  title: 'Resurrection Remix OS',
                  link: 'https://resurrectionremix.com/',
                  update: '2021-11-14'
                },
              ]
            },
          ]
        },
        {
          title: 'Linux',
          items: [
            {
              title: '资料',
              items: [
                {
                  title: 'Linux 命令大全',
                  link: 'https://man.linuxde.net/',
                  update: '2021-02-08'
                },
                {
                  title: 'Netplan',
                  link: 'https://netplan.io/',
                  update: '2021-09-30'
                },
              ]
            },
            {
              title: 'Ubuntu',
              link: 'http://www.ubuntu.org.cn/',
              update: '2021-02-08'
            },
          ]
        },
        {
          title: 'Windows',
          items: [
            {
              title: 'MSDN，我告诉你',
              desc: 'MSDN 镜像下载',
              link: 'https://msdn.itellyou.cn/',
              update: '2021-02-08'
            },
          ]
        },
        {
          title: '其他',
          items: [
            {
              title: 'Lakka',
              link: 'http://www.lakka.tv/',
            },
          ]
        },
      ]
    },
    {
      title: '学习',
      icon: 'el-icon-reading',
      items: [
        {
          title: 'Certiport',
          link: 'https://certiport.pearsonvue.com/',
          update: '2021-06-05'
        },
        {
          title: 'freeCodeCamp',
          desc: 'Learn to Code',
          link: 'https://www.freecodecamp.org/',
          update: '2021-06-05'
        },
        {
          title: 'HiNative',
          desc: '一个针对外语学习者的问答平台',
          link: 'https://hinative.com/',
          update: '2021-06-10'
        },
        {
          title: 'Lang-8',
          desc: '多国语言学习交流平台',
          link: 'https://lang-8.com/',
          update: '2021-06-10'
        },
        {
          title: '九一速课网',
          link: 'https://www.91suke.com/',
          update: '2021-02-08'
        },
        {
          title: '力扣（LeetCode）',
          desc: '全球极客挚爱的技术成长平台',
          link: 'https://leetcode-cn.com/',
          update: '2021-09-20'
        },
        {
          title: '牛客网',
          link: 'https://www.nowcoder.com/',
          update: '2021-06-05'
        },
        {
          title: '腾讯课堂',
          link: 'https://ke.qq.com/',
          update: '2021-02-08'
        },
        {
          title: '网易云课堂',
          link: 'https://study.163.com/',
          update: '2021-02-08'
        },
        {
          title: '中国大学 MOOC（慕课）',
          link: 'https://www.icourse163.org/',
          update: '2021-02-08'
        },
      ]
    },
    {
      title: '游戏',
      icon: 'fa fa-gamepad',
      items: [
        {
          title: '网站',
          items: [
            {
              title: '17173',
              link: 'http://www.17173.com/',
              update: '2021-02-08'
            },
            {
              title: '4399',
              link: 'http://www.4399.com/',
              update: '2021-02-08'
            },
            {
              title: '7k7k',
              link: 'http://www.7k7k.com/',
              update: '2021-02-08'
            },
            {
              title: 'Epic Games',
              link: 'https://www.epicgames.com/',
              update: '2021-02-08'
            },
            {
              title: 'Origin',
              link: 'https://www.origin.com/',
              update: '2021-02-08'
            },
            {
              title: 'Steam',
              link: 'https://store.steampowered.com/',
              update: '2021-02-08'
            },
            {
              title: '橙光游戏中心',
              link: 'http://www.66rpg.com/',
              update: '2021-02-08'
            },
            {
              title: '游民星空',
              link: 'http://www.gamersky.com/',
              update: '2021-02-08'
            },
            {
              title: '育碧游戏（UBISOFT）',
              link: 'https://www.ubisoft.com.cn/',
              update: '2021-02-08'
            },
          ]
        },
        {
          title: '2048',
          items: [
            {
              title: '2048',
              link: 'http://gabrielecirulli.github.io/2048/',
              update: '2021-02-25'
            },
            {
              title: '2147483648',
              link: 'http://cyberzhg.github.io/2048/',
              update: '2021-02-25'
            },
          ]
        },
        {
          title: 'Minecraft',
          items: [
            {
              title: '官方',
              items: [
                {
                  title: 'Minecraft 官网',
                  link: 'https://minecraft.net/',
                  update: '2021-02-08'
                },
                {
                  title: 'Mojang Jira',
                  desc: '反馈 bug / 提交建议',
                  link: 'https://bugs.mojang.com/',
                  update: '2021-11-14'
                },
              ]
            },
            {
              title: '百科',
              items: [
                {
                  title: 'Minecraft Wiki',
                  link: 'https://minecraft.fandom.com/zh/',
                  update: '2021-05-09'
                },
                {
                  title: 'Minecraft Wiki（哔哩哔哩）',
                  link: 'https://wiki.biligame.com/mc/Minecraft_Wiki',
                  update: '2021-06-04'
                },
                {
                  title: 'Minecraft 插件百科',
                  link: 'http://mineplugin.org/',
                  update: '2021-02-08'
                },
                {
                  title: 'Minecraft 光影百科',
                  link: 'https://shaders.fandom.com/',
                  update: '2022-02-03'
                },
                {
                  title: 'MC百科',
                  link: 'https://www.mcmod.cn/',
                  update: '2021-02-08'
                },
                {
                  title: 'wiki.vg',
                  link: 'https://wiki.vg/',
                  update: '2021-06-05'
                },
              ]
            },
            {
              title: '服务器',
              items: [
                {
                  title: '服务端',
                  items: [
                    {
                      title: 'Sponge',
                      items: [
                        {
                          title: 'Sponge',
                          link: 'https://www.spongepowered.org/',
                          update: '2021-02-08'
                        },
                        {
                          title: 'Sponge Ore',
                          link: 'https://ore.spongepowered.org/',
                          update: '2021-02-08'
                        },
                      ]
                    },
                    {
                      title: 'Bukkit',
                      link: 'http://dev.bukkit.org/',
                      update: '2021-02-20'
                    },
                    {
                      title: 'Get Bukkit',
                      desc: '下载 CraftBukkit、Spigot 服务端',
                      link: 'https://getbukkit.org/',
                      update: '2021-12-02'
                    },
                    {
                      title: 'PaperMC',
                      link: 'https://papermc.io/downloads',
                      update: '2021-02-20'
                    },
                    {
                      title: 'PocketMine-MP',
                      link: 'http://www.pocketmine.net/',
                      update: '2021-02-20'
                    },
                  ]
                },
                {
                  title: '列表',
                  items: [
                    {
                      title: '服务器列表',
                      link: 'http://minecraftservers.org/',
                    },
                  ]
                },
              ]
            },
            {
              title: '工具',
              items: [
                {
                  title: 'Amulate',
                  desc: '新版本的地图编辑器，支持基岩版',
                  link: 'https://www.amuletmc.com/',
                  update: '2021-11-14'
                },
                {
                  title: 'BakaXL 启动器',
                  link: 'https://www.bakaxl.com/',
                  update: '2021-02-08'
                },
                {
                  title: 'Blessing Skin Server',
                  desc: '皮肤站',
                  link: 'https://skin.prinzeugen.net/',
                  update: '2021-02-20'
                },
                {
                  title: 'Blockbench',
                  desc: '模型制作工具',
                  link: 'https://blockbench.net/',
                },
                {
                  title: 'Crafting Guide',
                  link: 'http://www.minecraft-crafting.net/',
                },
                {
                  title: 'Cuberite',
                  link: 'https://cuberite.org/',
                },
                {
                  title: 'HMCL 启动器',
                  link: 'https://hmcl.huangyuhui.net/',
                  update: '2021-02-08'
                },
                {
                  title: 'MCC Toolchest PE',
                  link: 'http://mcctoolchest.com/',
                  update: '2021-02-08'
                },
                {
                  title: 'MCEdit Unified',
                  desc: '地图编辑器',
                  link: 'https://www.mcedit-unified.net/',
                  update: '2021-02-20'
                },
                {
                  title: 'MCreator',
                  desc: '模组制作工具',
                  link: 'https://mcreator.net/',
                  update: '2021-02-08'
                },
                {
                  title: 'Minecraft Data Pack Generator（数据包生成器）',
                  link: 'https://misode.github.io/',
                  update: '2021-04-17'
                },
                {
                  title: 'Minecraft Overviewer',
                  link: 'https://overviewer.org/',
                  update: '2021-02-20'
                },
                {
                  title: 'Minecraft Tools',
                  desc: 'Minecraft 在线工具合集',
                  link: 'https://minecraft.tools/',
                  update: '2021-11-14'
                },
                {
                  title: 'Mineways',
                  desc: 'Minecraft 建筑转模型工具',
                  link: 'http://www.realtimerendering.com/erich/minecraft/public/mineways/',
                  update: '2021-11-14',
                },
                {
                  title: 'Mine-imator',
                  link: 'https://www.mineimator.com/',
                  update: '2021-02-20'
                },
                {
                  title: 'Minotar（Minecraft 头像 API）',
                  link: 'https://minotar.net/',
                  update: '2021-04-17'
                },
                {
                  title: 'PMCSkin3D',
                  desc: '多功能皮肤编辑器',
                  link: 'https://www.planetminecraft.com/pmcskin3d/',
                  update: '2021-06-05'
                },
                {
                  title: 'NameMC',
                  link: 'https://zh-cn.namemc.com/',
                  update: '2021-02-08'
                },
                {
                  title: 'Spritecraft',
                  desc: '方块像素画生成器',
                  link: 'https://www.autosaved.org/Spritecraft',
                  update: '2021-06-04'
                },
                {
                  title: 'Tellraw Generator（tellraw 命令生成器）',
                  link: 'https://www.minecraftjson.com/',
                  update: '2021-02-08'
                },
                {
                  title: 'Universal Minecraft Editor',
                  link: 'https://www.universalminecrafteditor.com/',
                  update: '2021-02-08'
                },
                {
                  title: '创建你自己的 Minecraft 成就',
                  link: 'http://mc.whitegem.net/',
                  update: '2021-02-20'
                },
                {
                  title: '命令升级',
                  link: 'https://spu.spgoding.com/',
                  update: '2021-02-20'
                },
                {
                  title: '模组翻译参考词典',
                  link: 'https://dict.mcmod.cn/',
                  update: '2021-02-20'
                },
              ]
            },
            {
              title: '开发',
              items: [
                {
                  title: 'Forge 文档',
                  link: 'https://mcforge.readthedocs.io/',
                  update: '2021-02-20'
                },
                {
                  title: '森罗万象',
                  desc: '一个 Minecraft Java 版资源包制作指南',
                  link: 'https://sqwatermark.com/resguide/',
                  update: '2022-02-03'
                },
              ]
            },
            {
              title: '论坛',
              items: [
                {
                  title: 'Minecraft 中文论坛',
                  link: 'https://www.mcbbs.net/',
                  update: '2021-02-08'
                },
                {
                  title: 'Minecraft-HK Community',
                  link: 'http://forum.minecraft-hk.com/',
                  update: '2021-02-08'
                },
                {
                  title: 'Planet Minecraft Community',
                  link: 'https://www.planetminecraft.com/',
                  update: '2021-02-08'
                },
                {
                  title: '最MC论坛',
                  link: 'http://www.zuimc.com/',
                  update: '2021-02-08'
                },
              ]
            },
            {
              title: '资源',
              items: [
                {
                  title: '网站',
                  items: [
                    {
                      title: 'MCPE DL（Minecraft 基岩版资源下载）',
                      link: 'https://mcpedl.com/',
                      update: '2021-06-14'
                    },
                    {
                      title: 'Minecraft CurseForge',
                      link: 'https://www.curseforge.com/minecraft',
                      update: '2021-02-08'
                    },
                    {
                      title: 'Minecraft Schematics',
                      link: 'https://www.minecraft-schematics.com/',
                      update: '2021-06-04'
                    },
                    {
                      title: 'Minecraft 中文下载站',
                      link: 'http://www.minecraftxz.com/',
                      update: '2021-02-08'
                    },
                    {
                      title: 'Modrinth',
                      desc: '开源的模组平台',
                      link: 'https://modrinth.com/',
                      update: '2022-02-03'
                    },
                    {
                      title: 'SpigotMC',
                      link: 'https://www.spigotmc.org/',
                      update: '2021-06-23'
                    },
                  ]
                },
                {
                  title: '模组',
                  items: [
                    {
                      title: 'Fabric',
                      link: 'https://fabricmc.net/',
                      update: '2021-08-21'
                    },
                    {
                      title: 'Forge',
                      link: 'http://files.minecraftforge.net/',
                      update: '2021-02-08'
                    },
                    {
                      title: 'LiteLoader',
                      link: 'http://www.liteloader.com/',
                      update: '2021-02-08'
                    },
                    {
                      title: 'OptiFine',
                      link: 'http://www.optifine.net/',
                      update: '2021-02-08'
                    },
                  ]
                },
              ]
            }
          ]
        },
        {
          title: 'CSSBattle',
          desc: 'CSS 代码高尔夫（code-golfing）游戏',
          link: 'https://cssbattle.dev/',
          update: '2022-03-20'
        },
      ]
    },
    {
      title: '资讯',
      icon: 'el-icon-news',
      items: [
        {
          title: '新闻',
          items: [
            {
              title: '百度新闻',
              link: 'https://news.baidu.com/',
              update: '2021-02-08'
            },
            {
              title: '环球网',
              link: 'http://www.huanqiu.com/',
              update: '2021-02-08'
            },
            {
              title: '看看新闻',
              desc: '叩击时代',
              link: 'http://www.kankanews.com/',
              update: '2021-02-08'
            },
            {
              title: '搜狐新闻',
              link: 'http://news.sohu.com/',
              update: '2021-02-08'
            },
            {
              title: '腾讯新闻',
              link: 'https://new.qq.com/',
              update: '2021-02-08'
            },
            {
              title: '新浪新闻',
              link: 'http://news.sina.com.cn/',
              update: '2021-02-08'
            }
          ]
        },
        {
          title: '36kr（36氪）',
          link: 'https://36kr.com/',
          update: '2021-02-08'
        },
        {
          title: '煎蛋',
          desc: '地球上没有新鲜事',
          link: 'http://jandan.net/',
          update: '2021-02-08'
        },
        {
          title: '少数派',
          desc: '高效工作，品质生活',
          link: 'https://sspai.com/',
          update: '2021-02-08'
        },
        {
          title: '腾讯网',
          link: 'https://www.qq.com/',
          update: '2021-02-08'
        },
        {
          title: '央视网',
          desc: '世界就在眼前',
          link: 'http://www.cctv.com/',
          update: '2021-02-08'
        },
      ]
    },
    {
      title: '资源',
      icon: 'el-icon-files',
      items: [
        {
          title: '建站',
          items: [
            {
              title: 'DokuWiki',
              link: 'https://www.dokuwiki.org/',
              update: '2021-04-17'
            },
            {
              title: 'LNMP 一键安装包',
              link: 'https://lnmp.org/',
            },
            {
              title: 'Lsky Pro（图床）',
              link: 'https://www.lsky.pro/',
              update: '2021-02-08'
            },
            {
              title: 'PHP Directory Lister',
              link: 'http://www.directorylister.com/',
            },
            {
              title: 'Typecho',
              link: 'http://typecho.org/',
              update: '2021-02-08'
            },
            {
              title: 'Valine',
              desc: '无后端评论系统',
              link: 'https://valine.js.org/',
              update: '2021-02-08'
            },
            {
              title: 'VuePress',
              desc: 'Vue 驱动的静态网站生成器',
              link: 'https://www.vuepress.cn/',
              update: '2021-04-17'
            },
            {
              title: 'Webmin',
              link: 'http://www.webmin.com/',
              update: '2021-04-17'
            }
          ]
        },
        {
          title: '镜像站',
          items: [
            {
              title: '阿里巴巴开源镜像站',
              link: 'https://opsx.alibaba.com/mirror',
              update: '2021-02-08'
            },
            {
              title: '北京交通大学自由与开源软件镜像站',
              link: 'https://mirror.bjtu.edu.cn/',
              update: '2021-02-08'
            },
            {
              title: '重庆大学开源软件镜像站',
              link: 'https://mirrors.cqu.edu.cn/',
              update: '2021-02-08'
            },
            {
              title: '大连东软信息学院开源镜像站',
              link: 'http://mirrors.neusoft.edu.cn/',
              update: '2021-02-08'
            },
            {
              title: '华为开源镜像站',
              link: 'https://mirrors.huaweicloud.com/',
              update: '2021-02-08'
            },
            {
              title: '华中科技大学开源镜像站',
              link: 'http://mirror.hust.edu.cn/',
              update: '2021-02-08'
            },
            {
              title: '清华大学开源软件镜像站',
              link: 'https://mirrors.tuna.tsinghua.edu.cn/',
              update: '2021-02-08'
            },
            {
              title: '山东大学镜像站',
              link: 'https://mirrors.sdu.edu.cn/',
              update: '2021-12-29'
            },
            {
              title: '腾讯软件源',
              link: 'https://mirrors.cloud.tencent.com/',
              update: '2021-02-08'
            },
            {
              title: '网易开源镜像站',
              link: 'http://mirrors.163.com/',
              update: '2021-02-08'
            },
            {
              title: '浙江大学开源镜像站',
              link: 'http://mirrors.zju.edu.cn/',
              update: '2021-02-08'
            },
            {
              title: '中国科学技术大学开源软件镜像',
              link: 'http://mirrors.ustc.edu.cn/',
              update: '2021-02-08'
            }
          ]
        },
        {
          title: '软件',
          items: [
            {
              title: '网站',
              items: [
                {
                  title: '腾讯软件中心',
                  link: 'https://pc.qq.com/',
                  update: '2021-02-08'
                },
                {
                  title: '异次元软件世界',
                  link: 'https://www.iplaysoft.com/',
                  update: '2021-02-08'
                },
                {
                  title: '正版中国',
                  link: 'https://getitfree.cn/',
                  update: '2021-02-08'
                }
              ]
            },
            {
              title: 'PPT 插件',
              items: [
                {
                  title: 'iSlide',
                  desc: '让 PPT 设计简单起来',
                  link: 'https://www.islide.cc/',
                  update: '2021-06-05'
                },
                {
                  title: 'OneKeyTools',
                  link: 'http://oktools.xyz/',
                  update: '2021-06-05'
                },
              ]
            },
            {
              title: '播放器',
              items: [
                {
                  title: 'AIMP',
                  link: 'http://www.aimp.ru/',
                  update: '2021-05-22'
                },
                {
                  title: 'QQ影音',
                  link: 'https://player.qq.com/',
                  update: '2021-02-08'
                },
                {
                  title: 'VLC',
                  link: 'https://www.videolan.org/',
                  update: '2021-02-08'
                }
              ]
            },
            {
              title: '创作 / 制作',
              items: [
                {
                  title: 'Adobe Creative Cloud apps',
                  link: 'https://helpx.adobe.com/download-install/kb/download-availability.html',
                  update: '2021-03-31'
                },
                {
                  title: 'LibreOffice',
                  link: 'https://www.libreoffice.org/',
                  update: '2021-03-31'
                },
                {
                  title: 'MagicaVoxel',
                  link: 'https://ephtracy.github.io/',
                  update: '2021-03-31'
                },
                {
                  title: 'MidiEditor',
                  link: 'https://www.midieditor.org/',
                  update: '2021-03-31'
                },
                {
                  title: 'MidiPiano',
                  link: 'http://www.midipiano.net/',
                  update: '2021-03-31'
                },
                {
                  title: 'OpenMPT',
                  link: 'http://openmpt.org/',
                  update: '2021-03-31'
                },
                {
                  title: 'OpenToonz',
                  link: 'http://opentoonz.github.io/e/index.html',
                  update: '2021-03-31'
                },
                {
                  title: '万兴喵影',
                  desc: '视频剪辑软件',
                  link: 'https://miao.wondershare.cn/',
                  update: '2021-06-05'
                }
              ]
            },
            {
              title: '工具',
              items: [
                {
                  title: 'Ekho（余音）- 中文语音合成软件',
                  link: 'http://www.eguidedog.net/cn/ekho_cn.php',
                  update: '2021-06-05'
                },
                {
                  title: 'EmEditor（文本编辑器）',
                  link: 'https://zh-cn.emeditor.com/',
                  update: '2021-06-04'
                },
                {
                  title: 'FileZilla',
                  link: 'https://filezilla-project.org/',
                  update: '2021-04-16'
                },
                {
                  title: 'FreePiano',
                  link: 'http://freepiano.tiwb.com/',
                  update: '2021-04-16'
                },
                {
                  title: 'iSparta',
                  desc: 'PNG 压缩与格式转换工具',
                  link: 'http://isparta.github.io/',
                  update: '2021-04-16'
                },
                {
                  title: 'LICEcap',
                  desc: 'GIF 录制工具',
                  link: 'https://www.cockos.com/licecap/',
                  update: '2021-04-16'
                },
                {
                  title: 'LinuxLive USB Creator',
                  link: 'http://www.linuxliveusb.com/',
                  update: '2021-04-16'
                },
                {
                  title: 'Locale Emulator',
                  desc: '模拟语言区域',
                  link: 'http://pooi.moe/Locale-Emulator/',
                  update: '2021-04-16'
                },
                {
                  title: 'Mp3tag',
                  desc: '音频标签编辑器',
                  link: 'https://www.mp3tag.de/',
                  update: '2021-04-16'
                },
                {
                  title: 'NetSarang',
                  link: 'https://www.netsarang.com/',
                  update: '2021-04-16'
                },
                {
                  title: 'PicPick',
                  desc: '全功能的屏幕截图工具',
                  link: 'https://picpick.app/',
                  update: '2021-04-16'
                },
                {
                  title: 'Snipaste',
                  desc: '简单但强大的截图工具',
                  link: 'https://zh.snipaste.com/',
                  update: '2021-04-16'
                },
                {
                  title: 'The Enigma Protector',
                  desc: '软件压缩和加密保护工具',
                  link: 'https://www.enigmaprotector.com/',
                  update: '2021-04-16'
                },
                {
                  title: 'ToDesk',
                  desc: '远程控制',
                  link: 'https://www.todesk.com/',
                  update: '2021-06-01'
                },
                {
                  title: 'Typora',
                  desc: 'Markdown 编辑器',
                  link: 'https://www.typora.io/',
                  update: '2021-04-16'
                },
                {
                  title: 'uTools',
                  desc: '你的生产力工具集',
                  link: 'https://u.tools/',
                  update: '2021-02-08'
                },
                {
                  title: 'x64dbg',
                  desc: '开源的 Windows 调试工具',
                  link: 'https://x64dbg.com/',
                  update: '2021-04-16'
                },
                {
                  title: '万彩办公大师',
                  link: 'http://www.wofficebox.com/',
                  update: '2021-04-16'
                }
              ]
            },
            {
              title: '浏览器扩展',
              items: [
                {
                  title: 'Chrome 插件网',
                  link: 'http://www.cnplugins.com/',
                  update: '2021-02-08'
                },
                {
                  title: 'FeHelper',
                  desc: 'Web 开发者助手',
                  link: 'https://www.baidufe.com/fehelper/index/index.html',
                  update: '2021-04-17'
                },
                {
                  title: 'Greasy Fork',
                  link: 'https://greasyfork.org/zh-CN',
                  update: '2021-02-08'
                },
                {
                  title: 'Tampermonkey',
                  link: 'https://www.tampermonkey.net/',
                  update: '2021-02-08'
                },
                {
                  title: 'Violentmonkey',
                  link: 'https://violentmonkey.github.io/',
                  update: '2021-02-08'
                }
              ]
            },
            {
              title: '美化',
              items: [
                {
                  title: 'Aero Glass for Win8+',
                  link: 'http://www.glass8.eu/'
                },
                {
                  title: 'Rainmeter',
                  link: 'http://rainmeter.cn/cms/'
                },
                {
                  title: '电脑主题之家',
                  link: 'http://www.win4000.com/'
                },
                {
                  title: '萌娘资源站',
                  link: 'http://moe.005.tv/'
                },
                {
                  title: '致美化',
                  link: 'https://zhutix.com/',
                  update: '2021-06-04'
                }
              ]
            },
            {
              title: '网络',
              items: [
                {
                  title: 'Chrome',
                  link: 'https://www.google.cn/intl/zh-CN/chrome/',
                  update: '2021-02-08'
                },
                {
                  title: 'Firefox',
                  link: 'https://www.firefox.com.cn/',
                  update: '2021-02-08'
                },
                {
                  title: 'HFS (HTTP File Server)',
                  link: 'https://www.rejetto.com/hfs/',
                  update: '2021-04-17'
                },
                {
                  title: 'Postman',
                  link: 'https://www.postman.com/',
                  update: '2021-06-04'
                },
                {
                  title: 'tcping.exe',
                  desc: 'TCP 端口 PING 工具',
                  link: 'https://elifulkerson.com/projects/tcping.php',
                  update: '2021-06-05'
                },
                {
                  title: 'Wget',
                  link: 'http://www.gnu.org/software/wget/faq.html#download',
                  update: '2021-02-08'
                },
                {
                  title: 'Wireshark',
                  link: 'https://www.wireshark.org/',
                  update: '2021-02-08'
                },
                {
                  title: '百分浏览器',
                  link: 'https://www.centbrowser.cn/',
                  update: '2021-02-08'
                }
              ]
            },
            {
              title: '系统维护',
              items: [
                {
                  title: 'Ventoy',
                  desc: '多系统启动U盘解决方案',
                  link: 'https://www.ventoy.net/',
                  update: '2021-04-16'
                },
                {
                  title: '微PE工具箱',
                  link: 'http://www.wepe.com.cn/',
                  update: '2021-04-16'
                }
              ]
            },
            {
              title: '虚拟化',
              items: [
                {
                  title: 'Oracle VM VirtualBox',
                  link: 'https://www.virtualbox.org/',
                  update: '2021-02-08'
                },
                {
                  title: 'VMware Workstation Pro',
                  link: 'https://www.vmware.com/cn/products/workstation-pro.html',
                  update: '2021-02-08'
                }
              ]
            },
            {
              title: '运行库',
              items: [
                {
                  title: 'Adoptium (OpenJDK)',
                  desc: 'Open source, prebuilt OpenJDK binaries',
                  link: 'https://adoptium.net/',
                  update: '2021-08-03'
                },
                {
                  title: 'AdoptOpenJDK',
                  desc: 'Open source, prebuilt OpenJDK binaries',
                  link: 'https://adoptopenjdk.net/',
                  update: '2021-08-03'
                },
                {
                  title: 'Java',
                  link: 'https://www.java.com/',
                  update: '2021-08-03'
                },
                {
                  title: 'Java SE',
                  link: 'https://www.oracle.com/java/technologies/javase-downloads.html',
                  update: '2021-08-03'
                },
              ]
            },
          ]
        },
        {
          title: '素材',
          items: [
            {
              title: 'Iconfont',
              desc: '阿里巴巴矢量图标库',
              link: 'https://www.iconfont.cn/',
              update: '2021-02-08'
            },
            {
              title: 'OfficePLUS',
              desc: '微软 Office 官方在线模板网站',
              link: 'https://www.officeplus.cn/',
              update: '2021-02-08'
            },
            {
              title: 'Pexels',
              desc: '免费图库相片',
              link: 'https://www.pexels.com/',
              update: '2021-02-08'
            },
            {
              title: '爱给网',
              link: 'https://www.aigei.com/',
              update: '2021-06-04'
            },
            {
              title: '绘艺素材网',
              link: 'https://www.huiyi8.com/',
              update: '2021-02-08'
            },
            {
              title: '懒人图库',
              link: 'https://www.lanrentuku.com/',
              update: '2021-02-08'
            },
            {
              title: '昵图网',
              link: 'http://www.nipic.com/',
              update: '2021-02-08'
            },
            {
              title: '千库网',
              link: 'https://588ku.com/',
              update: '2021-02-08'
            },
            {
              title: '优品PPT',
              link: 'https://www.ypppt.com/',
              update: '2021-02-08'
            }
          ]
        },
        {
          title: '字体',
          items: [
            {
              title: 'adobe-fonts（清华大学开源软件镜像站）',
              link: 'https://mirrors.tuna.tsinghua.edu.cn/adobe-fonts/',
              update: '2021-02-08'
            },
            {
              title: 'Sound Fonts (Hitsquad)',
              link: 'http://www.hitsquad.com/smm/cat/SOUND_FONTS/',
            },
            {
              title: '阿里巴巴字体素材平台',
              link: 'https://alibabafont.taobao.com/',
              update: '2021-02-08'
            },
            {
              title: '仓耳字库',
              link: 'http://tsanger.cn/',
              update: '2021-02-08'
            },
            {
              title: '方正字库',
              link: 'http://www.foundertype.com/',
              update: '2021-02-08'
            },
            {
              title: '思源宋体',
              link: 'https://source.typekit.com/source-han-serif/cn/',
              update: '2021-02-08'
            },
            {
              title: '站长字体',
              link: 'http://font.chinaz.com/',
              update: '2021-02-08'
            },
            {
              title: '找字网',
              link: 'http://www.zhaozi.cn/',
              update: '2021-02-08'
            },
            {
              title: '字由',
              link: 'https://www.hellofont.cn/',
              update: '2021-02-08'
            }
          ]
        },
        {
          title: 'API / 开放平台',
          items: [
            {
              title: 'ALAPI',
              link: 'https://alapi.cn/',
              update: '2021-06-01'
            },
            {
              title: 'Crisp',
              link: 'https://app.crisp.chat/',
              update: '2021-02-08'
            },
            {
              title: 'MyIP（IP 地址查询）',
              link: 'https://www.my-ip.io/',
              update: '2021-06-10'
            },
            {
              title: 'OPPO开放平台',
              link: 'https://open.oppomobile.com/',
              update: '2021-02-08'
            },
            {
              title: '高德开放平台',
              link: 'https://lbs.amap.com/',
              update: '2021-02-08'
            },
            {
              title: '茉莉机器人',
              link: 'http://www.itpk.cn/',
              update: '2021-06-01'
            },
            {
              title: '腾讯开放平台',
              link: 'https://open.tencent.com/',
              update: '2021-02-08'
            },
            {
              title: '网易云音乐音频 API',
              link: 'https://music.163.com/song/media/outer/url?id=音乐ID.mp3',
              update: '2021-02-08',
              showOnly: true,
            },
            {
              title: '微信开放平台',
              link: 'https://open.weixin.qq.com/',
              update: '2021-02-08'
            },
            {
              title: '新浪微博开放平台',
              link: 'https://open.weibo.com/',
              update: '2021-02-08'
            },
            {
              title: '讯飞开放平台',
              link: 'https://www.xfyun.cn/',
              update: '2021-02-08'
            }
          ]
        },
        {
          title: 'CDN',
          items: [
            {
              title: 'Staticfile CDN',
              link: 'http://www.staticfile.org/',
              update: '2021-05-22'
            },
            {
              title: 'UNPKG',
              desc: 'npm 资源的全球内容分发网络（CDN）',
              link: 'https://unpkg.com/',
              update: '2021-06-20'
            },
            {
              title: '75CDN',
              desc: '前端静态资源库',
              link: 'https://cdn.baomitu.com/',
              update: '2021-05-22'
            },
          ]
        },
        {
          title: '其他',
          items: [
            {
              title: 'GitHub 镜像',
              link: 'https://github.com.cnpmjs.org/',
              update: '2021-03-08'
            },
            {
              title: 'NTP 服务器列表',
              link: 'http://www.ntp.org.cn/',
              update: '2021-02-25'
            },
            {
              title: 'UUP dump',
              desc: '轻松地从 Windows 更新服务器下载 UUP 文件',
              link: 'https://uupdump.net/',
              update: '2021-07-18'
            },
            {
              title: '永硕E盘',
              link: 'http://ys168.com/',
              update: '2021-02-25'
            }
          ]
        }
      ]
    },
    {
      title: '其他',
      icon: 'el-icon-more',
      items: [
        {
          title: 'AMD',
          desc: '高性能处理器和显卡',
          link: 'https://www.amd.com/',
          update: '2021-06-01'
        },
        {
          title: 'Intel',
          desc: '数据中心解决方案、物联网和电脑创新',
          link: 'https://www.intel.cn/',
          update: '2021-06-01'
        },
        {
          title: 'Microsoft',
          link: 'https://www.microsoft.com/',
          update: '2021-07-18'
        },
        {
          title: 'NVIDIA',
          desc: '引领人工智能计算',
          link: 'https://www.nvidia.cn/',
          update: '2021-06-01'
        },
      ]
    }
  ]
};
