import nodemailer from 'nodemailer'
import { EMAIL_TRANSPORT, AUTH_EMAIL, PROJECT_DOMAIN } from '../../../src/shared/constants/env.ts'

//建立邮箱连接
const transporter = nodemailer.createTransport(EMAIL_TRANSPORT)

function sendEmailMsg(params) {
  return new Promise((resolve, reject) => {
    transporter.sendMail(params, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

/*
 *   找回密码发送验证码
 */
export const sendCode = ({ email, vcode }) => {
  return sendEmailMsg({
    from: `"ZorQ" <${AUTH_EMAIL}>`, //收件人显示的发件人信息
    to: email,
    subject: '找回密码',
    html: `邮箱验证码:<div style="color:blue;font-size:20px;margin-left: 10px"><b>${vcode}</b></div>`
  })
}

/**
 * 注册用户时发送邮箱
 */
export const sendRegisterEmail = ({ name, email, verify_key }) => {
  const url = `${PROJECT_DOMAIN}/api/user/emailRegisterVerify?name=${name}&email=${email}&verify_key=${verify_key}`
  const params = {
    from: `"ZorQ" <${AUTH_EMAIL}>`, // 收件人显示的发件人信息
    to: email, // 目标邮箱号
    subject: '注册新用户',
    html: `点击链接即可注册完毕:<a style="color:blue;font-size:20px;margin-left: 10px;" href="${url}">${url}</a>`
  }
  return sendEmailMsg(params)
}
