import {
  configureStore,
  AnyAction,
  combineReducers,
  ThunkAction,
  ThunkDispatch,
  Action,
  Store
} from '@reduxjs/toolkit'
import { authSlice } from './slice/authSlice'
import { appSlice } from './slice/appSlice'
import { coopSlice } from './slice/coopSlice'
import { sheetSlice } from './slice/sheetSlice'
import { chatSlice } from './slice/chatSlice'
import { createWrapper, HYDRATE } from 'next-redux-wrapper'
import { nextReduxCookieMiddleware, wrapMakeStore } from 'next-redux-cookie-wrapper'
import logger from 'redux-logger'
import { axiosMiddleware } from '../utils/axiosMiddleware'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

const combinedReducers = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [appSlice.name]: appSlice.reducer,
  [coopSlice.name]: coopSlice.reducer,
  [sheetSlice.name]: sheetSlice.reducer,
  [chatSlice.name]: chatSlice.reducer
})
// Type that indicates our whole State will be used for useSelector and other things.
export type OurStore = ReturnType<typeof combinedReducers>

const rootReducer = (state: OurStore, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload
    }
    return nextState
  }
  return combinedReducers(state, action)
}

export const store: Store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
      .prepend(
        nextReduxCookieMiddleware({
          // 是否压缩
          // compress: false,
          subtrees: ['auth.token', 'auth.refreshToken', 'auth.userInfo', 'auth.isLogin']
        })
      )
      .concat(axiosMiddleware)
      .concat(
        process.env.NODE_ENV === `development`
          ? logger
          : () => next => action => {
              //自定义中间件作用：如果上面的判断不返回则会报错，所以返回了一个空的自定义中间件
              return next(action)
            }
      )
})

const makeStore = wrapMakeStore(() => store)

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>
// 2. Create a type for thunk dispatch
export type AppThunkDispatch = ThunkDispatch<AppState, any, AnyAction>
// you can also create some redux hooks using the above explicit types
export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector

// Type that will be used to type useDispatch() for async actions.
export type MyThunkDispatch = typeof store.dispatch

export const wrapper = createWrapper<AppStore>(makeStore)
