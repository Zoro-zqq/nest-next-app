import React, { useEffect, useState } from 'react'
import styles from './scss/forget.module.scss'
import { Button, Form, Input, message } from 'antd'
import router from 'next/router'
import request from '../../utils/request'
import { setAuthCache, getAuthCache, removeAuthCache } from '../../utils/cache/auth'
import { TIMER_KEY } from '../../settings/cacheEnums'
import {
  UserOutlined,
  ArrowRightOutlined,
  LockOutlined,
  SafetyCertificateOutlined
} from '@ant-design/icons'

let timer

function RegisterPage() {
  const [messageApi, contextHolder] = message.useMessage()
  const [formData, setFormData] = useState({
    email: '',
    newPassword: '',
    vcode: ''
  })
  const [hasClick, setHasClick] = useState(false)
  const [count, setCount] = useState(60)
  const [passwordVisible, setPasswordVisible] = useState(false)
  useEffect(() => {
    document.title = '忘记密码'
    let now = Date.now()
    let lastTime = getAuthCache(TIMER_KEY)
    if (lastTime && now - lastTime < 60000) {
      setHasClick(true)
      setCount(Math.ceil((lastTime + 60000 - now) / 1000))
      setCountInterval()
    }
  }, [])

  const changeFormData = (key: string, val: string) => {
    setFormData({
      ...formData,
      [key]: val
    })
  }

  const onSubmit = async () => {
    //验证
    if (handleValidator()) {
      try {
        await request.post('/user/retrievePassword', {
          ...formData,
          vcode: parseInt(formData.vcode)
        })
        messageApi.open({
          type: 'success',
          content: '密码修改成功，清重新登录！'
        })
        setTimeout(() => {
          router.push('/pc/login')
        }, 1000)
      } catch (e) {
        console.error(e)
      }
    }
  }

  const getVerifyKey = async () => {
    const { email } = formData
    if (!email) {
      messageApi.open({
        type: 'error',
        content: '请输入邮箱！'
      })
      return false
    }
    const pattern = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/
    if (!pattern.test(email)) {
      messageApi.open({
        type: 'error',
        content: '邮箱格式不正确！'
      })
      return false
    }

    try {
      await request.post('/user/sendEmailVerifyCode', {
        email
      })
      let now = Date.now()
      setAuthCache(TIMER_KEY, now)
      setHasClick(true)
      setCountInterval()
    } catch (e) {
      messageApi.open({
        type: 'error',
        content: e
      })
    }
  }

  const setCountInterval = () => {
    timer = setInterval(() => {
      setCount(v => {
        if (v <= 0) {
          removeAuthCache(TIMER_KEY)
          setHasClick(false)
          clearInterval(timer)
          return 60
        }
        return v - 1
      })
    }, 1000)
  }

  const handleValidator = () => {
    const { email, vcode, newPassword } = formData
    if (!email) {
      messageApi.open({
        type: 'error',
        content: '请输入邮箱！'
      })
      return false
    }
    const pattern = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/
    if (!pattern.test(email)) {
      messageApi.open({
        type: 'error',
        content: '邮箱格式不正确！'
      })
      return false
    }
    if (!newPassword || newPassword.length < 5) {
      messageApi.open({
        type: 'error',
        content: '请输入密码且不能少于5位！'
      })
      return false
    }
    if (!vcode) {
      messageApi.open({
        type: 'error',
        content: '请输入验证码！'
      })
      return false
    }
    return true
  }

  return (
    <>
      {contextHolder}
      <div className={styles['z-forget']}>
        <div className={styles['z-forget-content']}>
          <Form className={styles['z-login-form']} size='small'>
            <div className={`${styles['z-login-field']} flex-box align-item-center`}>
              <UserOutlined className={`${styles['z-login-icon']} width-30`} />
              <Input
                maxLength={18}
                className={styles['z-login-input']}
                onChange={e => {
                  changeFormData('email', e.target.value)
                }}
                value={formData.email}
                bordered={false}
                placeholder='邮箱'
                allowClear
                onPressEnter={onSubmit}
              ></Input>
            </div>
            <div className={`${styles['z-login-field']} flex-box align-item-center`}>
              <LockOutlined className={`${styles['z-login-icon']} width-30`} />
              <Input.Password
                maxLength={16}
                className={styles['z-login-input']}
                visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
                onChange={e => {
                  changeFormData('newPassword', e.target.value)
                }}
                value={formData.newPassword}
                bordered={false}
                placeholder='输入新密码'
                onPressEnter={onSubmit}
              ></Input.Password>
            </div>
            <div className={`${styles['z-login-field']} flex-box align-item-center`}>
              <SafetyCertificateOutlined className={`${styles['z-login-icon']} width-30`} />
              <Input
                maxLength={4}
                className={styles['z-login-input']}
                styles={{ input: { width: '66%' } }}
                value={formData.vcode}
                onChange={e => {
                  changeFormData('vcode', e.target.value)
                }}
                bordered={false}
                placeholder='验证码'
                allowClear
                onPressEnter={onSubmit}
              ></Input>
              <Button
                className={styles['z-forget__btn']}
                type='primary'
                onClick={getVerifyKey}
                disabled={hasClick}
              >
                {hasClick ? count + 's' : '获取验证码'}
              </Button>
            </div>
            <Button onClick={onSubmit} className={styles['z-login-button']}>
              <span className={styles['z-login-button-text']}>提交</span>
              <ArrowRightOutlined className={`${styles['z-login-icon']} width-40`} />
            </Button>
          </Form>
          <div className={styles['z-screen-background']}>
            <span
              className={`${styles['screen__background__shape']} ${styles['screen__background__shape4']}`}
            ></span>
            <span
              className={`${styles['screen__background__shape']} ${styles['screen__background__shape3']}`}
            ></span>
            <span
              className={`${styles['screen__background__shape']} ${styles['screen__background__shape2']}`}
            ></span>
            <span
              className={`${styles['screen__background__shape']} ${styles['screen__background__shape1']}`}
            ></span>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegisterPage
