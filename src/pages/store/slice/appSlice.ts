import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getAuthCache } from '../../utils/cache/auth'
import { OPEN_WINDOW_KEY } from '../../settings/cacheEnums'

const initialState = {
  openApps: getAuthCache(OPEN_WINDOW_KEY) || [],
  focusApp: '',
  max: '',
  minimizeApps: []
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setOpenApp(state, action: PayloadAction<{ windowName: string; type: string }>) {
      const { windowName, type } = action.payload
      let openWindows = getAuthCache(OPEN_WINDOW_KEY) || []
      switch (type) {
        case 'refresh':
          state.openApps = openWindows
          break
        //不改变缓存
        case 'open':
          if (!state.openApps.includes(windowName)) {
            state.openApps = state.openApps.concat(windowName)
          }
          break
        //不改变缓存
        case 'close':
          //在页面内的窗口只能打开一个，直接过滤掉
          state.openApps = state.openApps.filter(name => name !== windowName)
          break
        default:
          state.openApps = openWindows
          break
      }
    },
    setFocus(state, action: PayloadAction<{ windowName: string }>) {
      state.focusApp = action.payload.windowName
    },
    setMax(state, action: PayloadAction<string>) {
      state.max = action.payload
    },
    setMinimizeApps(state, action: PayloadAction<{ windowName: string; type: string }>) {
      const { windowName, type } = action.payload
      switch (type) {
        case 'add':
          state.minimizeApps = state.minimizeApps.concat(windowName)
          break
        case 'remove':
          //在页面内的窗口只能打开一个，直接过滤掉
          state.minimizeApps = state.minimizeApps.filter(name => name !== windowName)
          break
        default:
          break
      }
    }
  }
})

export const { setOpenApp, setFocus, setMax, setMinimizeApps } = appSlice.actions

export default appSlice.reducer
