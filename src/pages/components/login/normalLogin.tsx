import React, { useEffect, useState } from 'react'
import { Button, Form, Input, message } from 'antd'
import router from 'next/router'
import Link from 'next/link'
import {
  UserOutlined,
  ArrowRightOutlined,
  LockOutlined,
  SafetyCertificateOutlined
} from '@ant-design/icons'
import styles from './scss/normalLogin.module.scss'
import request from '../../utils/request'
import { useAppDispatch } from '../../store/store'
import { login } from '../../store/slice/authSlice'

function NormalLogin(props) {
  const [messageApi, contextHolder] = message.useMessage()
  const [formData, setFormData] = useState({
    email: 'admin@mail.com',
    password: 'admin',
    captcha: ''
  })
  const [captcha, setCaptcha] = useState(null)

  const [passwordVisible, setPasswordVisible] = useState(false)
  const dispatch = useAppDispatch()

  useEffect(() => {
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
        const { payload } = await dispatch(login(formData))
        if (payload && (payload as { token: string }).token) {
          messageApi.open({
            type: 'success',
            content: '登录成功！'
          })
          setTimeout(() => {
            router.push('/pc')
          }, 1000)
        }
      } catch (e) {
        console.error(e)
      }
    }
  }

  const handleValidator = () => {
    const { email, password, captcha } = formData
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
      <div className={styles['z-login-card-front']}>
        <div className={styles['z-login-content']}>
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
              <SafetyCertificateOutlined className={`${styles['z-login-icon']} width-30`} />
              <Input
                maxLength={4}
                className={styles['z-login-input']}
                onChange={e => {
                  changeFormData('captcha', e.target.value)
                }}
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
              <span className={styles['z-login-button-text']}>登录</span>
              <ArrowRightOutlined className={`${styles['z-login-icon']} width-40`} />
            </Button>
            <div className={styles['z-new-account']}>
              <Link href='/pc/forgetPassword' className={styles['z-forget-password']}>
                忘记密码
              </Link>
              <a href='/pc/register' className={styles['z-register']}>
                立即注册
              </a>
            </div>
          </Form>
          <div className={styles['z-social-login']}>
            <h3>其它登录方式</h3>
            <div className={styles['z-social-icons']}>
              <a
                href='/loginWithQQ'
                className={`${styles['z-social-login-icon']} ${styles['icon-qq']}`}
              ></a>
              <a
                href='/loginWithWeChat'
                className={`${styles['z-social-login-icon']} ${styles['icon-we-chat']}`}
              ></a>
            </div>
          </div>
        </div>
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
    </>
  )
}

/* export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => {
  return async () => {
    const { isLogin } = store.getState().auth
    let res: GetServerSidePropsResult<any> = {
      props: {
        fuck: 100
      }
    }
    if (isLogin) {
      res = {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }
    return res
  }
}) */

export default React.memo(NormalLogin)
