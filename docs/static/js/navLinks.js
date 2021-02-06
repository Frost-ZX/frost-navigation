// 链接列表
// 更新：2021-02-07
const navLinks = [
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
                        title: '百度百科'
                    },
                    {
                        link: 'https://ipaperclip.net/',
                        title: '回形针手册'
                    },
                    {
                        link: 'https://zh.moegirl.org/',
                        title: '萌娘百科'
                    },
                    {
                        link: 'https://zh.wikipedia.org/',
                        title: '维基百科'
                    },
                ],
                // 子路径
                sub: [
                    {
                        title: 'Unicode® 字符百科',
                        links: [
                            {
                                link: 'https://unicode-table.com/cn/',
                                title: 'Unicode® 字符百科'
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
                        title: 'w3school 在线教程'
                    },
                    {
                        link: 'https://www.runoob.com/',
                        title: '菜鸟教程'
                    }
                ]
            },
            {
                title: '资料',
                links: [
                    {
                        link: 'http://www.ichgz.com/',
                        title: '广州市非物质文化遗产保护中心'
                    },
                    {
                        link: 'http://www.ihchina.cn/',
                        title: '中国非物质文化遗产网'
                    },
                    {
                        link: 'https://ctext.org/zhs',
                        title: '中国哲学书电子化计划'
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
                        title: '4SSH'
                    },
                    {
                        link: 'http://lolicorn.com/',
                        title: '安和 Blog'
                    },
                    {
                        link: 'https://www.myitmx.com/',
                        title: '枫叶博客'
                    },
                    {
                        link: 'https://laod.cn/',
                        title: '老D博客'
                    },
                    {
                        link: 'https://www.appts.cn/',
                        title: '软件探索 - 分享好用的软件和网站'
                    },
                    {
                        link: 'https://blog.littleha.cn/',
                        title: '小哈的博客'
                    },
                    {
                        link: 'https://2heng.xin/',
                        title: '樱花庄的白猫'
                    },
                    {
                        link: 'https://www.htcp.net/',
                        title: '云梦'
                    },
                    {
                        link: 'https://blog.frost-zx.top/',
                        title: 'Frost-ZX'
                    },
                    {
                        link: 'https://www.haojunmei.top/',
                        title: 'haojunmei'
                    },
                    {
                        link: 'https://kenvix.com/',
                        title: 'Kenvix\'s Blog'
                    },
                    {
                        link: 'https://luotianyi.vc/',
                        title: 'Luminous\' Home'
                    },
                    {
                        link: 'https://n-a.date/',
                        title: 'UNKNOW date'
                    },
                    {
                        link: 'https://blog.zgcwkj.cn/',
                        title: 'zgcwkj'
                    }
                ]
            },
            {
                title: '论坛',
                links: [
                    {
                        link: 'http://www.ditiezu.com/',
                        title: '地铁族'
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
                        title: '百度贴吧'
                    },
                    {
                        link: 'https://www.douban.com/',
                        title: '豆瓣'
                    },
                    {
                        link: 'https://www.oschina.net/',
                        title: '开源中国'
                    },
                    {
                        link: 'https://www.codeseeding.com/',
                        title: '码云社 - 用代码改变世界'
                    },
                    {
                        link: 'https://www.zhihu.com/',
                        title: '知乎'
                    }
                ]
            },
            {
                title: '社交',
                links: [
                    {
                        link: 'https://weibo.com/',
                        title: '新浪微博'
                    },
                    {
                        link: 'https://www.instagram.com/',
                        title: 'Instagram'
                    },
                    {
                        link: 'https://qzone.qq.com/',
                        title: 'QQ空间'
                    },
                    {
                        link: 'https://twitter.com/',
                        title: 'Twitter'
                    }
                ]
            },
            {
                title: '通讯',
                links: [
                    {
                        link: 'http://www.pdflibr.com/',
                        title: '云短信 - 验证码代收'
                    },
                    {
                        link: 'https://discordapp.com/',
                        title: 'Discord'
                    }
                ],
                sub: [
                    {
                        title: '邮箱',
                        links: [
                            {
                                link: 'http://mail.126.com/',
                                title: '126邮箱'
                            },
                            {
                                link: 'https://mail.163.com/',
                                title: '网易邮箱'
                            },
                            {
                                link: 'https://mail.sina.com.cn/',
                                title: '新浪邮箱'
                            },
                            {
                                link: 'https://outlook.live.com/',
                                title: 'Outlook'
                            },
                            {
                                link: 'https://mail.qq.com/',
                                title: 'QQ邮箱'
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
                        link: 'http://www.codeblocks.org/',
                        title: 'Code::Blocks'
                    },
                    {
                        link: 'https://developers.google.cn/blockly/',
                        title: 'Google Blockly'
                    },
                    {
                        link: 'https://www.python.org/',
                        title: 'Python'
                    }
                ],
                sub: [
                    {
                        title: 'Java',
                        links: [
                            {
                                link: 'http://www.eclipse.org/',
                                title: 'Eclipse'
                            }
                        ]
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
                        title: '百度 H5'
                    },
                    {
                        link: 'https://playcanvas.com/',
                        title: 'PlayCanvas'
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
                                                title: 'VOCALOID ( ボーカロイド・ボカロ ) 公式サイト'
                                            },
                                            {
                                                link: 'http://www.zenith-grp.com/henian/',
                                                title: '上海禾念信息科技有限公司'
                                            },
                                            {
                                                link: 'https://shop69979973.taobao.com/',
                                                title: '上海禾念（淘宝网）'
                                            }
                                        ]
                                    },
                                    {
                                        title: '论坛',
                                        links: [
                                            {
                                                link: 'http://www.luotianyi.org/forum.php',
                                                title: '洛天依中文网'
                                            },
                                            {
                                                link: 'http://bbs.ivocaloid.com/',
                                                title: 'iVocaloid论坛'
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
                        title: '爱发电'
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
                                title: '8KRAW - 正版视频素材库'
                            },
                            {
                                link: 'http://www.iqiyi.com/',
                                title: '爱奇艺'
                            },
                            {
                                link: 'http://v.baidu.com/',
                                title: '百度视频'
                            },
                            {
                                link: 'https://www.vmovier.com/',
                                title: '场库 - 高品质短片分享平台'
                            },
                            {
                                link: 'http://www.le.com/',
                                title: '乐视视频'
                            },
                            {
                                link: 'https://haokan.baidu.com/',
                                title: '好看视频'
                            },
                            {
                                link: 'http://www.mgtv.com/',
                                title: '芒果TV'
                            },
                            {
                                link: 'http://v.qq.com/',
                                title: '腾讯视频'
                            },
                            {
                                link: 'https://www.xinpianchang.com/',
                                title: '新片场'
                            },
                            {
                                link: 'http://www.youku.com/',
                                title: '优酷'
                            },
                            {
                                link: 'http://www.acfun.cn/',
                                title: 'AcFun'
                            },
                            {
                                link: 'https://www.tokyostreetview.com/',
                                title: 'TokyoStreetView'
                            },
                            {
                                link: 'https://www.utovr.com/',
                                title: 'UtoVR - 带您进入VR世界'
                            }
                        ],
                        sub: [
                            {
                                title: '直播',
                                links: [
                                    {
                                        link: 'http://pad.cretech.cn/livecloud/pcindex.php',
                                        title: '创先泰克教育云'
                                    },
                                    {
                                        link: 'https://www.douyu.com/',
                                        title: '斗鱼'
                                    },
                                    {
                                        link: 'https://www.huya.com/',
                                        title: '虎牙直播'
                                    },
                                    {
                                        link: 'http://v.163.com/',
                                        title: '网易直播'
                                    },
                                    {
                                        link: 'https://www.earthtv.com/',
                                        title: 'earthTV'
                                    },
                                    {
                                        link: 'http://www.skylinewebcams.com/',
                                        title: 'SkylineWebcams'
                                    },
                                    {
                                        link: 'https://www.twitch.tv/',
                                        title: 'Twitch'
                                    }
                                ]
                            },
                            {
                                title: 'bilibili',
                                links: [
                                    {
                                        link: 'https://www.bilibili.com/',
                                        title: 'bilibili（主站）'
                                    },
                                    {
                                        link: 'https://live.bilibili.com/',
                                        title: 'bilibili（直播）'
                                    },
                                    {
                                        link: 'https://search.bilibili.com/',
                                        title: 'bilibili（搜索）'
                                    },
                                    {
                                        link: 'https://message.bilibili.com/',
                                        title: 'bilibili（消息中心）'
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
                                title: '哔哩哔哩唧唧'
                            },
                            {
                                link: 'https://www.kanbilibili.com/',
                                title: '看哔哩哔哩'
                            },
                            {
                                link: 'https://biliquery.typcn.com/',
                                title: 'Bilibili 工具箱'
                            },
                            {
                                link: 'https://www.biliplus.com/',
                                title: 'BiliPlus'
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
                                title: '百度图片'
                            },
                            {
                                link: 'https://imgur.com/',
                                title: 'Imgur'
                            },
                            {
                                link: 'https://http.cat/',
                                title: 'HTTP Cats'
                            },
                            {
                                link: 'https://unsplash.com/',
                                title: 'Unsplash'
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
                                title: '5nd'
                            },
                            {
                                link: 'https://www.kugou.com/',
                                title: '酷狗音乐'
                            },
                            {
                                link: 'https://www.kuwo.cn/',
                                title: '酷我音乐'
                            },
                            {
                                link: 'https://music.taihe.com/',
                                title: '千千音乐'
                            },
                            {
                                link: 'https://music.163.com/',
                                title: '网易云音乐'
                            },
                            {
                                link: 'https://y.qq.com/',
                                title: 'QQ音乐'
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
                title: '编辑',
                links: [
                    {
                        link: 'https://xiezuocat.com/',
                        title: '秘塔写作猫'
                    },
                    {
                        link: 'http://www.atool.org/colorpicker.php',
                        title: '颜色选择器'
                    },
                    {
                        link: 'https://pandao.github.io/editor.md/',
                        title: 'Editor.md'
                    },
                    {
                        link: 'https://phlntn.com/emojibuilder/',
                        title: 'Emoji Builder'
                    },
                    {
                        link: 'https://simplemde.com/',
                        title: 'SimpleMDE'
                    },
                    {
                        link: 'https://smartmockups.com/',
                        title: 'Smartmockups - 产品 Mockup 生成器'
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
                        link: 'https://screen.51240.com/',
                        title: '屏幕检测'
                    },
                    {
                        link: 'http://nstool.netease.com/',
                        title: '网易 DNS 检测'
                    },
                    {
                        link: 'http://www.color.org/version4html.xalter',
                        title: 'ICC Version 4'
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
                    }
                ]
            },
            {
                title: '工具箱',
                links: [
                    {
                        link: 'https://www.toolnb.com/',
                        title: '爱资料在线工具'
                    },
                    {
                        link: 'http://tool.mkblog.cn/',
                        title: '孟坤工具箱'
                    },
                    {
                        link: 'https://wn.run/',
                        title: '万能命令 - 快捷寻找和直达你想要的各类工具'
                    },
                    {
                        link: 'http://tool.uixsj.cn/',
                        title: '现实君工具箱'
                    },
                    {
                        link: 'https://tool.lu/',
                        title: '在线工具'
                    },
                    {
                        link: 'http://www.bejson.com/',
                        title: 'Be JSON'
                    },
                    {
                        link: 'https://tools.miku.ac/',
                        title: 'MikuTools'
                    }
                ]
            },
            {
                title: '举报',
                links: [
                    {
                        link: 'https://www.12321.cn/',
                        title: '12321 网络不良与垃圾信息举报受理中心'
                    },
                    {
                        link: 'http://www.12377.cn/',
                        title: '国家网信办举报中心'
                    }
                ]
            },
            {
                title: '模拟',
                links: [
                    {
                        link: 'https://habitica.com/',
                        title: 'Habitica'
                    },
                    {
                        link: 'https://www.pcjs.org/',
                        title: 'PCjs Machines'
                    }
                ]
            },
            {
                title: '全景',
                links: [
                    {
                        link: 'http://720yun.com/',
                        title: '720云全景虚拟现实社区'
                    },
                    {
                        link: 'http://www.earthol.org/',
                        title: '地球在线'
                    },
                    {
                        link: 'http://sh-meet.bigpixel.cn/',
                        title: '上海超级全景'
                    }
                ]
            },
            {
                title: '网盘 / 云盘',
                links: [
                    {
                        link: 'https://pan.baidu.com/',
                        title: '百度网盘'
                    },
                    {
                        link: 'https://mega.nz/',
                        title: 'MEGA'
                    },
                    {
                        link: 'https://onedrive.live.com/',
                        title: 'OneDrive'
                    }
                ]
            },
            {
                title: '网站',
                links: [
                    {
                        link: 'https://fofa.so/',
                        title: 'FOFA Pro - 网络空间安全搜索引擎'
                    },
                    {
                        link: 'https://www.ssllabs.com/',
                        title: 'Qualys SSL Labs'
                    },
                    {
                        link: 'https://web.archive.org/',
                        title: 'Wayback Machine'
                    }
                ]
            },
            {
                title: '卫星',
                links: [
                    {
                        link: 'http://rsapp.nsmc.org.cn/geofy/',
                        title: '风云四号卫星天气应用平台'
                    },
                    {
                        link: 'http://himawari8.nict.go.jp/',
                        title: '向日葵-8號'
                    }
                ]
            },
            {
                title: '娱乐',
                links: [
                    {
                        link: 'https://www.corgiorgy.com/',
                        title: 'CORGI ORGY'
                    },
                    {
                        link: 'https://static.hfi.me/mikutap/',
                        title: 'Mikutap'
                    },
                    {
                        link: 'https://theuselessweb.com/',
                        title: 'The Useless Web'
                    }
                ]
            },
            {
                title: '转换',
                links: [
                    {
                        link: 'http://cli.im/',
                        title: '草料二维码'
                    },
                    {
                        link: 'http://tool.chinaz.com/tools/sinadwz.aspx',
                        title: '批量新浪短链'
                    },
                    {
                        link: 'https://smallpdf.com/',
                        title: 'Smallpdf - 您所有 PDF 问题的免费解决方案'
                    },
                    {
                        link: 'http://www.docpe.com/word/word-to-html.aspx',
                        title: 'Word 转 HTML'
                    }
                ]
            },
            {
                title: '其他',
                links: [
                    {
                        link: 'https://wj.qq.com/',
                        title: '腾讯问卷'
                    },
                    {
                        link: 'http://www.net2ftp.com/',
                        title: 'net2ftp'
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
                        title: '当当网'
                    },
                    {
                        link: 'https://www.jd.com/',
                        title: '京东'
                    },
                    {
                        link: 'https://www.kaola.com/',
                        title: '考拉海购'
                    },
                    {
                        link: 'https://www.mogujie.com/',
                        title: '蘑菇街'
                    },
                    {
                        link: 'https://www.suning.com/',
                        title: '苏宁易购'
                    },
                    {
                        link: 'https://www.taobao.com/',
                        title: '淘宝'
                    },
                    {
                        link: 'https://www.tmall.com/',
                        title: '天猫'
                    },
                    {
                        link: 'https://www.mi.com/',
                        title: '小米商城'
                    },
                    {
                        link: 'https://apsgo.com/',
                        title: 'APSGO 软购'
                    }
                ]
            },
            {
                title: '饮食',
                links: [
                    {
                        link: 'http://www.pizzahut.com.cn/',
                        title: '必胜客'
                    },
                    {
                        link: 'https://www.4008123123.com/',
                        title: '必胜客宅急送'
                    },
                    {
                        link: 'https://www.ele.me/',
                        title: '饿了么'
                    },
                    {
                        link: 'http://www.kfc.com.cn/',
                        title: '肯德基'
                    },
                    {
                        link: 'https://www.4008823823.com.cn/',
                        title: '肯德基宅急送'
                    },
                    {
                        link: 'https://h5.waimai.meituan.com/',
                        title: '美团外卖'
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
                        title: '交通银行'
                    },
                    {
                        link: 'http://www.cmbchina.com/',
                        title: '招商银行'
                    },
                    {
                        link: 'https://www.icbc.com.cn/',
                        title: '中国工商银行'
                    },
                    {
                        link: 'http://www.ccb.com/',
                        title: '中国建设银行'
                    },
                    {
                        link: 'http://www.abchina.com/',
                        title: '中国农业银行'
                    },
                    {
                        link: 'http://www.pbc.gov.cn/',
                        title: '中国人民银行'
                    },
                    {
                        link: 'http://www.boc.cn/',
                        title: '中国银行'
                    }
                ]
            },
            {
                link: 'https://www.alipay.com/',
                title: '支付宝'
            }
        ]
    },
    {
        title: '设计',
        links: [
            {
                link: 'https://huaban.com/',
                title: '花瓣网'
            },
            {
                link: 'https://www.uigreat.com/',
                title: '优阁网（UIGREAT）'
            },
            {
                link: 'http://www.uisdc.com/',
                title: '优设网（UISDC）'
            },
            {
                link: 'https://www.yrucd.com/',
                title: '云瑞设计'
            },
            {
                link: 'https://www.zcool.com.cn/',
                title: '站酷（ZCOOL）'
            },
            {
                link: 'https://www.ui.cn/',
                title: 'UI中国'
            }
        ]
    },
    {
        title: '生活',
        links: [
            {
                link: 'http://www.pm25.com/',
                title: '绿色呼吸'
            }
        ],
        sub: [
            {
                title: '出行',
                links: [
                    {
                        link: 'https://www.12306.cn/',
                        title: '中国铁路 12306'
                    }
                ],
                sub: [
                    {
                        title: '轨道交通',
                        links: [
                            {
                                link: 'https://www.bjsubway.com/',
                                title: '北京地铁'
                            },
                            {
                                link: 'http://www.chengdurail.com/',
                                title: '成都地铁'
                            },
                            {
                                link: 'http://www.gzmtr.com/',
                                title: '广州地铁'
                            },
                            {
                                link: 'http://www.hzmetro.com/',
                                title: '杭州地铁'
                            },
                            {
                                link: 'http://www.njmetro.com.cn/',
                                title: '南京地铁'
                            },
                            {
                                link: 'http://www.nngdjt.com/',
                                title: '南宁地铁'
                            },
                            {
                                link: 'http://www.qd-metro.com/',
                                title: '青岛地铁'
                            },
                            {
                                link: 'http://www.shmetro.com/',
                                title: '上海地铁'
                            },
                            {
                                link: 'http://www.symtc.com/',
                                title: '沈阳地铁'
                            },
                            {
                                link: 'http://www.szmc.net/',
                                title: '深圳地铁'
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
                        title: '飞猪旅行'
                    },
                    {
                        link: 'http://www.tuniu.com/',
                        title: '途牛'
                    },
                    {
                        link: 'https://www.ctrip.com/',
                        title: '携程旅行网'
                    }
                ]
            }
        ]
    },
    {
        title: '调试',
        links: [
            {
                link: 'javascript:prompt(\'查看源代码\',\'view-source:页面的链接\'); void(0);',
                title: '查看源代码'
            }
        ],
        sub: [
            {
                title: 'Chrome（浏览器限制，需要复制链接后手动打开）',
                links: [
                    {
                        link: 'chrome://user-actions/',
                        title: '操作记录'
                    },
                    {
                        link: 'chrome://version/',
                        title: '关于版本'
                    },
                    {
                        link: 'chrome://inspect/#devices',
                        title: '检查'
                    },
                    {
                        link: 'chrome://extensions/',
                        title: '扩展程序'
                    },
                    {
                        link: 'chrome://history/',
                        title: '历史记录'
                    },
                    {
                        link: 'chrome://media-internals/',
                        title: '媒体内部数据'
                    },
                    {
                        link: 'chrome://conflicts/',
                        title: '模块'
                    },
                    {
                        link: 'chrome://flags/',
                        title: '实验性功能'
                    },
                    {
                        link: 'chrome://bookmarks/',
                        title: '书签管理器'
                    },
                    {
                        link: 'chrome://downloads/',
                        title: '下载内容'
                    },
                    {
                        link: 'chrome://apps/',
                        title: '应用'
                    },
                    {
                        link: 'chrome://appcache-internals/',
                        title: '应用缓存'
                    },
                    {
                        link: 'chrome://policy/',
                        title: '政策'
                    },
                    {
                        link: 'chrome://components/',
                        title: '组件'
                    },
                    {
                        link: 'chrome://thumbnails/',
                        title: '最近浏览网页缩略图'
                    },
                    {
                        link: 'chrome://about/',
                        title: 'Chrome URLs'
                    },
                    {
                        link: 'chrome://dino/',
                        title: 'Dino'
                    },
                    {
                        link: 'chrome://favicon/size/32@1x/协议://链接/',
                        title: 'Favicon'
                    },
                    {
                        link: 'chrome://indexeddb-internals/',
                        title: 'HTML5 本地储存'
                    },
                    {
                        link: 'chrome://net-internals/',
                        title: 'Net Internals'
                    },
                    {
                        link: 'chrome://translate-internals/',
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
                        title: '阿里云'
                    },
                    {
                        link: 'https://cloud.baidu.com/',
                        title: '百度智能云'
                    },
                    {
                        link: 'https://www.hanming.com/',
                        title: '悍铭数据中心'
                    },
                    {
                        link: 'https://cloud.tencent.com/',
                        title: '腾讯云'
                    },
                    {
                        link: 'https://www.cloudflare.com/',
                        title: 'Cloudflare'
                    },
                    {
                        link: 'http://www.mmtrix.com/',
                        title: 'mmTrix - 云应用性能管理'
                    },
                    {
                        link: 'https://www.nodecache.com/',
                        title: 'Nodecache'
                    },
                    {
                        link: 'https://vultr.com/',
                        title: 'Vultr'
                    }
                ]
            },
            {
                title: 'DNS',
                links: [
                    {
                        link: 'http://www.114dns.com/',
                        title: '114DNS'
                    },
                    {
                        link: 'http://www.alidns.com/',
                        title: '阿里DNS'
                    },
                    {
                        link: 'http://www.dnspai.com/',
                        title: 'DNS派'
                    },
                    {
                        link: 'https://www.dnspod.cn/Products/Public.DNS',
                        title: 'Public DNS+'
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
                                        title: '酷安网'
                                    },
                                    {
                                        link: 'https://apkpure.com/',
                                        title: 'APK Pure'
                                    },
                                    {
                                        link: 'https://play.google.com/',
                                        title: 'Google Play'
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
                        title: 'Ubuntu'
                    }
                ],
                sub: [
                    {
                        title: '资料',
                        links: [
                            {
                                link: 'https://man.linuxde.net/',
                                title: 'Linux 命令大全'
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
                        title: 'MSDN，我告诉你'
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
                title: '简书'
            },
            {
                link: 'http://www.lofter.com/',
                title: 'LOFTER'
            }
        ]
    },
    {
        title: '学习',
        sub: [
            {
                link: 'https://www.91suke.com/',
                title: '速课网'
            },
            {
                link: 'https://ke.qq.com/',
                title: '腾讯课堂'
            },
            {
                link: 'https://www.certiport.com/',
                title: 'My Certiport'
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
                        title: '17173'
                    },
                    {
                        link: 'http://www.4399.com/',
                        title: '4399'
                    },
                    {
                        link: 'http://www.7k7k.com/',
                        title: '7k7k'
                    },
                    {
                        link: 'http://www.gamersky.com/',
                        title: '游民星空'
                    },
                    {
                        link: 'https://www.ubisoft.com.cn/',
                        title: '育碧游戏（UBISOFT）'
                    },
                    {
                        link: 'https://www.epicgames.com/',
                        title: 'Epic Games'
                    },
                    {
                        link: 'https://www.origin.com/',
                        title: 'Origin'
                    },
                    {
                        link: 'https://store.steampowered.com/',
                        title: 'Steam'
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
                                title: '官网'
                            }
                        ],
                        sub: [
                            {
                                title: '论坛',
                                links: [
                                    {
                                        link: 'http://www.zuimc.com/',
                                        title: '最MC论坛'
                                    },
                                    {
                                        link: 'https://www.mcbbs.net/forum.php',
                                        title: 'Minecraft 中文论坛'
                                    },
                                    {
                                        link: 'http://forum.minecraft-hk.com/portal.php',
                                        title: 'Minecraft-HK Community'
                                    },
                                    {
                                        link: 'https://www.planetminecraft.com/',
                                        title: 'Planet Minecraft Community'
                                    }
                                ]
                            },
                            {
                                title: 'Wiki',
                                links: [
                                    {
                                        link: 'https://minecraft-zh.gamepedia.com/',
                                        title: '中文 Minecraft Wiki'
                                    },
                                    {
                                        link: 'https://www.mcmod.cn/',
                                        title: 'MC百科'
                                    },
                                    {
                                        link: 'http://mineplugin.org/',
                                        title: 'Minecraft 插件百科'
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
                                                title: 'Sponge'
                                            },
                                            {
                                                link: 'https://ore.spongepowered.org/',
                                                title: 'Sponge Ore'
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
                                title: 'BakaXL 启动器'
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
                                link: 'http://mcctoolchest.com/',
                                title: 'MCC Toolchest PE'
                            },
                            {
                                link: 'https://www.mcedit-unified.net/',
                                title: 'MCEdit Unified'
                            },
                            {
                                link: 'https://mcreator.net/',
                                title: 'MCreator - The Best Minecraft Mod Maker Ever'
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
                                title: 'NameMC'
                            },
                            {
                                link: 'https://www.minecraftjson.com/',
                                title: 'Tellraw Generator'
                            },
                            {
                                link: 'https://www.universalminecrafteditor.com/',
                                title: 'Universal Minecraft Editor'
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
                                        title: 'Minecraft CurseForge'
                                    },
                                    {
                                        link: 'http://www.minecraftxz.com/',
                                        title: 'Minecraft 中文下载站'
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
                                        title: 'Forge'
                                    },
                                    {
                                        link: 'http://www.liteloader.com/',
                                        title: 'LiteLoader'
                                    },
                                    {
                                        link: 'http://www.optifine.net/',
                                        title: 'OptiFine'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                title: 'RPG',
                links: [
                    {
                        link: 'http://www.66rpg.com/',
                        title: '橙光游戏中心'
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
                title: '36kr（36氪）'
            },
            {
                link: 'http://jandan.net/',
                title: '煎蛋'
            },
            {
                link: 'https://sspai.com/',
                title: '少数派'
            },
            {
                link: 'https://www.qq.com/',
                title: '腾讯网'
            },
            {
                link: 'https://info.3g.qq.com/',
                title: '腾讯网（3G）'
            },
            {
                link: 'http://www.cctv.com/',
                title: '央视网 - 世界就在眼前'
            }
        ],
        sub: [
            {
                title: '新闻',
                links: [
                    {
                        link: 'https://news.baidu.com/',
                        title: '百度新闻'
                    },
                    {
                        link: 'http://www.huanqiu.com/',
                        title: '环球网'
                    },
                    {
                        link: 'http://www.kankanews.com/',
                        title: '看看新闻 - 叩击时代'
                    },
                    {
                        link: 'http://news.sohu.com/',
                        title: '搜狐新闻'
                    },
                    {
                        link: 'https://new.qq.com/',
                        title: '腾讯新闻'
                    },
                    {
                        link: 'http://news.sina.com.cn/',
                        title: '新浪新闻'
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
                        title: 'Lsky Pro - 图床'
                    },
                    {
                        link: 'http://www.directorylister.com/',
                        title: 'PHP Directory Lister'
                    },
                    {
                        link: 'http://typecho.org/',
                        title: 'Typecho'
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
                        title: '阿里巴巴开源镜像站'
                    },
                    {
                        link: 'https://mirror.bjtu.edu.cn/',
                        title: '北京交通大学自由与开源软件镜像站'
                    },
                    {
                        link: 'https://mirrors.cqu.edu.cn/',
                        title: '重庆大学开源软件镜像站'
                    },
                    {
                        link: 'http://mirrors.neusoft.edu.cn/',
                        title: '大连东软信息学院开源镜像站'
                    },
                    {
                        link: 'https://mirrors.huaweicloud.com/',
                        title: '华为开源镜像站'
                    },
                    {
                        link: 'http://mirror.hust.edu.cn/',
                        title: '华中科技大学开源镜像站'
                    },
                    {
                        link: 'https://mirrors.tuna.tsinghua.edu.cn/',
                        title: '清华大学开源软件镜像站'
                    },
                    {
                        link: 'http://mirrors.163.com/',
                        title: '网易开源镜像站'
                    },
                    {
                        link: 'http://mirrors.zju.edu.cn/',
                        title: '浙江大学开源镜像站'
                    },
                    {
                        link: 'http://mirrors.ustc.edu.cn/',
                        title: '中国科学技术大学开源软件镜像'
                    }
                ]
            },
            {
                title: '前端',
                links: [
                    {
                        link: 'https://www.bootcss.com/',
                        title: 'Bootstrap 中文网'
                    },
                    {
                        link: 'https://highlightjs.org/',
                        title: 'highlight.js'
                    },
                    {
                        link: 'https://jquery.com/',
                        title: 'jQuery'
                    },
                    {
                        link: 'http://www.jq22.com/',
                        title: 'jQuery 插件库'
                    },
                    {
                        link: 'http://www.htmleaf.com/',
                        title: 'jQuery 之家'
                    },
                    {
                        link: 'http://layer.layui.com/',
                        title: 'layer'
                    },
                    {
                        link: 'https://leafletjs.com/',
                        title: 'Leaflet - 可交互的地图'
                    },
                    {
                        link: 'http://threejs.org/',
                        title: 'three.js – JavaScript 3D library'
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
                                title: '腾讯软件中心'
                            },
                            {
                                link: 'https://www.iplaysoft.com/',
                                title: '异次元软件世界'
                            },
                            {
                                link: 'https://getitfree.cn/',
                                title: '正版中国'
                            }
                        ]
                    },
                    {
                        title: '播放器',
                        links: [
                            {
                                link: 'https://player.qq.com/',
                                title: 'QQ影音'
                            },
                            {
                                link: 'https://www.videolan.org/',
                                title: 'VLC'
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
                                title: 'LICEcap'
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
                                title: 'uTools - 你的生产力工具集'
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
                                title: 'Chrome 插件网'
                            },
                            {
                                link: 'https://greasyfork.org/zh-CN',
                                title: 'Greasy Fork'
                            },
                            {
                                link: 'https://www.tampermonkey.net/',
                                title: 'Tampermonkey'
                            },
                            {
                                link: 'https://violentmonkey.github.io/',
                                title: 'Violentmonkey'
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
                                title: '百分浏览器'
                            },
                            {
                                link: 'https://www.google.cn/intl/zh-CN/chrome/',
                                title: 'Chrome'
                            },
                            {
                                link: 'https://www.firefox.com.cn/',
                                title: 'Firefox'
                            },
                            {
                                link: 'https://natapp.cn/',
                                title: 'NATAPP'
                            },
                            {
                                link: 'https://www.natfrp.org/',
                                title: 'Sakura Frp'
                            },
                            {
                                link: 'http://www.gnu.org/software/wget/faq.html#download',
                                title: 'Wget'
                            },
                            {
                                link: 'https://www.wireshark.org/',
                                title: 'Wireshark'
                            }
                        ]
                    },
                    {
                        title: '虚拟化',
                        links: [
                            {
                                link: 'https://www.virtualbox.org/',
                                title: 'Oracle VM VirtualBox'
                            },
                            {
                                link: 'https://www.vmware.com/cn/products/workstation-pro.html',
                                title: 'VMware Workstation Pro'
                            }
                        ]
                    }
                ]
            },
            {
                title: '素材',
                links: [
                    {
                        link: 'http://www.iconpng.com/',
                        title: '爱看图标网'
                    },
                    {
                        link: 'http://www.huiyi8.com/',
                        title: '绘艺素材网'
                    },
                    {
                        link: 'http://www.lanrentuku.com/',
                        title: '懒人图库'
                    },
                    {
                        link: 'http://www.nipic.com/',
                        title: '昵图网'
                    },
                    {
                        link: 'https://588ku.com/',
                        title: '千库网'
                    },
                    {
                        link: 'http://ico.58pic.com/',
                        title: '千图网'
                    },
                    {
                        link: 'http://www.ypppt.com/',
                        title: '优品PPT'
                    },
                    {
                        link: 'http://www.easyicon.net/',
                        title: 'EASYICON'
                    },
                    {
                        link: 'https://www.iconfont.cn/',
                        title: 'Iconfont - 阿里巴巴矢量图标库'
                    },
                    {
                        link: 'http://www.officeplus.cn/',
                        title: 'OfficePLUS'
                    },
                    {
                        link: 'https://www.pexels.com/zh-tw/',
                        title: 'Pexels'
                    }
                ]
            },
            {
                title: '字体',
                links: [
                    {
                        link: 'https://alibabafont.taobao.com/',
                        title: '阿里巴巴字体素材平台'
                    },
                    {
                        link: 'http://tsanger.cn/',
                        title: '仓耳字库'
                    },
                    {
                        link: 'http://www.foundertype.com/',
                        title: '方正字库'
                    },
                    {
                        link: 'https://source.typekit.com/source-han-serif/cn/',
                        title: '思源宋体'
                    },
                    {
                        link: 'http://font.chinaz.com/',
                        title: '站长字体'
                    },
                    {
                        link: 'http://www.zhaozi.cn/',
                        title: '找字网'
                    },
                    {
                        link: 'http://zisea.com/download/',
                        title: '字海(叶典)'
                    },
                    {
                        link: 'https://www.hellofont.cn/',
                        title: '字由'
                    },
                    {
                        link: 'https://mirrors.tuna.tsinghua.edu.cn/adobe-fonts/',
                        title: 'adobe-fonts（清华大学开源软件镜像站）'
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
                        title: '高德开放平台'
                    },
                    {
                        link: 'http://www.itpk.cn/robot.php',
                        title: '茉莉机器人 API'
                    },
                    {
                        link: 'https://open.tencent.com/',
                        title: '腾讯开放平台'
                    },
                    {
                        link: 'javascript:prompt(\'API\',\'https://music.163.com/song/media/outer/url?id=音乐 ID.mp3\'); void(0);',
                        title: '网易云音乐音频 API'
                    },
                    {
                        link: 'https://open.weixin.qq.com/',
                        title: '微信开放平台'
                    },
                    {
                        link: 'https://open.weibo.com/',
                        title: '新浪微博开放平台'
                    },
                    {
                        link: 'https://www.xfyun.cn/',
                        title: '讯飞开放平台'
                    },
                    {
                        link: 'https://api.imjad.cn/',
                        title: 'AD\'s API'
                    },
                    {
                        link: 'https://app.crisp.chat/',
                        title: 'Crisp'
                    },
                    {
                        link: 'https://open.oppomobile.com/',
                        title: 'OPPO开放平台'
                    },
                    {
                        link: 'https://valine.js.org/',
                        title: 'Valine'
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

export default navLinks;
