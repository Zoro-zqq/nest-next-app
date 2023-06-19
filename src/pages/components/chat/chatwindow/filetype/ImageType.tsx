import React from 'react'
import Image from 'next/image'

const ImageType = ({ message }: any) => {
  return (
    <div className='my-2 rounded-full'>
      <Image width={100} height={100} src={message.content} alt={'msg_img'} />
    </div>
  )
}

export default ImageType
