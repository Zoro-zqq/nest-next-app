import React, { useRef, useState } from 'react'
import Icon from '../icon/Icon'
import { useClickAway } from 'ahooks'
import EmojiPanel from './EmojiPanel'
import { setSentFlag } from '../../../../store/slice/chatSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../../../store/store'

const ChatSent = () => {
  const { socket, sentFlag, page } = useSelector((state: AppState) => state.chat)
  const { userInfo } = useSelector((state: AppState) => state.auth)
  const dispatch = useDispatch()

  const [textValue, setTextValue] = useState('')
  const [showEmojiPanel, setShowEmojiPanel] = useState(false)
  const ref = useRef(null)

  useClickAway(() => {
    setShowEmojiPanel(!showEmojiPanel)
  }, ref)

  const enterHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      console.log(userInfo)

      socket && socket.emit('createMessage', { message: textValue, userId: userInfo.userId, page })
      e.preventDefault()
      setTextValue('')
      dispatch(setSentFlag(!sentFlag))
    }
  }
  const handleSelectEmoji = (selectedEmoji: string) => {
    setTextValue(textValue + selectedEmoji)
  }
  return (
    <div
      style={{
        height: '170px',
        position: 'relative'
      }}
      className='flex flex-col'
    >
      <div
        style={{
          bottom: '160px',
          position: 'absolute'
        }}
        className='w-full'
      >
        {showEmojiPanel && (
          <EmojiPanel
            onClick={() => {
              setShowEmojiPanel(!showEmojiPanel)
            }}
            divRef={ref}
            onSelectEmoji={handleSelectEmoji}
          />
        )}
      </div>
      <div
        style={{
          height: '40px',
          borderColor: '#e9e9e9'
        }}
        className={`flex`}
      >
        <Icon
          name='smail'
          desc='表情'
          onClick={() => {
            setShowEmojiPanel(!showEmojiPanel)
          }}
        />
        <div className='flex-1'></div>
        <Icon name='record' desc='历史记录' />
      </div>

      <div className='flex-1 '>
        <textarea
          style={{
            overflowY: 'scroll',
            overflowX: 'hidden',
            scrollBehavior: 'smooth',
            backgroundColor: '#f2f2f2'
          }}
          className={`w-full h-full chatlist chatTextarea`}
          value={textValue}
          onChange={e => setTextValue(e.target.value)}
          onKeyDown={enterHandler}
          onMouseEnter={e => {
            e.currentTarget.classList.remove('chatlist')
            e.currentTarget.classList.add('chatlist_')
          }}
          onMouseLeave={e => {
            e.currentTarget.classList.remove('chatlist_')
            e.currentTarget.classList.add('chatlist')
          }}
        ></textarea>
      </div>
    </div>
  )
}

export default ChatSent
