import React from 'react'
const VideoType = ({ message }: any) => {
  const filePath = message.content.split('/')
  const fileName = filePath.pop()
  return (
    <a href={message.content}>
      <div className='flex p-2 mb-2 w-[315px]'>
        <div className='flex flex-col flex-1'>
          <div className='flex justify-around pb-2 text-blue-500'>
            <p className='w-[200px] truncate'>{`${decodeURIComponent(fileName)}`}</p>
            <p>{message.size}</p>
          </div>
          <video src={message.content} controls className='w-[300px]' />
        </div>
      </div>
    </a>
  )
}

export default VideoType
