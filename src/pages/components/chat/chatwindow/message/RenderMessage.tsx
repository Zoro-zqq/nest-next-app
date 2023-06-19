import { AnimatePresence, motion } from 'framer-motion'
import type { Dispatch, SetStateAction } from 'react'
import React from 'react'
import Image from 'next/image'
import { AudioType, DocumentType, ImageType, TextType, VideoType } from '../filetype'
import RenderTime from './RenderTime'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../../../../store/store'
import { setMessages } from '../../../../store/slice/chatSlice'
import { Avatar } from 'antd'
interface Props {
  lastChangedIndex: number
  setLastChangedIndex: Dispatch<SetStateAction<number>>
  messages: any[]
}

const RenderMessage = ({ messages, lastChangedIndex, setLastChangedIndex }: Props) => {
  const { userInfo } = useSelector((state: AppState) => state.auth)
  const dispatch = useDispatch()
  const animatingMessages = messages.slice(lastChangedIndex)
  const renderMessage = message => {
    switch (message.type) {
      case 'text':
        return <TextType message={message} isSelf={message.userId === userInfo.userId} />
      case 'image':
        return <ImageType message={message} />
      case 'document':
        return <DocumentType message={message} />
      case 'audio':
        return <AudioType message={message} />
      case 'video':
        return <VideoType message={message} />
    }
  }

  function removeMessage(e: React.MouseEvent, message) {
    e.preventDefault()
    setLastChangedIndex(messages.indexOf(message))
    dispatch(setMessages(messages.filter(m => m.id !== message.id)))
  }

  return (
    <ul className='w-full my-4'>
      <AnimatePresence initial={false} mode='popLayout'>
        {messages.map((message, index) => (
          <motion.li
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              opacity: { duration: 0.2 },
              layout: {
                type: 'spring',
                bounce: 0.4,
                duration: lastChangedIndex ? animatingMessages.indexOf(message) * 0.15 + 0.85 : 1
              }
            }}
            key={message.id}
            id={`message-${message.id}`}
          >
            <RenderTime message={message} messages={messages} index={index} />
            <div
              style={{ display: 'flex' }}
              className={message.userId === userInfo.userId ? 'justify-end' : ''}
            >
              {message.userId !== userInfo.userId &&
                (message.user?.avatar ? (
                  <div className='my-2 rounded-full'>
                    <Image src={message.user.avatar} width={50} height={50} alt='qq' />
                  </div>
                ) : (
                  <Avatar
                    style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }}
                    size='large'
                  >
                    {message.user.name}{' '}
                  </Avatar>
                ))}
              <div
                style={{ margin: '0 8px' }}
                className={message.userId === userInfo.userId ? 'items-end' : ''}
              >
                <p
                  style={{ textAlign: 'center', marginBottom: '8px' }}
                  className={message.user.role == '0' ? 'text-yellow-300' : ''}
                >
                  {message.user.name}
                  {message.user.role == '0' && ' 👑'}
                </p>
                <div
                  onDoubleClick={e => removeMessage(e, message)}
                  style={{ backgroundColor: '#d9d9d9', padding: '10px' }}
                >
                  {renderMessage(message)}
                </div>
              </div>
              {message.userId === userInfo.userId && (
                <div className='my-2 rounded-full'>
                  {message.user?.avatar ? (
                    <Image src={message.user?.avatar} width={50} height={50} alt='qq' />
                  ) : (
                    <Avatar
                      style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }}
                      size='large'
                    >
                      {message.user.name}
                    </Avatar>
                  )}
                </div>
              )}
            </div>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  )
}

export default RenderMessage
