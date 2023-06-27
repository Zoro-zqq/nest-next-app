import createAuthRefreshInterceptor from 'axios-auth-refresh'
import axios from './request'
import { refreshToken } from '../store/slice/authSlice'

export const axiosMiddleware = store => next => action => {
  // refresh token when 401
  createAuthRefreshInterceptor(axios, async failedRequest => {
    const res = await store.dispatch(refreshToken())
    console.log('============createAuthRefreshInterceptor callback=======', res.payload)
    if (res.payload && res.payload.token) {
      failedRequest.response.config.headers.Authorization = 'Bearer ' + res.payload.token
    }
    return Promise.resolve()
  })
  //自定义中间件作用：如果上面的判断不返回则会报错，所以返回了一个空的自定义中间件
  return next(action)
}
