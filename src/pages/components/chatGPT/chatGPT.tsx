import React, { useEffect, useRef, useState } from 'react'
import { Alert } from 'antd'

interface Message {
  text: string
  isBot: boolean
  timestamp: string
}

const ChatGPT: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const chatListRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (chatListRef.current) chatListRef.current.scrollTop = chatListRef.current.scrollHeight
  }, [messages])

  const handleClose = () => {
    setError('')
  }

  const sendMessage = async () => {
    if (inputValue.trim() === '') return

    setIsLoading(true)
    setError('')

    const newMessage: Message = {
      text: inputValue.trim(),
      isBot: false,
      timestamp: ''
    }
    setMessages(prevMessages => [...prevMessages, newMessage])
    setInputValue('')
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: inputValue.trim() }],
          max_tokens: 100,
          model: 'gpt-3.5-turbo'
        })
      })

      const data = await response.json()

      if (data?.choices?.[0]?.message) {
        const botMessage: Message = {
          text: data.choices[0].message.content.trim(),
          isBot: true,
          timestamp: ''
        }
        setMessages(prevMessages => [...prevMessages, botMessage])
      }
      if (data?.error) throw new Error(data?.error.message)
    } catch (error) {
      setError(
        'Make sure you have set the right openai key and connect the accessible internet. An error occurred. Please try again later.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') sendMessage()
  }

  return (
    <div
      style={{
        backgroundColor: '#343540',
        boxShadow:
          'rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px',
        borderRadius: '8px'
      }}
      className='w-full h-full'
    >
      {error && (
        <Alert
          style={{
            position: 'absolute',
            top: '160px'
          }}
          message={error}
          type='error'
          closable
          afterClose={handleClose}
        />
      )}
      <div
        style={{
          position: 'fixed',
          height: '24px',
          top: '0',
          backgroundColor: '#343530'
        }}
        className='fw-full'
      ></div>
      <div
        style={{
          padding: '24px 12px',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <h1
          style={{
            lineHeight: '32px',
            fontSize: '24px',
            color: 'rgb(243 244 246)',
            fontWeight: '700'
          }}
        >
          Chat with GPT!
        </h1>
        <div ref={chatListRef} className='chatlist custom-scrollbar'>
          {messages.map((message, index) => (
            <div
              key={index}
              style={{
                color: '#fff',
                marginTop: '24px'
              }}
              className={`flex-box items-start ${message.isBot ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`p-3 rounded-lg ${
                  message.isBot ? 'bg-primary rounded-bl-none' : 'bg-gray-500 rounded-br-none'
                }`}
              >
                <p className='text-sm text-gray-100'>{message.text}</p>
                <span className='block mt-1 text-xs text-gray-400'>{message.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            position: 'fixed',
            bottom: '40px'
          }}
          className='flex-box w-full'
        >
          <input
            type='text'
            className={`gptInput ${isLoading ? 'opacity-50' : ''}`}
            placeholder='Type your message here...'
            value={inputValue}
            autoFocus={true}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <button
            style={{
              width: '80px',
              borderRadius: '10px',
              marginLeft: '16px'
            }}
            className='text-white bg-primary gptBtn'
            disabled={inputValue.trim() === '' || isLoading}
            onClick={sendMessage}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatGPT
