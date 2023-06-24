import LinkWeb from '../components/myIframe'
import TurboChat from '../components/chat/TurboChat'
import ChatGPT from '../components/chatGPT/chatGPT'
import ToggleSheet from '../components/webfrom/toggleSheet'
import { BASIC_URL, BLOG_URL } from '../../shared/constants/env'

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
  chatGpt: '#85CCA6',
  vscode: '#1296db',
  sheet: 'rgb(236,171,68)',
  sheetDesigner: 'rgb(253,227,133)'
}

export const titleDict = {
  custom: '自定义工作流',
  sheet: '自定义表单',
  sheetDesigner: '表单设计器',
  blog: '个人学习笔记/博客',
  information: '各种技术资讯汇总',
  office: '在线office编辑word文档',
  chat: '聊天测试',
  github: '个人Github地址',
  chatGpt: '接入ChatGPT',
  vscode: '可查看网站代码'
}

export const apps: AppsData[] = [
  {
    windowName: 'blog',
    title: '博客',
    img: '/assets/images/frog.png',
    link: BASIC_URL + '/pc/myBlog'
  },
  {
    windowName: 'sheet',
    title: '自定义表单',
    img: '/assets/images/dog.png',
    content: <ToggleSheet />
  },
  {
    windowName: 'custom',
    title: '自定义工作流',
    img: '/assets/images/cat.png',
    link: BASIC_URL + '/pc/workflow'
  },
  {
    windowName: 'office',
    title: '在线office',
    img: '/assets/images/tiger.png',
    link: BASIC_URL + '/pc/onlyOffice'
  },
  {
    windowName: 'sheetDesigner',
    title: '表单设计器',
    img: '/assets/images/duck.png',
    link: BASIC_URL + '/pc/sheetDesigner'
  },
  {
    windowName: 'information',
    title: '技术资讯',
    img: '/assets/images/rabbit.png',
    link: BASIC_URL + '/pc/information'
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
    windowName: 'vscode',
    title: '项目代码',
    width: 1200,
    height: 900,
    img: '/assets/images/vscode.png',
    content: <LinkWeb src='https://github1s.com/Zoro-zqq/nest-next-app' title='VSCode' />
  },
  {
    windowName: 'github',
    title: 'Github',
    img: '/assets/images/github.png',
    link: 'https://github.com/Zoro-zqq/nest-next-app'
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
