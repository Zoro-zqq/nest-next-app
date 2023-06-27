import React, { useEffect, useState } from 'react'
import * as Transition from 'react-transition-group'
import styles from './scss/scanLogin.module.scss'
import { QRCODE_SOCKETURL } from '../../../shared/constants/env'

function ScanLogin(props) {
  let ScanCodeShow = false
  let timerCheck
  const [tipsText, setTipsText] = useState('使用手机扫码登录')
  const [successShow, setSuccessShow] = useState(false)
  const [overtimeShow, setOvertimeShow] = useState(false)
  const [base64QRcode, setBase64QRcode] = useState({
    QRcode: '',
    uuid: ''
  })
  const [socket, setSocket] = useState(null)

  const getQRcode = () => {
    if (timerCheck) {
      clearInterval(timerCheck)
    }
    // 向服务器要uuid和二维码
    socket.emit('getQRcode')
    // 接受服务器给的uuid和二维码
    socket.on('sendQRcode', res => setBase64QRcode(res))
    // 等待扫码
    socket.on('waitScanCode', res => {
      if (!ScanCodeShow) {
        setTipsText('使用手机扫码登录')
      }
    })
    // 扫码成功
    socket.on('SuccessScanCode', res => {
      // localStorage.setItem('token', val)
      setTipsText(`扫码成功`) // 提示信息
      setSuccessShow(true) // 显示扫码成功的样式
      clearInterval(timerCheck) // 扫码成功，清除定时器，不再询问服务器
    })

    // 每1秒询问一次服务器，用户App端是否扫码
    timerCheck = setInterval(
      () =>
        socket.emit('checkScanCode', {
          key: base64QRcode.uuid
        }),
      1000
    )
  }

  const AgainScanCode = () => {
    setOvertimeShow(false)
    ScanCodeShow = false
    getQRcode()
  }

  useEffect(() => {
    // 创建 Socket 链接
    import('socket.io-client').then(({ io }) => {
      const newSocket = io(QRCODE_SOCKETURL, {
        transports: ['websocket']
      })
      setSocket(newSocket)
    })
  }, [])

  useEffect(() => {
    if (socket) {
      getQRcode()
      socket.on('ScanCodeOvertime', () => {
        // 如果二维码已经失效，并且用户还未扫码的话，那么才去显示二维码失效的样式
        // 之所以在这判断一次的原因，因为如果用户扫码成功之后，二维码才失效
        // 页面上会显示二维码失效的样式，体验不好。
        if (!successShow) {
          console.log('【Vue端】：二维码超时')
          clearInterval(timerCheck) // 二维码失效，不再询问服务器
          setOvertimeShow(true) // 显示二维码失效的样式
          setTipsText('二维码失效') // 清空等待扫码文字
        }
      })
      // 已扫码但未确认
      socket.on('ScanCoding', () => {
        ScanCodeShow = true
        setTipsText('您已扫码，请在手机上确认登录！')
      })
      return () => {
        socket.disconnect()
      }
    }
  }, [socket])

  return (
    <div className={styles['login-card-back']}>
      <div className={styles['module-qrcode-code']}>
        {/* 扫码成功的样式 */}
        {successShow && (
          <div className={styles['QRcode_success']}>
            <img src='/assets/images/success.png' alt='success' />
            <p>扫码成功</p>
          </div>
        )}

        {/* 二维码失效的样式 */}
        {overtimeShow && (
          <div className={styles['QRcode_overtime']} onClick={AgainScanCode}>
            <p>二维码失效，点击重新获取</p>
            <img src='/assets/images/reload.png' alt='reload.png' />
          </div>
        )}

        {/* 真正让用户扫的二维码 */}
        <img className={styles['QRcode_img']} src={base64QRcode.QRcode} />
      </div>
      <div className={styles['module-qrcode-login-title']}>{tipsText}</div>
      <div
        className={`iconfont icon-login ${styles['module-switch-login']}`}
        onClick={() => {
          props.setLoginIdentity(false)
        }}
      >
        <Transition.CSSTransition in={props.loginIdentity} timeout={800} classNames='fade'>
          {props.loginIdentity ? <span></span> : <></>}
        </Transition.CSSTransition>
      </div>
    </div>
  )
}

export default React.memo(ScanLogin)
