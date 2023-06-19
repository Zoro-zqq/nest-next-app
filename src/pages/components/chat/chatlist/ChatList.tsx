import React from 'react'

import Chat from './Chat'
import Search from './Search'

const ChatList = () => {
  return (
    <div
      style={{
        height: '100%',
        width: '250px',
        display: 'flex',
        flexDirection: 'column',
        userSelect: 'none',
        backgroundColor: '#fff'
      }}
    >
      <div
        style={{
          width: '100%',
          height: '16px'
        }}
      ></div>
      <Search />
      <div
        style={{
          width: '100%',
          height: '566px',
          overflowY: 'scroll',
          overflowX: 'hidden',
          scrollBehavior: 'smooth'
        }}
        className='chatlist'
        onMouseEnter={e => {
          e.currentTarget.classList.remove('chatlist')
          e.currentTarget.classList.add('chatlist_')
        }}
        onMouseLeave={e => {
          e.currentTarget.classList.remove('chatlist_')
          e.currentTarget.classList.add('chatlist')
        }}
      >
        <Chat />
      </div>
    </div>
  )
}

export default ChatList
