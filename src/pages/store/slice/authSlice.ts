import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { AuthState, UserInfo, LoginParams } from '../../settings/constants'
import { AppState } from '../store'
import axios from '../../utils/request'
import Router from 'next/router'
import Cookies from 'js-cookie'
import { setAuthCache, removeAuthCache } from '../../utils/cache/auth'
import { TOKEN_KEY } from '../../settings/cacheEnums'
import { message as AntdMessage } from 'antd' // 引入antd

export const getUserInfo = createAsyncThunk('auth/getUserInfo', async (_, thunkAPI) => {
  try {
    const data: UserInfo = await axios.get('/user/getUserInfo')
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message })
  }
})

export const login = createAsyncThunk('auth/login', async (credentials: LoginParams, thunkAPI) => {
  try {
    const { token, refreshToken, ...userInfo }: UserInfo & { token: string; refreshToken: string } =
      await axios.post('/auth/login', credentials)
    return { token, refreshToken, userInfo }
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message })
  }
})

export const register = createAsyncThunk(
  '/user/register',
  async (credentials: LoginParams & { name: string }, thunkAPI) => {
    try {
      const response = await axios.post<{ token: string }>('/user/register', credentials)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  }
)

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const response = await axios.delete('/user/logout')
    return response
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message })
  }
})

// 使用refresh token 获取 access token
export const refreshToken = createAsyncThunk('auth/refreshToken', async (params, thunkAPI) => {
  try {
    const authState: AppState = thunkAPI.getState()
    const { refreshToken: re_token } = authState.auth
    const res: Record<string, any> = await axios.post('/auth/refreshToken', {
      refreshToken: re_token
    })
    if (res.token) {
      console.log('??????????????/', res)
      const { token, ...userInfo } = res
      return {
        token: res.token,
        isLogin: true,
        userInfo: userInfo
      }
    }
    if (res?.requestFail) {
      return thunkAPI.rejectWithValue({ errorMsg: res.error })
    }
  } catch (error) {
    return thunkAPI.rejectWithValue({ errorMsg: error.message })
  }
})

// Initial state
const initialState: AuthState = {
  // user info
  userInfo: null,
  // token
  token: null,
  refreshToken: null,
  isLogin: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateAccessToken(state: AuthState, action: PayloadAction<{ token: string }>) {
      state.token = action.payload.token
    },
    reset: () => initialState
  },
  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload.token
      state.isLogin = true
      state.refreshToken = action.payload.refreshToken
      state.userInfo = action.payload.userInfo
      setAuthCache(TOKEN_KEY, action.payload.token, 60 * 60)
    })
    builder.addCase(logout.fulfilled, _state => {
      removeAuthCache(TOKEN_KEY)
      // 退出修改reducer之后，要清除cookie
      Cookies.remove('auth.token')
      Cookies.remove('auth.refreshToken')
      Cookies.remove('auth.userInfo')
      Cookies.remove('auth.isLogin')
      return initialState
    })
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.userInfo = action.payload
    })
    builder.addCase(refreshToken.fulfilled, (state, action) => {
      state.token = action.payload.token
      state.isLogin = action.payload.isLogin
      state.userInfo = action.payload.userInfo
      setAuthCache(TOKEN_KEY, action.payload.token, 60 * 60)
      AntdMessage.success('登录信息成功刷新！ 请重新操作！')
    })
    builder.addCase(refreshToken.rejected, (state, action) => {
      removeAuthCache(TOKEN_KEY)
      // 退出修改reducer之后，要清除cookie
      Cookies.remove('auth.token')
      Cookies.remove('auth.refreshToken')
      Cookies.remove('auth.userInfo')
      Cookies.remove('auth.isLogin')
      Router.push('/pc/login')
      return initialState
    })
  }
})

export const { reset, updateAccessToken } = authSlice.actions

export default authSlice.reducer
