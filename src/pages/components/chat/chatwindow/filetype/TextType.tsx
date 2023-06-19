import React from 'react'

const TextType = ({ message, isSelf }) => {
  return (
    <div
      className={`${
        isSelf ? 'bg-blue-500 ml-auto' : 'bg-gray-500 mr-auto'
      } px-3 py-1 text-left rounded-xl select-none`}
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      {message.content}
    </div>
  )
}

export default TextType
