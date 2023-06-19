import React, { useRef } from 'react'
import ChatMessage from './message/ChatMessage'
import ChatSent from './message/ChatSent'
import WindowHeader from './ChatHeader'

const ChatWindw = () => {
  const windowRef = useRef<HTMLDivElement | null>(null)

  return (
    <div
      style={{
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        userSelect: 'none',
        backgroundColor: '#f2f2f2'
      }}
      ref={windowRef}
    >
      <WindowHeader />
      <div
        style={{
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
          userSelect: 'none',
          backgroundColor: '#f2f2f2',
          paddingLeft: '12px',
          paddingRight: '8px'
        }}
      >
        <ChatMessage />
        <ChatSent />
      </div>
    </div>
  )
}

export default ChatWindw
