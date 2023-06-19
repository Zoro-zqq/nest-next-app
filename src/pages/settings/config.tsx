import LinkWeb from '../components/myIframe'
import TurboChat from '../components/chat/TurboChat'
import ChatGPT from '../components/chatGPT/chatGPT'

export interface AppsData {
  windowName: string
  title: string
  img: string
  width?: number
  height?: number
  minWidth?: number
  minHeight?: number
  link?: string
  content?: JSX.Element
}

export const colorDict = {
  custom: '#E7DAC5',
  blog: '#B1E2B4',
  information: '#FCAE9F',
  office: '#FDDD82',
  chat: '#CE9F41',
  github: '#A469E5',
  chatGpt: '#85CCA6'
}

export const titleDict = {
  custom: '自定义表单/工作流/表单设计器',
  blog: '个人学习笔记/博客',
  information: '各种技术资讯汇总',
  office: '在线office编辑word文档',
  chat: '聊天测试',
  github: 'Github地址',
  chatGpt: '已接入ChatGPT聊天试试'
}

export const apps: AppsData[] = [
  {
    windowName: 'custom',
    title: '自定义表单/工作流',
    img: '/assets/images/cat.png',
    link: 'http://127.0.0.1:3000/pc/workflow'
  },
  {
    windowName: 'blog',
    title: '博客',
    img: '/assets/images/frog.png',
    link: 'https://github.com/ljq0226/turbomac'
  },
  {
    windowName: 'information',
    title: '技术资讯',
    img: '/assets/images/rabbit.png',
    link: 'https://github.com/ljq0226/turbomac'
  },
  {
    windowName: 'office',
    title: '在线office',
    img: '/assets/images/tiger.png',
    link: 'https://github.com/ljq0226/turbomac'
  },
  {
    windowName: 'chat',
    title: 'chat',
    img: '/assets/images/bear.png',
    content: <TurboChat />,
    width: 969,
    height: 640
  },
  {
    windowName: 'github',
    title: 'Github',
    img: '/assets/images/github.png',
    content: <LinkWeb src='https://github.com/zoro-zqq/' title='VSCode' />,
    width: 860,
    height: 560
  },
  {
    windowName: 'chatGpt',
    title: 'ChatGPT',
    img: '/assets/images/chatgpt.png',
    content: <ChatGPT />,
    width: 440,
    height: 580
  }
]
