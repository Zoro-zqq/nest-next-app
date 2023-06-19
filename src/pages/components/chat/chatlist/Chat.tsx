import React from 'react'
import Image from 'next/image'
import { formatTime } from '../../../utils/time.ts'
import { useSelector } from 'react-redux'
import { AppState } from '../../../store/store.ts'

const Chat = () => {
  const { messages } = useSelector((state: AppState) => state.chat)
  const lastMessage = messages[messages.length - 1]

  return (
    <div className='chatContent'>
      <div
        style={{
          padding: '0 8px',
          borderRadius: '50%'
        }}
      >
        <Image
          style={{
            borderRadius: '50%'
          }}
          src='/chat/logo/qq_dark.svg'
          width={50}
          height={50}
          alt='qq'
        />
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '100%'
        }}
      >
        <div
          style={{
            display: 'flex',
            padding: '4px'
          }}
        >
          <div>测试聊天室</div>
          <div
            style={{
              flex: '1',
              height: '100%'
            }}
          ></div>
          <div
            style={{
              fontSize: '12px',
              color: '#5e5e5e',
              width: '40px'
            }}
            className='truncate'
          >
            {lastMessage && lastMessage.createdAt
              ? formatTime(new Date(lastMessage.createdAt))
              : ''}
          </div>
        </div>
        <div
          style={{
            fontSize: '12px',
            color: '#5e5e5e',
            width: '130px',
            marginTop: '4px',
            padding: '4px'
          }}
          className='truncate'
        >
          {lastMessage ? `${lastMessage?.user?.name}: ${lastMessage?.content}` : '还没有聊天'}
        </div>
      </div>
    </div>
  )
}

export default Chat
