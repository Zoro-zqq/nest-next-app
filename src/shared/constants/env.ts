// 配置文件
export const isServer = typeof window === 'undefined'

export const isClient = !isServer

export const NODE_ENV = 'development'

export const PORT = process.env.PORT || 3000

export const PROJECT_NAME = 'ZorQ'

export const PROJECT_DOMAIN = `http://127.0.0.1:${PORT}`

export const BASIC_URL = PROJECT_DOMAIN

export const BLOG_URL = `http://127.0.0.1:8888`

export const JWT_SECRET = 'xxxx'

export const AUTH_EMAIL = 'xxxxxxx@qq.com'

export const QRCODE_SOCKETURL: string = 'ws://127.0.0.1:4000'

export const CHAT_SOCKETURL: string = 'ws://127.0.0.1:5000'

export const REDIS_CONFIG = {
  host: '127.0.0.1',
  port: 6379,
  db: 0,
  prefix: 'ZorQ:',
  keyPrefix: 'ZorQ:',
  ttl: 24 * 60 * 60
}

export const COOKIE_CONFIG = {
  path: '/',
  httpOnly: true,
  maxAge: 2 * 24 * 60 * 60 * 1000
}

export const EMAIL_TRANSPORT = {
  host: 'smtp.qq.com', //QQ邮箱的服务器
  port: 587, //端口号
  secure: false, //465为true,其他为false
  auth: {
    user: AUTH_EMAIL, // 自己的邮箱
    pass: '' // 授权码 打开pop3/smtp
  }
}
export const NEXT_PUBLIC_OPENAI_API_KEY = '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'
export const APP_HOST = '192.xx.xx.xxx' //onlyoffice服务地址 本机ip地址

export const APP_ONLYOFFICE_PORT = 8701

export const APP_ONLYOFFICE_SERVER = `http://${APP_HOST}:${APP_ONLYOFFICE_PORT}`
export const APP_DOCUMENT_SERVER = `http://${APP_HOST}:${PORT}`
export const APP_ONLYOFFICE_API_URL = `${APP_ONLYOFFICE_SERVER}/web-apps/apps/api/documents/api.js`
//Onlyoffice 指令接口地址
export const ONLYOFFICE_COMMAND_URL = `${APP_ONLYOFFICE_SERVER}/coauthoring/CommandService.ashx`
