import React, { useEffect, useState } from 'react'
import styles from './scss/register.module.scss'
import { Button, Form, Input, message } from 'antd'
import router from 'next/router'
import request from '../../utils/request'
import {
  UserOutlined,
  ArrowRightOutlined,
  LockOutlined,
  RobotOutlined,
  SafetyCertificateOutlined,
  SyncOutlined
} from '@ant-design/icons'
import { duration } from 'moment'

function RegisterPage() {
  const [messageApi, contextHolder] = message.useMessage()
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    repeatPassWord: '',
    captcha: ''
  })
  const [captcha, setCaptcha] = useState(null)
  const [passwordVisible, setPasswordVisible] = useState(false)
  useEffect(() => {
    document.title = '注册页'

    changeCap()
  }, [])

  const changeFormData = (key: string, val: string) => {
    setFormData({
      ...formData,
      [key]: val
    })
  }

  const changeCap = async () => {
    const res = await request.get('/user/getCaptcha')
    setCaptcha(res)
  }

  const onSubmit = async () => {
    //验证
    if (handleValidator()) {
      try {
        let res: any = await request.post('/user/register', formData)
        if (!res.requestFail) {
          messageApi.open({
            type: 'success',
            content: '注册快成功了！清注意查收邮件完成注册！！！'
          })
          setTimeout(() => {
            router.push('/pc/login')
          }, 1000)
        }
      } catch (e) {
        console.error(e)
      }
    }
  }

  const handleValidator = () => {
    const { email, password, repeatPassWord, name, captcha } = formData
    if (!name || name.length < 3) {
      messageApi.open({
        type: 'error',
        content: '名称长度不能低于3！'
      })
      return false
    }
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

    if (!password || password.length < 5) {
      messageApi.open({
        type: 'error',
        content: '请输入密码且不能少于5位！'
      })
      return false
    }

    if (repeatPassWord !== password) {
      messageApi.open({
        type: 'error',
        content: '两次密码输入不一致！'
      })
      return false
    }
    if (!captcha) {
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
      <div className={styles['z-register']}>
        <div className={styles['z-register-content']}>
          <Form className={styles['z-login-form']} size='small'>
            <div className={`${styles['z-login-field']} flex-box align-item-center`}>
              <RobotOutlined className={`${styles['z-login-icon']} width-30`} />
              <Input
                maxLength={8}
                className={styles['z-login-input']}
                onChange={e => {
                  changeFormData('name', e.target.value)
                }}
                value={formData.name}
                bordered={false}
                placeholder='名称'
                allowClear
                styles={{ input: { width: '60%' } }}
                onPressEnter={onSubmit}
              ></Input>
            </div>
            <div className={`${styles['z-login-field']} flex-box align-item-center`}>
              <UserOutlined className={`${styles['z-login-icon']} width-30`} />
              <Input
                maxLength={18}
                styles={{ input: { width: '80%' } }}
                className={styles['z-login-input']}
                onChange={e => {
                  changeFormData('email', e.target.value)
                }}
                value={formData.email}
                bordered={false}
                placeholder='邮箱/手机号'
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
                  changeFormData('password', e.target.value)
                }}
                value={formData.password}
                bordered={false}
                placeholder='密码'
                onPressEnter={onSubmit}
              ></Input.Password>
            </div>
            <div className={`${styles['z-login-field']} flex-box align-item-center`}>
              <SyncOutlined className={`${styles['z-login-icon']} width-30`} />
              <Input.Password
                maxLength={16}
                className={styles['z-login-input']}
                visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
                onChange={e => {
                  changeFormData('repeatPassWord', e.target.value)
                }}
                value={formData.repeatPassWord}
                bordered={false}
                placeholder='重复密码'
                onPressEnter={onSubmit}
              ></Input.Password>
            </div>
            <div className={`${styles['z-login-field']} flex-box align-item-center`}>
              <SafetyCertificateOutlined className={`${styles['z-login-icon']} width-30`} />
              <Input
                maxLength={4}
                className={styles['z-login-input']}
                onChange={e => {
                  changeFormData('captcha', e.target.value)
                }}
                styles={{ input: { width: '60%' } }}
                value={formData.captcha}
                bordered={false}
                placeholder='验证码'
                allowClear
                onPressEnter={onSubmit}
              ></Input>
              <div
                onClick={changeCap}
                className={styles['z-login__captcha']}
                dangerouslySetInnerHTML={{ __html: captcha }}
              ></div>
            </div>
            <Button onClick={onSubmit} className={styles['z-login-button']}>
              <span className={styles['z-login-button-text']}>注册</span>
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
