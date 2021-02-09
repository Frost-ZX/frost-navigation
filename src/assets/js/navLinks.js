// 导航链接列表
// 更新：2021-02-08

import { Loading } from 'element-ui';

let datas = {
    // 列表
    list: [],
    // 版本号
    version: 16
};

let navLinks = [
    // 主分类
    {
        // 标题
        title: '百科 / 教程 / 科普 / 资料',
        // 子路径
        sub: [
            {
                // 标题
                title: '百科',
                // 链接合集
                links: [
                    {
                        // 链接
                        link: 'https://baike.baidu.com/',
                        // 标题
                        title: '百度百科',
                        // 更新日期
                        update: '2021-02-07'
                    },
                    {
                        link: 'https://ipaperclip.net/',
                        title: '回形针手册',
                        update: '2021-02-07'
                    },
                    {
                        link: 'https://zh.moegirl.org/',
                        title: '萌娘百科',
                        update: '2021-02-07'
                    },
                    {
                        link: 'https://zh.wikipedia.org/',
                        title: '维基百科',
                        update: '2021-02-07'
                    },
                ],
                // 子路径
                sub: [
                    {
                        title: 'Unicode® 字符百科',
                        links: [
                            {
                                link: 'https://unicode-table.com/cn/',
                                title: 'Unicode® 字符百科',
                                update: '2021-02-07'
                            },
                            {
                                link: 'https://unicode-table.com/cn/tools/encoder/',
                                title: '工具 - 编码器'
                            },
                            {
                                link: 'https://unicode-table.com/cn/tools/decoder/',
                                title: '工具 - 解码器'
                            },
                            {
                                link: 'https://unicode-table.com/cn/tools/flip/',
                                title: '工具 - 翻转'
                            },
                            {
                                link: 'https://unicode-table.com/cn/tools/generator/',
                                title: '工具 - Unicode 字符表生成'
                            }
                        ]
                    }
                ]
            },
            {
                title: '教程',
                links: [
                    {
                        link: 'http://www.w3school.com.cn/',
                        title: 'w3school 在线教程',
                        update: '2021-02-07'
                    },
                    {
                        link: 'https://www.runoob.com/',
                        title: '菜鸟教程',
                        update: '2021-02-07'
                    }
                ]
            },
            {
                title: '资料',
                links: [
                    {
                        link: 'http://www.ichgz.com/',
                        title: '广州市非物质文化遗产保护中心',
                        update: '2021-02-08'
                    },
                    {
                        link: 'http://www.ihchina.cn/',
                        title: '中国非物质文化遗产网',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://ctext.org/zhs',
                        title: '中国哲学书电子化计划',
                        update: '2021-02-08'
                    }
                ]
            }
        ]
    },
    {
        title: '博客 / 论坛 / 社区 / 社交 / 通讯',
        sub: [
            {
                title: '博客',
                links: [
                    {
                        link: 'https://4ssh.cn/',
                        title: '4SSH',
                        update: '2021-02-07'
                    },
                    {
                        link: 'https://lolicorn.com/',
                        title: '安和 Blog',
                        update: '2021-02-07'
                    },
                    {
                        link: 'https://www.myitmx.com/',
                        title: '枫叶博客',
                        update: '2021-02-07'
                    },
                    {
                        link: 'https://laod.cn/',
                        title: '老D博客',
                        update: '2021-02-07'
                    },
                    {
                        link: 'https://blog.littleha.cn/',
                        title: '小哈的博客'
                    },
                    {
                        link: 'https://2heng.xin/',
                        title: '樱花庄的白猫',
                        update: '2021-02-07'
                    },
                    {
                        link: 'https://www.htcp.net/',
                        title: '云梦',
                        update: '2021-02-07'
                    },
                    {
                        link: 'https://blog.frost-zx.top/',
                        title: 'Frost-ZX',
                        update: '2021-02-07'
                    },
                    {
                        link: 'https://www.haojunmei.top/',
                        title: 'haojunmei',
                        update: '2021-02-07'
                    },
                    {
                        link: 'https://kenvix.com/',
                        title: 'Kenvix\'s Blog'
                    },
                    {
                        link: 'https://luotianyi.vc/',
                        title: 'Luminous\' Home',
                        update: '2021-02-07'
                    },
                    {
                        link: 'https://n-a.date/',
                        title: 'UNKNOW date',
                        update: '2021-02-07'
                    },
                    {
                        link: 'https://blog.zgcwkj.cn/',
                        title: 'zgcwkj',
                        update: '2021-02-07'
                    }
                ]
            },
            {
                title: '论坛',
                links: [
                    {
                        link: 'http://www.ditiezu.com/',
                        title: '地铁族',
                        update: '2021-02-07'
                    },
                    {
                        link: 'https://www.pc426.com/',
                        title: 'PC426'
                    }
                ]
            },
            {
                title: '社区',
                links: [
                    {
                        link: 'https://tieba.baidu.com/',
                        title: '百度贴吧',
                        update: '2021-02-07'
                    },
                    {
                        link: 'https://www.douban.com/',
                        title: '豆瓣',
                        update: '2021-02-07'
                    },
                    {
                        link: 'https://www.oschina.net/',
                        title: '开源中国',
                        update: '2021-02-07'
                    },
                    {
                        link: 'https://www.codeseeding.com/',
                        title: '码云社 - 用代码改变世界',
                        update: '2021-02-07'
                    },
                    {
                        link: 'https://www.zhihu.com/',
                        title: '知乎',
                        update: '2021-02-07'
                    },
                    {
                        link: 'https://segmentfault.com/',
                        title: 'SegmentFault 思否',
                        update: '2021-02-07'
                    },
                    {
                        link: 'https://www.v2ex.com/',
                        title: 'V2EX',
                        update: '2021-02-08'
                    }
                ]
            },
            {
                title: '社交',
                links: [
                    {
                        link: 'https://weibo.com/',
                        title: '新浪微博',
                        update: '2021-02-07'
                    },
                    {
                        link: 'https://www.instagram.com/',
                        title: 'Instagram',
                        update: '2021-02-07'
                    },
                    {
                        link: 'https://qzone.qq.com/',
                        title: 'QQ空间',
                        update: '2021-02-07'
                    },
                    {
                        link: 'https://twitter.com/',
                        title: 'Twitter',
                        update: '2021-02-07'
                    }
                ]
            },
            {
                title: '通讯',
                links: [
                    {
                        link: 'https://www.materialtools.com/',
                        title: '云短信 - 在线短信接收',
                        update: '2021-02-07'
                    },
                    {
                        link: 'https://discordapp.com/',
                        title: 'Discord',
                        update: '2021-02-07'
                    }
                ],
                sub: [
                    {
                        title: '邮箱',
                        links: [
                            {
                                link: 'http://mail.126.com/',
                                title: '126邮箱',
                                update: '2021-02-07'
                            },
                            {
                                link: 'https://mail.163.com/',
                                title: '网易邮箱',
                                update: '2021-02-07'
                            },
                            {
                                link: 'https://mail.sina.com.cn/',
                                title: '新浪邮箱',
                                update: '2021-02-07'
                            },
                            {
                                link: 'https://outlook.live.com/',
                                title: 'Outlook',
                                update: '2021-02-07'
                            },
                            {
                                link: 'https://mail.qq.com/',
                                title: 'QQ邮箱',
                                update: '2021-02-07'
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        title: '创作 / 制作',
        sub: [
            {
                title: '编程',
                links: [
                    {
                        link: 'https://developer.android.google.cn/studio/',
                        title: 'Android Studio',
                        update: '2021-02-07'
                    },
                    {
                        link: 'http://www.codeblocks.org/',
                        title: 'Code::Blocks',
                        update: '2021-02-07'
                    },
                    {
                        link: 'http://www.eclipse.org/',
                        title: 'Eclipse',
                        update: '2021-02-07'
                    },
                    {
                        link: 'https://developers.google.cn/blockly/',
                        title: 'Google Blockly',
                        update: '2021-02-07'
                    },
                    {
                        link: 'https://www.python.org/',
                        title: 'Python',
                        update: '2021-02-07'
                    },
                    {
                        link: 'https://code.visualstudio.com/',
                        title: 'Visual Studio Code',
                        update: '2021-02-07'
                    }
                ]
            },
            {
                title: '建模',
                links: [
                    {
                        title: 'Blender',
                        links: [
                            {
                                link: 'https://www.blender.org/',
                                title: 'Blender'
                            },
                            {
                                link: 'https://docs.blender.org/manual/',
                                title: 'Blender Reference Manual'
                            },
                            {
                                link: 'http://www.blendercn.org/',
                                title: 'Blender 中国社区'
                            }
                        ]
                    }
                ]
            },
            {
                title: '网页',
                links: [
                    {
                        link: 'https://h5.bce.baidu.com/',
                        title: '百度 H5',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://playcanvas.com/',
                        title: 'PlayCanvas',
                        update: '2021-02-08'
                    }
                ]
            },
            {
                title: '音乐',
                sub: [
                    {
                        title: '合成音乐',
                        links: [
                            {
                                link: 'https://synthesizerv.com/',
                                title: 'Synthesizer V'
                            }
                        ],
                        sub: [
                            {
                                title: 'VOCALOID',
                                sub: [
                                    {
                                        title: '官方',
                                        links: [
                                            {
                                                link: 'https://www.vocaloid.com/',
                                                title: 'VOCALOID ( ボーカロイド・ボカロ ) 公式サイト',
                                                update: '2021-02-08'
                                            },
                                            {
                                                link: 'https://shop69979973.taobao.com/',
                                                title: '上海禾念（淘宝网）',
                                                update: '2021-02-08'
                                            },
                                            {
                                                link: 'http://www.zenith-grp.com/',
                                                title: '天矢禾念娱乐集团',
                                                update: '2021-02-08'
                                            }
                                        ]
                                    },
                                    {
                                        title: '论坛',
                                        links: [
                                            {
                                                link: 'http://www.luotianyi.org/forum.php',
                                                title: '洛天依中文网',
                                                update: '2021-02-08'
                                            },
                                            {
                                                link: 'http://bbs.ivocaloid.com/',
                                                title: 'iVocaloid论坛',
                                                update: '2021-02-08'
                                            }
                                        ]
                                    },
                                    {
                                        title: '资源',
                                        links: [
                                            {
                                                link: 'http://vocakey.info/',
                                                title: 'VOCAKEY'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                title: '支持',
                links: [
                    {
                        link: 'https://afdian.net/',
                        title: '爱发电',
                        update: '2021-02-08'
                    }
                ]
            }
        ]
    },
    {
        title: '多媒体',
        sub: [
            {
                title: '视频',
                sub: [
                    {
                        title: '网站',
                        links: [
                            {
                                link: 'https://www.8kraw.com//',
                                title: '8KRAW - 正版视频素材库',
                                update: '2021-02-08'
                            },
                            {
                                link: 'http://www.iqiyi.com/',
                                title: '爱奇艺',
                                update: '2021-02-08'
                            },
                            {
                                link: 'http://v.baidu.com/',
                                title: '百度视频',
                                update: '2021-02-08'
                            },
                            {
                                link: 'https://www.vmovier.com/',
                                title: '场库 - 高品质短片分享平台',
                                update: '2021-02-08'
                            },
                            {
                                link: 'http://www.le.com/',
                                title: '乐视视频',
                                update: '2021-02-08'
                            },
                            {
                                link: 'https://haokan.baidu.com/',
                                title: '好看视频',
                                update: '2021-02-08'
                            },
                            {
                                link: 'http://www.mgtv.com/',
                                title: '芒果TV',
                                update: '2021-02-08'
                            },
                            {
                                link: 'http://v.qq.com/',
                                title: '腾讯视频',
                                update: '2021-02-08'
                            },
                            {
                                link: 'https://www.xinpianchang.com/',
                                title: '新片场',
                                update: '2021-02-08'
                            },
                            {
                                link: 'http://www.youku.com/',
                                title: '优酷',
                                update: '2021-02-08'
                            },
                            {
                                link: 'http://www.acfun.cn/',
                                title: 'AcFun',
                                update: '2021-02-08'
                            },
                            {
                                link: 'https://www.tokyostreetview.com/',
                                title: 'TokyoStreetView',
                                update: '2021-02-08'
                            },
                            {
                                link: 'https://www.utovr.com/',
                                title: 'UtoVR - 带您进入VR世界',
                                update: '2021-02-08'
                            }
                        ],
                        sub: [
                            {
                                title: 'bilibili',
                                links: [
                                    {
                                        link: 'https://www.bilibili.com/',
                                        title: 'bilibili（主站）',
                                        update: '2021-02-08'
                                    },
                                    {
                                        link: 'https://live.bilibili.com/',
                                        title: 'bilibili（直播）',
                                        update: '2021-02-08'
                                    },
                                    {
                                        link: 'https://search.bilibili.com/',
                                        title: 'bilibili（搜索）',
                                        update: '2021-02-08'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        title: '工具',
                        links: [
                            {
                                link: 'https://www.jijidown.com/',
                                title: '哔哩哔哩唧唧',
                                update: '2021-02-08'
                            },
                            {
                                link: 'https://www.kanbilibili.com/',
                                title: '看哔哩哔哩',
                                update: '2021-02-08'
                            },
                            {
                                link: 'https://www.biliob233.com/',
                                title: 'BiliOB233 - B站历史数据统计分析',
                                update: '2021-02-08'
                            },
                            {
                                link: 'https://www.biliplus.com/',
                                title: 'BiliPlus',
                                update: '2021-02-08'
                            }
                        ]
                    },
                    {
                        title: '直播',
                        links: [
                            {
                                link: 'https://www.douyu.com/',
                                title: '斗鱼',
                                update: '2021-02-08'
                            },
                            {
                                link: 'https://www.huya.com/',
                                title: '虎牙直播',
                                update: '2021-02-08'
                            },
                            {
                                link: 'http://v.163.com/',
                                title: '网易直播',
                                update: '2021-02-08'
                            },
                            {
                                link: 'https://www.earthtv.com/',
                                title: 'earthTV',
                                update: '2021-02-08'
                            },
                            {
                                link: 'http://www.skylinewebcams.com/',
                                title: 'SkylineWebcams',
                                update: '2021-02-08'
                            },
                            {
                                link: 'https://www.twitch.tv/',
                                title: 'Twitch',
                                update: '2021-02-08'
                            }
                        ]
                    },
                    {
                        title: '资源',
                        links: [
                            {
                                link: 'https://peach.blender.org/download/',
                                title: 'Big Buck Bunny'
                            },
                            {
                                link: 'http://bbb3d.renderfarming.net/download.html',
                                title: 'Big Buck Bunny 3D'
                            }
                        ]
                    }
                ]
            },
            {
                title: '图片',
                sub: [
                    {
                        title: '网站',
                        links: [
                            {
                                link: 'https://image.baidu.com/',
                                title: '百度图片',
                                update: '2021-02-08'
                            },
                            {
                                link: 'https://imgur.com/',
                                title: 'Imgur',
                                update: '2021-02-08'
                            },
                            {
                                link: 'https://http.cat/',
                                title: 'HTTP Cats',
                                update: '2021-02-08'
                            },
                            {
                                link: 'https://unsplash.com/',
                                title: 'Unsplash',
                                update: '2021-02-08'
                            }
                        ]
                    },
                    {
                        title: '工具',
                        links: [
                            {
                                link: 'https://www.polaxiong.com/',
                                title: '泼辣修图'
                            },
                            {
                                link: 'https://www.fotor.com/',
                                title: 'Fotor'
                            },
                            {
                                link: 'http://www.iqdb.org/',
                                title: 'Multi-service image search'
                            },
                            {
                                link: 'http://saucenao.com/',
                                title: 'SauceNAO Image Search'
                            },
                            {
                                link: 'http://tineye.com/',
                                title: 'TinEye'
                            }
                        ]
                    }
                ]
            },
            {
                title: '音乐',
                sub: [
                    {
                        title: '网站',
                        links: [
                            {
                                link: 'http://www.5nd.com/',
                                title: '5nd 音乐网',
                                update: '2021-02-08'
                            },
                            {
                                link: 'http://5sing.kugou.com/',
                                title: '5SING - 中国原创音乐基地',
                                update: '2021-02-08'
                            },
                            {
                                link: 'https://www.kugou.com/',
                                title: '酷狗音乐',
                                update: '2021-02-08'
                            },
                            {
                                link: 'https://www.kuwo.cn/',
                                title: '酷我音乐',
                                update: '2021-02-08'
                            },
                            {
                                link: 'https://music.taihe.com/',
                                title: '千千音乐',
                                update: '2021-02-08'
                            },
                            {
                                link: 'https://music.163.com/',
                                title: '网易云音乐',
                                update: '2021-02-08'
                            },
                            {
                                link: 'https://y.qq.com/',
                                title: 'QQ音乐',
                                update: '2021-02-08'
                            }
                        ]
                    },
                    {
                        title: '工具',
                        links: [
                            {
                                link: 'http://www.multiplayerpiano.com/',
                                title: '在线多人钢琴'
                            },
                            {
                                link: 'https://www.autopiano.cn/',
                                title: '自由钢琴 AutoPiano'
                            },
                            {
                                link: 'https://www.noisli.com/',
                                title: 'Noisli'
                            },
                            {
                                link: 'http://rainymood.com/',
                                title: 'Rainy Mood'
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        title: '工具',
        sub: [
            {
                title: '版本控制',
                links: [
                    {
                        link: 'https://gitee.com/',
                        title: 'Gitee（码云）',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://github.com/',
                        title: 'GitHub',
                        update: '2021-02-08'
                    }
                ]
            },
            {
                title: '编辑',
                links: [
                    {
                        link: 'https://xiezuocat.com/',
                        title: '秘塔写作猫',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://pandao.github.io/editor.md/',
                        title: 'Editor.md - 开源在线 Markdown 编辑器',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://simplemde.com/',
                        title: 'SimpleMDE - JavaScript Markdown Editor',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://smartmockups.com/',
                        title: 'Smartmockups - 免费产品模板生成工具',
                        update: '2021-02-08'
                    }
                ]
            },
            {
                title: '测试',
                links: [
                    {
                        link: 'http://mybrowse.osfipin.com/',
                        title: '浏览器信息'
                    },
                    {
                        link: 'http://nstool.netease.com/',
                        title: '网易 DNS 检测'
                    },
                    {
                        link: 'https://screen.bmcx.com/',
                        title: '在线屏幕检测'
                    },
                    {
                        link: 'http://www.color.org/version4html.xalter',
                        title: 'ICC Version 4 检测'
                    }
                ]
            },
            {
                title: '查询',
                links: [
                    {
                        link: 'https://fonts.safe.360.cn/',
                        title: '360查字体'
                    },
                    {
                        link: 'https://www.metalgearjoe.cn/mn/',
                        title: '垃圾分类指南'
                    },
                    {
                        link: 'https://time.is/',
                        title: '任何时区的精确时间'
                    },
                    {
                        link: 'https://www.tianyancha.com/',
                        title: '天眼查'
                    },
                    {
                        link: 'http://www.weather.com.cn/',
                        title: '中国天气网'
                    },
                    {
                        link: 'http://www.nmc.cn/',
                        title: '中央气象台'
                    },
                    {
                        link: 'https://bios-pw.org/',
                        title: 'BIOS Master Password Generator'
                    }
                ],
                sub: [
                    {
                        title: '地图',
                        links: [
                            {
                                link: 'https://map.baidu.com/',
                                title: '百度地图'
                            },
                            {
                                link: 'https://www.amap.com/',
                                title: '高德地图'
                            },
                            {
                                link: 'https://cybermap.kaspersky.com/cn/',
                                title: '卡巴斯基网络威胁实时地图'
                            },
                            {
                                link: 'https://map.qq.com/',
                                title: '腾讯地图'
                            },
                            {
                                link: 'https://cn.bing.com/maps',
                                title: 'Bing 地图'
                            },
                            {
                                link: 'https://www.osgeo.cn/',
                                title: 'OSGeo中国中心 - 地理空间数据共享'
                            }
                        ]
                    },
                    {
                        title: '搜索引擎',
                        links: [
                            {
                                link: 'https://cn.bing.com/',
                                title: 'Bing 搜索'
                            },
                            {
                                link: 'https://www.google.com/',
                                title: 'Google 搜索'
                            },
                            {
                                link: 'https://www.baidu.com/',
                                title: '百度搜索'
                            },
                            {
                                link: 'https://www.jiumodiary.com/',
                                title: '鸠摩搜索 - 文档搜索引擎'
                            },
                            {
                                link: 'https://mijisou.com/',
                                title: '秘迹搜索'
                            },
                            {
                                link: 'https://www.sogou.com/',
                                title: '搜狗搜索'
                            },
                            {
                                link: 'http://so.ui001.com/',
                                title: '素材搜索'
                            }
                        ]
                    },
                    {
                        title: '网址导航',
                        links: [
                            {
                                link: 'http://ailongmiao.com/',
                                title: '龙喵网',
                                update: '2021-02-07'
                            },
                            {
                                link: 'https://wht.im/',
                                title: '万花筒',
                                update: '2021-02-07'
                            }
                        ]
                    }
                ]
            },
            {
                title: '工具箱',
                links: [
                    {
                        link: 'https://www.toolnb.com/',
                        title: '爱资料在线工具',
                        update: '2021-02-08'
                    },
                    {
                        link: 'http://tool.mkblog.cn/',
                        title: '孟坤工具箱',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://wanneng.run/',
                        title: '万能命令 - 快捷寻找和直达你想要的各类工具',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://tool.lu/',
                        title: '在线工具 - 程序员的工具箱',
                        update: '2021-02-08'
                    },
                    {
                        link: 'http://www.bejson.com/',
                        title: 'Be JSON',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://tools.miku.ac/',
                        title: 'MikuTools - 一个轻量的工具集合',
                        update: '2021-02-08'
                    }
                ]
            },
            {
                title: '举报',
                links: [
                    {
                        link: 'https://www.12321.cn/',
                        title: '12321 网络不良与垃圾信息举报受理中心',
                        update: '2021-02-08'
                    },
                    {
                        link: 'http://www.12377.cn/',
                        title: '国家网信办举报中心',
                        update: '2021-02-08'
                    }
                ]
            },
            {
                title: '模拟',
                links: [
                    {
                        link: 'https://habitica.com/',
                        title: 'Habitica',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://www.pcjs.org/',
                        title: 'PCjs Machines',
                        update: '2021-02-08'
                    }
                ]
            },
            {
                title: '全景',
                links: [
                    {
                        link: 'http://720yun.com/',
                        title: '720云全景虚拟现实社区',
                        update: '2021-02-08'
                    },
                    {
                        link: 'http://www.bigpixel.cn/',
                        title: '千亿像素看中国',
                        update: '2021-02-08'
                    }
                ]
            },
            {
                title: '网盘 / 云盘',
                links: [
                    {
                        link: 'https://www.aliyundrive.com/',
                        title: '阿里云盘',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://pan.baidu.com/',
                        title: '百度网盘',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://mega.nz/',
                        title: 'MEGA',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://onedrive.live.com/',
                        title: 'OneDrive',
                        update: '2021-02-08'
                    }
                ]
            },
            {
                title: '网站',
                links: [
                    {
                        link: 'https://censys.io/',
                        title: 'Censys',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://fofa.so/',
                        title: 'FOFA Pro - 网络空间安全搜索引擎',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://www.ssllabs.com/',
                        title: 'Qualys SSL Labs',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://web.archive.org/',
                        title: 'Wayback Machine',
                        update: '2021-02-08'
                    }
                ]
            },
            {
                title: '卫星',
                links: [
                    {
                        link: 'https://himawari8.nict.go.jp/',
                        title: '向日葵-8號',
                        update: '2021-02-08'
                    }
                ]
            },
            {
                title: '娱乐',
                links: [
                    {
                        link: 'https://theuselessweb.com/',
                        title: 'The Useless Web',
                        update: '2021-02-08'
                    }
                ]
            },
            {
                title: '转换',
                links: [
                    {
                        link: 'http://cli.im/',
                        title: '草料二维码',
                        update: '2021-02-08'
                    },
                    {
                        link: 'http://www.docpe.com/',
                        title: '档铺网 - 在线文档免费处理',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://smallpdf.com/',
                        title: 'Smallpdf - 您所有 PDF 问题的免费解决方案',
                        update: '2021-02-08'
                    }
                ]
            },
            {
                title: '其他',
                links: [
                    {
                        link: 'https://wj.qq.com/',
                        title: '腾讯问卷',
                        update: '2021-02-08'
                    },
                    {
                        link: 'http://www.net2ftp.com/',
                        title: 'net2ftp',
                        update: '2021-02-08'
                    }
                ]
            }
        ]
    },
    {
        title: '购物',
        sub: [
            {
                title: '网站',
                links: [
                    {
                        link: 'https://www.dangdang.com/',
                        title: '当当网',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://www.jd.com/',
                        title: '京东',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://www.kaola.com/',
                        title: '考拉海购',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://www.mogujie.com/',
                        title: '蘑菇街',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://www.suning.com/',
                        title: '苏宁易购',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://www.taobao.com/',
                        title: '淘宝',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://www.tmall.com/',
                        title: '天猫',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://www.mi.com/',
                        title: '小米商城',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://www.amazon.cn/',
                        title: '亚马逊',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://apsgo.com/',
                        title: 'APSGO 软购',
                        update: '2021-02-08'
                    }
                ]
            },
            {
                title: '饮食',
                links: [
                    {
                        link: 'http://www.pizzahut.com.cn/',
                        title: '必胜客',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://www.4008123123.com/',
                        title: '必胜客宅急送',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://www.ele.me/',
                        title: '饿了么',
                        update: '2021-02-08'
                    },
                    {
                        link: 'http://www.kfc.com.cn/',
                        title: '肯德基',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://www.4008823823.com.cn/',
                        title: '肯德基宅急送',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://h5.waimai.meituan.com/',
                        title: '美团外卖',
                        update: '2021-02-08'
                    }
                ]
            }
        ]
    },
    {
        title: '金融',
        sub: [
            {
                title: '银行',
                links: [
                    {
                        link: 'http://www.bankcomm.com/',
                        title: '交通银行',
                        update: '2021-02-08'
                    },
                    {
                        link: 'http://www.cmbchina.com/',
                        title: '招商银行',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://www.icbc.com.cn/',
                        title: '中国工商银行',
                        update: '2021-02-08'
                    },
                    {
                        link: 'http://www.ccb.com/',
                        title: '中国建设银行',
                        update: '2021-02-08'
                    },
                    {
                        link: 'http://www.abchina.com/',
                        title: '中国农业银行',
                        update: '2021-02-08'
                    },
                    {
                        link: 'http://www.pbc.gov.cn/',
                        title: '中国人民银行',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://www.boc.cn/',
                        title: '中国银行',
                        update: '2021-02-08'
                    }
                ]
            },
            {
                link: 'https://www.alipay.com/',
                title: '支付宝',
                update: '2021-02-08'
            }
        ]
    },
    {
        title: '设计',
        links: [
            {
                link: 'https://huaban.com/',
                title: '花瓣网',
                update: '2021-02-08'
            },
            {
                link: 'https://www.uigreat.com/',
                title: '优阁网（UIGREAT）',
                update: '2021-02-08'
            },
            {
                link: 'http://www.uisdc.com/',
                title: '优设网（UISDC）',
                update: '2021-02-08'
            },
            {
                link: 'https://www.yrucd.com/',
                title: '云瑞设计',
                update: '2021-02-08'
            },
            {
                link: 'https://www.zcool.com.cn/',
                title: '站酷（ZCOOL）',
                update: '2021-02-08'
            },
            {
                link: 'https://www.ui.cn/',
                title: 'UI中国',
                update: '2021-02-08'
            }
        ]
    },
    {
        title: '生活',
        links: [
            {
                link: 'http://www.pm25.com/',
                title: '绿色呼吸',
                update: '2021-02-08'
            }
        ],
        sub: [
            {
                title: '出行',
                links: [
                    {
                        link: 'https://www.12306.cn/',
                        title: '中国铁路 12306',
                        update: '2021-02-08'
                    }
                ],
                sub: [
                    {
                        title: '轨道交通',
                        links: [
                            {
                                link: 'https://www.bjsubway.com/',
                                title: '北京地铁',
                                update: '2021-02-08'
                            },
                            {
                                link: 'http://www.chengdurail.com/',
                                title: '成都地铁',
                                update: '2021-02-08'
                            },
                            {
                                link: 'http://www.gzmtr.com/',
                                title: '广州地铁',
                                update: '2021-02-08'
                            },
                            {
                                link: 'http://www.hzmetro.com/',
                                title: '杭州地铁',
                                update: '2021-02-08'
                            },
                            {
                                link: 'http://www.njmetro.com.cn/',
                                title: '南京地铁',
                                update: '2021-02-08'
                            },
                            {
                                link: 'http://www.nngdjt.com/',
                                title: '南宁地铁',
                                update: '2021-02-08'
                            },
                            {
                                link: 'http://www.qd-metro.com/',
                                title: '青岛地铁',
                                update: '2021-02-08'
                            },
                            {
                                link: 'http://www.shmetro.com/',
                                title: '上海地铁',
                                update: '2021-02-08'
                            },
                            {
                                link: 'http://www.symtc.com/',
                                title: '沈阳地铁',
                                update: '2021-02-08'
                            },
                            {
                                link: 'http://www.szmc.net/',
                                title: '深圳地铁',
                                update: '2021-02-08'
                            }
                        ]
                    }
                ]
            },
            {
                title: '旅游',
                links: [
                    {
                        link: 'https://www.alitrip.com/',
                        title: '飞猪旅行',
                        update: '2021-02-08'
                    },
                    {
                        link: 'http://www.tuniu.com/',
                        title: '途牛',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://www.ctrip.com/',
                        title: '携程旅行网',
                        update: '2021-02-08'
                    }
                ]
            }
        ]
    },
    {
        title: '调试',
        links: [
            {
                link: 'view-source:页面的链接',
                showOnly: true,
                title: '查看源代码'
            }
        ],
        sub: [
            {
                title: 'Chrome',
                links: [
                    {
                        link: 'chrome://user-actions/',
                        showOnly: true,
                        title: '操作记录'
                    },
                    {
                        link: 'chrome://version/',
                        showOnly: true,
                        title: '关于版本'
                    },
                    {
                        link: 'chrome://inspect/#devices',
                        showOnly: true,
                        title: '检查'
                    },
                    {
                        link: 'chrome://extensions/',
                        showOnly: true,
                        title: '扩展程序'
                    },
                    {
                        link: 'chrome://history/',
                        showOnly: true,
                        title: '历史记录'
                    },
                    {
                        link: 'chrome://media-internals/',
                        showOnly: true,
                        title: '媒体内部数据'
                    },
                    {
                        link: 'chrome://conflicts/',
                        showOnly: true,
                        title: '模块'
                    },
                    {
                        link: 'chrome://flags/',
                        showOnly: true,
                        title: '实验性功能'
                    },
                    {
                        link: 'chrome://bookmarks/',
                        showOnly: true,
                        title: '书签管理器'
                    },
                    {
                        link: 'chrome://downloads/',
                        showOnly: true,
                        title: '下载内容'
                    },
                    {
                        link: 'chrome://apps/',
                        showOnly: true,
                        title: '应用'
                    },
                    {
                        link: 'chrome://appcache-internals/',
                        showOnly: true,
                        title: '应用缓存'
                    },
                    {
                        link: 'chrome://policy/',
                        showOnly: true,
                        title: '政策'
                    },
                    {
                        link: 'chrome://components/',
                        showOnly: true,
                        title: '组件'
                    },
                    {
                        link: 'chrome://thumbnails/',
                        showOnly: true,
                        title: '最近浏览网页缩略图'
                    },
                    {
                        link: 'chrome://about/',
                        showOnly: true,
                        title: 'Chrome URLs'
                    },
                    {
                        link: 'chrome://dino/',
                        showOnly: true,
                        title: 'Dino'
                    },
                    {
                        link: 'chrome://favicon/size/32@1x/协议://链接/',
                        showOnly: true,
                        title: 'Favicon'
                    },
                    {
                        link: 'chrome://indexeddb-internals/',
                        showOnly: true,
                        title: 'HTML5 本地储存'
                    },
                    {
                        link: 'chrome://net-internals/',
                        showOnly: true,
                        title: 'Net Internals'
                    },
                    {
                        link: 'chrome://translate-internals/',
                        showOnly: true,
                        title: 'Translate Internals'
                    }
                ]
            }
        ]
    },
    {
        title: '网络',
        sub: [
            {
                title: '管理',
                links: [
                    {
                        link: 'http://192.168.0.1/',
                        title: '局域网（192.168.0.1）'
                    },
                    {
                        link: 'http://192.168.0.1:8080/',
                        title: '局域网（192.168.0.1:8080）'
                    },
                    {
                        link: 'http://192.168.1.1/',
                        title: '局域网（192.168.1.1）'
                    },
                    {
                        link: 'http://192.168.1.1:8080/',
                        title: '局域网（192.168.1.1:8080）'
                    },
                    {
                        link: 'http://192.168.5.1/',
                        title: '局域网（192.168.5.1）'
                    },
                    {
                        link: 'http://tplogin.cn/',
                        title: '路由器（TP-LINK）'
                    }
                ]
            },
            {
                title: '云服务',
                links: [
                    {
                        link: 'https://www.aliyun.com/',
                        title: '阿里云',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://cloud.baidu.com/',
                        title: '百度智能云',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://www.hanming.com/',
                        title: '悍铭数据中心',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://cloud.tencent.com/',
                        title: '腾讯云',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://www.cloudflare.com/',
                        title: 'Cloudflare',
                        update: '2021-02-08'
                    },
                    {
                        link: 'http://www.mmtrix.com/',
                        title: 'mmTrix - 云应用性能管理',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://www.nodecache.com/',
                        title: 'Nodecache',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://vultr.com/',
                        title: 'Vultr',
                        update: '2021-02-08'
                    }
                ]
            },
            {
                title: 'DNS',
                links: [
                    {
                        link: 'http://www.114dns.com/',
                        title: '114DNS',
                        update: '2021-02-08'
                    },
                    {
                        link: 'http://www.alidns.com/',
                        title: '阿里DNS',
                        update: '2021-02-08'
                    },
                    {
                        link: 'http://www.dnspai.com/',
                        title: 'DNS派',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://www.dnspod.cn/Products/Public.DNS',
                        title: 'Public DNS+',
                        update: '2021-02-08'
                    }
                ]
            }
        ]
    },
    {
        title: '系统',
        sub: [
            {
                title: 'Android',
                sub: [
                    {
                        title: '软件',
                        links: [
                            {
                                link: 'http://adbshell.com/',
                                title: 'ADB Shell'
                            },
                            {
                                link: 'https://limboemulator.weebly.com/',
                                title: 'Limbo PC Emulator'
                            }
                        ],
                        sub: [
                            {
                                title: '网站',
                                links: [
                                    {
                                        link: 'https://coolapk.com/',
                                        title: '酷安网',
                                        update: '2021-02-08'
                                    },
                                    {
                                        link: 'https://www.apkmirror.com/',
                                        title: 'APK Mirror',
                                        update: '2021-02-08'
                                    },
                                    {
                                        link: 'https://apkpure.com/',
                                        title: 'APK Pure',
                                        update: '2021-02-08'
                                    },
                                    {
                                        link: 'https://play.google.com/',
                                        title: 'Google Play',
                                        update: '2021-02-08'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        title: '系统',
                        links: [
                            {
                                link: 'https://www.resurrectionremix.com/',
                                title: 'Resurrection Remix OS'
                            }
                        ]
                    }
                ]
            },
            {
                title: 'Linux',
                links: [
                    {
                        link: 'http://www.ubuntu.org.cn/',
                        title: 'Ubuntu',
                        update: '2021-02-08'
                    }
                ],
                sub: [
                    {
                        title: '资料',
                        links: [
                            {
                                link: 'https://man.linuxde.net/',
                                title: 'Linux 命令大全',
                                update: '2021-02-08'
                            }
                        ]
                    }
                ]
            },
            {
                title: 'Windows',
                links: [
                    {
                        link: 'https://msdn.itellyou.cn/',
                        title: 'MSDN，我告诉你',
                        update: '2021-02-08'
                    }
                ]
            },
            {
                title: '其他',
                links: [
                    {
                        link: 'http://www.lakka.tv/',
                        title: 'Lakka'
                    }
                ]
            }
        ]
    },
    {
        title: '写作',
        links: [
            {
                link: 'https://www.jianshu.com/',
                title: '简书',
                update: '2021-02-08'
            },
            {
                link: 'http://www.lofter.com/',
                title: 'LOFTER',
                update: '2021-02-08'
            }
        ]
    },
    {
        title: '学习',
        sub: [
            {
                link: 'https://www.91suke.com/',
                title: '九一速课网',
                update: '2021-02-08'
            },
            {
                link: 'https://ke.qq.com/',
                title: '腾讯课堂',
                update: '2021-02-08'
            },
            {
                link: 'https://study.163.com/',
                title: '网易云课堂',
                update: '2021-02-08'
            },
            {
                link: 'https://www.icourse163.org/',
                title: '中国大学 MOOC（慕课）',
                update: '2021-02-08'
            },
            {
                link: 'https://www.certiport.com/',
                title: 'My Certiport',
                update: '2021-02-08'
            }
        ]
    },
    {
        title: '游戏',
        sub: [
            {
                title: '网站',
                links: [
                    {
                        link: 'http://www.17173.com/',
                        title: '17173',
                        update: '2021-02-08'
                    },
                    {
                        link: 'http://www.4399.com/',
                        title: '4399',
                        update: '2021-02-08'
                    },
                    {
                        link: 'http://www.7k7k.com/',
                        title: '7k7k',
                        update: '2021-02-08'
                    },
                    {
                        link: 'http://www.66rpg.com/',
                        title: '橙光游戏中心',
                        update: '2021-02-08'
                    },
                    {
                        link: 'http://www.gamersky.com/',
                        title: '游民星空',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://www.ubisoft.com.cn/',
                        title: '育碧游戏（UBISOFT）',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://www.epicgames.com/',
                        title: 'Epic Games',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://www.origin.com/',
                        title: 'Origin',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://store.steampowered.com/',
                        title: 'Steam',
                        update: '2021-02-08'
                    }
                ]
            },
            {
                title: '2048',
                links: [
                    {
                        link: 'http://gabrielecirulli.github.io/2048/',
                        title: '2048'
                    },
                    {
                        link: 'http://cyberzhg.github.io/2048/',
                        title: '2147483648'
                    }
                ]
            },
            {
                title: 'Minecraft',
                sub: [
                    {
                        title: '网站',
                        links: [
                            {
                                link: 'https://minecraft.net/',
                                title: '官网',
                                update: '2021-02-08'
                            }
                        ],
                        sub: [
                            {
                                title: '论坛',
                                links: [
                                    {
                                        link: 'http://www.zuimc.com/',
                                        title: '最MC论坛',
                                        update: '2021-02-08'
                                    },
                                    {
                                        link: 'https://www.mcbbs.net/',
                                        title: 'Minecraft 中文论坛',
                                        update: '2021-02-08'
                                    },
                                    {
                                        link: 'http://forum.minecraft-hk.com/',
                                        title: 'Minecraft-HK Community',
                                        update: '2021-02-08'
                                    },
                                    {
                                        link: 'https://www.planetminecraft.com/',
                                        title: 'Planet Minecraft Community',
                                        update: '2021-02-08'
                                    }
                                ]
                            },
                            {
                                title: 'Wiki',
                                links: [
                                    {
                                        link: 'https://minecraft-zh.gamepedia.com/',
                                        title: '中文 Minecraft Wiki',
                                        update: '2021-02-08'
                                    },
                                    {
                                        link: 'https://www.mcmod.cn/',
                                        title: 'MC百科',
                                        update: '2021-02-08'
                                    },
                                    {
                                        link: 'http://mineplugin.org/',
                                        title: 'Minecraft 插件百科',
                                        update: '2021-02-08'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        title: '服务器',
                        sub: [
                            {
                                title: '服务端',
                                links: [
                                    {
                                        link: 'http://dl.bukkit.org/',
                                        title: 'Bukkit'
                                    },
                                    {
                                        link: 'http://www.pocketmine.net/',
                                        title: 'PocketMine-MP'
                                    },
                                    {
                                        link: 'https://yivesmirror.com/',
                                        title: 'Yive\'s Mirror'
                                    }
                                ],
                                sub: [
                                    {
                                        title: 'Sponge',
                                        links: [
                                            {
                                                link: 'https://www.spongepowered.org/',
                                                title: 'Sponge',
                                                update: '2021-02-08'
                                            },
                                            {
                                                link: 'https://ore.spongepowered.org/',
                                                title: 'Sponge Ore',
                                                update: '2021-02-08'
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                title: '列表',
                                links: [
                                    {
                                        link: 'http://minecraftservers.org/',
                                        title: '服务器列表'
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        title: '工具',
                        links: [
                            {
                                link: 'http://mc.whitegem.net/',
                                title: '创建你自己的 Minecraft 成就'
                            },
                            {
                                link: 'https://spu.spgoding.com/',
                                title: '命令升级'
                            },
                            {
                                link: 'https://dict.mcmod.cn/',
                                title: '模组翻译参考词典'
                            },
                            {
                                link: 'https://www.bakaxl.com/',
                                title: 'BakaXL 启动器',
                                update: '2021-02-08'
                            },
                            {
                                link: 'https://skin.prinzeugen.net/',
                                title: 'Blessing Skin Server'
                            },
                            {
                                link: 'https://blockbench.net/',
                                title: 'Blockbench'
                            },
                            {
                                link: 'http://www.minecraft-crafting.net/',
                                title: 'Crafting Guide'
                            },
                            {
                                link: 'https://cuberite.org/',
                                title: 'Cuberite'
                            },
                            {
                                link: 'https://hmcl.huangyuhui.net/',
                                title: 'HMCL 启动器',
                                update: '2021-02-08'
                            },
                            {
                                link: 'http://mcctoolchest.com/',
                                title: 'MCC Toolchest PE',
                                update: '2021-02-08'
                            },
                            {
                                link: 'https://www.mcedit-unified.net/',
                                title: 'MCEdit Unified'
                            },
                            {
                                link: 'https://mcreator.net/',
                                title: 'MCreator - The Best Minecraft Mod Maker Ever',
                                update: '2021-02-08'
                            },
                            {
                                link: 'https://overviewer.org/',
                                title: 'Minecraft Overviewer'
                            },
                            {
                                link: 'http://www.realtimerendering.com/erich/minecraft/public/mineways/',
                                title: 'Mineways'
                            },
                            {
                                link: 'https://www.mineimator.com/',
                                title: 'Mine-imator'
                            },
                            {
                                link: 'https://zh-cn.namemc.com/',
                                title: 'NameMC',
                                update: '2021-02-08'
                            },
                            {
                                link: 'https://www.minecraftjson.com/',
                                title: 'Tellraw Generator',
                                update: '2021-02-08'
                            },
                            {
                                link: 'https://www.universalminecrafteditor.com/',
                                title: 'Universal Minecraft Editor',
                                update: '2021-02-08'
                            }
                        ]
                    },
                    {
                        title: '开发',
                        links: [
                            {
                                link: 'https://mcforge.readthedocs.io/',
                                title: 'Forge 文档'
                            }
                        ]
                    },
                    {
                        title: '资源',
                        sub: [
                            {
                                title: '网站',
                                links: [
                                    {
                                        link: 'https://www.curseforge.com/minecraft',
                                        title: 'Minecraft CurseForge',
                                        update: '2021-02-08'
                                    },
                                    {
                                        link: 'http://www.minecraftxz.com/',
                                        title: 'Minecraft 中文下载站',
                                        update: '2021-02-08'
                                    }
                                ]
                            },
                            {
                                title: '光影',
                                links: [
                                    {
                                        link: 'http://sonicether.com/shaders/',
                                        title: 'SEUS'
                                    }
                                ]
                            },
                            {
                                title: '模组',
                                links: [
                                    {
                                        link: 'http://files.minecraftforge.net/',
                                        title: 'Forge',
                                        update: '2021-02-08'
                                    },
                                    {
                                        link: 'http://www.liteloader.com/',
                                        title: 'LiteLoader',
                                        update: '2021-02-08'
                                    },
                                    {
                                        link: 'http://www.optifine.net/',
                                        title: 'OptiFine',
                                        update: '2021-02-08'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        title: '资讯',
        links: [
            {
                link: 'https://36kr.com/',
                title: '36kr（36氪）',
                update: '2021-02-08'
            },
            {
                link: 'http://jandan.net/',
                title: '煎蛋 - 地球上没有新鲜事',
                update: '2021-02-08'
            },
            {
                link: 'https://sspai.com/',
                title: '少数派 - 高效工作，品质生活',
                update: '2021-02-08'
            },
            {
                link: 'https://www.qq.com/',
                title: '腾讯网',
                update: '2021-02-08'
            },
            {
                link: 'http://www.cctv.com/',
                title: '央视网 - 世界就在眼前',
                update: '2021-02-08'
            }
        ],
        sub: [
            {
                title: '新闻',
                links: [
                    {
                        link: 'https://news.baidu.com/',
                        title: '百度新闻',
                        update: '2021-02-08'
                    },
                    {
                        link: 'http://www.huanqiu.com/',
                        title: '环球网',
                        update: '2021-02-08'
                    },
                    {
                        link: 'http://www.kankanews.com/',
                        title: '看看新闻 - 叩击时代',
                        update: '2021-02-08'
                    },
                    {
                        link: 'http://news.sohu.com/',
                        title: '搜狐新闻',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://new.qq.com/',
                        title: '腾讯新闻',
                        update: '2021-02-08'
                    },
                    {
                        link: 'http://news.sina.com.cn/',
                        title: '新浪新闻',
                        update: '2021-02-08'
                    }
                ]
            },
        ]
    },
    {
        title: '资源',
        sub: [
            {
                title: '建站',
                links: [
                    {
                        link: 'https://lnmp.org/',
                        title: 'LNMP 一键安装包'
                    },
                    {
                        link: 'https://www.lsky.pro/',
                        title: 'Lsky Pro - 图床',
                        update: '2021-02-08'
                    },
                    {
                        link: 'http://www.directorylister.com/',
                        title: 'PHP Directory Lister'
                    },
                    {
                        link: 'http://typecho.org/',
                        title: 'Typecho',
                        update: '2021-02-08'
                    },
                    {
                        link: 'http://www.webmin.com/',
                        title: 'Webmin'
                    },
                    {
                        link: 'https://www.dokuwiki.org/',
                        title: 'DokuWiki'
                    }
                ]
            },
            {
                title: '镜像站',
                links: [
                    {
                        link: 'https://opsx.alibaba.com/mirror',
                        title: '阿里巴巴开源镜像站',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://mirror.bjtu.edu.cn/',
                        title: '北京交通大学自由与开源软件镜像站',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://mirrors.cqu.edu.cn/',
                        title: '重庆大学开源软件镜像站',
                        update: '2021-02-08'
                    },
                    {
                        link: 'http://mirrors.neusoft.edu.cn/',
                        title: '大连东软信息学院开源镜像站',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://mirrors.huaweicloud.com/',
                        title: '华为开源镜像站',
                        update: '2021-02-08'
                    },
                    {
                        link: 'http://mirror.hust.edu.cn/',
                        title: '华中科技大学开源镜像站',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://mirrors.tuna.tsinghua.edu.cn/',
                        title: '清华大学开源软件镜像站',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://mirrors.cloud.tencent.com/',
                        title: '腾讯软件源',
                        update: '2021-02-08'
                    },
                    {
                        link: 'http://mirrors.163.com/',
                        title: '网易开源镜像站',
                        update: '2021-02-08'
                    },
                    {
                        link: 'http://mirrors.zju.edu.cn/',
                        title: '浙江大学开源镜像站',
                        update: '2021-02-08'
                    },
                    {
                        link: 'http://mirrors.ustc.edu.cn/',
                        title: '中国科学技术大学开源软件镜像',
                        update: '2021-02-08'
                    }
                ]
            },
            {
                title: '前端',
                links: [
                    {
                        link: 'https://www.bootcss.com/',
                        title: 'Bootstrap 中文网',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://highlightjs.org/',
                        title: 'highlight.js',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://jquery.com/',
                        title: 'jQuery',
                        update: '2021-02-08'
                    },
                    {
                        link: 'http://www.jq22.com/',
                        title: 'jQuery 插件库',
                        update: '2021-02-08'
                    },
                    {
                        link: 'http://www.htmleaf.com/',
                        title: 'jQuery 之家',
                        update: '2021-02-08'
                    },
                    {
                        link: 'http://layer.layui.com/',
                        title: 'layer',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://leafletjs.com/',
                        title: 'Leaflet - 可交互的地图',
                        update: '2021-02-08'
                    },
                    {
                        link: 'http://threejs.org/',
                        title: 'three.js – JavaScript 3D library',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://valine.js.org/',
                        title: 'Valine - 无后端评论系统',
                        update: '2021-02-08'
                    }
                ]
            },
            {
                title: '软件',
                sub: [
                    {
                        title: '网站',
                        links: [
                            {
                                link: 'https://pc.qq.com/',
                                title: '腾讯软件中心',
                                update: '2021-02-08'
                            },
                            {
                                link: 'https://www.iplaysoft.com/',
                                title: '异次元软件世界',
                                update: '2021-02-08'
                            },
                            {
                                link: 'https://getitfree.cn/',
                                title: '正版中国',
                                update: '2021-02-08'
                            }
                        ]
                    },
                    {
                        title: '播放器',
                        links: [
                            {
                                link: 'https://player.qq.com/',
                                title: 'QQ影音',
                                update: '2021-02-08'
                            },
                            {
                                link: 'https://www.videolan.org/',
                                title: 'VLC',
                                update: '2021-02-08'
                            }
                        ]
                    },
                    {
                        title: '创作 / 制作',
                        links: [
                            {
                                link: 'https://helpx.adobe.com/download-install/kb/creative-cloud-apps-download.html',
                                title: 'Adobe Creative Cloud apps'
                            },
                            {
                                link: 'https://www.libreoffice.org/',
                                title: 'LibreOffice'
                            },
                            {
                                link: 'https://ephtracy.github.io/',
                                title: 'MagicaVoxel'
                            },
                            {
                                link: 'https://www.midieditor.org/',
                                title: 'MidiEditor'
                            },
                            {
                                link: 'http://www.midipiano.net/',
                                title: 'MidiPiano'
                            },
                            {
                                link: 'http://openmpt.org/',
                                title: 'OpenMPT'
                            },
                            {
                                link: 'http://opentoonz.github.io/e/index.html',
                                title: 'OpenToonz'
                            }
                        ]
                    },
                    {
                        title: '工具',
                        links: [
                            {
                                link: 'http://www.wofficebox.com/',
                                title: '万彩办公大师'
                            },
                            {
                                link: 'https://filezilla-project.org/',
                                title: 'FileZilla'
                            },
                            {
                                link: 'http://freepiano.tiwb.com/',
                                title: 'FreePiano'
                            },
                            {
                                link: 'http://isparta.github.io/',
                                title: 'iSparta - PNG压缩与格式转换工具'
                            },
                            {
                                link: 'https://www.cockos.com/licecap/',
                                title: 'LICEcap',
                                update: '2021-02-08'
                            },
                            {
                                link: 'http://www.linuxliveusb.com/',
                                title: 'LinuxLive USB Creator'
                            },
                            {
                                link: 'http://pooi.moe/Locale-Emulator/',
                                title: 'Locale Emulator'
                            },
                            {
                                link: 'https://www.mp3tag.de/',
                                title: 'Mp3tag - 标签编辑器'
                            },
                            {
                                link: 'https://www.netsarang.com/',
                                title: 'NetSarang'
                            },
                            {
                                link: 'https://zh.snipaste.com/',
                                title: 'Snipaste'
                            },
                            {
                                link: 'https://www.typora.io/',
                                title: 'Typora'
                            },
                            {
                                link: 'https://u.tools/',
                                title: 'uTools - 你的生产力工具集',
                                update: '2021-02-08'
                            },
                            {
                                link: 'https://x64dbg.com/',
                                title: 'x64dbg - 开源的 Windows 调试工具'
                            }
                        ]
                    },
                    {
                        title: '浏览器插件',
                        links: [
                            {
                                link: 'http://www.cnplugins.com/',
                                title: 'Chrome 插件网',
                                update: '2021-02-08'
                            },
                            {
                                link: 'https://greasyfork.org/zh-CN',
                                title: 'Greasy Fork',
                                update: '2021-02-08'
                            },
                            {
                                link: 'https://www.tampermonkey.net/',
                                title: 'Tampermonkey',
                                update: '2021-02-08'
                            },
                            {
                                link: 'https://violentmonkey.github.io/',
                                title: 'Violentmonkey',
                                update: '2021-02-08'
                            }
                        ]
                    },
                    {
                        title: '美化',
                        links: [
                            {
                                link: 'http://www.win4000.com/',
                                title: '电脑主题之家'
                            },
                            {
                                link: 'http://moe.005.tv/',
                                title: '萌娘资源站'
                            },
                            {
                                link: 'http://www.glass8.eu/',
                                title: 'Aero Glass for Win8+'
                            },
                            {
                                link: 'http://rainmeter.cn/cms/',
                                title: 'Rainmeter'
                            }
                        ]
                    },
                    {
                        title: '网络',
                        links: [
                            {
                                link: 'https://www.centbrowser.cn/',
                                title: '百分浏览器',
                                update: '2021-02-08'
                            },
                            {
                                link: 'https://www.google.cn/intl/zh-CN/chrome/',
                                title: 'Chrome',
                                update: '2021-02-08'
                            },
                            {
                                link: 'https://www.firefox.com.cn/',
                                title: 'Firefox',
                                update: '2021-02-08'
                            },
                            {
                                link: 'https://natapp.cn/',
                                title: 'NATAPP',
                                update: '2021-02-08'
                            },
                            {
                                link: 'https://www.natfrp.org/',
                                title: 'Sakura Frp',
                                update: '2021-02-08'
                            },
                            {
                                link: 'http://www.gnu.org/software/wget/faq.html#download',
                                title: 'Wget',
                                update: '2021-02-08'
                            },
                            {
                                link: 'https://www.wireshark.org/',
                                title: 'Wireshark',
                                update: '2021-02-08'
                            }
                        ]
                    },
                    {
                        title: '虚拟化',
                        links: [
                            {
                                link: 'https://www.virtualbox.org/',
                                title: 'Oracle VM VirtualBox',
                                update: '2021-02-08'
                            },
                            {
                                link: 'https://www.vmware.com/cn/products/workstation-pro.html',
                                title: 'VMware Workstation Pro',
                                update: '2021-02-08'
                            }
                        ]
                    }
                ]
            },
            {
                title: '素材',
                links: [
                    {
                        link: 'https://www.huiyi8.com/',
                        title: '绘艺素材网',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://www.lanrentuku.com/',
                        title: '懒人图库',
                        update: '2021-02-08'
                    },
                    {
                        link: 'http://www.nipic.com/',
                        title: '昵图网',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://588ku.com/',
                        title: '千库网',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://www.ypppt.com/',
                        title: '优品PPT',
                        update: '2021-02-08'
                    },
                    {
                        link: 'http://www.easyicon.net/',
                        title: 'Easyicon',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://www.iconfont.cn/',
                        title: 'Iconfont - 阿里巴巴矢量图标库',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://www.officeplus.cn/',
                        title: 'OfficePLUS - 微软 Office 官方在线模板网站',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://www.pexels.com/',
                        title: 'Pexels - 免费图库相片',
                        update: '2021-02-08'
                    }
                ]
            },
            {
                title: '字体',
                links: [
                    {
                        link: 'https://alibabafont.taobao.com/',
                        title: '阿里巴巴字体素材平台',
                        update: '2021-02-08'
                    },
                    {
                        link: 'http://tsanger.cn/',
                        title: '仓耳字库',
                        update: '2021-02-08'
                    },
                    {
                        link: 'http://www.foundertype.com/',
                        title: '方正字库',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://source.typekit.com/source-han-serif/cn/',
                        title: '思源宋体',
                        update: '2021-02-08'
                    },
                    {
                        link: 'http://font.chinaz.com/',
                        title: '站长字体',
                        update: '2021-02-08'
                    },
                    {
                        link: 'http://www.zhaozi.cn/',
                        title: '找字网',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://www.hellofont.cn/',
                        title: '字由',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://mirrors.tuna.tsinghua.edu.cn/adobe-fonts/',
                        title: 'adobe-fonts（清华大学开源软件镜像站）',
                        update: '2021-02-08'
                    },
                    {
                        link: 'http://www.hitsquad.com/smm/cat/SOUND_FONTS/',
                        title: 'Sound Fonts (Hitsquad)'
                    }
                ]
            },
            {
                title: 'API / 开放平台',
                links: [
                    {
                        link: 'https://lbs.amap.com/',
                        title: '高德开放平台',
                        update: '2021-02-08'
                    },
                    {
                        link: 'http://www.itpk.cn/robot.php',
                        title: '茉莉机器人 API',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://open.tencent.com/',
                        title: '腾讯开放平台',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://music.163.com/song/media/outer/url?id=音乐ID.mp3',
                        showOnly: true,
                        title: '网易云音乐音频 API',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://open.weixin.qq.com/',
                        title: '微信开放平台',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://open.weibo.com/',
                        title: '新浪微博开放平台',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://www.xfyun.cn/',
                        title: '讯飞开放平台',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://api.imjad.cn/',
                        title: 'AD\'s API',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://app.crisp.chat/',
                        title: 'Crisp',
                        update: '2021-02-08'
                    },
                    {
                        link: 'https://open.oppomobile.com/',
                        title: 'OPPO开放平台',
                        update: '2021-02-08'
                    }
                ]
            },
            {
                title: '其他',
                links: [
                    {
                        link: 'http://ys168.com/',
                        title: '永硕E盘'
                    },
                    {
                        link: 'http://www.ntp.org.cn/',
                        title: 'NTP 服务器列表'
                    }
                ]
            }
        ]
    }
];

let utils = {
    /**
     * 初始化导航链接列表
     * 设置唯一 ID & 改变结构
     */
    init: function () {
        // 载入中提示
        var loading = Loading.service({
            customClass: 'loading-link',
            lock: true,
            spinner: 'el-icon-loading',
            text: '载入中，请稍候'
        });

        var currentIndex = 0;
        var currentIndexCpy = 0;

        var fn = (obj) => {
            currentIndex += 1;
            obj.id = currentIndex;

            // 有链接，无子路径
            if (obj.links != undefined && obj.sub === undefined) {
                obj.sub = [];
            }

            // 递归
            if (obj.links != undefined) {
                obj.links.forEach(item => {
                    // 添加到子路径（适配 Element UI - Tree）
                    obj.sub.push(item);
                });
            }

            // 递归
            if (obj.sub != undefined) {
                obj.sub.forEach(item => {
                    setTimeout(() => {
                        fn(item);
                    }, 10 * currentIndex);
                });
            }
        };

        // 检测 currentIndex 是否已停止变化
        var timer = setInterval(() => {
            if (currentIndex == currentIndexCpy) {
                // 停止检测
                clearInterval(timer);

                // 日志
                console.log('[导航链接] 初始化完毕');

                // 关闭载入中提示
                loading.close();

                // 更新
                datas.list = navLinks;

                // 写入缓存
                setTimeout(() => {
                    this.cache('W', navLinks);
                }, 2 * currentIndex);
            }

            // 同步
            currentIndexCpy = currentIndex;
        }, 1000);

        return fn;
    },

    /**
    * 导航链接列表缓存
    * 
    * @param {string} mode 模式（读 - R，写 - W）
    * @param {array} list 写入的导航链接列表（模式为“W”时）
    * 
    * @returns {Object} 缓存为最新时 status 为 1，list 为缓存中的导航链接列表，否则 status 为 0。
    */
    cache: function (mode, list) {
        var datasCacheStr;
        var datasCache = {};
        var datasCurrent = {};

        if (mode == 'R') {

            // 读取缓存
            datasCacheStr = localStorage.getItem('navLinksCache');

            // 是否存在缓存
            if (datasCacheStr === null) {
                return {
                    status: 0
                };
            } else {
                datasCache = JSON.parse(datasCacheStr)
            }

            if (datasCache.version < datas.version) {
                return {
                    status: 0
                };
            } else {
                return {
                    status: 1,
                    list: datasCache.list
                };
            }

        } else if (mode == 'W') {

            datasCurrent.version = datas.version;
            datasCurrent.list = list;

            // 写入缓存
            localStorage.setItem('navLinksCache', JSON.stringify(datasCurrent));

        }
    }
};

(function () {

    let cache = utils.cache('R');

    if (cache.status == 1) {
        datas.list = cache.list;
    } else {
        let init = utils.init();
        navLinks.forEach(item => {
            init(item);
        });
    }

})();

export default datas;
