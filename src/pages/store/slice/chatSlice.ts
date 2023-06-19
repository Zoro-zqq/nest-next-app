import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  socket: null,
  messages: [],
  sentFlag: false,
  activeUsers: [],
  page: 1
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setSocket(state, action: PayloadAction<any>) {
      state.socket = action.payload
    },
    setSentFlag(state, action: PayloadAction<any>) {
      state.sentFlag = action.payload
    },
    setMessages(state, action: PayloadAction<any>) {
      state.messages = action.payload
    },
    setActiveUsers(state, action: PayloadAction<any>) {
      state.activeUsers = action.payload
    },
    setPage(state, action: PayloadAction<any>) {
      state.page = action.payload
    }
  }
})

export const { setSocket, setSentFlag, setMessages, setActiveUsers, setPage } = chatSlice.actions

export default chatSlice.reducer
