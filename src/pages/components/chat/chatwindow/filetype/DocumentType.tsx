import React from 'react'
import Image from 'next/image'

const DocumentType = ({ message }: any) => {
  const filePath = message.content.split('/').pop()
  const fileName = decodeURI(filePath)
  return (
    <a href={message.content}>
      <div className='flex p-2  w-[250px]'>
        <div className='flex flex-col flex-1 '>
          <p className='w-[150px] truncate text-blue-300 pl-2'>{`${fileName}`}</p>
          <p className='pl-2'>{message.size}</p>
        </div>
        <Image
          className='pr-3'
          src={`/chat/file/${filePath.split('.').pop()}.png`}
          width={60}
          height={60}
          alt='file_icon'
        ></Image>
      </div>
    </a>
  )
}

export default DocumentType
