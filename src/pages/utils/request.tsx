/**
 * axios 二次封装
 * @auther zqq
 * @time 2021/11/07
 */

import Axios from 'axios' // 引入axios
import { PROJECT_DOMAIN, PORT } from '../../shared/constants/env'
import { message as AntdMessage, Spin } from 'antd' // 引入antd
import router from 'next/router'
import { createRoot } from 'react-dom/client'
import { getAuthCache } from './cache/auth'
import { TOKEN_KEY } from '../settings/cacheEnums'

declare module 'axios' {
  interface AxiosInstance {
    (config): Promise<any>
  }
}

// 定义初始化状态码
const TOKEN_INVALID = 'Token认证失败, 请重新登录'
const NETWORK_ERROR = '网络请求异常, 请稍后重试'
// 当前正在请求的数量
let requestCount = 0
let root
// 创建axios实例对象， 添加全局配置
const axios = Axios.create({
  // 初始配置请求头  请求api
  baseURL: `${PROJECT_DOMAIN}:${PORT}/api`,
  // 接口持续时间为8秒，否则超时
  timeout: 8000
})

// 显示loading
function showLoading() {
  if (requestCount === 0) {
    const dom = document.createElement('div')
    dom.setAttribute('id', 'loading')
    document.body.appendChild(dom)
    root = createRoot(dom)
    root.render(
      <div id='loading-wrapper'>
        <Spin tip='加载中...' style={{ background: 'transparent', fontSize: '40px' }} size='large'>
          <div style={{ width: '100vw', height: '100vh' }}></div>
        </Spin>
      </div>
    )
  }
  requestCount++
}

// 隐藏loading
function hideLoading() {
  requestCount--
  if (requestCount === 0) {
    root.unmount()
    document.body.removeChild(document.getElementById('loading'))
  }
}

// 前置拦截器（发起请求之前的拦截）
axios.interceptors.request.use(
  async req => {
    showLoading()
    const headers = req.headers
    // // 获取token 由于是typescript，所以要做排斥赋值
    const token = getAuthCache<string>(TOKEN_KEY) || ''
    // // 跟后端定义的某个请求头的值用于解析token身份令牌
    if (headers && !headers.Authorization) headers.Authorization = `Bearer ${token}`
    return req
  },
  error => {
    // 抛出异常
    hideLoading()
    return Promise.reject(error)
  }
)

// 后置拦截器（获取到响应时的拦截）
axios.interceptors.response.use(
  response => {
    hideLoading()
    // 获取后端返回的code，data和提示语
    const { code, data, message } = response.data
    if (code == 200) return data
    else if (code === 401) {
      // token认证失败
      AntdMessage.error(TOKEN_INVALID) // 给予401的状态码
      // 并且给予用户 一定的反应时间后，跳转登录页
      setTimeout(() => {
        router.push('/pc/login')
      }, 1500)
      return Promise.reject(TOKEN_INVALID) // 抛出异常
    } else {
      // 丢出服务器异常
      AntdMessage.error(message || NETWORK_ERROR)
      console.error(message || NETWORK_ERROR)
      return Promise.reject(message || NETWORK_ERROR)
    }
  },
  error => {
    hideLoading()
    if (error.response && error.response.data) {
      const code = error.response.status
      const msg = error.response.data.message
      AntdMessage.error(`Code: ${code}, Message: ${msg}`)
      // return {
      //   code,
      //   errorMsg: msg,
      //   fail: true
      // }
      console.error(`[Axios error] ${msg}`)
      // 抛出异常
      if (code == 401) {
        return Promise.reject(error)
      }
    } else {
      // 丢出服务器异常
      AntdMessage.error(`${error}`)
    }
    return {
      requestFail: true,
      error
    }
  }
)

export default axios
