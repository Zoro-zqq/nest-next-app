import React, { useEffect } from 'react'
// import { io } from 'socket.io-client'
import ChatList from './chatlist/ChatList.tsx'
import ChatWindw from './chatwindow/ChatWindow.tsx'
import SideBar from './siderbar/SiderBar.tsx'
import { setMessages, setActiveUsers, setSocket } from '../../store/slice/chatSlice.ts'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../store/store.ts'
import { CHAT_SOCKETURL } from '../../../shared/constants/env.ts'

const TurboChat = () => {
  const { socket } = useSelector((state: AppState) => state.chat)
  const { userInfo } = useSelector((state: AppState) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    if (userInfo) {
      import('socket.io-client').then(({ io }) => {
        const newSocket = io(CHAT_SOCKETURL, {
          transports: ['websocket'],
          query: {
            id: userInfo.userId || ''
          }
        })
        dispatch(setSocket(newSocket))
      })
    }
  }, [userInfo])

  useEffect(() => {
    if (socket) {
      socket.connect()
      socket.on('connect', () => {})
      socket.on('getMessages', data => {
        if (data) dispatch(setMessages(data))
      })
      socket.on('onlineUsers', data => {
        if (data) dispatch(setActiveUsers(data))
      })
      socket.on('disconnect', () => {
        // do something
      })
      return () => {
        socket.disconnect()
      }
    }
  }, [socket])

  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        backdropFilter: ' blur(4px)'
      }}
    >
      <SideBar />
      <ChatList />
      {socket !== null && socket !== undefined && <ChatWindw />}
    </div>
  )
}

export default React.memo(TurboChat)
