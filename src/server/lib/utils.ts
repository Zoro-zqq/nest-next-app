/**
 * @desc 公共函数库
 */
import { createHash } from 'crypto'
import { create } from 'svg-captcha'
import { imageSync } from 'qr-image'

export const getQRcode = (str: string) => {
  return `data:image/png;base64,${imageSync(str, { type: 'png' }).toString('base64')}`
}

export const cryptoPassword = (psw: string) => {
  const md5 = createHash('md5')
  md5.update(psw.toString())
  return md5.digest('hex')
}

export const formatToJson = data => {
  let format_json = ''
  if (data) {
    if (typeof data == 'object') {
      format_json = parseToJson(JSON.stringify(data))
    } else if (typeof data == 'string') {
      format_json = parseToJson(data)
    }
  }
  return format_json
}

export const parseToJson = data => {
  return data ? JSON.parse(data) : ''
}

export const randomNumber = (len = 8) => {
  const min = 10 ** (len - 1)
  const max = 10 ** len - min
  let res = Math.random() * max + min
  return Math.floor(res)
}

export const randomNumString = (str = 'QRcode', len = 8) => {
  return str + randomNumber(len)
}

export const getCaptcha = () => {
  //return { text: xx, data: xx}
  return create({
    fontSize: 50,
    width: 100,
    height: 40,
    background: '#cc9966' //背景颜色
  })
}
