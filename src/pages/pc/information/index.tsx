import React, { useEffect } from 'react'
import useHandleTabClose from '../../hooks/handleTabClose.hook'
import styles from './index.module.scss'
import Card from './card'

const WINDOWS_NAME = 'information'

const informationData = [
  {
    lang: '中文',
    id: 1,
    children: [
      {
        id: 1,
        title: '稀土掘金',
        desc: '掘金是面向全球中文开发者的技术内容分享与交流平台。我们通过技术文章、沸点、课程、直播等产品和服务,打造一个激发开发者创作灵感,激励开发者沉淀分享,陪伴开发者成长的综合类技术社区。',
        url: 'https://juejin.cn/'
      },
      {
        id: 2,
        title: 'InfoQ（Information Queue）',
        desc: 'InfoQ（Information Queue）是一个在线新闻/社区网站，旨在通过促进软件开发领域知识与创新的传播，为软件开发者提供帮助。他们的内容比较有技术深度，很多大公司的架构上面都有介绍，很多实战经验非常值得借鉴。',
        url: 'https://www.infoq.cn/'
      },
      {
        id: 3,
        title: 'OSCHINA（开源中国）',
        desc: 'OSCHINA（开源中国）是目前国内最大的开源技术社区，上面有非常非常多的各种开源软件和插件。拥有超过300万会员，形成了由开源软件库、代码分享、资讯、协作翻译、讨论区和博客等几大频道内容，为IT开发者提供了一个发现、使用、并交流开源技术的平台',
        url: 'https://www.oschina.net/'
      },
      {
        id: 4,
        title: 'SegmentFault知否',
        desc: 'SegmentFault 思否是中国领先的开发者技术社区。我们以技术问答、技术专栏、技术课程、技术资讯为核心的产品形态,为开发者提供纯粹、高质的技术交流平台。',
        url: 'https://segmentfault.com/blogs'
      },
      {
        id: 5,
        title: '开发者头条',
        desc: '开发者头条 - 开发者的首选阅读分享平台 ： 投稿有审核，可以帮助过滤掉部分水货',
        url: 'https://toutiao.io/'
      }
    ]
  },
  {
    lang: '英文',
    id: 2,
    children: [
      {
        id: 6,
        title: 'GitHub',
        desc: ' 程序员神站，各式各样的开源类库、软件、代码统统都有，供学习使用各种知名的公司以及开源框架源码，你可以直接把框架源码clone到本地，也可以大胆把你所想写出来，pull上去成为贡献者，向国内外各种大佬学习他们的优秀编程思想和架构技术，',
        url: 'https://github.com/'
      },
      {
        id: 7,
        title: 'DEV',
        desc: '开发者社区网站，站内可以看到全球各地的资讯和经验分享。dev社区和国内的掘金社区很相似，技术分类也比较多，像Java、Python、js、分布式等应有尽有，文章质量普遍都还不错，其实如果平时多留意不难发现，掘金上有一些文章是翻译自dev社区',
        url: 'https://dev.to/'
      },
      {
        id: 8,
        title: 'Stack Overflow',
        desc: '全球最大编程问答社区，类似于知乎。但与知乎不同的是stackoverflow 更垂直于技术，不像知乎内容比较杂 开发过程中遇到什么 bug，上去搜一下，上面有很多大佬会回答小白们各种各样的问题，99%的问题都能搜到答案。在这里能够与很多有经验的开发者交流，如果你是有经验的开发者，还可以来这儿帮助别人解决问题，提升个人影响力',
        url: 'https://stackoverflow.com/'
      },
      {
        id: 9,
        title: 'Google Developers',
        desc: '谷歌开发者社区(Google Developer Groups )是谷歌开发者部门发起的全球项目，是面向对 Google 和开源、开放技术感兴趣的开发者社区，内容涵盖 Web、Android 和其它 Google API 等。目前（2019年）在全球已有500多个 GDG 社区。中国已成立了20多个GDG社区 ',
        url: 'https://developers.google.cn/'
      },
      {
        id: 10,
        title: 'Trending repositories on GitHub today · GitHub',
        desc: 'Github Trending, 每天最多关注的github项目。',
        url: 'https://github.com/trending'
      },
      {
        id: 11,
        title: 'https://octoverse.github.com/',
        desc: 'GitHub上流行项目以及贡献者实时排名, 大量的流行技术专题, 前沿技术搜索',
        url: 'https://octoverse.github.com/'
      },
      {
        id: 12,
        title: 'DZone',
        desc: 'Dzone是一个技术涵盖比较全面的网站，站内含有大量的教程、指南和资源。 像云平台、数据库、物联网、开发运维、Python语言等都有。',
        url: 'https://dzone.com/'
      },
      {
        id: 13,
        title: 'MDN Web Docs',
        desc: '学习 Web 开发的实践平台，整合了Web 开发的各类学习资源和前沿资讯，构建浏览器、应用程序、代码与各种工具        ',
        url: 'https://developer.mozilla.org/'
      },
      {
        id: 14,
        title: 'Front-end Front',
        desc: ' 这是个较新的News类网站，技术权重较低，但是页面好看啊！你真受得了上面那三个的界面？',
        url: 'https://frontendfront.com/'
      },

      {
        id: 15,
        title: 'css-tricks',
        desc: ' 这是个前端开发博客',
        url: 'https://css-tricks.com/'
      },
      {
        id: 16,
        title: 'Echo JS - JavaScript News',
        desc: 'javascript界的Hacker News, 用户活跃度非常一般。但是资讯质量有些很高。',
        url: 'https://www.echojs.com/'
      }
    ]
  }
]

function information() {
  useHandleTabClose(WINDOWS_NAME)
  useEffect(() => {
    document.title = '技术资讯'
  }, [])
  return (
    <div className={styles['info-wrapper']}>
      {informationData.map(info => {
        return (
          <div key={info.id}>
            <h1 className={styles['info-title']}>{info.lang}</h1>
            <div className={styles['page-content']}>
              {info.children.map(card => (
                <Card key={card.id} cardInfo={card} />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default information
