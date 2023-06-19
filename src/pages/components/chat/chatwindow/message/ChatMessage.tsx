import React, { useEffect, useRef, useState } from 'react'
import LoadingSpinner from './LoadingSpinner'
import RenderMessage from './RenderMessage'
import { debounce } from '../../../../utils/lib'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../../../../store/store'
import { setMessages, setPage } from '../../../../store/slice/chatSlice'
import { PUBLIC_ROOM } from '../../../../../shared/constants'

const ChatMessage = () => {
  const { messages, page, socket, sentFlag } = useSelector((state: AppState) => state.chat)
  const { userInfo } = useSelector((state: AppState) => state.auth)

  const dispatch = useDispatch()
  const [lastChangedIndex, setLastChangedIndex] = useState<number>(0)
  const [prevScrollTop, setPrevScrollTop] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const chatListRef = useRef(null)

  useEffect(() => {
    if (chatListRef.current) {
      const chatlist = chatListRef.current as HTMLDivElement
      setTimeout(() => {
        chatlist.scrollTop = 9999
        // setTimeout is because the message updating is beforer than chatlist scrolling
      }, 100)
    }
  }, [sentFlag])
  useEffect(() => {
    if (chatListRef.current) {
      const chatlist = chatListRef.current as HTMLDivElement
      if (chatlist.scrollHeight - chatlist.scrollTop - chatlist.scrollWidth < 100)
        chatlist.scrollTop = 9999
    }
  }, [messages])
  useEffect(() => {
    if (chatListRef.current && page > 0) {
      const chatlist = chatListRef.current as HTMLDivElement
      socket && socket.emit('getMessages', { page })
      setLoading(false)
      setTimeout(() => {
        chatlist.scrollTop = chatlist.scrollHeight - prevScrollTop
      }, 100)
    }
  }, [page])

  function addMessage() {
    const index = Math.floor(Math.random() * messages.length * 100)
    const newId = messages.length ? Math.max(...messages.map((m: any, n: number) => n)) + 1 : 1
    const newMessage = {
      id: newId,
      userId: userInfo.userId,
      user: userInfo,
      roomId: PUBLIC_ROOM,
      content: `${index}测试`,
      type: 'text',
      createdAt: new Date()
    }

    setLastChangedIndex(index)
    dispatch(setMessages([...messages.slice(0, index), newMessage, ...messages.slice(index)]))
  }

  const ScrollHandler = async () => {
    if (chatListRef.current) {
      const chatlist = chatListRef.current as HTMLDivElement
      setPrevScrollTop(chatlist.scrollHeight)
      // when it gets to the top,send a request to the server
      if (chatlist.scrollTop < 50) {
        setLoading(true)
        setTimeout(() => {
          dispatch(setPage(page + 1))
        }, 600)
      }
    }
  }
  const mouseEnter = (e: React.MouseEvent) => {
    e.currentTarget.classList.remove('chatlist')
    e.currentTarget.classList.add('chatlist_')
  }
  const mouseLeave = (e: React.MouseEvent) => {
    e.currentTarget.classList.remove('chatlist_')
    e.currentTarget.classList.add('chatlist')
  }

  return (
    <div
      ref={chatListRef}
      style={{
        overflowY: 'scroll',
        overflowX: 'hidden',
        scrollBehavior: 'smooth',
        borderColor: '#888',
        height: '420px'
      }}
      className={`flex-1 chatlist border-t`}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      onScroll={debounce(ScrollHandler, 300)}
    >
      <div className='flex flex-col w-full'>
        <div
          style={{
            textAlign: 'right'
          }}
        >
          <button onClick={addMessage} className='chatBtn'>
            <div
              style={{
                width: '16px',
                height: '16px'
              }}
            >
              ＋
            </div>
          </button>
        </div>
        <LoadingSpinner loading={loading} />
        <RenderMessage
          messages={messages}
          lastChangedIndex={lastChangedIndex}
          setLastChangedIndex={setLastChangedIndex}
        />
      </div>
    </div>
  )
}

export default ChatMessage
